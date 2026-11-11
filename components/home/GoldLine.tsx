"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Die goldene Linie: Markenzeichen von „ein Ansprechpartner". Sie läuft beim Scrollen links im Rand durch alle
 * Abschnitte, setzt an jeder Überschrift einen Knotenpunkt und biegt am Ende in die Karte ein, wo sie in Worms endet.
 * Rein dekorativ (aria-hidden, keine Klicks). Bei reduzierter Bewegung steht sie fertig gezeichnet da.
 */
export function GoldLine({ children }: { children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = wrap.current, svg = svgRef.current;
    if (!root || !svg) return;
    const track = svg.querySelector<SVGPathElement>(".gl__track")!;
    const line = svg.querySelector<SVGPathElement>(".gl__line")!;
    const tip = svg.querySelector<SVGGElement>(".gl__tip")!;
    const nodeLayer = svg.querySelector<SVGGElement>(".gl__nodes")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let len = 0;
    let samples: { l: number; x: number; y: number }[] = [];
    let nodes: { el: SVGCircleElement; l: number }[] = [];

    const build = () => {
      const r = root.getBoundingClientRect();
      const top = r.top + scrollY;
      const W = root.offsetWidth, H = root.offsetHeight;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

      // x: Mitte des freien Rands links vom Inhalt
      const c = root.querySelector<HTMLElement>(".container");
      const cs = c ? getComputedStyle(c) : null;
      const contentLeft = c ? c.getBoundingClientRect().left - r.left + parseFloat(cs!.paddingLeft) : 24;
      const X = Math.max(10, Math.round(contentLeft / 2));

      // Knoten: an den Abschnittsüberschriften
      const ys = [...root.children]
        .map((sec) => sec.querySelector<HTMLElement>("h2"))
        .filter((el): el is HTMLElement => !!el)
        .map((el) => el.getBoundingClientRect().top + scrollY - top + 14)
        .filter((y) => y > 40 && y < H - 40);

      // Ziel: Worms auf der Karte
      const hq = root.querySelector<SVGGraphicsElement>(".rm-hqdot");
            let d = `M ${X} 0`;
      let y0 = 0;
      // sanftes Pendeln zwischen den Knoten, damit es nicht wie ein Lineal wirkt
      ys.forEach((y, i) => {
        const sway = i % 2 === 0 ? 14 : -14;
        const m = (y0 + y) / 2;
        d += ` C ${X + sway} ${y0 + (m - y0) * 0.6}, ${X + sway} ${m + (y - m) * 0.4}, ${X} ${y}`;
        y0 = y;
      });
      let endX = X, endY = H - 2;
      if (hq) {
        const hr = hq.getBoundingClientRect();
        endX = hr.left + hr.width / 2 - r.left;
        endY = hr.top + hr.height / 2 + scrollY - top;
        // senkrecht im Rand bis auf Höhe von Worms, dann von links waagerecht hinein (westlich von Worms liegt kein Fluss)
        d += ` L ${X} ${Math.max(y0, endY - 70)}`;
        d += ` Q ${X} ${endY}, ${X + 70} ${endY}`;
        d += ` L ${endX} ${endY}`;
      } else {
        d += ` L ${X} ${endY}`;
      }
      track.setAttribute("d", d); line.setAttribute("d", d);
      len = line.getTotalLength();
      line.style.strokeDasharray = `${len}`;

      samples = [];
      const N = Math.max(200, Math.round(len / 12));
      for (let i = 0; i <= N; i++) { const l = (len * i) / N, p = line.getPointAtLength(l); samples.push({ l, x: p.x, y: p.y }); }

      nodeLayer.replaceChildren();
      nodes = ys.map((y) => {
        const el = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        el.setAttribute("cx", `${X}`); el.setAttribute("cy", `${y}`); el.setAttribute("r", "4");
        el.setAttribute("class", "gl__node");
        nodeLayer.appendChild(el);
        const s = samples.find((p) => p.y >= y) ?? samples[samples.length - 1];
        return { el, l: s.l };
      });
      render();
    };

    // Spitze folgt etwa 65 % der Bildschirmhöhe
    const render = () => {
      if (!len) return;
      let l = len;
      if (!reduce) {
        const top = root.getBoundingClientRect().top;
        const target = innerHeight * 0.65 - top;
        const s = samples.find((p) => p.y >= target);
        l = target <= 0 ? 0 : s ? s.l : len;
      }
      line.style.strokeDashoffset = `${len - l}`;
      const p = samples.find((q) => q.l >= l) ?? samples[samples.length - 1];
      tip.setAttribute("transform", `translate(${p.x} ${p.y})`);
      tip.style.opacity = l > 2 && l < len - 2 ? "1" : "0";
      nodes.forEach((n) => n.el.classList.toggle("is-on", l >= n.l));
      svg.classList.toggle("is-done", l >= len - 2);
    };

    let raf = 0;
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; render(); }); };
    let t = 0;
    const rebuild = () => { clearTimeout(t); t = window.setTimeout(build, 120); };
    const ro = new ResizeObserver(rebuild);
    ro.observe(root);
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", rebuild);
    addEventListener("load", rebuild);
    build();
    return () => {
      ro.disconnect(); clearTimeout(t); cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll); removeEventListener("resize", rebuild); removeEventListener("load", rebuild);
    };
  }, []);

  return (
    <div ref={wrap} className="gl-wrap">
      {children}
      <svg ref={svgRef} className="gl" aria-hidden="true" preserveAspectRatio="none">
        <defs>
          <filter id="gl-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>
        <path className="gl__track" fill="none" />
        <path className="gl__line" fill="none" />
        <g className="gl__nodes" />
        <g className="gl__tip">
          <circle r="11" className="gl__tip-glow" filter="url(#gl-glow)" />
          <circle r="3.5" className="gl__tip-core" />
        </g>
      </svg>
    </div>
  );
}
