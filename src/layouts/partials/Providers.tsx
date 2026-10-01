"use client";

import type { LenisOptions } from "lenis";
import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

const lenisOptions: LenisOptions = {
  anchors: true,
  autoRaf: true,
  duration: 1.1,
  respectReducedMotion: true,
  smoothWheel: true,
  stopInertiaOnNavigate: true,
  syncTouch: false,
  wheelMultiplier: 0.9,
};

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
};

export default Providers;
