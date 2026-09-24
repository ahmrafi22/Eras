"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BREAKPOINT, DUR_L, DUR_M, DUR_S } from "./dom";
import type { EraRuntime } from "./runtime";
import {
  animateCtn,
  animateTextH,
  animateTextP,
} from "./text";

type HorizontalArea = HTMLElement & {
  _horizontalTween?: gsap.core.Animation;
};

function trackAnimation<T extends gsap.core.Animation>(
  runtime: EraRuntime,
  animation: T,
): T {
  const trigger = animation.scrollTrigger;
  runtime.addCleanup(() => {
    trigger?.kill();
    animation.kill();
  });
  return animation;
}

function trackTrigger(runtime: EraRuntime, trigger: ScrollTrigger) {
  runtime.addCleanup(() => {
    trigger.kill();
  });
  return trigger;
}

function addMatchMedia(
  runtime: EraRuntime,
  query: string,
  setup: () => void,
) {
  const media = gsap.matchMedia();
  runtime.addCleanup(() => {
    media.revert();
  });
  if (runtime.destroyed) {
    media.kill();
    return;
  }
  media.add(query, setup);
}

export function initScenes(runtime: EraRuntime): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (runtime.destroyed) return;

  document.documentElement.style.setProperty(
    "--_100svh",
    `${window.innerHeight}px`,
  );

  const heroScrollArea = document.querySelector<HTMLElement>(
    ".hero-scroll-area",
  );
  if (heroScrollArea) {
    const heroContent = heroScrollArea.querySelector<HTMLElement>(".hero-s");
    const heroBackground = heroScrollArea.querySelector<HTMLElement>(
      ".hero-w_bg",
    );
    const heroImage = heroBackground?.querySelector<HTMLImageElement>(".img");
    if (heroContent && heroBackground && heroImage) {
      const isMobile = window.innerWidth < BREAKPOINT;
      let cancelled = false;
      const createHeroTimeline = () => {
        if (cancelled || runtime.destroyed) return;
        const height = heroBackground.offsetHeight;
        const timeline = trackAnimation(
          runtime,
          gsap.timeline({
            scrollTrigger: {
              trigger: heroScrollArea,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          }),
        );
        if (!isMobile) {
          timeline
            .fromTo(
              heroContent,
              { y: 0 },
              {
                y: -(1.25 * height - window.innerHeight),
                ease: "Ease",
                duration: 0.6,
              },
            )
            .fromTo(
              heroBackground,
              { y: 0 },
              {
                y: -(height - window.innerHeight),
                ease: "Ease",
                duration: 0.6,
              },
              "<",
            );
        }
        timeline.fromTo(
          heroBackground,
          { scale: 1, translateZ: 10, transformOrigin: "50% 75%" },
          {
            scale: 2,
            translateZ: 10,
            ease: "In",
            duration: 0.6,
          },
          isMobile ? ">" : "-=0.2",
        );
      };
      if (heroImage.complete) {
        createHeroTimeline();
      } else {
        heroImage.addEventListener("load", createHeroTimeline, { once: true });
        runtime.addCleanup(() => {
          cancelled = true;
          heroImage.removeEventListener("load", createHeroTimeline);
        });
      }
    }
  }

  const benefitsIntro = document.querySelector<HTMLElement>(
    ".benefits-intro-w",
  );
  if (benefitsIntro) {
    const circleText = benefitsIntro.querySelectorAll<Element>(
      "[data-circle-text]",
    );
    if (circleText.length) {
      const timeline = trackAnimation(
        runtime,
        gsap.timeline({
          scrollTrigger: {
            trigger: benefitsIntro,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }),
      );
      timeline.fromTo(
        circleText,
        { wordSpacing: "0rem" },
        { wordSpacing: "10rem", ease: "none" },
      );
    }
  }

  const concept = document.querySelector<HTMLElement>(".loc-info-w");
  if (concept) {
    const conceptImage = concept.querySelector<HTMLElement>(".loc-info-s");
    const paragraphs = concept.querySelectorAll<Element>('[data-part="p"]');
    const containers = concept.querySelectorAll<Element>('[data-part="ctn"]');
    animateTextP(paragraphs, "initial");
    animateCtn(containers, "initial");
    const timeline = trackAnimation(
      runtime,
      gsap.timeline({
        scrollTrigger: {
          trigger: concept,
          start: "top 30%",
          end: "bottom bottom",
          scrub: 0.5,
          onEnter: () => {
            animateTextP(paragraphs, "reveal", 0.1);
            animateCtn(containers, "reveal", 0.1);
          },
          onLeaveBack: () => {
            animateTextP(paragraphs, "hide", 0);
            animateCtn(containers, "hide", 0);
          },
        },
      }),
    );
    if (conceptImage) {
      timeline.fromTo(
        conceptImage,
        { opacity: 0, scale: 0.75 },
        { opacity: 1, scale: 1, ease: "none" },
        0,
      );
    }
  }

  const locationScrollArea = document.querySelector<HTMLElement>(
    ".loc-scroll-area",
  );
  if (locationScrollArea) {
    addMatchMedia(runtime, `(min-width: ${BREAKPOINT}px)`, () => {
      const track = locationScrollArea.querySelector<HTMLElement>(
        ".loc-scroll-area_track",
      );
      if (!track) return;
      const horizontalArea = locationScrollArea as HorizontalArea;
      const distance = track.scrollWidth - locationScrollArea.offsetWidth;
      const previousHeight = locationScrollArea.style.height;
      const hadHorizontalTween = Object.prototype.hasOwnProperty.call(
        locationScrollArea,
        "_horizontalTween",
      );
      const previousHorizontalTween = horizontalArea._horizontalTween;
      locationScrollArea.style.height = `${track.scrollWidth}px`;
      ScrollTrigger.refresh();
      runtime.addCleanup(() => {
        locationScrollArea.style.height = previousHeight;
        if (hadHorizontalTween) {
          horizontalArea._horizontalTween = previousHorizontalTween;
        } else {
          delete horizontalArea._horizontalTween;
        }
      });
      const horizontalTween = trackAnimation(
        runtime,
        gsap.to(track, {
          x: -distance,
          ease: "horScroll",
          scrollTrigger: {
            trigger: locationScrollArea,
            start: "2.5% top",
            end: "97.5% bottom",
            scrub: 0.25,
          },
        }),
      );
      horizontalArea._horizontalTween = horizontalTween;

      const titleLines = locationScrollArea.querySelectorAll<HTMLElement>(
        ".loc-intro-s_title_line",
      );
      if (titleLines.length) {
        trackAnimation(
          runtime,
          gsap.fromTo(
            titleLines,
            { xPercent: gsap.utils.wrap([-5, 25, -15]) },
            {
              xPercent: gsap.utils.wrap([5, -25, 25]),
              ease: "none",
              scrollTrigger: {
                trigger: locationScrollArea,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.25,
              },
            },
          ),
        );
      }

      const introFlower = locationScrollArea.querySelector<HTMLElement>(
        ".flower.loc-intro",
      );
      if (introFlower) {
        trackAnimation(
          runtime,
          gsap.fromTo(
            introFlower,
            { xPercent: 0 },
            {
              xPercent: -25,
              ease: "none",
              scrollTrigger: {
                trigger: locationScrollArea,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.25,
              },
            },
          ),
        );
      }

      const pathFlower = locationScrollArea.querySelector<HTMLElement>(
        ".flower.loc-path",
      );
      if (pathFlower) {
        trackAnimation(
          runtime,
          gsap.fromTo(
            pathFlower,
            { yPercent: 0 },
            {
              yPercent: 25,
              ease: "none",
              scrollTrigger: {
                trigger: locationScrollArea,
                start: "bottom bottom",
                end: "bottom top",
                scrub: 0.25,
              },
            },
          ),
        );
      }
    });
  }

  const coastline = document.querySelector<HTMLImageElement>(".img.loc-path");
  if (coastline) {
    const horizontalArea = coastline.closest<HTMLElement>(
      "[data-scroll-horizontal]",
    ) as HorizontalArea | null;
    trackAnimation(
      runtime,
      gsap.fromTo(
        coastline,
        { clipPath: "inset(0% 100% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 2 * DUR_L,
          ease: "Out",
          delay: DUR_M,
          scrollTrigger: {
            trigger: coastline,
            containerAnimation: horizontalArea?._horizontalTween,
            start: horizontalArea ? "left bottom" : "top bottom",
            once: true,
          },
        },
      ),
    );
  }

  const location = document.querySelector<HTMLElement>(".loc-w");
  if (location) {
    const background = location.querySelector<HTMLElement>(
      ".loc-w_bg_img",
    );
    if (background) {
      trackAnimation(
        runtime,
        gsap.from(background, {
          scale: 1.15,
          transformOrigin: "center bottom",
          ease: "Ease",
          scrollTrigger: {
            trigger: location,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.25,
          },
        }),
      );
    }
  }

  const amenitiesScrollArea = document.querySelector<HTMLElement>(
    ".amen-scroll-area",
  );
  if (amenitiesScrollArea) {
    const amenities = amenitiesScrollArea.querySelector<HTMLElement>(
      ".amen-w",
    );
    const content = amenitiesScrollArea.querySelector<HTMLElement>(
      ".amen-cms",
    );
    if (amenities && content) {
      const timeline = trackAnimation(
        runtime,
        gsap.timeline({
          scrollTrigger: {
            trigger: amenitiesScrollArea,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }),
      );
      timeline
        .fromTo(content, { scale: 1 }, { scale: 2, ease: "In" })
        .fromTo(amenities, { opacity: 1 }, { opacity: 0, ease: "In" }, "<");
    }
  }

  const architectureScrollArea = document.querySelector<HTMLElement>(
    ".arch-scroll-area",
  );
  if (architectureScrollArea) {
    addMatchMedia(runtime, `(min-width: ${BREAKPOINT}px)`, () => {
      const intro = architectureScrollArea.querySelector<HTMLElement>(
        ".arch-intro-s",
      );
      const panel = architectureScrollArea.querySelector<HTMLElement>(
        ".arch-w",
      );
      if (!intro || !panel) return;
      const leftMask = intro.querySelector<HTMLElement>(
        ".arch-intro-s_bg_l",
      );
      const rightMask = intro.querySelector<HTMLElement>(
        ".arch-intro-s_bg_r",
      );
      const leftFlower = intro.querySelector<HTMLElement>(
        ".flower.arch-intro-l",
      );
      const rightFlower = intro.querySelector<HTMLElement>(
        ".flower.arch-intro-r",
      );
      const image = panel.querySelector<HTMLElement>(".img");
      panel.querySelector(".arch-s_t");
      const heading = panel.querySelector<HTMLElement>('[data-text="h"]');
      const description = panel.querySelector<HTMLElement>('[data-text="p"]');

      const timeline = trackAnimation(
        runtime,
        gsap.timeline({
          scrollTrigger: {
            trigger: intro,
            start: "top bottom",
            end: "200% top",
            scrub: true,
          },
        }),
      );
      if (leftMask) {
        timeline.fromTo(
          leftMask,
          {
            clipPath:
              "polygon(0% 0%, 0% 100%, 44.444% 100%, 44.444% 36.111%, 98.889% 36.111%, 98.889% 99.074%, 44.444% 99.074%, 1.111% 100%, 100% 100%, 100% 0%)",
          },
          {
            clipPath:
              "polygon(0% 0%, 0% 100%, 44.444% 100%, 44.444% 18.519%, 98.889% 18.519%, 98.889% 81.481%, 44.444% 81.481%, 1.111% 100%, 100% 100%, 100% 0%)",
            ease: "none",
            duration: 0.5,
          },
        );
      }
      if (rightMask) {
        timeline.fromTo(
          rightMask,
          {
            clipPath:
              "polygon(0% 0%, 0% 100%, 1.111% 100%, 1.111% 0.926%, 55.556% 0.926%, 55.556% 63.889%, 1.111% 63.889%, 1.111% 100%, 100% 100%, 100% 0%)",
          },
          {
            clipPath:
              "polygon(0% 0%, 0% 100%, 1.111% 100%, 1.111% 18.519%, 55.556% 18.519%, 55.556% 81.481%, 1.111% 81.481%, 1.111% 100%, 100% 100%, 100% 0%)",
            ease: "none",
            duration: 0.5,
          },
          "<",
        );
      }
      if (leftMask) {
        timeline.to(
          leftMask,
          {
            clipPath:
              "polygon(0% 0%, 0% 100%, 44.444% 100%, 44.444% 18.519%, 100% 18.519%, 100% 81.481%, 44.444% 81.481%, 1.111% 100%, 100% 100%, 100% 0%)",
            ease: "none",
            duration: 0.1,
          },
        );
      }
      if (rightMask) {
        timeline.to(
          rightMask,
          {
            clipPath:
              "polygon(0% 0%, 0% 100%, 0% 100%, 0% 18.519%, 55.556% 18.519%, 55.556% 81.481%, 0% 81.481%, 0% 100%, 100% 100%, 100% 0%)",
            ease: "none",
            duration: 0.1,
          },
          "<",
        );
      }
      timeline.fromTo(
        intro,
        { scale: 1 },
        { scale: 1.84, ease: "InOut", duration: 0.4 },
      );
      if (leftFlower) {
        timeline.to(
          leftFlower,
          { scale: 1.84, xPercent: -50, ease: "InOut", duration: 0.4 },
          "<",
        );
      }
      if (rightFlower) {
        timeline.to(
          rightFlower,
          { scale: 1.84, xPercent: 50, ease: "InOut", duration: 0.4 },
          "<",
        );
      }
      timeline.fromTo(
        panel,
        { scale: 0.75, transformOrigin: "center top" },
        { scale: 1, ease: "InOut", duration: 0.4 },
        "<",
      );

      animateTextH(heading, "initial");
      animateTextP(description, "initial");
      trackTrigger(
        runtime,
        ScrollTrigger.create({
          trigger: architectureScrollArea,
          start: "30% top",
          onEnter: () => {
            animateTextH(heading, "reveal", 0);
            animateTextP(description, "reveal", DUR_S);
          },
          onLeaveBack: () => {
            animateTextH(heading, "hide", 0);
            animateTextP(description, "hide", 0);
          },
        }),
      );
      if (image) {
        trackAnimation(
          runtime,
          gsap.to(image, {
            yPercent: 25,
            ease: "none",
            scrollTrigger: {
              trigger: architectureScrollArea,
              start: "55% top",
              end: "bottom top",
              scrub: true,
            },
          }),
        );
      }
    });
  }

  const footer = document.querySelector<HTMLElement>(".footer-w");
  if (footer) {
    const clip = document.querySelector<HTMLElement>("[data-footer-clip]");
    const footerContent = footer.querySelector<HTMLElement>(".footer-s");
    const headings = footer.querySelectorAll<Element>('[data-text="h"]');
    const paragraphs = footer.querySelectorAll<Element>('[data-text="p"]');
    const containers = footer.querySelectorAll<Element>('[data-text="ctn"]');
    const finalClipPath =
      window.innerWidth >= BREAKPOINT
        ? "inset(8% 22% 8% 22%)"
        : "inset(4% 32% 4% 32%)";
    animateTextH(headings, "initial");
    animateTextP(paragraphs, "initial");
    animateCtn(containers, "initial");
    const timeline = trackAnimation(
      runtime,
      gsap.timeline({
        scrollTrigger: {
          trigger: footer,
          start: "top 30%",
          end: "bottom bottom",
          scrub: 0.5,
          onEnter: () => {
            animateTextH(headings, "reveal", 0.1);
            animateTextP(paragraphs, "reveal", 0.1);
            animateCtn(containers, "reveal", 0.1);
          },
          onLeaveBack: () => {
            animateTextH(headings, "hide", 0);
            animateTextP(paragraphs, "hide", 0);
            animateCtn(containers, "hide", 0);
          },
        },
      }),
    );
    if (clip) {
      timeline.fromTo(
        clip,
        { clipPath: "inset(0% 0% 0% 0%)" },
        { clipPath: finalClipPath, ease: "none" },
        0,
      );
    }
    if (footerContent) {
      timeline.fromTo(
        footerContent,
        { opacity: 0, scale: 0.75 },
        { opacity: 1, scale: 1, ease: "none" },
        0,
      );
    }
    const down = document.querySelector<HTMLElement>(".s-down");
    if (down) {
      trackAnimation(
        runtime,
        gsap.to(down, {
          opacity: 0,
          ease: "InOut",
          scrollTrigger: {
            trigger: footer,
            start: "top bottom",
            end: "center bottom",
            scrub: true,
          },
        }),
      );
    }
  }

  const lot = document.querySelector<HTMLElement>(".lot-w");
  if (lot) {
    const header = lot.querySelector<HTMLElement>(".lot-s_info_header");
    const line = lot.querySelector<HTMLElement>(".lot-s_info_line");
    if (header && line) {
      trackTrigger(
        runtime,
        ScrollTrigger.create({
          trigger: lot,
          start: "100px top",
          onEnter: () => {
            header.classList.remove("is-top");
            line.classList.remove("is-top");
          },
          onLeaveBack: () => {
            header.classList.add("is-top");
            line.classList.add("is-top");
          },
        }),
      );
    }
  }
}
