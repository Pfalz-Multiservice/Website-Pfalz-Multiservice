"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { CLASSIC_EXAMPLES, EXAMPLES } from "@/lib/data";
import { EXAMPLES_URL, EXAMPLES_HOST } from "@/lib/site";
import { Icon } from "../Icon";

const ITEMS = [
  ...CLASSIC_EXAMPLES.map((e) => ({ ...e, kind: "Mit Unterseiten" })),
  ...EXAMPLES.map((e) => ({ ...e, kind: "One-Pager" })),
];
const nn = (i: number) => String(i).padStart(2, "0");

/**
 * Musterdesigns als Filmstreifen: eine Bühne zeigt das aktive Muster und fährt die Seite einmal ab,
 * der Balken im Vorschaubild läuft mit, danach blendet das nächste über.
 * Klick auf ein Vorschaubild wechselt direkt, Darüberfahren hält an. Ohne Bewegung: nur Klick, kein Autoplay.
 */
export function ExampleReel() {
  const root = useRef<HTMLDivElement>(null);
  const [cur, setCur] = useState(0);
  const [motion, setMotion] = useState(false);
  const tween = useRef<gsap.core.Tween | null>(null);
  const inView = useRef(false);
  const held = useRef(false);
  const ex = ITEMS[cur];
  const href = `${EXAMPLES_URL}/${ex.slug}`;

  const sync = () => { const t = tween.current; if (t) { if (inView.current && !held.current) t.play(); else t.pause(); } };

  useGSAP(() => {
    const el = root.current!;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      setMotion(true);
      // Handy: erst loslaufen, wenn die Bühne drei Viertel des Bildschirms nach oben gewandert ist
      const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
      const st = ScrollTrigger.create({ trigger: el, start: touch ? "top 25%" : "top 80%", end: "bottom 20%", onToggle: (s) => { inView.current = s.isActive; sync(); } });
      return () => { st.kill(); setMotion(false); };
    });
    return () => mm.revert();
  }, { scope: root });

  // Aktive Seite einmal von oben nach unten abfahren, Balken im Vorschaubild läuft synchron, dann weiter
  useEffect(() => {
    if (!motion) return;
    const el = root.current!;
    const view = el.querySelector<HTMLElement>(".reel-view")!;
    const shot = el.querySelectorAll<HTMLElement>(".reel-shot")[cur];
    const bar = el.querySelectorAll<HTMLElement>(".reel-thumb__prog")[cur];
    const d = Math.max(0, shot.offsetHeight - view.offsetHeight);
    gsap.set(shot, { y: 0 });
    const t = gsap.to(shot, {
      y: -d, duration: Math.max(6, d / 380), ease: "power1.inOut", paused: true,
      onUpdate: () => { bar.style.transform = `scaleX(${t.progress()})`; },
      onComplete: () => setCur((c) => (c + 1) % ITEMS.length),
    });
    tween.current = t;
    sync();
    return () => { t.kill(); tween.current = null; bar.style.transform = "scaleX(0)"; };
  }, [cur, motion]);

  // Handy: aktives Vorschaubild im wischbaren Streifen sichtbar halten (nur waagerecht, die Seite scrollt nicht mit)
  useEffect(() => {
    const strip = root.current?.querySelector<HTMLElement>(".reel-strip");
    const thumb = strip?.children[cur] as HTMLElement | undefined;
    if (!strip || !thumb || strip.scrollWidth <= strip.clientWidth + 2) return;
    strip.scrollTo({ left: thumb.offsetLeft - 16, behavior: "smooth" });
  }, [cur]);

  const hold = (v: boolean) => { held.current = v; sync(); };

  return (
    <div ref={root} className="reel">
      <a className="reel-stage sc-browser" href={href} target="_blank" rel="noopener" data-cursor
        aria-label={`${ex.name} live ansehen (öffnet in neuem Tab)`}
        onPointerEnter={(e) => e.pointerType === "mouse" && hold(true)} onPointerLeave={() => hold(false)}>
        <div className="sc-browser__bar" aria-hidden="true">
          <span className="sc-browser__dots"><i /><i /><i /></span>
          <span className="sc-browser__url">{EXAMPLES_HOST}/{ex.slug}</span>
        </div>
        <div className="reel-view">
          {ITEMS.map((e, i) => (
            <Image key={e.slug} className={`reel-shot ${i === cur ? "is-on" : ""}`} src={`/images/beispiele/${e.slug}-scroll.png`}
              alt={i === cur ? `Vorschau der Website ${e.name}` : ""} width={1000} height={3750} sizes="(max-width: 900px) 100vw, 720px" priority={i === 0} />
          ))}
        </div>
      </a>

      <div className="reel-copy" aria-live="polite">
        <span className="reel-count" aria-hidden="true"><b>{nn(cur + 1)}</b> / {nn(ITEMS.length)}</span>
        <div key={cur} className="reel-copy__in">
          <span className="sc-branch">{ex.branch}</span>
          <h4 className="reel-title">{ex.name}</h4>
          <ul className="reel-tags" aria-label="Art und Funktionen">
            <li className="reel-kind reel-kind--on">{ex.kind}</li>
            {ex.tags.filter((t) => !/^\d+ Seiten$/.test(t)).map((t) => <li key={t} className="reel-kind">{t}</li>)}
          </ul>
        </div>
        <a className="reel-live" href={href} target="_blank" rel="noopener" data-cursor>
          Live ansehen <Icon name="external-link" size={15} />
        </a>
      </div>

      <ul className="reel-strip" aria-label="Musterdesigns">
        {ITEMS.map((e, i) => (
          <li key={e.slug}>
            <button type="button" className={`reel-thumb ${i === cur ? "is-on" : ""}`} aria-pressed={i === cur} onClick={() => setCur(i)} data-cursor>
              <span className="reel-thumb__img">
                <Image src={`/images/beispiele/${e.slug}-scroll.png`} alt="" fill sizes="200px" />
                <i className="reel-thumb__prog" aria-hidden="true" />
              </span>
              <span className="reel-thumb__name">{e.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
