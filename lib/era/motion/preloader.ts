import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

import {
  BREAKPOINT,
  DELAY_REVEAL,
  DUR_L,
  DUR_M,
  DUR_S,
  lockScroll,
  queryAll,
  scrollToTop,
  unlockScroll,
} from "./dom";
import type { EraRuntime } from "./runtime";
import {
  animateCtn,
  animateLine,
  animateTextA,
  animateTextH,
  animateTextP,
} from "./text";

const PRELOADER_SESSION_KEY = "era-preloader-visited-v1";
let preloaderVisit: string | null | undefined;

function readPreloaderVisit(): string | null {
  if (preloaderVisit !== undefined) return preloaderVisit;
  try {
    preloaderVisit = sessionStorage.getItem(PRELOADER_SESSION_KEY);
  } catch {
    preloaderVisit = null;
  }
  return preloaderVisit;
}

function writePreloaderVisit(): void {
  try {
    sessionStorage.setItem(PRELOADER_SESSION_KEY, "true");
  } catch {
    return;
  }
}

function writeCookie(value: string): void {
  try {
    localStorage.setItem("cookies", value);
  } catch {
    return;
  }
}

function removeMasterPreloader(): void {
  document.querySelector("[data-master-preloader]")?.remove();
}

function registerCustomEases(): void {
  gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);
  CustomEase.create("InOut", "0.75,0,0.25,1");
  CustomEase.create("Out", "0.25,1,0.5,1");
  CustomEase.create("In", "0.5,0,0.75,0");
  CustomEase.create("Ease", "0.25,0.1,0.25,1");
  CustomEase.create("Write", "0.333,0,0.667,1");
  CustomEase.create("diveIn", "0.6,0,0,1");
  CustomEase.create("horScroll", "0.25,0,0.75,1");
  CustomEase.create(
    "loaderEase",
    "M0,0,C0,0,0.13,0.34,0.238,0.442,0.305,0.506,0.322,0.514,0.396,0.54,0.478,0.568,0.468,0.56,0.522,0.584,0.572,0.606,0.61,0.719,0.714,0.826,0.798,0.912,1,1,1,1",
  );
}

function addTimelineCleanup(
  runtime: EraRuntime,
  timeline: gsap.core.Timeline,
  scrollTimer: number,
): void {
  runtime.addCleanup(() => {
    window.clearTimeout(scrollTimer);
    timeline.kill();
    unlockScroll(runtime);
  });
}

function animatePreloaderIntro(
  runtime: EraRuntime,
  onReady: () => void,
): void {
  const preloader = document.querySelector<HTMLElement>("[data-preloader]");
  if (!preloader) {
    onReady();
    removeMasterPreloader();
    return;
  }

  const a = queryAll<HTMLElement>('[data-part="a"]', preloader);
  const h = queryAll<HTMLElement>('[data-part="h"]', preloader);
  const p = queryAll<HTMLElement>('[data-part="p"]', preloader);
  const ctn = queryAll<HTMLElement>('[data-part="ctn"]', preloader);
  const line = queryAll<HTMLElement>('[data-part="line"]', preloader);
  const backgroundA = preloader.querySelector<HTMLElement>(
    ".preloader_bg_a",
  );
  const backgroundDecor = preloader.querySelector<HTMLElement>(
    ".preloader_bg_decor",
  );
  const progressTracks = queryAll<HTMLElement>(
    ".preloader_progress_track",
    preloader,
  );
  const hero = document.querySelector<HTMLElement>(".hero-w_bg_master_img");
  const initialWidth =
    window.innerWidth >= BREAKPOINT ? "24vw" : "40vw";
  const middleWidth =
    window.innerWidth >= BREAKPOINT ? "36vw" : "50vw";
  const heroScale = window.innerWidth >= BREAKPOINT ? 0.75 : 1.15;
  const scrollTimer = window.setTimeout(() => scrollToTop(runtime), 100);

  lockScroll(runtime);
  if (hero) {
    gsap.set(hero, { scale: heroScale, transformOrigin: "center top" });
  }

  const timeline = gsap
    .timeline()
    .set(preloader, { "--arch-w": initialWidth, "--arch-y": "104vh" })
    .add(() => {
      animateTextA(a, "reveal");
      animateTextH(h, "reveal");
      animateTextP(p, "reveal");
      animateCtn(ctn, "reveal", DUR_S);
      animateLine(line, "reveal");
    })
    .to({}, { duration: DUR_L })
    .fromTo(
      backgroundA,
      { opacity: 0 },
      { opacity: 0.05, duration: DUR_L, ease: "Out" },
    )
    .fromTo(
      backgroundDecor,
      { opacity: 0 },
      { opacity: 1, duration: DUR_L, ease: "Out" },
      "<",
    )
    .fromTo(
      progressTracks,
      { yPercent: -100 },
      { yPercent: 0, duration: 4, ease: "loaderEase" },
    )
    .fromTo(
      preloader,
      { "--arch-w": initialWidth, "--arch-y": "104vh" },
      {
        "--arch-w": middleWidth,
        "--arch-y": "15vh",
        duration: 1.25 * DUR_L,
        ease: "InOut",
      },
    )
    .to(
      preloader,
      {
        "--arch-w": "125",
        "--arch-y": "-100vh",
        duration: 2 * DUR_L,
        ease: "diveIn",
      },
      "<90%",
    )
    .add(() => {
      if (hero) {
        gsap.fromTo(
          hero,
          { scale: heroScale },
          { scale: 1, duration: 1.25 * DUR_L, ease: "InOut" },
        );
      }
    }, "<")
    .add(onReady, "<25%")
    .add(() => {
      unlockScroll(runtime);
      gsap.set(preloader, { display: "none" });
    });

  addTimelineCleanup(runtime, timeline, scrollTimer);
  removeMasterPreloader();
}

function animatePreloaderShort(
  runtime: EraRuntime,
  onReady: () => void,
): void {
  const preloader = document.querySelector<HTMLElement>("[data-preloader]");
  if (!preloader) {
    onReady();
    removeMasterPreloader();
    return;
  }

  const content = preloader.querySelector<HTMLElement>(".preloader_ctn");
  const backgroundA = preloader.querySelector<HTMLElement>(
    ".preloader_bg_a",
  );
  const backgroundDecor = preloader.querySelector<HTMLElement>(
    ".preloader_bg_decor",
  );
  const hero = document.querySelector<HTMLElement>(".hero-w_bg_master_img");
  const initialWidth =
    window.innerWidth >= BREAKPOINT ? "24vw" : "40vw";
  const middleWidth =
    window.innerWidth >= BREAKPOINT ? "36vw" : "50vw";
  const heroScale = window.innerWidth >= BREAKPOINT ? 0.75 : 1.15;
  const scrollTimer = window.setTimeout(() => scrollToTop(runtime), 100);

  lockScroll(runtime);
  if (hero) {
    gsap.set(hero, { scale: heroScale, transformOrigin: "center top" });
  }

  const timeline = gsap
    .timeline()
    .set(preloader, { "--arch-w": initialWidth, "--arch-y": "104vh" })
    .set(content, { display: "none" })
    .fromTo(
      backgroundA,
      { opacity: 0 },
      { opacity: 0.05, duration: DUR_L, ease: "Out" },
    )
    .fromTo(
      backgroundDecor,
      { opacity: 0 },
      { opacity: 1, duration: DUR_L, ease: "Out" },
      "<",
    )
    .fromTo(
      preloader,
      { "--arch-w": initialWidth, "--arch-y": "104vh" },
      {
        "--arch-w": middleWidth,
        "--arch-y": "15vh",
        duration: 1.25 * DUR_L,
        ease: "InOut",
      },
      "<",
    )
    .to(
      preloader,
      {
        "--arch-w": "125",
        "--arch-y": "-100vh",
        duration: 2 * DUR_L,
        ease: "diveIn",
      },
      "<90%",
    )
    .add(() => {
      if (hero) {
        gsap.fromTo(
          hero,
          { scale: heroScale },
          { scale: 1, duration: 1.25 * DUR_L, ease: "InOut" },
        );
      }
    }, "<")
    .add(onReady, "<25%")
    .add(() => {
      unlockScroll(runtime);
      gsap.set(preloader, { display: "none" });
    });

  addTimelineCleanup(runtime, timeline, scrollTimer);
  removeMasterPreloader();
}

export function initLenis(runtime: EraRuntime): void {
  if (runtime.lenis) return;

  const lenis = new Lenis({
    wrapper: window,
    duration: 1.2,
    smoothWheel: true,
    touchMultiplier: 2,
    easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
    infinite: false,
  });
  const unsubscribe = lenis.on("scroll", ScrollTrigger.update);
  const tick = (time: number) => lenis.raf(1000 * time);

  runtime.lenis = lenis;
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  runtime.addCleanup(() => {
    gsap.ticker.remove(tick);
    unsubscribe();
    if (runtime.lenis === lenis) runtime.lenis = null;
    lenis.destroy();
  });
}

export function initCookies(runtime: EraRuntime): void {
  const panel = document.querySelector<HTMLElement>("[data-cookies]");
  if (!panel) return;

  let storedChoice: string | null = null;
  try {
    storedChoice = localStorage.getItem("cookies");
  } catch {
    storedChoice = null;
  }

  if (storedChoice) {
    panel.remove();
    return;
  }

  const close = (value: "accepted" | "declined") => {
    writeCookie(value);
    gsap.to(panel, {
      yPercent: 100,
      duration: DUR_M,
      ease: "In",
      onComplete: () => panel.remove(),
    });
  };
  const accept = document.querySelector<HTMLElement>(
    '[data-cookies="accept"]',
  );
  const decline = document.querySelector<HTMLElement>(
    '[data-cookies="decline"]',
  );
  const onAccept = () => close("accepted");
  const onDecline = () => close("declined");

  gsap.fromTo(
    panel,
    { yPercent: 100 },
    {
      yPercent: 0,
      duration: DUR_M,
      delay: DELAY_REVEAL,
      ease: "Out",
    },
  );
  accept?.addEventListener("click", onAccept);
  decline?.addEventListener("click", onDecline);
  runtime.addCleanup(() => {
    accept?.removeEventListener("click", onAccept);
    decline?.removeEventListener("click", onDecline);
    gsap.killTweensOf(panel);
  });
}

export function initPreloader(
  runtime: EraRuntime,
  onReady: () => void = () => {},
): void {
  registerCustomEases();
  const hasVisited = readPreloaderVisit();

  initLenis(runtime);
  initCookies(runtime);
  if (hasVisited) {
    animatePreloaderShort(runtime, onReady);
  } else {
    animatePreloaderIntro(runtime, onReady);
  }
  writePreloaderVisit();
}
