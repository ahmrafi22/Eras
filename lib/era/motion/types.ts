import type Lenis from "lenis";
import type { SplitText } from "gsap/SplitText";

export type RevealKind = "a" | "h" | "p" | "ctn" | "line" | "slide";
export type RevealState = "reveal" | "hide" | "initial";

export type SplitTarget = HTMLElement & {
  _split?: SplitText;
};

export type ClosableCard = {
  close: () => void;
};

export type Cleanup = () => void;

export type RevealAnimator = (
  target: Element | Element[] | NodeListOf<Element> | null,
  state: RevealState,
  delay?: number,
) => void;
