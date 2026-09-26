import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { BREAKPOINT, DUR_L, DUR_M, STAGGER, queryAll } from "./dom";
import type { EraRuntime } from "./runtime";

gsap.registerPlugin(ScrollTrigger, SplitText);

function addDesktopMatchMedia(
  runtime: EraRuntime,
  setup: () => void | (() => void),
) {
  const media = gsap.matchMedia();
  media.add(`(min-width: ${BREAKPOINT}px)`, setup);
  runtime.addCleanup(() => media.revert());
}

function initMagneticEffect(runtime: EraRuntime) {
  addDesktopMatchMedia(runtime, () => {
    const buttons = queryAll<HTMLElement>("[data-magnetic-btn]");

    if (!buttons.length) return;

    const reset = (element: HTMLElement, immediate: boolean) => {
      gsap.killTweensOf(element);
      const vars = {
        x: 0,
        y: 0,
        force3D: true,
        clearProps: "all",
        ...(!immediate && {
          ease: "elastic.out(1, 0.3)",
          duration: 1.6,
        }),
      };
      if (immediate) gsap.set(element, vars);
      else gsap.to(element, vars);
    };
    const getInner = (button: HTMLElement) =>
      queryAll<HTMLElement>("[data-magnetic-inner]", button);
    const onEnter = (event: MouseEvent) => {
      const button = event.currentTarget as HTMLElement;
      reset(button, true);
      getInner(button).forEach((inner) => reset(inner, true));
    };
    const onMove = (event: MouseEvent) => {
      const button = event.currentTarget as HTMLElement;
      const rect = button.getBoundingClientRect();
      const strength = parseFloat(button.dataset.magneticStrength ?? "") || 25;
      const innerStrength =
        parseFloat(button.dataset.magneticStrengthInner ?? "") || strength;
      const x = ((event.clientX - rect.left) / button.offsetWidth - 0.5) *
        (strength / 16);
      const y = ((event.clientY - rect.top) / button.offsetHeight - 0.5) *
        (strength / 16);

      gsap.to(button, {
        x: `${x}em`,
        y: `${y}em`,
        force3D: true,
        ease: "power4.out",
        duration: 1.6,
      });
      getInner(button).forEach((inner) => {
        gsap.to(inner, {
          x: `${((event.clientX - rect.left) / button.offsetWidth - 0.5) *
            (innerStrength / 16)}em`,
          y: `${((event.clientY - rect.top) / button.offsetHeight - 0.5) *
            (innerStrength / 16)}em`,
          force3D: true,
          ease: "power4.out",
          duration: 2,
        });
      });
    };
    const onLeave = (event: MouseEvent) => {
      const button = event.currentTarget as HTMLElement;
      reset(button, false);
      getInner(button).forEach((inner) => reset(inner, false));
    };

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", onEnter);
      button.addEventListener("mousemove", onMove);
      button.addEventListener("mouseleave", onLeave);
    });

    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("mouseenter", onEnter);
        button.removeEventListener("mousemove", onMove);
        button.removeEventListener("mouseleave", onLeave);
        gsap.killTweensOf(button);
        getInner(button).forEach((inner) => gsap.killTweensOf(inner));
      });
    };
  });
}

function initNavItemHover(runtime: EraRuntime) {
  queryAll<HTMLElement>("[hover-nav-item]").forEach((item) => {
    const texts = queryAll<HTMLElement>("[hover='text']", item);
    if (texts.length < 2) return;

    const positionStagger = (distance: number) =>
      (index: number, _target: Element, targets: Element[]) => {
        const lefts = targets.map((target) =>
          target.getBoundingClientRect().left,
        );
        const min = Math.min(...lefts);
        const width = Math.max(...lefts) - min || 1;
        return ((lefts[index] - min) / width) * distance;
      };
    const first = new SplitText(texts[0], {
      type: "words,chars",
      tag: "span",
      smartWrap: true,
      wordsClass: "split-word",
      charsClass: "split-char",
      mask: "words",
    });
    const second = new SplitText(texts[1], {
      type: "words,chars",
      tag: "span",
      smartWrap: true,
      wordsClass: "split-word",
      charsClass: "split-char",
      mask: "words",
    });
    const onEnter = () => {
      gsap.fromTo(
        first.chars,
        { opacity: 1, yPercent: 0 },
        {
          opacity: 0,
          yPercent: -100,
          duration: DUR_M,
          ease: "Ease",
          stagger: positionStagger(2 * STAGGER),
          overwrite: true,
          force3D: true,
        },
      );
      gsap.fromTo(
        second.chars,
        { yPercent: 100, opacity: 0 },
        {
          opacity: 1,
          yPercent: 0,
          duration: DUR_M,
          ease: "Ease",
          stagger: positionStagger(2 * STAGGER),
          overwrite: true,
          force3D: true,
        },
      );
    };
    const onLeave = () => {
      gsap.to(first.chars, {
        opacity: 1,
        yPercent: 0,
        duration: DUR_M,
        ease: "Ease",
        stagger: positionStagger(2 * STAGGER),
        overwrite: true,
        force3D: true,
      });
      gsap.to(second.chars, {
        opacity: 0,
        yPercent: 100,
        duration: DUR_M,
        ease: "Ease",
        stagger: positionStagger(2 * STAGGER),
        overwrite: true,
        force3D: true,
      });
    };
    const trigger = item.closest<HTMLElement>("[hover-nav-item-trigger]") ?? item;

    gsap.set(second.chars, { yPercent: 100, opacity: 0 });
    trigger.addEventListener("mouseenter", onEnter);
    trigger.addEventListener("mouseleave", onLeave);

    runtime.addCleanup(() => {
      trigger.removeEventListener("mouseenter", onEnter);
      trigger.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf([...first.chars, ...second.chars]);
      first.revert();
      second.revert();
    });
  });
}

function initLinkHover(runtime: EraRuntime) {
  queryAll<HTMLElement>("[hover-link]").forEach((link) => {
    const texts = queryAll<HTMLElement>("[hover='text']", link);
    if (texts.length < 2) return;

    const first = new SplitText(texts[0], {
      type: "lines,words,chars",
      tag: "span",
      linesClass: "split-line",
      wordsClass: "split-word",
      charsClass: "split-char",
      smartWrap: true,
    });
    const second = new SplitText(texts[1], {
      type: "words,chars",
      tag: "span",
      wordsClass: "split-word",
      charsClass: "split-char",
      smartWrap: true,
    });
    const lines = first.lines.map((line) => {
      const lineElement = document.createElement("span");
      lineElement.classList.add("link_line");
      line.appendChild(lineElement);
      return lineElement;
    });
    const onEnter = () => {
      gsap.fromTo(
        first.chars,
        { opacity: 1, x: "0em", yPercent: 0, rotateY: 0 },
        {
          opacity: 0,
          x: "0.4em",
          yPercent: -25,
          rotateY: -90,
          duration: DUR_M,
          ease: "Out",
          stagger: STAGGER / 4,
          overwrite: true,
          force3D: true,
        },
      );
      gsap.fromTo(
        second.chars,
        { opacity: 0, x: "-0.4em", yPercent: 25, rotateY: 90 },
        {
          opacity: 1,
          x: "0em",
          yPercent: 0,
          rotateY: 0,
          duration: DUR_M,
          ease: "Out",
          delay: 0.2,
          stagger: STAGGER / 4,
          overwrite: true,
          force3D: true,
        },
      );
      gsap.fromTo(
        lines,
        { scaleX: 1, transformOrigin: "right center" },
        {
          scaleX: 0,
          duration: DUR_M,
          ease: "Out",
          stagger: STAGGER,
          overwrite: true,
        },
      );
    };
    const onLeave = () => {
      gsap.to(first.chars, {
        opacity: 1,
        x: "0em",
        yPercent: 0,
        rotateY: 0,
        duration: DUR_M,
        ease: "Out",
        delay: 0.2,
        stagger: STAGGER / 4,
        overwrite: true,
        force3D: true,
      });
      gsap.to(second.chars, {
        opacity: 0,
        x: "-0.4em",
        yPercent: 25,
        rotateY: 90,
        duration: DUR_M,
        ease: "Out",
        stagger: STAGGER / 4,
        overwrite: true,
        force3D: true,
      });
      gsap.to(lines, {
        scaleX: 1,
        transformOrigin: "left center",
        duration: DUR_M,
        ease: "Out",
        stagger: STAGGER,
        overwrite: true,
      });
    };
    const trigger = link.closest<HTMLElement>("[hover-link-trigger]") ?? link;

    gsap.set(lines, { scaleX: 1, transformOrigin: "right center" });
    gsap.set(second.chars, {
      opacity: 0,
      x: "-0.4em",
      yPercent: 25,
      rotateY: 90,
    });
    trigger.addEventListener("mouseenter", onEnter);
    trigger.addEventListener("mouseleave", onLeave);

    runtime.addCleanup(() => {
      trigger.removeEventListener("mouseenter", onEnter);
      trigger.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf([...first.chars, ...second.chars, ...lines]);
      first.revert();
      second.revert();
    });
  });
}

function initBtnCircleHover(runtime: EraRuntime) {
  queryAll<HTMLElement>("[hover-btn-circle]").forEach((button) => {
    const arcs = queryAll<SVGElement>("[data-arc]", button);
    if (!arcs.length) return;

    const circumference = 2 * Math.PI * 103.5;
    const arc = 0.0417 * circumference;
    const timeline = gsap.timeline({ paused: true }).to(arcs, {
      strokeDasharray: `${circumference / 2} ${circumference}`,
      duration: DUR_M,
      ease: "InOut",
    });
    const onEnter = () => timeline.play();
    const onLeave = () => timeline.reverse();

    gsap.set(arcs, { strokeDasharray: `${arc} ${circumference}` });
    button.addEventListener("mouseenter", onEnter);
    button.addEventListener("mouseleave", onLeave);

    runtime.addCleanup(() => {
      button.removeEventListener("mouseenter", onEnter);
      button.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(arcs);
      timeline.kill();
      gsap.set(arcs, { clearProps: "strokeDasharray" });
    });
  });
}

function initPins(runtime: EraRuntime) {
  queryAll<HTMLElement>("[data-pin]").forEach((pin) => {
    const plus = pin.querySelector<HTMLElement>('[data-ico-plus="v"]');
    const pulses = queryAll<HTMLElement>("[data-pin-pulse]", pin);
    const width = pin.offsetWidth;
    const pulseTween = pulses.length
      ? gsap.fromTo(
          pulses,
          { opacity: 1, width, height: width },
          {
            opacity: 0,
            width: 1.6 * width,
            height: 1.6 * width,
            duration: DUR_L,
            ease: "In",
            stagger: 0.2,
            repeat: -1,
          },
        )
      : null;
    let onEnter: (() => void) | null = null;
    let onLeave: (() => void) | null = null;

    if (plus) {
      onEnter = () => {
        gsap.fromTo(
          plus,
          { rotate: 0 },
          { rotate: -90, duration: DUR_M, ease: "Out", overwrite: true },
        );
      };
      onLeave = () => {
        gsap.to(plus, {
          rotate: -180,
          duration: DUR_M,
          ease: "Out",
          overwrite: true,
        });
      };
      pin.addEventListener("mouseenter", onEnter);
      pin.addEventListener("mouseleave", onLeave);
    }

    runtime.addCleanup(() => {
      if (plus) {
        pin.removeEventListener("mouseenter", onEnter!);
        pin.removeEventListener("mouseleave", onLeave!);
        gsap.killTweensOf(plus);
      }
      pulseTween?.kill();
      gsap.killTweensOf(pulses);
    });
  });
}

function initLogo(runtime: EraRuntime) {
  const logo = document.querySelector<HTMLElement>(".header-logo");
  if (!logo) return;

  const background = queryAll<HTMLElement>(".header-logo_bg", logo)
    .find((element) => getComputedStyle(element).display !== "none");
  if (!background) return;

  const speed = { value: 30 };
  let direction = 1;
  let rotation = 0;
  let interacted = false;
  let settleTimer: number | null = null;
  const markInteraction = () => {
    interacted = true;
  };
  const tick = (_time: number, deltaTime: number) => {
    rotation += speed.value * (Math.min(deltaTime, 100) / 1_000);
    gsap.set(background, {
      rotation,
      transformOrigin: "center center",
    });
  };
  const onScroll = ({ velocity }: { velocity: number }) => {
    if (!interacted) return;
    if (velocity !== 0) direction = velocity > 0 ? 1 : -1;
    gsap.to(speed, {
      value: direction * (30 + 10 * Math.abs(velocity)),
      duration: 0.3,
      ease: "Out",
      overwrite: true,
    });
    if (settleTimer !== null) window.clearTimeout(settleTimer);
    settleTimer = window.setTimeout(() => {
      gsap.to(speed, { value: 30 * direction, duration: DUR_L, ease: "Out" });
    }, 100);
  };
  const unsubscribe = runtime.lenis?.on("scroll", onScroll);

  window.addEventListener("wheel", markInteraction, { once: true });
  window.addEventListener("touchmove", markInteraction, { once: true });
  gsap.ticker.add(tick);

  runtime.addCleanup(() => {
    window.removeEventListener("wheel", markInteraction);
    window.removeEventListener("touchmove", markInteraction);
    gsap.ticker.remove(tick);
    unsubscribe?.();
    if (settleTimer !== null) window.clearTimeout(settleTimer);
    gsap.killTweensOf(speed);
    gsap.killTweensOf(background);
  });
}

function initScrollBar(runtime: EraRuntime) {
  addDesktopMatchMedia(runtime, () => {
    const rail = document.querySelector<HTMLElement>("[data-s-bar]");
    if (!rail) return;

    const thumb = rail.querySelector<HTMLElement>("[data-s-bar-thumb]");
    const label = rail.querySelector<HTMLElement>("[data-s-bar-label]");
    if (!thumb) return;

    const originalLabel = label?.textContent;
    const originalProgress = rail.style.getPropertyValue("--progress");
    const originalCursor = document.body.style.cursor;
    let dragging = false;
    let activePointerId: number | null = null;
    const trigger = ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const percent = Math.round(100 * self.progress);
        rail.style.setProperty("--progress", `${100 * self.progress}%`);
        if (label) label.textContent = String(percent).padStart(2, "0");
      },
    });
    const onEnter = () => {
      document.body.style.cursor = "grab";
    };
    const onLeave = () => {
      if (!dragging) document.body.style.cursor = "";
    };
    const onDown = (event: PointerEvent) => {
      dragging = true;
      activePointerId = event.pointerId;
      if (!thumb.hasPointerCapture(event.pointerId)) {
        thumb.setPointerCapture(event.pointerId);
      }
      document.body.style.cursor = "grabbing";
    };
    const onMove = (event: PointerEvent) => {
      if (!dragging) return;
      const rect = rail.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, (event.clientY - rect.top) / rect.height),
      );
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      runtime.lenis?.scrollTo(progress * distance, { duration: 3.2 });
    };
    const stopDragging = () => {
      dragging = false;
      activePointerId = null;
      document.body.style.cursor = "grab";
    };

    thumb.addEventListener("pointerenter", onEnter);
    thumb.addEventListener("pointerleave", onLeave);
    thumb.addEventListener("pointerdown", onDown);
    thumb.addEventListener("pointermove", onMove);
    thumb.addEventListener("pointerup", stopDragging);
    thumb.addEventListener("pointercancel", stopDragging);
    thumb.addEventListener("lostpointercapture", stopDragging);

    return () => {
      thumb.removeEventListener("pointerenter", onEnter);
      thumb.removeEventListener("pointerleave", onLeave);
      thumb.removeEventListener("pointerdown", onDown);
      thumb.removeEventListener("pointermove", onMove);
      thumb.removeEventListener("pointerup", stopDragging);
      thumb.removeEventListener("pointercancel", stopDragging);
      thumb.removeEventListener("lostpointercapture", stopDragging);
      if (activePointerId !== null && thumb.hasPointerCapture(activePointerId)) {
        thumb.releasePointerCapture(activePointerId);
      }
      dragging = false;
      activePointerId = null;
      document.body.style.cursor = originalCursor;
      trigger.kill();
      if (originalProgress) rail.style.setProperty("--progress", originalProgress);
      else rail.style.removeProperty("--progress");
      if (label && originalLabel != null) label.textContent = originalLabel;
    };
  });
}

function initTFTLjson(runtime: EraRuntime) {
  let cancelled = false;

  const initialize = async () => {
    const { default: lottie } = await import("lottie-web");
    if (cancelled || runtime.destroyed) return;

    queryAll<HTMLElement>(".credits").forEach((credits) => {
      const logo = credits.querySelector<HTMLElement>(".credits_logo");
      const path = logo?.getAttribute("data-json");
      if (!logo || !path) return;

      const animation = lottie.loadAnimation({
        container: logo,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path,
      });
      const maxFrame = 99;
      const timeline = gsap.timeline({ paused: true }).to(
        { frame: 0 },
        {
          frame: 1,
          duration: 1,
          ease: "none",
          onUpdate() {
            const target = this.targets()[0] as { frame: number };
            const frame = Math.round(target.frame * (maxFrame - 1));
            animation.goToAndStop(frame, true);
          },
        },
      );
      const onEnter = () => {
        gsap.to(timeline, { progress: 0.5, duration: 1 });
      };
      const onLeave = () => {
        gsap.to(timeline, { progress: 1, duration: 1 });
      };

      animation.goToAndStop(0, true);
      credits.addEventListener("mouseenter", onEnter);
      credits.addEventListener("mouseleave", onLeave);

      runtime.addCleanup(() => {
        credits.removeEventListener("mouseenter", onEnter);
        credits.removeEventListener("mouseleave", onLeave);
        gsap.killTweensOf(timeline);
        timeline.kill();
        animation.destroy();
      });
    });
  };

  runtime.addCleanup(() => {
    cancelled = true;
  });
  void initialize();
}

function initFloatingTips(runtime: EraRuntime) {
  addDesktopMatchMedia(runtime, () => {
    const tips = new Map(
      queryAll<HTMLElement>("[floating-tip]").map(
        (tip) => [tip.getAttribute("floating-tip"), tip],
      ),
    );
    const ownedActiveTips = new Set<HTMLElement>();
    const triggerCleanups: Array<() => void> = [];
    const positionTip = (tip: HTMLElement, x: number, y: number) => {
      const rect = tip.getBoundingClientRect();
      tip.classList.toggle("is-left", x + rect.width > window.innerWidth);
      tip.classList.toggle("is-top", y + rect.height > window.innerHeight);
    };
    const showTip = (tip: HTMLElement, x: number, y: number) => {
      gsap.set(tip, { x, y });
      positionTip(tip, x, y);
      tip.classList.add("is-active");
      ownedActiveTips.add(tip);
      runtime.activeTips.add(tip);
    };
    const hideTip = (tip: HTMLElement) => {
      tip.classList.remove("is-active", "is-left", "is-top");
      ownedActiveTips.delete(tip);
      runtime.activeTips.delete(tip);
    };
    const onMouseMove = (event: MouseEvent) => {
      ownedActiveTips.forEach((tip) => {
        positionTip(tip, event.clientX, event.clientY);
        gsap.to(tip, {
          x: event.clientX,
          y: event.clientY,
          duration: 2 * DUR_L,
          ease: "power3",
        });
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    queryAll<HTMLElement>("[floating-tip-trigger]").forEach((trigger) => {
      const tip = tips.get(trigger.getAttribute("floating-tip-trigger"));
      if (!tip) return;

      const onEnter = (event: MouseEvent) => {
        showTip(tip, event.clientX, event.clientY);
      };
      const onLeave = () => hideTip(tip);

      trigger.addEventListener("mouseenter", onEnter);
      trigger.addEventListener("mouseleave", onLeave);
      triggerCleanups.push(() => {
        trigger.removeEventListener("mouseenter", onEnter);
        trigger.removeEventListener("mouseleave", onLeave);
      });
      if (trigger.matches(":hover")) showTip(tip, 0, 0);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      triggerCleanups.forEach((cleanup) => cleanup());
      tips.forEach((tip) => {
        gsap.killTweensOf(tip);
        gsap.set(tip, { clearProps: "transform" });
        tip.classList.remove("is-active", "is-left", "is-top");
        runtime.activeTips.delete(tip);
      });
      ownedActiveTips.clear();
    };
  });
}

export function initInteractions(runtime: EraRuntime): void {
  initMagneticEffect(runtime);
  initNavItemHover(runtime);
  initLinkHover(runtime);
  initBtnCircleHover(runtime);
  initPins(runtime);
  initLogo(runtime);
  initScrollBar(runtime);
  initTFTLjson(runtime);
  initFloatingTips(runtime);
}
