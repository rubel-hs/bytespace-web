"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);

const HeroParallaxShapes = () => {
  const shapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shapes = shapesRef.current;

    if (
      !shapes ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frameId: number | null = null;
    let isVisible = false;

    const updateTransforms = () => {
      frameId = null;

      const { height, top } = shapes.getBoundingClientRect();
      const progress = clamp(-top / Math.max(height, 1));
      const sideScale = 1 + progress * 0.025;

      shapes.style.setProperty("--hero-left-x", `${progress * -64}px`);
      shapes.style.setProperty("--hero-right-x", `${progress * 64}px`);
      shapes.style.setProperty("--hero-side-y", `${progress * -64}px`);
      shapes.style.setProperty("--hero-side-scale", sideScale.toString());
      shapes.style.setProperty(
        "--hero-center-scale",
        (1 + progress * 0.2).toString(),
      );
    };

    const requestUpdate = () => {
      if (isVisible && frameId === null) {
        frameId = window.requestAnimationFrame(updateTransforms);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      shapes.dataset.parallaxActive = String(isVisible);

      if (isVisible) {
        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", requestUpdate);
        requestUpdate();
      } else {
        window.removeEventListener("scroll", requestUpdate);
        window.removeEventListener("resize", requestUpdate);
      }
    });

    observer.observe(shapes);

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
    <div
      ref={shapesRef}
      className="absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <Image
        src="/images/shape/shape_spring_teal.svg"
        alt=""
        width={267}
        height={387}
        loading="eager"
        className="shape-reveal shape-reveal--1 hero-parallax-side hero-parallax-side--left absolute left-[-4rem] top-[36%] hidden w-56 md:block lg:left-[-7vw] lg:top-[20.5%] lg:w-[clamp(310px,27vw,460px)]"
        sizes="(min-width: 1024px) 27vw, 224px"
      />
      <Image
        src="/images/shape/shape_teal_large.svg"
        alt=""
        width={213}
        height={372}
        className="shape-reveal shape-reveal--2 hero-parallax-side hero-parallax-side--right absolute right-[-5rem] top-[36%] hidden w-48 md:block lg:right-[-6vw] lg:top-[19.5%] lg:w-[clamp(224px,20vw,340px)]"
        sizes="(min-width: 1024px) 20vw, 192px"
      />
      <Image
        src="/images/shape/shape_spring_white_sm.svg"
        alt=""
        width={176}
        height={176}
        className="shape-reveal shape-reveal--3 hero-parallax-side hero-parallax-side--left absolute left-[15%] top-[54%] hidden w-24 md:block lg:top-[39%] lg:w-[clamp(128px,12vw,220px)]"
        sizes="(min-width: 1024px) 12vw, 96px"
      />
      <Image
        src="/images/shape/shape_cone.svg"
        alt=""
        width={190}
        height={189}
        className="shape-reveal shape-reveal--4 hero-parallax-side hero-parallax-side--right absolute right-[9%] top-[54%] hidden w-28 md:block lg:right-[12%] lg:top-[39%] lg:w-[clamp(176px,16vw,240px)]"
        sizes="(min-width: 1024px) 16vw, 80px"
      />
      <Image
        src="/images/shape/shape_dounut.svg"
        alt=""
        width={346}
        height={343}
        className="shape-reveal shape-reveal--5 hero-parallax-side hero-parallax-side--left absolute left-36 top-[60%] z-10 hidden w-56 md:block lg:left-46 lg:top-[55%] lg:w-[clamp(320px,30vw,480px)]"
        sizes="(min-width: 1024px) 30vw, 224px"
      />
      <Image
        src="/images/shape/shapte_spring_white_large.svg"
        alt=""
        width={317}
        height={332}
        className="shape-reveal shape-reveal--6 hero-parallax-side hero-parallax-side--right absolute right-[12%] bottom-[6%] hidden w-56 md:block lg:w-[clamp(280px,30vw,360px)]"
        sizes="(min-width: 1024px) 30vw, 224px"
      />
      <div className="shape-reveal shape-reveal--7 hero-parallax-center absolute bottom-0 left-1/2 aspect-square w-1/2 max-w-287 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary" />
    </div>
  );
};

export default HeroParallaxShapes;
