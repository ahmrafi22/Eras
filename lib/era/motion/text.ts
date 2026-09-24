import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

import {
  BREAKPOINT,
  DELAY_REVEAL,
  DUR_L,
  DUR_S,
  STAGGER,
  queryAll,
} from "./dom";
import type { RevealAnimator, RevealKind, RevealState, SplitTarget } from "./types";

export const animateTextA: RevealAnimator = (target, state, delay) => {
  const elements = gsap.utils.toArray<SplitTarget>(target);
  if (!elements.length) return;

  elements.forEach((element, index) => {
    if (!element.textContent?.trim()) return;
    element._split ??= new SplitText(element, {
      type: "chars",
      tag: "span",
      charsClass: "split-char",
      smartWrap: true,
    });
    const split = element._split;
    const offset = index * STAGGER * 1;

    switch (state) {
      case "reveal":
        gsap.fromTo(
          split.chars,
          {
            opacity: 0,
            rotateX: 90,
            x: "10rem",
            transformOrigin: "center bottom",
          },
          {
            opacity: 1,
            rotateX: 0,
            x: "0rem",
            duration: DUR_L,
            delay: (delay ?? DELAY_REVEAL) + offset,
            stagger: STAGGER,
            ease: "Out",
            overwrite: true,
          },
        );
        break;
      case "hide":
        gsap.to(split.chars, {
          opacity: 0,
          rotateX: -90,
          x: "-10rem",
          transformOrigin: "center top",
          duration: DUR_S,
          delay: delay ?? 0,
          stagger: 0.5 * STAGGER,
          ease: "In",
          overwrite: true,
        });
        break;
      case "initial":
        gsap.set(split.chars, {
          opacity: 0,
          rotateX: -90,
          x: "-10rem",
          transformOrigin: "center top",
        });
    }
  });
};

export const animateTextH: RevealAnimator = (target, state, delay) => {
  const elements = gsap.utils.toArray<SplitTarget>(target);
  if (!elements.length) return;

  elements.forEach((element, index) => {
    if (!element.textContent?.trim()) return;
    element._split ??= new SplitText(element, {
      type: "words,chars",
      tag: "span",
      wordsClass: "split-word",
      charsClass: "split-char",
      smartWrap: true,
    });
    const split = element._split;
    const offset = index * STAGGER;

    switch (state) {
      case "reveal":
        gsap.fromTo(
          split.chars,
          { opacity: 0, yPercent: 50, rotateY: 90 },
          {
            opacity: 1,
            yPercent: 0,
            rotateY: 0,
            duration: DUR_L,
            delay: (delay ?? DELAY_REVEAL) + offset,
            stagger: 0.5 * STAGGER,
            ease: "Out",
            overwrite: true,
          },
        );
        break;
      case "hide":
        gsap.to(split.chars, {
          opacity: 0,
          yPercent: -50,
          rotateY: -90,
          duration: DUR_S,
          delay: delay ?? 0,
          stagger: 0.25 * STAGGER,
          ease: "In",
          overwrite: true,
        });
        break;
      case "initial":
        gsap.set(split.chars, { opacity: 0, yPercent: 50, rotateY: 90 });
    }
  });
};

export const animateTextP: RevealAnimator = (target, state, delay) => {
  const elements = gsap.utils.toArray<SplitTarget>(target);
  if (!elements.length) return;

  elements.forEach((element, index) => {
    if (!element.textContent?.trim()) return;
    if (!element._split) {
      element._split = new SplitText(element, {
        type: "lines,words",
        tag: "span",
        linesClass: "split-line",
        wordsClass: "split-word",
        mask: "lines",
      });
      element.querySelectorAll("br").forEach((lineBreak) => {
        if (lineBreak.nextSibling?.nodeName !== "BR") {
          lineBreak.after(document.createElement("br"));
        }
      });
    }
    const split = element._split;
    const offset = index * STAGGER;

    switch (state) {
      case "reveal":
        gsap.fromTo(
          split.lines,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: DUR_L,
            delay: (delay ?? DELAY_REVEAL) + offset,
            stagger: STAGGER,
            ease: "Out",
            overwrite: true,
          },
        );
        break;
      case "hide":
        gsap.to(split.lines, {
          yPercent: -110,
          duration: DUR_S,
          delay: delay ?? 0,
          stagger: 0.5 * STAGGER,
          ease: "In",
          overwrite: true,
        });
        break;
      case "initial":
        gsap.set(split.lines, { yPercent: 110 });
    }
  });
};

export const animateCtn: RevealAnimator = (target, state, delay) => {
  const elements = gsap.utils.toArray<Element>(target);
  if (!elements.length) return;
  const y = window.innerWidth >= BREAKPOINT ? "3.333rem" : "11.54rem";

  switch (state) {
    case "reveal":
      gsap.fromTo(
        elements,
        { opacity: 0, y },
        {
          opacity: 1,
          y: "0rem",
          duration: DUR_L,
          delay: delay ?? DELAY_REVEAL,
          stagger: STAGGER,
          ease: "Out",
          overwrite: true,
        },
      );
      break;
    case "hide":
      gsap.to(elements, {
        opacity: 0,
        y: "0rem",
        duration: DUR_S,
        delay: delay ?? 0,
        stagger: 0.5 * STAGGER,
        ease: "In",
        overwrite: true,
      });
      break;
    case "initial":
      gsap.set(elements, { opacity: 0, y });
  }
};

export const animateLine: RevealAnimator = (target, state, delay) => {
  const elements = gsap.utils.toArray<Element>(target);
  if (!elements.length) return;

  switch (state) {
    case "reveal":
      gsap.fromTo(
        elements,
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: DUR_L,
          delay: delay ?? DELAY_REVEAL,
          stagger: STAGGER,
          ease: "Out",
          overwrite: true,
        },
      );
      break;
    case "hide":
      gsap.to(elements, {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: DUR_S,
        delay: delay ?? 0,
        stagger: 0.5 * STAGGER,
        ease: "In",
        overwrite: true,
      });
      break;
    case "initial":
      gsap.set(elements, { clipPath: "inset(0% 0% 100% 0%)" });
  }
};

export const animateSlide: RevealAnimator = (target, state, delay) => {
  const elements = gsap.utils.toArray<Element>(target);
  if (!elements.length) return;
  const children = elements.map((element) => element.firstElementChild);

  switch (state) {
    case "reveal":
      gsap.fromTo(
        elements,
        { clipPath: "polygon(100% 0%, 100% 0%, 101% 100%, 125% 100%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: DUR_L,
          delay: delay ?? DELAY_REVEAL,
          ease: "InOut",
          overwrite: true,
        },
      );
      gsap.fromTo(
        children,
        { scale: 1.5, xPercent: 25 },
        {
          scale: 1,
          xPercent: 0,
          duration: DUR_L,
          delay: delay ?? DELAY_REVEAL,
          ease: "InOut",
          overwrite: true,
        },
      );
      break;
    case "hide":
      gsap.fromTo(
        elements,
        { clipPath: "polygon(0% 0%, 100% 0%, 125% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          duration: DUR_L,
          delay: delay ?? 0,
          ease: "InOut",
          overwrite: true,
        },
      );
      gsap.to(children, {
        scale: 1.5,
        xPercent: -25,
        duration: DUR_L,
        delay: delay ?? 0,
        ease: "InOut",
        overwrite: true,
      });
      break;
    case "initial":
      gsap.set(elements, { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(children, { scale: 1.5, xPercent: 25 });
  }
};

export function animateVisibleElements(
  scope: ParentNode = document,
  state: RevealState,
): void {
  const animators: Record<RevealKind, RevealAnimator> = {
    a: animateTextA,
    h: animateTextH,
    p: animateTextP,
    ctn: animateCtn,
    line: animateLine,
    slide: animateSlide,
  };

  (Object.keys(animators) as RevealKind[]).forEach((kind) => {
    const elements = queryAll<Element>(
      `[data-scroll-reveal="${kind}"], [data-part="${kind}"]`,
      scope,
    );
    if (!elements.length) return;
    elements.forEach((element) => {
      const bounds = element.getBoundingClientRect();
      if (bounds.top < window.innerHeight && bounds.bottom > 0) {
        animators[kind](element, state, 0);
      }
    });
  });
}
