"use client";

import { markdownify } from "@/lib/utils/textConverter";
import { useEffect, useState } from "react";

type Brand = {
  src: string;
  alt: string;
};

type TrustedBrandsData = {
  enable?: boolean;
  title: string;
  images: Brand[];
};

type AnimationPhase = "hidden" | "visible" | "exiting";

const MAX_VISIBLE_BRANDS = 7;
const STAGGER_MS = 150;
const TRANSITION_MS = 900;
const DISPLAY_MS = 3000;

const shuffleBrands = (brands: Brand[]) => {
  const shuffled = [...brands];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled.slice(0, MAX_VISIBLE_BRANDS);
};

const TrustedBrands = ({ data }: { data: TrustedBrandsData }) => {
  const [brands, setBrands] = useState(() =>
    data.images.slice(0, MAX_VISIBLE_BRANDS),
  );
  const [phase, setPhase] = useState<AnimationPhase>("hidden");

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      setPhase("visible");
      return;
    }

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const staggerDuration =
      Math.max(0, Math.min(data.images.length, MAX_VISIBLE_BRANDS) - 1) *
      STAGGER_MS;

    const schedule = (callback: () => void, delay: number) => {
      timeouts.push(setTimeout(callback, delay));
    };

    const runCycle = () => {
      setPhase("visible");

      schedule(
        () => {
          setPhase("exiting");

          schedule(() => {
            setPhase("hidden");
            setBrands(shuffleBrands(data.images));
            schedule(runCycle, 50);
          }, TRANSITION_MS + staggerDuration);
        },
        TRANSITION_MS + staggerDuration + DISPLAY_MS,
      );
    };

    schedule(runCycle, 50);

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [data.images]);

  if (!data.enable || data.images.length === 0) return null;

  return (
    <section className="section-sm bg-light pt-16 xl:pt-20">
      <div className="container">
        <div className="flex flex-wrap items-center justify-center gap-10 xl:gap-x-16">
          {brands.map((brand, index) => {
            const isVisible = phase === "visible";
            const transform = isVisible
              ? "translate(0, 0)"
              : phase === "exiting"
                ? "translate(0, 20px)"
                : "translate(0, -30px)";

            return (
              // The source SVGs carry their own intrinsic dimensions.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={brand.src}
                src={brand.src}
                alt={brand.alt}
                draggable={false}
                className="h-6 max-w-37.5 lg:h-8"
                style={{
                  filter: isVisible ? "blur(0)" : "blur(10px)",
                  opacity: isVisible ? 1 : 0,
                  transform,
                  transitionDuration: `${TRANSITION_MS}ms`,
                  transitionDelay: `${index * STAGGER_MS}ms`,
                  transitionProperty: "filter, opacity, transform",
                  transitionTimingFunction: "ease",
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
