import type Lenis from "lenis";
import type { ClosableCard, Cleanup } from "./types";

export class EraRuntime {
  lenis: Lenis | null = null;
  localLenis = new Set<Lenis>();
  cleanups = new Set<Cleanup>();
  activeAccordion: ClosableCard | null = null;
  activeTips = new Set<HTMLElement>();
  resizeTimer: number | null = null;
  destroyed = false;

  addCleanup(cleanup: Cleanup) {
    if (this.destroyed) {
      cleanup();
      return;
    }
    this.cleanups.add(cleanup);
  }

  addLocalLenis(instance: Lenis) {
    this.localLenis.add(instance);
    this.addCleanup(() => {
      this.localLenis.delete(instance);
      instance.destroy();
    });
  }

  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    for (const cleanup of [...this.cleanups].reverse()) cleanup();
    this.cleanups.clear();
    this.localLenis.clear();
    this.activeAccordion = null;
    this.activeTips.clear();
    this.lenis?.destroy();
    this.lenis = null;
  }
}
