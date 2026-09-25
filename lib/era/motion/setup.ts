import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BREAKPOINT, DUR_L, queryAll } from "./dom";
import type { EraRuntime } from "./runtime";
import {
  animateCtn,
  animateLine,
  animateSlide,
  animateTextA,
  animateTextH,
  animateTextP,
} from "./text";
import type { RevealAnimator, RevealKind } from "./types";

type HorizontalScrollElement = HTMLElement & {
  _horizontalTween?: gsap.core.Animation;
};

type RevealGroup = {
  trigger: HTMLElement;
  items: HTMLElement[];
};

function initLocalLenis(runtime: EraRuntime): void {
  queryAll<HTMLElement>("[data-lenis-scroll]").forEach((wrapper) => {
    const instance = new Lenis({
      wrapper,
      duration: 0.6,
      smoothWheel: true,
      touchMultiplier: 2,
      easing: (progress) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * progress)),
      infinite: false,
    });
    runtime.addLocalLenis(instance);
    const raf = (time: number) => instance.raf(1000 * time);
    gsap.ticker.add(raf);
    runtime.addCleanup(() => gsap.ticker.remove(raf));
  });
}

function initThemeChange(runtime: EraRuntime): void {
  const themes = queryAll<HTMLElement>("[data-theme]");
  if (!themes.length) return;

  const applyTheme = (
    section: HTMLElement,
    activeClass: string,
    inactiveClasses: string[],
  ) => {
    if (getComputedStyle(section).display === "none") return;
    const sectionRect = section.getBoundingClientRect();

    themes.forEach((theme) => {
      const themeRect = theme.getBoundingClientRect();
      const center = themeRect.left + themeRect.width / 2;
      if (center < sectionRect.left || center > sectionRect.right) return;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: () => `top top+=${themeRect.top + themeRect.height / 2}`,
        end: () => `bottom top+=${themeRect.top + themeRect.height / 2}`,
        markers: false,
        onEnter: () => {
          theme.classList.add(activeClass);
          theme.classList.remove(...inactiveClasses);
        },
        onEnterBack: () => {
          theme.classList.add(activeClass);
          theme.classList.remove(...inactiveClasses);
        },
      });
      runtime.addCleanup(() => trigger.kill());
    });
  };

  queryAll<HTMLElement>('[data-bg="color"]').forEach((section) => {
    applyTheme(section, "theme_on-color", [
      "theme_on-light",
      "theme_on-dark",
    ]);
  });
  queryAll<HTMLElement>('[data-bg="light"]').forEach((section) => {
    applyTheme(section, "theme_on-light", [
      "theme_on-dark",
      "theme_on-color",
    ]);
  });
  queryAll<HTMLElement>('[data-bg="dark"]').forEach((section) => {
    applyTheme(section, "theme_on-dark", [
      "theme_on-light",
      "theme_on-color",
    ]);
  });
}

function initSnapSections(runtime: EraRuntime): void {
  const media = gsap.matchMedia();

  media.add(`(min-width: ${BREAKPOINT}px)`, () => {
    const sections = queryAll<HTMLElement>("[data-snap]");
    const lenis = runtime.lenis;
    if (!sections.length || !lenis) return;

    let timer: number | null = null;
    const onScroll = () => {
      if (timer !== null) window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        timer = null;
        const viewportHeight = window.innerHeight;
        if (viewportHeight <= 0) return;

        let target: HTMLElement | null = null;
        let greatestVisibility = 0;

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const denominator = Math.min(section.offsetHeight, viewportHeight);
          if (denominator <= 0) return;
          const visibility =
            (Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)) /
            denominator;
          if (visibility > 0.5 && visibility > greatestVisibility) {
            greatestVisibility = visibility;
            target = section;
          }
        });

        if (target) {
          lenis.scrollTo(target, {
            duration: DUR_L,
            easing: gsap.parseEase("Ease"),
          });
        }
      }, 40);
    };

    lenis.on("scroll", onScroll);
    runtime.addCleanup(() => {
      lenis.off("scroll", onScroll);
      if (timer !== null) {
        window.clearTimeout(timer);
        timer = null;
      }
    });
  });

  runtime.addCleanup(() => media.revert());
}

function initForm(runtime: EraRuntime): void {
  queryAll<HTMLElement>("[data-form-btn]").forEach((button) => {
    const onClick = (event: Event) => {
      event.preventDefault();
      const form = button.closest("form");
      if (!form) return;

      const onSubmit = () => {
        button
          .querySelectorAll<HTMLElement>('[hover="text"]')
          .forEach((text) => {
            text.textContent = "Sending...";
          });
      };

      form.addEventListener("submit", onSubmit, { once: true });
      runtime.addCleanup(() => form.removeEventListener("submit", onSubmit));
      form.requestSubmit();
    };

    button.addEventListener("click", onClick);
    runtime.addCleanup(() => button.removeEventListener("click", onClick));
  });

  queryAll<HTMLInputElement | HTMLTextAreaElement>(".input_field").forEach(
    (input) => {
      const label = input.parentElement?.querySelector<HTMLElement>(
        ".input_label",
      );
      if (!label) return;

      const onFocusIn = () => label.classList.add("focused");
      const onFocusOut = () => {
        if (!input.value.trim()) label.classList.remove("focused");
      };
      input.addEventListener("focusin", onFocusIn);
      input.addEventListener("focusout", onFocusOut);
      runtime.addCleanup(() => {
        input.removeEventListener("focusin", onFocusIn);
        input.removeEventListener("focusout", onFocusOut);
      });
    },
  );

  queryAll<HTMLInputElement>('input[type="tel"]').forEach((input) => {
    const onInput = () => {
      input.value = input.value.replace(/[^\d+\-]/g, "");
    };
    input.addEventListener("input", onInput);
    runtime.addCleanup(() => input.removeEventListener("input", onInput));
  });

  queryAll<HTMLInputElement>('input[name="Name"]').forEach((input) => {
    const onInput = () => {
      input.value = input.value.replace(
        /[\d!@#$%^&*()_+=\[\]{};:'"\\|,.<>/?~`]/g,
        "",
      );
    };
    input.addEventListener("input", onInput);
    runtime.addCleanup(() => input.removeEventListener("input", onInput));
  });
}

function initUtmFields(): void {
  const title = document.querySelector<HTMLInputElement>('input[name="title"]');
  if (title) title.value = "Deal from Era";

  const params = new URLSearchParams(window.location.search);
  const values: Record<string, string> = {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    utm_url: params.get("utm_url") || "",
    page_url: window.location.href,
  };

  Object.entries(values).forEach(([name, value]) => {
    const input = document.querySelector<HTMLInputElement>(
      `input[name="${name}"]`,
    );
    if (input) input.value = value;
  });
}

function initPlayPauseVideoScroll(runtime: EraRuntime): void {
  queryAll<HTMLElement>("[data-video-playpause]").forEach((container) => {
    const videos = container.querySelectorAll<HTMLVideoElement>(".video");
    if (!videos.length) return;

    const play = (video: HTMLVideoElement) => {
      void video.play().catch(() => {});
    };
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => videos.forEach(play),
      onEnterBack: () => videos.forEach(play),
      onLeave: () => videos.forEach((video) => video.pause()),
      onLeaveBack: () => videos.forEach((video) => video.pause()),
    });
    runtime.addCleanup(() => trigger.kill());
  });
}

function initOther(runtime: EraRuntime): void {
  const years = queryAll<HTMLElement>(".year");
  if (years.length) {
    const year = new Date().getFullYear();
    years.forEach((element) => {
      element.textContent = String(year);
    });
  }

  const backButton = document.querySelector<HTMLElement>("[data-btn-back]");
  if (backButton) {
    const onClick = () => history.back();
    backButton.addEventListener("click", onClick);
    runtime.addCleanup(() => backButton.removeEventListener("click", onClick));
  }

  const refreshTarget = document.querySelector<HTMLElement>(
    '[data-scroll-trigger="refresh"]',
  );
  if (refreshTarget && typeof IntersectionObserver !== "undefined") {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) ScrollTrigger.refresh();
    });
    observer.observe(refreshTarget);
    runtime.addCleanup(() => observer.disconnect());
  }

  queryAll<HTMLElement>("[data-comma-list]").forEach((list) => {
    const commas = list.querySelectorAll<HTMLElement>("[data-comma]");
    if (commas.length) commas[commas.length - 1]?.remove();
  });

  const media = gsap.matchMedia();
  media.add(`(max-width: ${BREAKPOINT - 1}px)`, () => {
    const path = document.querySelector<HTMLElement>(".loc-path-s_path");
    if (path) path.scrollLeft = (path.scrollWidth - path.clientWidth) / 2;
  });
  runtime.addCleanup(() => media.revert());

  queryAll<HTMLElement>("[data-crumb-item]").forEach((item) => {
    if (item.getAttribute("href") === "#") item.classList.add("is-active");
  });

  if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
    queryAll<HTMLSourceElement>('source[src$=".webm"]').forEach((source) => {
      source.remove();
    });
    queryAll<HTMLVideoElement>("video").forEach((video) => {
      if (video.closest(".hero-w") || video.closest(".cta-w")) return;
      video.load();
      void video.play().catch(() => {});
    });
  }
}

function initScrollRevealFirst(): void {
  const elements = queryAll<HTMLElement>("[data-reveal-first]");
  if (!elements.length) return;

  const groups = new Map<HTMLElement | null, HTMLElement[]>();
  elements.forEach((element) => {
    const parent = element.parentElement;
    const group = groups.get(parent);
    if (group) group.push(element);
    else groups.set(parent, [element]);
  });

  groups.forEach((group) => {
    group.slice(1).forEach((element) => {
      element
        .querySelectorAll("[data-scroll-reveal]")
        .forEach((reveal) => reveal.removeAttribute("data-scroll-reveal"));
    });
  });
}

function trackParallax(runtime: EraRuntime, tween: gsap.core.Tween): void {
  const trigger = tween.scrollTrigger;
  runtime.addCleanup(() => {
    trigger?.kill();
    tween.kill();
  });
}

function initAllParallax(runtime: EraRuntime): void {
  queryAll<HTMLElement>('[data-parallax="img"]').forEach((image) => {
    const wrapper = image.closest<HTMLElement>('[data-parallax="w"]');
    if (!wrapper) return;
    const mobile = window.innerWidth < BREAKPOINT;
    if (mobile && wrapper.dataset.mob === "off") return;
    if (!mobile && wrapper.dataset.desk === "off") return;

    trackParallax(
      runtime,
      gsap.fromTo(
        image,
        { yPercent: -15, translateZ: 10 },
        {
          yPercent: 15,
          translateZ: 10,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            scrub: 0.5,
          },
        },
      ),
    );
  });

  queryAll<HTMLElement>('[data-parallax="img-out"]').forEach((image) => {
    const wrapper = image.closest<HTMLElement>('[data-parallax="w"]');
    if (!wrapper) return;
    const mobile = window.innerWidth < BREAKPOINT;
    if (mobile && wrapper.dataset.mob === "off") return;
    if (!mobile && wrapper.dataset.desk === "off") return;

    trackParallax(
      runtime,
      gsap.fromTo(
        image,
        { yPercent: 0, translateZ: 10 },
        {
          yPercent: 20,
          translateZ: 10,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "bottom bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        },
      ),
    );
  });

  queryAll<HTMLElement>('[data-parallax="img-in"]').forEach((image) => {
    const wrapper = image.closest<HTMLElement>('[data-parallax="w"]');
    if (!wrapper) return;
    const mobile = window.innerWidth < BREAKPOINT;
    if (mobile && wrapper.dataset.mob === "off") return;
    if (!mobile && wrapper.dataset.desk === "off") return;

    trackParallax(
      runtime,
      gsap.fromTo(
        image,
        { yPercent: -20, translateZ: 10 },
        {
          yPercent: 0,
          translateZ: 10,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        },
      ),
    );
  });

  queryAll<HTMLElement>('[data-parallax="ctn-down"]').forEach((element) => {
    const mobile = window.innerWidth < BREAKPOINT;
    if (mobile && element.dataset.mob === "off") return;
    if (!mobile && element.dataset.desk === "off") return;

    trackParallax(
      runtime,
      gsap.fromTo(
        element,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top 125%",
            end: "bottom -25%",
            scrub: 0.5,
          },
        },
      ),
    );
  });

  queryAll<HTMLElement>('[data-parallax="ctn-up"]').forEach((element) => {
    const mobile = window.innerWidth < BREAKPOINT;
    if (mobile && element.dataset.mob === "off") return;
    if (!mobile && element.dataset.desk === "off") return;

    trackParallax(
      runtime,
      gsap.fromTo(
        element,
        { yPercent: 10 },
        {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top 125%",
            end: "bottom -25%",
            scrub: 0.5,
          },
        },
      ),
    );
  });
}

function initRevealGroups(
  runtime: EraRuntime,
  kind: RevealKind,
  animator: RevealAnimator,
): void {
  const elements = queryAll<HTMLElement>(
    `[data-scroll-reveal="${kind}"]`,
  );
  if (!elements.length) return;

  const groups = new Map<HTMLElement, RevealGroup>();
  elements.forEach((element) => {
    const trigger =
      element.closest<HTMLElement>('[data-scroll-reveal="w"]') || element;
    const group = groups.get(trigger);
    if (group) group.items.push(element);
    else groups.set(trigger, { trigger, items: [element] });
  });

  groups.forEach(({ trigger, items }) => {
    gsap.set(items, { visibility: "visible" });
    const horizontal = trigger.closest<HorizontalScrollElement>(
      "[data-scroll-horizontal]",
    );
    const scrollTrigger = ScrollTrigger.create({
      trigger,
      containerAnimation: horizontal?._horizontalTween,
      start: horizontal ? "left bottom" : "top bottom",
      once: true,
      onEnter: () => animator(items, "reveal"),
    });
    runtime.addCleanup(() => scrollTrigger.kill());
    animator(items, "initial");
  });
}

function initScrollElementsReveal(runtime: EraRuntime): void {
  initRevealGroups(runtime, "a", animateTextA);
  initRevealGroups(runtime, "h", animateTextH);
  initRevealGroups(runtime, "p", animateTextP);
  initRevealGroups(runtime, "ctn", animateCtn);
  initRevealGroups(runtime, "line", animateLine);
  initRevealGroups(runtime, "slide", animateSlide);
}

export function initCore(runtime: EraRuntime): void {
  initLocalLenis(runtime);
  initThemeChange(runtime);
  initSnapSections(runtime);
  initForm(runtime);
  initUtmFields();
  initPlayPauseVideoScroll(runtime);
  initOther(runtime);
  initScrollRevealFirst();
  initAllParallax(runtime);
  initScrollElementsReveal(runtime);
}
