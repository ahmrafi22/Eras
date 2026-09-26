"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { initControls } from "./controls";
import { initInteractions } from "./interactions";
import { initPreloader } from "./preloader";
import { EraRuntime } from "./runtime";
import { initScenes } from "./scenes";
import { initCore } from "./setup";

export function useEraMotion(): void {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);

    const runtime = new EraRuntime();
    const previousScrollRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";

    const initializeExperience = () => {
      if (runtime.destroyed) return;
      // Scenes first: they publish the horizontal-scroll tweens that
      // initScrollElementsReveal attaches its triggers to.
      initScenes(runtime);
      initCore(runtime);
      initInteractions(runtime);
      initControls(runtime);
      ScrollTrigger.refresh(true);
    };

    // Triggers are positioned against whatever the layout happens to be when
    // they are created. Late-arriving fonts, images, videos and the accordion
    // all change section offsets afterwards, which leaves every trigger below
    // the change pointing at the wrong scroll range. Re-measure whenever the
    // document height actually moves.
    let settleTimer: number | null = null;
    let lastHeight = document.documentElement.scrollHeight;
    const refreshSoon = () => {
      if (runtime.destroyed) return;
      if (settleTimer !== null) window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        settleTimer = null;
        if (runtime.destroyed) return;
        lastHeight = document.documentElement.scrollHeight;
        ScrollTrigger.refresh();
      }, 120);
    };
    runtime.addCleanup(() => {
      if (settleTimer !== null) {
        window.clearTimeout(settleTimer);
        settleTimer = null;
      }
    });

    window.addEventListener("load", refreshSoon);
    runtime.addCleanup(() => window.removeEventListener("load", refreshSoon));

    document.fonts?.ready.then(() => {
      if (!runtime.destroyed) refreshSoon();
    });

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => {
        if (document.documentElement.scrollHeight === lastHeight) return;
        refreshSoon();
      });
      observer.observe(document.documentElement);
      runtime.addCleanup(() => {
        observer?.disconnect();
        observer = null;
      });
    }

    const onResize = () => {
      if (runtime.resizeTimer !== null) window.clearTimeout(runtime.resizeTimer);
      runtime.resizeTimer = window.setTimeout(() => {
        runtime.resizeTimer = null;
        document.documentElement.style.setProperty(
          "--_100svh",
          `${window.innerHeight}px`,
        );
        ScrollTrigger.refresh(true);
      }, 40);
    };

    window.addEventListener("resize", onResize);
    runtime.addCleanup(() => {
      window.removeEventListener("resize", onResize);
      if (runtime.resizeTimer !== null) {
        window.clearTimeout(runtime.resizeTimer);
        runtime.resizeTimer = null;
      }
    });

    initPreloader(runtime, initializeExperience);

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      runtime.destroy();
      history.scrollRestoration = previousScrollRestoration;
    };
  }, []);
}
