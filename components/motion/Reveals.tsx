"use client";
import { gsap, ScrollTrigger, SplitText, useGSAP, MOTION_OK } from "@/lib/gsap";

/**
 * Deklarative Scroll-Animationen über data-Attribute.
 *  data-reveal="up | stagger | pop | clip | cards | checks | lines"
 *  data-count  (Zahlen im Text zählen beim Einscrollen von 0 hoch, z. B. „36 von 94“)
 *  data-parallax="10"  (Bild bewegt sich beim Scrollen um ±10 %)
 * Wird in app/template.tsx pro Seite einmal gemountet. Beim Seitenwechsel über einen Link kommt der
 * Inhalt oft erst kurz nach dem Einhängen an; ein MutationObserver richtet solche Bereiche nachträglich ein.
 * Bereits eingerichtete Elemente tragen data-pm-done und werden nicht doppelt animiert.
 */
export function Reveals() {
  useGSAP(() => {
    const main = document.getElementById("main");
    if (!main) return;
    const mm = gsap.matchMedia();
    const SEL = "[data-reveal], [data-count], [data-parallax]";

    const run = () => {
      const fresh = Array.from(main.querySelectorAll<HTMLElement>(SEL)).filter((el) => !el.hasAttribute("data-pm-done"));
      if (!fresh.length) return;
      fresh.forEach((el) => el.setAttribute("data-pm-done", ""));
      const batch = new Set<Element>(fresh);
      setup(batch);
      ScrollTrigger.refresh();
    };

    const setup = (batch: Set<Element>) => mm.add(MOTION_OK, () => {
      const q = <T extends Element = HTMLElement>(sel: string) =>
        Array.from(main.querySelectorAll<T & HTMLElement>(sel)).filter((el) => batch.has(el));
      const show = (el: Element) => gsap.set(el, { visibility: "visible" });
      const st = (el: Element, start = "top 88%") => ({ trigger: el, start, once: true });

      q("[data-reveal='up']").forEach((el) => {
        show(el);
        gsap.from(el, { y: 50, opacity: 0, duration: 1.2, scrollTrigger: st(el) });
      });

      q("[data-reveal='stagger']").forEach((el) => {
        show(el);
        gsap.from(el.children, { y: 40, opacity: 0, duration: 1.1, stagger: 0.1, scrollTrigger: st(el) });
      });

      q("[data-reveal='pop']").forEach((el) => {
        show(el);
        gsap.from(el.children, { y: 18, scale: 0.86, opacity: 0, duration: 0.9, stagger: 0.06, ease: "expo.out", scrollTrigger: st(el, "top 90%") });
      });

      q("[data-reveal='checks']").forEach((el) => {
        show(el);
        const tl = gsap.timeline({ scrollTrigger: st(el) });
        tl.from(el.querySelectorAll("li"), { x: -24, opacity: 0, duration: 1, stagger: 0.12 }, 0)
          .from(el.querySelectorAll(".checklist__box"), { scale: 0, rotate: -90, duration: 0.8, stagger: 0.12, ease: "back.out(2)" }, 0.1);
      });

      // Fließtext zeilenweise aus einer Maske einblenden
      const splits: { revert: () => void }[] = [];
      q("[data-reveal='lines']").forEach((el) => {
        show(el);
        splits.push(SplitText.create(el, {
          type: "lines", mask: "lines", linesClass: "pm-line", autoSplit: true,
          onSplit: (self) => gsap.from(self.lines, { yPercent: 110, opacity: 0, duration: 0.7, stagger: 0.04, ease: "power3.out", scrollTrigger: st(el, "top 96%") }),
        }));
      });

      // Zahlen hochzählen: jede Zifferngruppe im Text läuft von 0 auf ihren Wert
      const counted: [HTMLElement, string][] = [];
      q("[data-count]").forEach((el) => {
        const text = el.textContent ?? "";
        if (!/[0-9]/.test(text)) return;
        counted.push([el, text]);
        const draw = (p: number) => {
          el.textContent = text.replace(/[0-9][0-9.]*/g, (m) => Math.round(Number(m.split(".").join("")) * p).toLocaleString("de-DE"));
        };
        const state = { p: 0 };
        draw(0);
        gsap.to(state, { p: 1, duration: 2.8, ease: "power1.out", onUpdate: () => draw(state.p), onComplete: () => { el.textContent = text; },
          scrollTrigger: st(el, "top 96%") });
      });

      q("[data-reveal='clip']").forEach((el) => {
        show(el);
        const img = el.querySelector("[data-clip-img]");
        const tl = gsap.timeline({ scrollTrigger: st(el, "top 85%") });
        tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut" }, 0);
        if (img) tl.from(img, { scale: 1.35, duration: 2, ease: "expo.out" }, 0.1);
        const corners = el.querySelectorAll(".media-frame__corner");
        if (corners.length) tl.from(corners, { scale: 0, opacity: 0, duration: 0.9, stagger: 0.1, ease: "expo.out" }, 0.9);
      });

      q("[data-reveal='cards']").forEach((grid) => {
        show(grid);
        const cards = Array.from(grid.querySelectorAll<HTMLElement>(".pm-card"));
        gsap.set(cards, { y: 80, opacity: 0 });
        gsap.set(grid.querySelectorAll(".pm-card .card__parallax"), { scale: 1.3 });
        ScrollTrigger.batch(cards, {
          start: "top 90%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, { y: 0, opacity: 1, duration: 1.3, stagger: 0.12, ease: "expo.out" });
            const par = batch.map((b) => b.querySelector(".card__parallax")).filter(Boolean);
            if (par.length) gsap.to(par, { scale: 1, duration: 1.8, stagger: 0.12, ease: "expo.out" });
          },
        });
      });

      q("[data-parallax]").forEach((el) => {
        const amt = parseFloat(el.dataset.parallax || "10");
        gsap.fromTo(el, { yPercent: -amt }, {
          yPercent: amt, ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      return () => {
        splits.forEach((sp) => sp.revert());
        counted.forEach(([el, text]) => { el.textContent = text; });
      };
    });

    run();
    // Später eintreffende Inhalte (Seitenwechsel per Link, Streaming) nachträglich einrichten
    let timer = 0;
    const mo = new MutationObserver(() => { if (!timer) timer = window.setTimeout(() => { timer = 0; run(); }, 30); });
    mo.observe(main, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      window.clearTimeout(timer);
      mm.revert();
      main.querySelectorAll("[data-pm-done]").forEach((el) => el.removeAttribute("data-pm-done"));
    };
  });

  return null;
}
