import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import {
  DUR_L,
  DUR_M,
  DUR_S,
  lockScroll,
  queryAll,
  unlockScroll,
} from "./dom";
import type { EraRuntime } from "./runtime";
import {
  animateCtn,
  animateSlide,
  animateTextA,
  animateTextH,
  animateTextP,
} from "./text";
import type { ClosableCard, SplitTarget } from "./types";

const AUTO_DURATION = 6;

type Guard = {
  alive: boolean;
};

type DomSnapshot = {
  element: Element;
  style: string | null;
  className: string | null;
  innerHTML: string;
  textContent: string | null;
  attributes: Record<string, string | null>;
};

type ScrollLockState = {
  root: HTMLElement;
  body: HTMLElement;
  rootOverflow: string;
  bodyPaddingRight: string;
  scrollbarWidth: string;
  scrollbarWidthPriority: string;
  hasScrollbarWidth: boolean;
  count: number;
  locked: boolean;
};

const scrollLocks = new WeakMap<EraRuntime, ScrollLockState>();

function createGuard(runtime: EraRuntime): Guard {
  const guard: Guard = { alive: true };
  runtime.addCleanup(() => {
    guard.alive = false;
  });
  return guard;
}

function isAlive(runtime: EraRuntime, guard: Guard): boolean {
  return guard.alive && !runtime.destroyed;
}

function trackAnimation<T extends gsap.core.Animation>(
  runtime: EraRuntime,
  guard: Guard,
  animation: T,
): T {
  runtime.addCleanup(() => {
    guard.alive = false;
    animation.scrollTrigger?.kill();
    animation.kill();
  });
  return animation;
}

function addListener(
  runtime: EraRuntime,
  target: EventTarget,
  type: string,
  listener: EventListener,
  options?: AddEventListenerOptions,
): void {
  target.addEventListener(type, listener, options);
  runtime.addCleanup(() => {
    target.removeEventListener(type, listener, options);
  });
}

function refreshScrollTrigger(guard: Guard): void {
  if (guard.alive) ScrollTrigger.refresh();
}

function rememberDom(
  runtime: EraRuntime,
  elements: Iterable<Element | null | undefined>,
  restoreHtml = false,
  restoreText = false,
  attributes: string[] = [],
): void {
  const snapshots: DomSnapshot[] = [];
  const seen = new Set<Element>();
  for (const element of elements) {
    if (!element || seen.has(element)) continue;
    seen.add(element);
    const values: Record<string, string | null> = {};
    for (const attribute of attributes) {
      values[attribute] = element.getAttribute(attribute);
    }
    snapshots.push({
      element,
      style: element.getAttribute("style"),
      className: element.getAttribute("class"),
      innerHTML: element.innerHTML,
      textContent: element.textContent,
      attributes: values,
    });
  }
  runtime.addCleanup(() => {
    for (const snapshot of snapshots) {
      const split = (snapshot.element as SplitTarget)._split;
      if (restoreHtml && split && typeof split.revert === "function") {
        split.revert();
      }
      if (snapshot.style === null) {
        snapshot.element.removeAttribute("style");
      } else {
        snapshot.element.setAttribute("style", snapshot.style);
      }
      if (snapshot.className === null) {
        snapshot.element.removeAttribute("class");
      } else {
        snapshot.element.setAttribute("class", snapshot.className);
      }
      for (const [attribute, value] of Object.entries(snapshot.attributes)) {
        if (value === null) {
          snapshot.element.removeAttribute(attribute);
        } else {
          snapshot.element.setAttribute(attribute, value);
        }
      }
      if (restoreHtml) {
        snapshot.element.innerHTML = snapshot.innerHTML;
      } else if (restoreText && snapshot.textContent !== null) {
        snapshot.element.textContent = snapshot.textContent;
      }
    }
  });
}

function restoreScrollState(runtime: EraRuntime, state: ScrollLockState): void {
  if (scrollLocks.get(runtime) !== state) return;
  if (state.locked) unlockScroll(runtime);
  state.root.style.overflow = state.rootOverflow;
  state.body.style.paddingRight = state.bodyPaddingRight;
  if (state.hasScrollbarWidth) {
    state.root.style.setProperty(
      "--scrollbar-width",
      state.scrollbarWidth,
      state.scrollbarWidthPriority,
    );
  } else {
    state.root.style.removeProperty("--scrollbar-width");
  }
  scrollLocks.delete(runtime);
}

function acquireScrollLock(runtime: EraRuntime): () => void {
  if (runtime.destroyed || typeof document === "undefined") {
    return () => {};
  }
  const root = document.documentElement;
  const body = document.body;
  if (!root || !body) return () => {};

  let state = scrollLocks.get(runtime);
  if (!state) {
    const scrollbarWidth = root.style.getPropertyValue("--scrollbar-width");
    state = {
      root,
      body,
      rootOverflow: root.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
      scrollbarWidth,
      scrollbarWidthPriority: root.style.getPropertyPriority("--scrollbar-width"),
      hasScrollbarWidth: scrollbarWidth !== "",
      count: 0,
      locked: false,
    };
    scrollLocks.set(runtime, state);
    const acquiredState = state;
    runtime.addCleanup(() => {
      acquiredState.count = 0;
      restoreScrollState(runtime, acquiredState);
    });
  }

  const acquiredState = state;
  if (acquiredState.count === 0) {
    lockScroll(runtime);
    acquiredState.locked = true;
  }
  acquiredState.count += 1;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    const current = scrollLocks.get(runtime);
    if (!current) return;
    current.count = Math.max(0, current.count - 1);
    if (current.count === 0) restoreScrollState(runtime, current);
  };
}

function initAccordion(runtime: EraRuntime): void {
  const guard = createGuard(runtime);
  const cards = queryAll<HTMLElement>("[data-accordion-card]").filter((card) =>
    card.querySelector('[data-accordion-card="content"]'),
  );
  const elements = cards.flatMap((card) => {
    const content = card.querySelector<HTMLElement>(
      '[data-accordion-card="content"]',
    );
    const plus = card.querySelector<HTMLElement>("[data-ico-plus]");
    const paragraphs = queryAll<HTMLElement>(
      '[data-accordion-card="p"]',
      card,
    );
    const buttons = queryAll<HTMLElement>(
      '[data-accordion-card="ctn"]',
      card,
    );
    return [card, content, plus, ...paragraphs, ...buttons];
  });
  rememberDom(runtime, elements, true);

  for (const card of cards) {
    const content = card.querySelector<HTMLElement>(
      '[data-accordion-card="content"]',
    );
    if (!content) continue;
    const plus = card.querySelector<HTMLElement>("[data-ico-plus]");
    const paragraphs = queryAll<HTMLElement>(
      '[data-accordion-card="p"]',
      card,
    );
    const buttons = queryAll<HTMLElement>(
      '[data-accordion-card="ctn"]',
      card,
    );

    const close = () => {
      if (!isAlive(runtime, guard)) return;
      card.classList.remove("is-active");
      trackAnimation(
        runtime,
        guard,
        gsap.to(content, {
          height: 0,
          duration: DUR_L,
          ease: "Out",
          onComplete: () => refreshScrollTrigger(guard),
          overwrite: true,
        }),
      );
      if (plus) {
        trackAnimation(
          runtime,
          guard,
          gsap.to(plus, {
            rotate: -90,
            duration: DUR_M,
            ease: "InOut",
            overwrite: true,
          }),
        );
      }
      animateTextP(paragraphs, "hide", 0);
      animateCtn(buttons, "hide", 0);
    };

    const open = () => {
      if (!isAlive(runtime, guard)) return;
      card.classList.add("is-active");
      trackAnimation(
        runtime,
        guard,
        gsap.to(content, {
          height: "auto",
          duration: DUR_L,
          ease: "Out",
          onComplete: () => refreshScrollTrigger(guard),
        }),
      );
      if (plus) {
        trackAnimation(
          runtime,
          guard,
          gsap.fromTo(
            plus,
            { rotate: 0 },
            {
              rotate: -45,
              duration: DUR_M,
              ease: "InOut",
              overwrite: true,
            },
          ),
        );
      }
      animateTextP(paragraphs, "reveal");
      animateCtn(buttons, "reveal");
    };

    const state: ClosableCard = { close };
    const onClick = () => {
      if (!isAlive(runtime, guard)) return;
      if (runtime.activeAccordion && runtime.activeAccordion !== state) {
        runtime.activeAccordion.close();
      }
      if (runtime.activeAccordion !== state) {
        open();
        runtime.activeAccordion = state;
      } else {
        close();
        runtime.activeAccordion = null;
      }
    };

    addListener(runtime, card, "click", onClick);
    gsap.set(content, { height: 0, overflow: "hidden" });
    runtime.addCleanup(() => {
      if (runtime.activeAccordion === state) runtime.activeAccordion = null;
    });
  }

  refreshScrollTrigger(guard);
  runtime.addCleanup(() => {
    gsap.killTweensOf(elements);
  });
}

function initSlider(runtime: EraRuntime): void {
  const roots = queryAll<HTMLElement>("[data-slider]");
  for (const root of roots) {
    const slides = queryAll<HTMLElement>('[data-slider="slide"]', root);
    const pagination = root.querySelector<HTMLElement>('[data-slider="pag"]');
    const previousButton = root.querySelector<HTMLElement>(
      '[data-slider="prev"]',
    );
    const nextButton = root.querySelector<HTMLElement>('[data-slider="next"]');
    const current = root.querySelector<HTMLElement>(
      '[data-slider="current"]',
    );
    const total = root.querySelector<HTMLElement>('[data-slider="total"]');
    const nextNumber = root.querySelector<HTMLElement>(
      '[data-slider="next-num"]',
    );
    const progress = root.querySelector<HTMLElement>(
      '[data-slider="progress"]',
    );
    const length = slides.length;
    if (!length) continue;

    const guard = createGuard(runtime);
    rememberDom(
      runtime,
      [
        root,
        ...slides,
        pagination,
        previousButton,
        nextButton,
        current,
        total,
        nextNumber,
        progress,
      ],
      false,
      true,
    );

    if (length === 1) {
      if (pagination) gsap.set(pagination, { display: "none" });
      continue;
    }

    let interval: number | null = null;
    let progressTween: gsap.core.Tween | null = null;
    let transition: gsap.core.Timeline | null = null;
    let currentIndex = 0;
    let previousIndex: number | null = null;
    let animating = false;

    const updateNumbers = () => {
      if (current) current.textContent = String(currentIndex + 1);
      if (total) total.textContent = String(length);
      if (nextNumber) {
        nextNumber.textContent =
          currentIndex === length - 1 ? "1" : String(currentIndex + 2);
      }
    };

    const stop = () => {
      if (interval !== null) {
        window.clearInterval(interval);
        interval = null;
      }
      progressTween?.kill();
      progressTween = null;
      if (progress) gsap.set(progress, { width: "0%" });
    };

    const startProgress = () => {
      if (!progress) return;
      progressTween?.kill();
      progressTween = gsap.fromTo(
        progress,
        { width: "0%" },
        {
          width: "100%",
          duration: AUTO_DURATION,
          ease: "none",
        },
      );
    };

    function advance() {
      if (!isAlive(runtime, guard)) return;
      animating = true;
      previousIndex = currentIndex;
      currentIndex = currentIndex === length - 1 ? 0 : currentIndex + 1;
      updateNumbers();
      animate();
    }

    function start() {
      if (!isAlive(runtime, guard)) return;
      stop();
      startProgress();
      interval = window.setInterval(() => {
        if (!isAlive(runtime, guard)) return;
        advance();
        startProgress();
      }, 1000 * AUTO_DURATION);
    }

    function animate() {
      if (!isAlive(runtime, guard)) return;
      const previous =
        previousIndex === null ? null : slides[previousIndex];
      const nextSlide = slides[currentIndex];
      if (!previous || !nextSlide) return;

      previous.style.zIndex = "0";
      nextSlide.style.zIndex = "1";
      gsap.killTweensOf([previous, nextSlide]);
      transition?.kill();
      const timeline = trackAnimation(
        runtime,
        guard,
        gsap.timeline({
          onComplete: () => {
            if (!isAlive(runtime, guard)) return;
            previous.style.zIndex = "auto";
            nextSlide.style.zIndex = "1";
            animating = false;
            transition = null;
          },
        }),
      );
      transition = timeline;

      timeline
        .set(nextSlide, { display: "block", position: "relative" })
        .set(previous, { display: "block", position: "absolute" })
        .add(() => {
          if (!isAlive(runtime, guard)) return;
          animateTextH(
            nextSlide.querySelectorAll('[data-slider="h"]'),
            "initial",
          );
          animateTextP(
            nextSlide.querySelectorAll('[data-slider="p"]'),
            "initial",
          );
          animateCtn(
            nextSlide.querySelectorAll('[data-slider="ctn"]'),
            "initial",
          );
          animateSlide(
            nextSlide.querySelectorAll('[data-slider="img"]'),
            "initial",
          );
        })
        .add(() => {
          refreshScrollTrigger(guard);
        })
        .add(() => {
          if (!isAlive(runtime, guard)) return;
          animateTextH(
            previous.querySelectorAll('[data-slider="h"]'),
            "hide",
            0,
          );
          animateTextP(
            previous.querySelectorAll('[data-slider="p"]'),
            "hide",
            0,
          );
          animateCtn(
            previous.querySelectorAll('[data-slider="ctn"]'),
            "hide",
            0,
          );
          animateSlide(
            previous.querySelectorAll('[data-slider="img"]'),
            "hide",
            0,
          );
          animateSlide(
            nextSlide.querySelectorAll('[data-slider="img"]'),
            "reveal",
            0,
          );
        })
        .to({}, { duration: DUR_M })
        .add(() => {
          if (!isAlive(runtime, guard)) return;
          animateTextH(
            nextSlide.querySelectorAll('[data-slider="h"]'),
            "reveal",
            0,
          );
          animateTextP(
            nextSlide.querySelectorAll('[data-slider="p"]'),
            "reveal",
            0,
          );
          animateCtn(
            nextSlide.querySelectorAll('[data-slider="ctn"]'),
            "reveal",
            DUR_S,
          );
        })
        .to({}, { duration: DUR_S })
        .set(previous, { display: "none" });
    }

    gsap.set(slides, { display: "none", position: "absolute" });
    gsap.set(slides[currentIndex], { display: "block", position: "relative" });
    updateNumbers();

    if (typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!isAlive(runtime, guard) || !entry) return;
          if (entry.isIntersecting) start();
          else stop();
        },
        { threshold: 0.2 },
      );
      observer.observe(root);
      runtime.addCleanup(() => observer.disconnect());
    }

    const onVisibilityChange = () => {
      if (!isAlive(runtime, guard)) return;
      if (document.hidden) stop();
      else start();
    };
    addListener(runtime, document, "visibilitychange", onVisibilityChange);

    const onPrevious = () => {
      if (!isAlive(runtime, guard) || animating) return;
      animating = true;
      previousIndex = currentIndex;
      currentIndex = currentIndex === 0 ? length - 1 : currentIndex - 1;
      updateNumbers();
      animate();
      start();
    };
    const onNext = () => {
      if (!isAlive(runtime, guard) || animating) return;
      start();
      advance();
    };
    if (previousButton) {
      addListener(runtime, previousButton, "click", onPrevious);
    }
    if (nextButton) addListener(runtime, nextButton, "click", onNext);

    runtime.addCleanup(() => {
      stop();
      transition?.kill();
      progressTween?.kill();
      gsap.killTweensOf(slides);
    });
  }
}

function initTabs(runtime: EraRuntime): void {
  const groups = queryAll<HTMLElement>("[data-tabs]");
  for (const root of groups) {
    const triggers = queryAll<HTMLElement>("[data-tab-trigger]", root);
    const contents = queryAll<HTMLElement>("[data-tab-content]", root);
    if (!triggers.length || !contents.length) continue;

    const guard = createGuard(runtime);
    rememberDom(runtime, [root, ...triggers, ...contents], true);
    let currentIndex = 0;
    let animating = false;
    let transition: gsap.core.Timeline | null = null;
    const firstContent = contents[0];
    triggers[0].classList.add("is-active");
    firstContent.classList.add("is-active");

    const findContent = (trigger: HTMLElement) => {
      const key = trigger.getAttribute("data-tab-trigger");
      if (key === null) return null;
      return root.querySelector<HTMLElement>(
        `[data-tab-content="${key}"]`,
      );
    };

    triggers.forEach((trigger, index) => {
      const onClick = () => {
        if (!isAlive(runtime, guard) || index === currentIndex || animating) {
          return;
        }
        const previousTrigger = triggers[currentIndex];
        const previousContent = findContent(previousTrigger);
        const nextContent = findContent(trigger);
        if (!previousContent || !nextContent) return;

        gsap.killTweensOf([previousContent, nextContent]);
        transition?.kill();
        animating = true;
        const timeline = trackAnimation(
          runtime,
          guard,
          gsap.timeline({
            onComplete: () => {
              if (!isAlive(runtime, guard)) return;
              animating = false;
              transition = null;
            },
          }),
        );
        transition = timeline;

        const previousHeads = queryAll<HTMLElement>(
          '[data-tab="h"]',
          previousContent,
        );
        const previousParagraphs = queryAll<HTMLElement>(
          '[data-tab="p"]',
          previousContent,
        );
        const previousButtons = queryAll<HTMLElement>(
          '[data-tab="ctn"]',
          previousContent,
        );
        const previousSlides = queryAll<HTMLElement>(
          '[data-tab="slide"]',
          previousContent,
        );
        const nextHeads = queryAll<HTMLElement>('[data-tab="h"]', nextContent);
        const nextParagraphs = queryAll<HTMLElement>(
          '[data-tab="p"]',
          nextContent,
        );
        const nextButtons = queryAll<HTMLElement>(
          '[data-tab="ctn"]',
          nextContent,
        );
        const nextSlides = queryAll<HTMLElement>(
          '[data-tab="slide"]',
          nextContent,
        );

        timeline
          .set(nextContent, {
            display: "block",
            position: "relative",
            zIndex: 1,
          })
          .set(previousContent, {
            display: "block",
            position: "absolute",
            zIndex: 0,
          })
          .add(() => {
            if (!isAlive(runtime, guard)) return;
            animateTextH(nextHeads, "initial");
            animateTextP(nextParagraphs, "initial");
            animateCtn(nextButtons, "initial");
            animateSlide(nextSlides, "initial");
          })
          .add(() => {
            refreshScrollTrigger(guard);
          })
          .add(() => {
            if (!isAlive(runtime, guard)) return;
            animateTextH(previousHeads, "hide", 0);
            animateTextP(previousParagraphs, "hide", 0);
            animateCtn(previousButtons, "hide", 0);
            animateSlide(previousSlides, "hide", 0);
            animateSlide(nextSlides, "reveal", 0);
          })
          .to({}, { duration: DUR_M })
          .add(() => {
            if (!isAlive(runtime, guard)) return;
            animateTextH(nextHeads, "reveal", 0);
            animateTextP(nextParagraphs, "reveal", 0);
            animateCtn(nextButtons, "reveal", DUR_S);
          })
          .to({}, { duration: DUR_S })
          .set(previousContent, { display: "none" });

        previousTrigger.classList.remove("is-active");
        trigger.classList.add("is-active");
        currentIndex = index;
      };
      addListener(runtime, trigger, "click", onClick);
    });

    runtime.addCleanup(() => {
      transition?.kill();
      gsap.killTweensOf(contents);
    });
  }
}

function initTabsHero(runtime: EraRuntime): void {
  const root = document.querySelector<HTMLElement>("[data-tabs-hero]");
  if (!root) return;
  const triggers = queryAll<HTMLElement>("[data-tab-trigger]", root);
  if (!triggers.length) return;
  const contents = queryAll<HTMLElement>("[data-tab-content]", root);
  const divider = root.querySelector<HTMLElement>(".hero-s_tabs_divider");
  const guard = createGuard(runtime);
  rememberDom(runtime, [root, ...triggers, ...contents, divider], true);
  let currentIndex = 0;
  let animating = false;
  let transition: gsap.core.Timeline | null = null;

  const findContent = (trigger: HTMLElement) => {
    const key = trigger.getAttribute("data-tab-trigger");
    if (key === null) return null;
    return root.querySelector<HTMLElement>(`[data-tab-content="${key}"]`);
  };

  const updateDivider = () => {
    if (!divider) return;
    const active = root.querySelector<HTMLElement>(
      "[data-tab-trigger].is-active",
    );
    if (!active) return;
    divider.setAttribute(
      "class",
      (divider.getAttribute("class") ?? "")
        .replace(/\bis-\S+/g, "")
        .trim(),
    );
    divider.classList.add(`is-${active.getAttribute("data-tab-trigger")}`);
  };

  triggers[0].classList.add("is-active");
  updateDivider();

  triggers.forEach((trigger, index) => {
    const onClick = () => {
      if (!isAlive(runtime, guard) || index === currentIndex || animating) {
        return;
      }
      const previousTrigger = triggers[currentIndex];
      const previousContent = findContent(previousTrigger);
      const nextContent = findContent(trigger);
      if (!previousContent || !nextContent) return;
      const image = nextContent.querySelector<HTMLElement>('[data-tab="img"]');

      gsap.killTweensOf([previousContent, nextContent]);
      transition?.kill();
      animating = true;
      const timeline = trackAnimation(
        runtime,
        guard,
        gsap.timeline({
          onComplete: () => {
            if (!isAlive(runtime, guard)) return;
            animating = false;
            transition = null;
          },
        }),
      );
      transition = timeline;
      timeline
        .set(nextContent, {
          display: "block",
          position: "relative",
          zIndex: 1,
        })
        .set(previousContent, {
          display: "block",
          position: "absolute",
          zIndex: 0,
        })
        .add(() => {
          refreshScrollTrigger(guard);
        });
      if (image) {
        timeline.fromTo(
          image,
          { opacity: 0 },
          {
            opacity: 1,
            duration: DUR_M,
            ease: "InOut",
            overwrite: true,
          },
        );
      }
      timeline.set(previousContent, { display: "none" });
      previousTrigger.classList.remove("is-active");
      trigger.classList.add("is-active");
      currentIndex = index;
      updateDivider();
    };
    addListener(runtime, trigger, "click", onClick);
  });

  runtime.addCleanup(() => {
    transition?.kill();
    gsap.killTweensOf(contents);
  });
}

function initTabsHilight(runtime: EraRuntime): void {
  const groups = queryAll<HTMLElement>("[data-tabs-hilight]");
  for (const root of groups) {
    const tabs = queryAll<HTMLElement>("[data-tab]", root);
    const highlight = root.querySelector<HTMLElement>("[data-tab-hilight]");
    if (!tabs.length || !highlight) continue;

    const guard = createGuard(runtime);
    const timers = new Set<number>();
    const horizontal = root.dataset.tabsHilight === "hor";
    let highlightTween: gsap.core.Tween | null = null;
    rememberDom(runtime, [highlight]);

    const moveHighlight = () => {
      if (!isAlive(runtime, guard)) return;
      const active = root.querySelector<HTMLElement>("[data-tab].is-active");
      if (!active) return;
      highlightTween?.kill();
      highlightTween = trackAnimation(
        runtime,
        guard,
        gsap.to(
          highlight,
          horizontal
            ? {
                x: active.offsetLeft,
                width: active.offsetWidth,
                duration: DUR_M,
                ease: "InOut",
              }
            : {
                y: active.offsetTop,
                height: active.offsetHeight,
                duration: DUR_M,
                ease: "InOut",
              },
        ),
      );
    };

    const schedule = () => {
      if (!isAlive(runtime, guard)) return;
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        moveHighlight();
      }, 40);
      timers.add(timer);
    };

    schedule();
    for (const tab of tabs) addListener(runtime, tab, "click", schedule);
    runtime.addCleanup(() => {
      for (const timer of timers) window.clearTimeout(timer);
      timers.clear();
      highlightTween?.kill();
      gsap.killTweensOf(highlight);
    });
  }
}

function initModalCta(runtime: EraRuntime): void {
  const triggers = queryAll<HTMLElement>("[data-modal-cta-btn]");
  for (const trigger of triggers) {
    const key = trigger.getAttribute("data-modal-cta-btn");
    if (key === null) continue;
    const modal = document.querySelector<HTMLElement>(
      `[data-modal-cta="${key}"]`,
    );
    if (!modal) continue;
    const container = modal.querySelector<HTMLElement>(
      "[data-modal-container]",
    );
    const overlay = modal.querySelector<HTMLElement>("[data-modal-over]");
    if (!container || !overlay) continue;
    const closeButtons = queryAll<HTMLElement>(
      "[data-modal-close]",
      modal,
    );

    const guard = createGuard(runtime);
    let open = false;
    let releaseScroll: (() => void) | null = null;
    rememberDom(runtime, [modal, container, overlay]);

    const close = () => {
      if (!open || !isAlive(runtime, guard)) return;
      open = false;
      trackAnimation(
        runtime,
        guard,
        gsap.to(container, {
          scale: 1,
          rotateX: 90,
          yPercent: 200,
          rotate: 25,
          duration: DUR_M,
          ease: "In",
          onComplete: () => {
            if (isAlive(runtime, guard)) {
              gsap.set([modal, overlay], { display: "none" });
            }
          },
          overwrite: true,
        }),
      );
      trackAnimation(
        runtime,
        guard,
        gsap.to(overlay, {
          opacity: 0,
          duration: DUR_M,
          ease: "In",
          overwrite: true,
        }),
      );
      releaseScroll?.();
      releaseScroll = null;
    };

    const openModal = () => {
      if (open || !isAlive(runtime, guard)) return;
      open = true;
      gsap.set([modal, overlay], { display: "block" });
      trackAnimation(
        runtime,
        guard,
        gsap.fromTo(
          container,
          { scale: 0, rotateX: -90, yPercent: -100, rotate: -25 },
          {
            scale: 1,
            rotateX: 0,
            yPercent: 0,
            rotate: 0,
            duration: DUR_L,
            ease: "Out",
            overwrite: true,
          },
        ),
      );
      trackAnimation(
        runtime,
        guard,
        gsap.fromTo(
          overlay,
          { opacity: 0 },
          {
            opacity: 1,
            duration: DUR_L,
            ease: "Out",
            overwrite: true,
          },
        ),
      );
      releaseScroll = acquireScrollLock(runtime);
    };

    const onCloseClick = () => close();
    const onKeyDown = (event: Event) => {
      if ((event as KeyboardEvent).key === "Escape") close();
    };
    addListener(runtime, trigger, "click", () => {
      if (!open) openModal();
    });
    for (const closeButton of closeButtons) {
      addListener(runtime, closeButton, "click", onCloseClick);
    }
    addListener(runtime, document, "keydown", onKeyDown);

    gsap.set(modal, { display: "none" });
    gsap.set(container, { transformPerspective: 1000 });
    runtime.addCleanup(() => {
      releaseScroll?.();
      releaseScroll = null;
      open = false;
      gsap.killTweensOf([modal, container, overlay]);
    });
  }
}

function initModalMenu(runtime: EraRuntime): void {
  const triggers = queryAll<HTMLElement>("[data-modal-menu-btn]");
  for (const trigger of triggers) {
    const key = trigger.getAttribute("data-modal-menu-btn");
    if (key === null) continue;
    const modal = document.querySelector<HTMLElement>(
      `[data-modal-menu="${key}"]`,
    );
    if (!modal) continue;
    const container = modal.querySelector<HTMLElement>(
      "[data-modal-container]",
    );
    const overlay = modal.querySelector<HTMLElement>("[data-modal-over]");
    if (!container || !overlay) continue;

    const closeButtons = queryAll<HTMLElement>(
      `[data-modal-close="${key}"]`,
    );
    const partsA = queryAll<HTMLElement>('[data-part="a"]', modal);
    const partsH = queryAll<HTMLElement>('[data-part="h"]', modal);
    const partsP = queryAll<HTMLElement>('[data-part="p"]', modal);
    const partsCtn = queryAll<HTMLElement>('[data-part="ctn"]', modal);
    const labels = queryAll<HTMLElement>(".btn-menu_label", trigger);
    const firstIcon = trigger.querySelector<HTMLElement>(
      '[data-ico-menu="is-1"]',
    );
    const secondIcon = trigger.querySelector<HTMLElement>(
      '[data-ico-menu="is-2"]',
    );
    const themes = queryAll<HTMLElement>("[data-theme]");

    const guard = createGuard(runtime);
    let open = false;
    let releaseScroll: (() => void) | null = null;
    rememberDom(
      runtime,
      [
        modal,
        container,
        overlay,
        firstIcon,
        secondIcon,
        ...labels,
        ...themes,
        ...partsA,
        ...partsH,
        ...partsP,
        ...partsCtn,
      ],
      true,
      false,
      ["data-modal-themed"],
    );

    const updateThemes = (visible: boolean) => {
      for (const theme of themes) {
        if (visible) {
          if (!theme.classList.contains("theme_on-dark")) {
            theme.classList.add("theme_on-dark");
            theme.setAttribute("data-modal-themed", "");
          }
        } else if (theme.hasAttribute("data-modal-themed")) {
          theme.classList.remove("theme_on-dark");
          theme.removeAttribute("data-modal-themed");
        }
      }
    };

    const close = () => {
      if (!open || !isAlive(runtime, guard)) return;
      open = false;
      updateThemes(false);
      for (const label of labels) label.classList.toggle("is-active");
      trackAnimation(
        runtime,
        guard,
        gsap.to(container, {
          yPercent: 0,
          duration: DUR_M,
          ease: "In",
          onComplete: () => {
            if (isAlive(runtime, guard)) {
              gsap.set([modal, overlay], { display: "none" });
            }
          },
          overwrite: true,
        }),
      );
      for (const icon of [firstIcon, secondIcon]) {
        if (!icon) continue;
        trackAnimation(
          runtime,
          guard,
          gsap.to(icon, {
            rotate: 180,
            duration: DUR_M,
            ease: "InOut",
            overwrite: true,
          }),
        );
      }
      trackAnimation(
        runtime,
        guard,
        gsap.to(overlay, {
          opacity: 0,
          duration: DUR_M,
          ease: "In",
          overwrite: true,
        }),
      );
      animateTextA(partsA, "hide");
      animateTextH(partsH, "hide");
      animateTextP(partsP, "hide");
      animateCtn(partsCtn, "hide");
      releaseScroll?.();
      releaseScroll = null;
    };

    const openMenu = () => {
      if (open || !isAlive(runtime, guard)) return;
      open = true;
      gsap.set([modal, overlay], { display: "block" });
      updateThemes(true);
      for (const label of labels) label.classList.toggle("is-active");
      trackAnimation(
        runtime,
        guard,
        gsap.fromTo(
          container,
          { yPercent: 0 },
          {
            yPercent: 0,
            duration: DUR_L,
            ease: "Out",
            overwrite: true,
          },
        ),
      );
      for (const icon of [firstIcon, secondIcon]) {
        if (!icon) continue;
        trackAnimation(
          runtime,
          guard,
          gsap.to(icon, {
            rotate: -45,
            duration: DUR_M,
            ease: "InOut",
            overwrite: true,
          }),
        );
      }
      trackAnimation(
        runtime,
        guard,
        gsap.fromTo(
          overlay,
          { opacity: 0 },
          {
            opacity: 1,
            duration: DUR_M,
            ease: "Out",
            overwrite: true,
          },
        ),
      );
      animateTextA(partsA, "reveal");
      animateTextH(partsH, "reveal");
      animateTextP(partsP, "reveal");
      animateCtn(partsCtn, "reveal");
      releaseScroll = acquireScrollLock(runtime);
    };

    const onTriggerClick = () => {
      if (open) close();
      else openMenu();
    };
    const onCloseClick = () => close();
    const onKeyDown = (event: Event) => {
      if ((event as KeyboardEvent).key === "Escape") close();
    };
    addListener(runtime, trigger, "click", onTriggerClick);
    for (const closeButton of closeButtons) {
      addListener(runtime, closeButton, "click", onCloseClick);
    }
    addListener(runtime, document, "keydown", onKeyDown);

    gsap.set(modal, { display: "none" });
    const icons = [firstIcon, secondIcon].filter(
      (icon): icon is HTMLElement => icon !== null,
    );
    if (icons.length) gsap.set(icons, { rotate: 180 });

    runtime.addCleanup(() => {
      releaseScroll?.();
      releaseScroll = null;
      open = false;
      gsap.killTweensOf([
        modal,
        container,
        overlay,
        firstIcon,
        secondIcon,
        ...labels,
        ...partsA,
        ...partsH,
        ...partsP,
        ...partsCtn,
      ]);
    });
  }
}

export function initControls(runtime: EraRuntime): void {
  if (
    typeof window === "undefined" ||
    typeof document === "undefined" ||
    runtime.destroyed
  ) {
    return;
  }
  gsap.registerPlugin(ScrollTrigger, SplitText);
  initAccordion(runtime);
  initSlider(runtime);
  initTabs(runtime);
  initTabsHero(runtime);
  initTabsHilight(runtime);
  initModalCta(runtime);
  initModalMenu(runtime);
}
