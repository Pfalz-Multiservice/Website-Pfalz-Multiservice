"use client";
import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { EXAMPLES, type Example } from "@/lib/data";
import { EXAMPLES_URL, EXAMPLES_HOST } from "@/lib/site";


/** Webdesign-Musterdesigns: Browser- und Smartphone-Mockup, Scroll-Vorschau, 3D-Tilt */
export function ShowcaseList({ offset = 0, grid = false, items = EXAMPLES }: { offset?: number; grid?: boolean; items?: Example[] }) {
  return (
    <div className={`showcase${grid ? " showcase--grid" : ""}`}>
      {items.map((e, i) => (
        <ShowcaseItem key={e.slug} ex={e} index={i + offset} />
      ))}
    </div>
  );
}

function ShowcaseItem({ ex, index }: { ex: Example; index: number }) {
  const ref = useRef<HTMLElement>(null);
  // Kundenprojekte laufen auf eigener Domain (ohne Link, solange noch nicht online), Musterdesigns auf dem Beispiel-Server
  const href = ex.host ? (ex.url ?? null) : `${EXAMPLES_URL}/${ex.slug}`;
  const shown = ex.host ?? `${EXAMPLES_HOST}/${ex.slug}`;


  useGSAP(() => {
    const root = ref.current!;
    const stage = root.querySelector<HTMLElement>(".sc-stage")!;
    const browser = root.querySelector<HTMLElement>(".sc-browser")!;
    const view = root.querySelector<HTMLElement>(".sc-browser__view")!;
    const shot = root.querySelector<HTMLImageElement>(".sc-browser__shot")!;
    const mm = gsap.matchMedia();

    const maxScroll = () => Math.max(0, shot.offsetHeight - view.offsetHeight);

    mm.add(MOTION_OK, () => {
      gsap.set(root.querySelectorAll(".pm-reveal"), { visibility: "visible" });

      // Statisch: kein Einflug, keine Parallaxe (wirkte schräg und ruckelte)
    });

    // Desktop: Seite läuft beim Erreichen selbstständig durch, Hover startet sie danach neu, dazu 3D-Tilt
    mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(stage, { transformPerspective: 1600 });
      const rx = gsap.quickTo(stage, "rotationX", { duration: 0.8, ease: "power3.out" });
      const ry = gsap.quickTo(stage, "rotationY", { duration: 0.8, ease: "power3.out" });
      let scrollTween: gsap.core.Tween | null = null;
      let running = false;
      let played = false;

      // Ganze Seite einmal von oben nach unten durchlaufen lassen
      const play = () => {
        const d = maxScroll();
        if (d <= 0) return;
        scrollTween?.kill();
        gsap.set(shot, { y: 0 });
        running = true;
        scrollTween = gsap.to(shot, {
          y: -d, duration: Math.max(6, d / 320), ease: "power1.inOut",
          onComplete: () => { running = false; played = true; },
        });
      };

      const move = (e: PointerEvent) => {
        const r = stage.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        stage.style.setProperty("--mx", `${px * 100}%`);
        stage.style.setProperty("--my", `${py * 100}%`);
        ry((px - 0.5) * 6);
        rx((0.5 - py) * 5);
      };
      // Nach dem Durchlauf startet ein erneutes Darüberfahren die Vorschau von vorn
      const enter = () => { if (played && !running) { played = false; play(); } };
      const leave = () => { rx(0); ry(0); };

      // Läuft selbstständig los, sobald der Abschnitt erreicht ist (einmal)
      const st = ScrollTrigger.create({
        trigger: stage, start: "top 65%", once: true,
        onEnter: play,
      });

      stage.addEventListener("pointermove", move);
      stage.addEventListener("pointerenter", enter);
      stage.addEventListener("pointerleave", leave);
      return () => {
        stage.removeEventListener("pointermove", move);
        stage.removeEventListener("pointerenter", enter);
        stage.removeEventListener("pointerleave", leave);
        st.kill();
        scrollTween?.kill();
      };
    });

    // Touch: die Seite im Browser scrollt mit, während man an ihr vorbeiscrollt
    mm.add("(hover: none), (pointer: coarse)", () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(shot, { y: 0 }, {
        y: () => -maxScroll() * 0.45, ease: "none",
        scrollTrigger: { trigger: view, start: "top 85%", end: "bottom 15%", scrub: 0.6, invalidateOnRefresh: true },
      });
    });

    // Nachladen der langen Bilder verschiebt Höhen → Trigger neu berechnen
    const refresh = () => ScrollTrigger.refresh();
    if (!shot.complete) shot.addEventListener("load", refresh, { once: true });

    return () => { mm.revert(); shot.removeEventListener("load", refresh); };
  }, { scope: ref });

  const stage = (
    <>
        <div className="sc-browser pm-reveal">
          <div className="sc-browser__bar" aria-hidden="true">
            <span className="sc-browser__dots"><i /><i /><i /></span>
            <span className="sc-browser__url">{shown}</span>
          </div>
          <div className="sc-browser__view">
            <Image className="sc-browser__shot" src={`/images/beispiele/${ex.slug}-scroll.png`} alt={`Vorschau der Website ${ex.name}`}
              width={1000} height={3750} sizes="(max-width: 900px) 100vw, 800px" />
          </div>
          <div className="sc-spot" aria-hidden="true" />
        </div>
        {ex.phone !== false && (
          <div className="sc-phone pm-reveal" aria-hidden="true">
            <Image src={`/images/beispiele/${ex.slug}-mobile.png`} alt="" width={390} height={844} sizes="(max-width: 900px) 30vw, 220px" />
          </div>
        )}
    </>
  );

  return (
    <article ref={ref} className={`sc-item ${index % 2 ? "sc-item--rev" : ""}`}>
      {href ? (
        <a className="sc-stage" href={href} target="_blank" rel="noopener" aria-label={`${ex.name} live ansehen (öffnet in neuem Tab)`} data-cursor>{stage}</a>
      ) : (
        <div className="sc-stage">{stage}</div>
      )}

      <div className="sc-copy">
        <span className="sc-branch pm-reveal">{ex.branch}</span>
        <h3 className="sc-title pm-reveal">{ex.name}</h3>
      </div>
    </article>
  );
}
