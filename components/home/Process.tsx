"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { STEPS } from "@/lib/data";
import { SectionHeading } from "../SectionHeading";

/** Ablauf 01–04: goldene Linie läuft beim Scrollen mit, Schritte leuchten nacheinander auf */
type ProcessProps = { steps?: [string, string, string][]; eyebrow?: string; title?: string; highlight?: string; alt?: boolean; id?: string };

export function Process({ steps = STEPS, eyebrow = "Unser Ablauf", title = "Jedes Projekt folgt einem klaren", highlight = "Ablauf", alt = false, id }: ProcessProps = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const grid = ref.current!;
    const steps = gsap.utils.toArray<HTMLElement>(".step", grid);
    const mm = gsap.matchMedia();

    mm.add(`${MOTION_OK} and (min-width: 1081px)`, () => {
      gsap.set(grid, { visibility: "visible" });
      gsap.from(steps, { y: 50, opacity: 0, duration: 1.2, stagger: 0.12, scrollTrigger: { trigger: grid, start: "top 85%", once: true } });
      gsap.set(grid.querySelectorAll(".step__seg"), { opacity: 0 });
      gsap.to(grid.querySelector(".process__rail-fill"), {
        scaleX: 1, ease: "none",
        scrollTrigger: {
          trigger: grid, start: "top 75%", end: "bottom 45%", scrub: 0.6,
          onUpdate(self) {
            steps.forEach((s, i) => s.classList.toggle("step--on", self.progress >= i / steps.length + 0.02));
          },
        },
      });
    });

    mm.add(`${MOTION_OK} and (max-width: 1080px)`, () => {
      gsap.set(grid, { visibility: "visible" });
      steps.forEach((s) => {
        gsap.from(s, { y: 40, opacity: 0, duration: 1.1, scrollTrigger: { trigger: s, start: "top 88%", once: true } });
        gsap.from(s.querySelector(".step__seg"), { scaleX: 0, transformOrigin: "left center", duration: 1, ease: "power3.inOut",
          scrollTrigger: { trigger: s, start: "top 80%", once: true } });
        ScrollTrigger.create({ trigger: s, start: "top 70%", onEnter: () => s.classList.add("step--on"), onLeaveBack: () => s.classList.remove("step--on") });
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      steps.forEach((s) => s.classList.add("step--on"));
      gsap.set(grid.querySelector(".process__rail-fill"), { scaleX: 1 });
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <section className={`section ${alt ? "section--alt" : ""}`} id={id}>
      <div className="container">
        <SectionHeading align="center" eyebrow={eyebrow} title={title} highlight={highlight} style={{ marginBottom: 64 }} />
        <div ref={ref} className="process__grid pm-reveal" style={{ ["--steps" as string]: steps.length }}>
          <div className="process__rail" aria-hidden="true"><div className="process__rail-fill" /></div>
          {steps.map(([n, t, x]) => (
            <div key={n} className="step">
              <span className="step__seg" aria-hidden="true" />
              <span className="step__num">{n}</span>
              <h3 className="step__title">{t}</h3>
              <p className="step__text">{x}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
