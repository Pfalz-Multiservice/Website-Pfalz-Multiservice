"use client";
import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, introDelay, markVisited } from "@/lib/gsap";

/**
 * Seitenvorhang: beim ersten Aufruf ein Marken-Intro (Goldlinie + Monogramm),
 * bei jedem weiteren Seitenwechsel ein kurzer Wisch.
 */
export function Curtain() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const root = ref.current!;
    const first = introDelay() > 1;
    markVisited();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { gsap.set(root, { display: "none" }); return; }

    const top = root.querySelector(".curtain__panel--top");
    const bottom = root.querySelector(".curtain__panel--bottom");
    const line = root.querySelector(".curtain__line");
    const mark = root.querySelector(".curtain__mark");
    const tl = gsap.timeline({ onComplete: () => { gsap.set(root, { display: "none" }); } });

    if (first) {
      tl.fromTo(mark, { opacity: 1, clipPath: "inset(0% 100% 0% 0%)", scale: 0.92 },
          { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 0.9, ease: "expo.inOut" }, 0.05)
        .to(mark, { opacity: 0, scale: 0.94, duration: 0.3, ease: "power2.in" }, 0.95)
        .to(line, { scaleX: 1, duration: 0.5, ease: "power3.inOut" }, 1.0)
        .to(top, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, 1.4)
        .to(bottom, { yPercent: 100, duration: 0.9, ease: "expo.inOut" }, 1.4)
        .to(line, { opacity: 0, duration: 0.3 }, 1.5);
    } else {
      gsap.set(line, { scaleX: 1, transformOrigin: "left center" });
      tl.to(line, { scaleX: 0, transformOrigin: "right center", duration: 0.5, ease: "power3.inOut" }, 0)
        .to(top, { yPercent: -100, duration: 0.75, ease: "expo.inOut" }, 0.1)
        .to(bottom, { yPercent: 100, duration: 0.75, ease: "expo.inOut" }, 0.1);
    }
  });

  return (
    <div ref={ref} className="curtain" aria-hidden="true">
      <div className="curtain__panel curtain__panel--top" />
      <div className="curtain__panel curtain__panel--bottom" />
      <div className="curtain__line" />

      <Image className="curtain__mark" src="/logo-mark-white.webp" alt="Pfalz Multiservice" width={120} height={101} priority />
    </div>
  );
}
