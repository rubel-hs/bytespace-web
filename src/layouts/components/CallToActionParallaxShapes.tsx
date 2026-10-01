"use client";

import type { Call_to_action } from "@/types";
import Image from "next/image";
import { useEffect, useRef } from "react";

type Shape = Call_to_action["images"][number];

const MIN_TRAVEL = 24;
const MAX_TRAVEL = 90;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const CallToActionParallaxShapes = ({ shapes }: { shapes: Shape[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const areas = shapes.map(({ width, height }) => width * height);
  const smallestArea = Math.min(...areas);
  const largestArea = Math.max(...areas);
  const areaRange = largestArea - smallestArea;

  useEffect(() => {
    const container = containerRef.current;

    if (
      !container ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const shapeElements = Array.from(
      container.querySelectorAll<HTMLElement>("[data-parallax-distance]"),
    );
    let frameId: number | null = null;
    let currentProgress = 0;
    let targetProgress = 0;
    let isVisible = false;

    const render = () => {
      currentProgress += (targetProgress - currentProgress) * 0.18;

      if (Math.abs(targetProgress - currentProgress) < 0.001) {
        currentProgress = targetProgress;
      }

      shapeElements.forEach((shape) => {
        const distance = Number(shape.dataset.parallaxDistance);
        shape.style.transform = `translate3d(0, ${-currentProgress * distance}px, 0)`;
      });

      if (currentProgress === targetProgress) {
        frameId = null;
      } else {
        frameId = window.requestAnimationFrame(render);
      }
    };

    const requestUpdate = () => {
      const { height, top } = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionCenter = top + height / 2;
      const travelRange = Math.max((viewportHeight + height) / 2, 1);

      targetProgress = clamp(
        (viewportHeight / 2 - sectionCenter) / travelRange,
        -1,
        1,
      );

      if (isVisible && frameId === null) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;

      if (isVisible) {
        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", requestUpdate);
        requestUpdate();
      } else {
        window.removeEventListener("scroll", requestUpdate);
        window.removeEventListener("resize", requestUpdate);
      }
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div ref={containerRef} aria-hidden="true" className="absolute inset-0">
      <div className="absolute inset-0 hidden md:block">
        {shapes.map((shape) => {
          const sizeProgress =
            areaRange === 0
              ? 0
              : (shape.width * shape.height - smallestArea) / areaRange;
          const distance =
            MIN_TRAVEL + sizeProgress * (MAX_TRAVEL - MIN_TRAVEL);
          const verticalOrigin =
            shape.position.top !== undefined ? "top" : "bottom";
          const horizontalOrigin =
            shape.position.left !== undefined ? "left" : "right";

          return (
            <div
              key={shape.src}
              data-parallax-distance={distance}
              style={{
                ...shape.position,
                transformOrigin: `${verticalOrigin} ${horizontalOrigin}`,
              }}
              className={`pointer-events-none absolute select-none will-change-transform md:scale-50 lg:scale-[0.82] xl:scale-100 ${shape.className ?? ""}`}
            >
              <Image
                className="block h-auto w-full max-w-none"
                src={shape.src}
                width={shape.width}
                height={shape.height}
                sizes="400px"
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CallToActionParallaxShapes;
