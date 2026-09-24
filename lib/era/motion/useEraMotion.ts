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
      initCore(runtime);
      initInteractions(runtime);
      initControls(runtime);
      initScenes(runtime);
      ScrollTrigger.refresh(true);
    };

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
