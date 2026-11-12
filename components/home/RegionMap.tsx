"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { BgImage } from "../BgImage";

/**
 * Einzugsgebiet als animierte Karte: Worms als Basis, Rhein und Neckar zeichnen sich, Radar-Sweep,
 * goldene Bögen zu den Orten mit hochzählenden Kilometern. Startet einmal, sobald der Abschnitt ins Bild kommt;
 * danach pulsiert nur noch Worms. Bei reduzierter Bewegung erscheint direkt das Endbild.
 * Koordinaten: grob echte Lage (Länge × cos(49,6°), Breite), Kilometer gerundet.
 */
const HQ = [265, 268] as const;
// Ansicht horizontal auf Worms zentriert (viewBox beginnt bei HQ.x − 300)
const CITIES = [
  { n: "Frankenthal", x: 262, y: 366, km: 12, dx: -14, end: true, dy: 0 },
  { n: "Grünstadt", x: 141, y: 337, km: 22, dx: -14, end: true, dy: 0 },
  { n: "Alzey", x: 108, y: 154, km: 30, dx: 14, end: false, dy: 0 },
  { n: "Bensheim", x: 432, y: 219, km: 23, dx: 14, end: false, dy: 0 },
  { n: "Mannheim", x: 338, y: 410, km: 20, dx: 14, end: false, dy: 0 },
  { n: "Ludwigshafen", x: 316, y: 428, km: 22, dx: -14, end: true, dy: 14 },
  { n: "Eich", x: 292, y: 149, km: 15, dx: -12, end: true, dy: 0 },
  { n: "Bad Dürkheim", x: 142, y: 439, km: 28, dx: -12, end: true, dy: 0 },
].sort((a, b) => a.km - b.km); // nächste Orte zuerst, dann weiter weg
const RHINE = "M311 600 C318 540 334 500 330 470 S326 425 324 410 S312 360 305 340 S282 295 279 270 S286 225 292 200 S340 165 350 140 S312 80 305 50 S262 20 246 0";
const NECKAR = "M337 410 C360 418 380 428 389 430 S450 480 480 490 S560 495 600 500";
const arcPath = (c: (typeof CITIES)[number]) => {
  const mx = (HQ[0] + c.x) / 2, my = (HQ[1] + c.y) / 2, dx = c.x - HQ[0], dy = c.y - HQ[1];
  return `M${HQ[0]} ${HQ[1]} Q${mx - dy * 0.28} ${my + dx * 0.28} ${c.x} ${c.y}`;
};
const DOTS: { x: number; y: number; d: number }[] = [];
for (let y = 12; y < 600; y += 18) for (let x = -24; x < 570; x += 18) DOTS.push({ x, y, d: Math.hypot(x - HQ[0], y - HQ[1]) });

const END = 10.2; // Sekunden bis zum Endbild
const clamp = (v: number) => Math.max(0, Math.min(1, v));
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const back = (t: number) => (t <= 0 ? 0 : 1 + 2.7 * Math.pow(t - 1, 3) + 1.7 * Math.pow(t - 1, 2));

export function RegionMap({ heading }: { heading: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = <T extends Element>(s: string) => el.querySelector(s) as T;
    const qa = <T extends Element>(s: string) => [...el.querySelectorAll(s)] as T[];
    const dots = qa<SVGCircleElement>(".rm-dot");
    const radii = qa<SVGCircleElement>(".rm-radius");
    const rivers = qa<SVGPathElement>(".rm-river").map((p) => ({ p, len: p.getTotalLength() }));
    rivers.forEach(({ p, len }) => { p.style.strokeDasharray = `${len}`; });
    const cities = CITIES.map(({ km }, i) => {
      const path = q<SVGPathElement>(`.rm-arc-${i}`);
      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      return {
        path, len, km,
        spark: q<SVGCircleElement>(`.rm-spark-${i}`), halo: q<SVGCircleElement>(`.rm-halo-${i}`),
        ping: q<SVGCircleElement>(`.rm-ping-${i}`), dot: q<SVGCircleElement>(`.rm-cdot-${i}`),
        lbl: q<SVGTextElement>(`.rm-lbl-${i}`), kmt: q<SVGTextElement>(`.rm-km-${i}`),
        li: q<HTMLLIElement>(`.rm-li-${i}`), lik: q<HTMLElement>(`.rm-li-${i} b`),
      };
    });
    const hqDot = q<SVGCircleElement>(".rm-hqdot"), hqGlow = q<SVGCircleElement>(".rm-hqglow");
    const hqL = q<SVGTextElement>(".rm-hql"), hqS = q<SVGTextElement>(".rm-hqs"), riverL = q<SVGTextElement>(".rm-rl");
    const sweep = q<SVGGElement>(".rm-sweep");
    const s1 = q<HTMLElement>(".rm-s1"), s2 = q<HTMLElement>(".rm-s2");
    const op = (e: Element, v: number) => e.setAttribute("opacity", v.toFixed(3));

    let dotsDone = false;
    const render = (t: number, clock: number) => {
      if (!dotsDone) {
        const gr = seg(t, 0, 1.6) * 700;
        dots.forEach((d, i) => {
          const dd = DOTS[i].d;
          d.setAttribute("fill", dd < gr ? (dd > gr - 60 ? "#5a4a18" : "#262626") : "#0d0d0d");
        });
        if (t >= 1.7) dotsDone = true;
      }
      rivers[0].p.style.strokeDashoffset = `${rivers[0].len * (1 - ease(seg(t, 0.3, 2.2)))}`;
      rivers[1].p.style.strokeDashoffset = `${rivers[1].len * (1 - ease(seg(t, 1.4, 2.6)))}`;
      op(riverL, seg(t, 1.8, 2.6));
      const h = seg(t, 2, 2.6);
      op(hqDot, h); hqDot.setAttribute("r", (7 * back(h)).toFixed(2));
      op(hqGlow, h * (0.75 + 0.25 * Math.sin(clock * 3)));
      op(hqL, seg(t, 2.3, 2.9)); op(hqS, seg(t, 2.5, 3.1));
      radii.forEach((r, i) => op(r, seg(t, 2.6 + i * 0.15, 3.2 + i * 0.15)));
      const sw = seg(t, 8.0, 10.0); // Radar erst, wenn alle Orte erreicht sind
      op(sweep, sw > 0 && sw < 1 ? Math.sin(sw * Math.PI) : 0);
      sweep.setAttribute("transform", `rotate(${-90 + sw * 360} ${HQ[0]} ${HQ[1]})`);
      let count = h > 0 ? 1 : 0, maxkm = 0;
      cities.forEach((c, i) => {
        const s = 3.0 + i * 0.55, p = ease(seg(t, s, s + 0.7));
        c.path.style.strokeDashoffset = `${c.len * (1 - p)}`;
        op(c.path, 0.9 - 0.55 * seg(t, s + 1, s + 2));
        if (p > 0 && p < 1) {
          const pt = c.path.getPointAtLength(c.len * p);
          c.spark.setAttribute("cx", `${pt.x}`); c.spark.setAttribute("cy", `${pt.y}`); op(c.spark, 1);
        } else op(c.spark, 0);
        const a = seg(t, s + 0.7, s + 1.1), pg = seg(t, s + 0.7, s + 1.6);
        // Lichtkegel je Ort: nach dem Aufploppen sanft pulsierend, zeitversetzt
        const pulse = a >= 1 ? 0.5 + 0.5 * Math.sin((clock - s) * 2.4 + i * 0.9) : 0;
        c.dot.setAttribute("r", (5 * back(a)).toFixed(2));
        c.halo.setAttribute("r", (30 * a * (0.85 + 0.35 * pulse)).toFixed(1)); op(c.halo, a * (0.7 + 0.3 * pulse));
        c.ping.setAttribute("r", (4 + pg * 26).toFixed(1)); op(c.ping, pg > 0 ? 1 - pg : 0);
        op(c.lbl, seg(t, s + 0.8, s + 1.2)); op(c.kmt, seg(t, s + 0.9, s + 1.3));
        const k = Math.round(c.km * ease(seg(t, s + 0.8, s + 1.6)));
        c.kmt.textContent = `${k} KM`; c.lik.textContent = `${k} km`;
        c.li.classList.toggle("is-on", a >= 0.6); // erst rechts zeigen, wenn der Ort auf der Karte aufleuchtet
        if (a > 0) { count++; maxkm = Math.max(maxkm, k); }
      });
      s1.textContent = `${count}`; s2.textContent = `${maxkm} km`;
    };

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      render(END, END);
      return;
    }
    render(0, 0);

    let raf = 0, start = 0, visible = false, started = false;
    const loop = (now: number) => {
      const clock = (now - start) / 1000;
      render(Math.min(clock, END), clock);
      raf = visible ? requestAnimationFrame(loop) : 0;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) {
        if (!started) { started = true; start = performance.now(); }
        if (!raf) raf = requestAnimationFrame(loop);
      }
    }, { threshold: 0.35 });
    io.observe(q<HTMLDivElement>(".rm-map"));
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={root} className="rm">
      <div className="rm-hero">
        <BgImage className="rm-hero__img" src="/images/dom-worms-gold.jpg" sizes="(max-width: 1240px) 100vw, 1160px" />
        <div className="rm-hero__text">{heading}</div>
      </div>
      <div className="rm-panel">
      <div className="rm-map" role="img" aria-label="Karte des Einzugsgebiets: Worms als Basis mit Frankenthal, Grünstadt, Alzey, Bensheim, Mannheim, Ludwigshafen, Eich und Bad Dürkheim">
        <svg viewBox={`${HQ[0] - 300} 0 600 600`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <radialGradient id="rm-glow"><stop offset="0" stopColor="#D9B13A" stopOpacity=".55" /><stop offset="1" stopColor="#D9B13A" stopOpacity="0" /></radialGradient>
            <radialGradient id="rm-vign" cx=".5" cy=".45" r=".75"><stop offset=".55" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".9" /></radialGradient>
            <linearGradient id="rm-riv" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#7a6420" /><stop offset=".5" stopColor="#D9B13A" /><stop offset="1" stopColor="#7a6420" /></linearGradient>
            <linearGradient id="rm-sweep" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#D9B13A" stopOpacity="0" /><stop offset="1" stopColor="#D9B13A" stopOpacity=".28" /></linearGradient>
          </defs>
          <g>{DOTS.map((d, i) => <circle key={i} className="rm-dot" cx={d.x} cy={d.y} r="1" fill="#0d0d0d" />)}</g>
          <g fill="none" stroke="#D9B13A">
            {[80, 160, 240].map((r) => <circle key={r} className="rm-radius" cx={HQ[0]} cy={HQ[1]} r={r} stroke="#2a2a2a" strokeDasharray="2 6" opacity="0" />)}
          </g>
          <path className="rm-river" d={RHINE} fill="none" stroke="url(#rm-riv)" strokeWidth="3" strokeLinecap="round" />
          <path className="rm-river" d={NECKAR} fill="none" stroke="url(#rm-riv)" strokeWidth="2" strokeLinecap="round" opacity=".8" />
          <text className="rm-rl rm-river-l" x="318" y="462" transform="rotate(-80 318 462)" opacity="0">RHEIN</text>
          <g className="rm-sweep" opacity="0"><path d={`M${HQ[0]} ${HQ[1]} L565 268 A300 300 0 0 0 477 56 Z`} fill="url(#rm-sweep)" /></g>
          <g fill="none" stroke="#D9B13A" strokeWidth="1.4">
            {CITIES.map((c, i) => <path key={c.n} className={`rm-arc-${i}`} d={arcPath(c)} />)}
            {CITIES.map((c, i) => <circle key={c.n} className={`rm-spark-${i}`} r="3.2" fill="#EFD994" stroke="none" opacity="0" />)}
          </g>
          <g>
            {CITIES.map((c, i) => (
              <g key={c.n}>
                <circle className={`rm-halo-${i}`} cx={c.x} cy={c.y} r="0" fill="url(#rm-glow)" />
                <circle className={`rm-ping-${i}`} cx={c.x} cy={c.y} r="0" fill="none" stroke="#D9B13A" strokeWidth="1" opacity="0" />
                <circle className={`rm-cdot-${i}`} cx={c.x} cy={c.y} r="0" fill="#D9B13A" />
                <text className={`rm-lbl rm-lbl-${i}`} x={c.x + c.dx} y={c.y - 2 + c.dy} textAnchor={c.end ? "end" : "start"} opacity="0">{c.n}</text>
                <text className={`rm-km rm-km-${i}`} x={c.x + c.dx} y={c.y + 12 + c.dy} textAnchor={c.end ? "end" : "start"} opacity="0">0 KM</text>
              </g>
            ))}
          </g>
          <circle className="rm-hqglow" cx={HQ[0]} cy={HQ[1]} r="46" fill="url(#rm-glow)" opacity="0" />
          <circle className="rm-hqdot" cx={HQ[0]} cy={HQ[1]} r="0" fill="#EFD994" opacity="0" />
          <text className="rm-hql rm-lbl rm-lbl--hq" x="280" y="262" opacity="0">WORMS</text>
          <text className="rm-hqs rm-km" x="280" y="278" opacity="0">BASIS</text>
          <rect x={HQ[0] - 300} width="600" height="600" fill="url(#rm-vign)" />
        </svg>
      </div>
      <div className="rm-facts">
        <ul className="rm-list">
          {CITIES.map((c, i) => <li key={c.n} className={`rm-li-${i}`}>{c.n}<b>0 km</b></li>)}
        </ul>
        <div className="rm-stats">
          <div><strong className="rm-s1">0</strong><span>Orte regional vor Ort</span></div>
          <div><strong className="rm-s2">0 km</strong><span>Umkreis</span></div>
          <div><strong>Bundesweit</strong><span>Online verfügbar</span></div>
        </div>
      </div>
      </div>
    </div>
  );
}
