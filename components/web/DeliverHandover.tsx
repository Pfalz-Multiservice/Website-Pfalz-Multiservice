"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { WEB_DELIVER, WEB_HANDOVER, type HandoverItem } from "@/lib/data";
import { tidy } from "@/lib/typo";
import { Icon } from "../Icon";

const STEP_MS = 2600; // passt zu .dh-row__prog (2,6 s)
const GROUPS: { id: string; label: string; items: HandoverItem[] }[] = [
  { id: "leistungsumfang", label: "In jedem Paket", items: WEB_DELIVER },
  { id: "uebergabe", label: "Übergabe-Paket", items: WEB_HANDOVER.flatMap((g) => g.items) },
];
const ALL = GROUPS.flatMap((g, gi) => g.items.map((it) => ({ ...it, gi })));

/**
 * „In jedem Paket“ und Übergabe-Paket in einer schmalen Kachel: zwei Chip-Zeilen,
 * ein Spotlight läuft der Reihe nach durch alle Punkte (vom Leistungsumfang zur Übergabe),
 * darunter eine Zeile mit der Erklärung. Hover, Fokus oder Tippen wählt direkt und hält die Automatik an.
 */
export function DeliverHandover() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [motion, setMotion] = useState(false);
  const [cur, setCur] = useState(0);
  const [auto, setAuto] = useState(true);
  const run = motion && visible && auto;

  useGSAP(() => {
    const root = ref.current!;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      setMotion(true);
      const st = ScrollTrigger.create({ trigger: root, start: "top 85%", end: "bottom 15%", onToggle: (s) => setVisible(s.isActive) });
      // Chips ploppen beim ersten Einscrollen nacheinander auf, erst „In jedem Paket“, dann die Übergabe
      gsap.from(root.querySelectorAll(".dh-chip"), {
        y: 10, opacity: 0, scale: 0.92, duration: 0.45, stagger: 0.035, ease: "back.out(1.8)",
        scrollTrigger: { trigger: root, start: "top 85%", once: true },
      });
      return () => { st.kill(); setMotion(false); };
    });
    return () => mm.revert();
  }, { scope: ref });

  useEffect(() => {
    if (!run) return;
    const t = window.setTimeout(() => setCur((c) => (c + 1) % ALL.length), STEP_MS);
    return () => window.clearTimeout(t);
  }, [run, cur]);

  const pick = (i: number) => { setAuto(false); setCur(i); };
  const active = ALL[cur];
  let idx = 0;

  return (
    <section ref={ref} className="dh dh--one" aria-labelledby="dh-t">
      <div className="dh-one__head">
        <span className="pk-box__eyebrow">Leistungsumfang &amp; Übergabe</span>
        <h3 className="dh-title" id="dh-t">Was Sie bekommen</h3>
      </div>
      {GROUPS.map((g, gi) => (
        <div key={g.id} className={`dh-grp ${active.gi === gi ? "is-on" : ""}`} id={g.id}>
          <span className="dh-grp__label">{g.label}</span>
          <ul className="dh-chips">
            {g.items.map((it) => {
              const i = idx++;
              return (
                <li key={it.title}>
                  <button type="button" className={`dh-chip ${i === cur ? "is-on" : ""}`} aria-pressed={i === cur}
                    onClick={() => pick(i)} onMouseEnter={() => pick(i)} onFocus={() => pick(i)} data-cursor>
                    <span className="dh-tick" aria-hidden="true"><Icon name="check" size={11} /></span>
                    {it.title}
                    <span className="sr-only">: {it.text.replace(/\n/g, " ")}</span>
                    {i === cur && run && <i key={cur} className="dh-row__prog" aria-hidden="true" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <div className="dh-detail" aria-hidden="true">
        <span className="dh-detail__icon"><Icon name={active.icon} size={18} /></span>
        <p key={cur} className="dh-detail__text"><b>{active.title}</b> {tidy(active.text.replace(/\n/g, " "))}</p>
      </div>
      <p className="dh-note">{tidy("Kein Lock-in: Nach vollständiger Bezahlung gehört Ihnen alles, was Sie für Ihre Website brauchen.")}</p>
    </section>
  );
}
