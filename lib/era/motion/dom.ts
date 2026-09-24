import type { EraRuntime } from "./runtime";

export const BREAKPOINT = 992;
export const DUR_S = 0.4;
export const DUR_M = 0.8;
export const DUR_L = 1.2;
export const STAGGER = 0.1;
export const DELAY_REVEAL = 0.3;

export function queryAll<T extends Element = HTMLElement>(
  selector: string,
  scope: ParentNode = document,
): T[] {
  return Array.from(scope.querySelectorAll<T>(selector));
}

export function lockScroll(runtime: EraRuntime): void {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty(
    "--scrollbar-width",
    `${scrollbarWidth}px`,
  );
  document.body.style.paddingRight = "var(--scrollbar-width)";
  document.documentElement.style.overflow = "hidden";
  runtime.lenis?.stop();
}

export function unlockScroll(runtime: EraRuntime): void {
  document.documentElement.style.removeProperty("--scrollbar-width");
  document.body.style.paddingRight = "";
  document.documentElement.style.overflow = "";
  runtime.lenis?.start();
}

export function scrollToTop(runtime: EraRuntime): void {
  window.scrollTo(0, 0);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  runtime.lenis?.scrollTo(0, { immediate: true });
}
