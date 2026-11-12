"use client";
import "@fontsource/inter-tight/400.css";
import "@fontsource/inter-tight/600.css";
import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { tidy } from "@/lib/typo";
import { SectionHeading } from "../SectionHeading";
import { Icon } from "../Icon";


const STEPS: { tag: string; stage: string; title: string; text: string }[] = [
  { tag: "Struktur", stage: "Raster", title: "Erst das Raster, dann das Design.",
    text: "Jede Website steht auf einem festen Raster. So wirkt sie auf dem Handy genauso aufgeräumt wie am großen Bildschirm." },
  { tag: "Nutzerführung", stage: "Wireframe", title: "Der Weg zur Anfrage kommt zuerst.",
    text: "Im Wireframe legen wir fest, was Besucher in welcher Reihenfolge sehen: Leistung, Vertrauen, Anfrage." },
  { tag: "Marke", stage: "Bild & Farbe", title: "Farben und Bilder aus Ihrem Betrieb.",
    text: "Farben, Formen und Fotos kommen aus Ihrem Unternehmen, nicht aus einem Baukasten." },
  { tag: "Texte", stage: "Typografie", title: "Überschriften, die auf den Punkt kommen.",
    text: "Texte, die die Fragen Ihrer Kunden beantworten: kurz, konkret, mit Fakten statt Floskeln." },
  { tag: "Ergebnis", stage: "Fertig", title: "Alles zusammen: eine Website, die Anfragen bringt.",
    text: "Unser Musterdesign „Fliesen Reuter“ auf Laptop und Handy. Anruf, Anfrage und Aufmaßtermin sind von überall erreichbar." },
];
const N = STEPS.length;
const nn = (i: number) => String(i).padStart(2, "0");
const v = (o: Record<string, string | number>) => o as CSSProperties;

const LINKS: [string, number][] = [["Leistungen", 5.4], ["Konfigurator", 6.2], ["Referenzen", 5.6], ["Ablauf", 3.4], ["Kontakt", 4]];

/** Ebenen mit Tiefenlinien zur darunterliegenden Ebene (Raster hat keine) */
const PIN_CORNERS: [string, string][] = [["0%", "0%"], ["100%", "0%"], ["0%", "100%"], ["100%", "100%"]];

/**
 * „Schicht für Schicht“: Die Schritte laufen automatisch ab, sobald der Abschnitt ins Bild kommt (kein Scrollen nötig);
 * vier Ebenen in 3D klappen am Ende zur fertigen Website (Musterdesign Fliesen Reuter) zusammen. Eine GSAP-Zeitleiste,
 * Schritt folgt der Zeit. Bei reduzierter Bewegung steht direkt das Ergebnis da.
 */
export function LayerBuild() {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(1);

  useGSAP(() => {
    const root = ref.current!;
    const track = root.querySelector<HTMLElement>(".lay-track")!;
    const scene = root.querySelector<HTMLElement>(".l3-scene")!;
    const stack = root.querySelector<HTMLElement>(".l3-stack")!;
    const mm = gsap.matchMedia();
    // Ohne Bewegung: direkt das fertige Ergebnis zeigen
    mm.add("(prefers-reduced-motion: reduce)", () => { setStep(N); });

    mm.add(MOTION_OK, () => {
      root.classList.add("lay--gsap");
      const q = (s: string) => Array.from(root.querySelectorAll<HTMLElement>(s));
      const W = () => scene.offsetWidth;
      const H = () => scene.offsetHeight;
      const G = () => W() * 0.054; // Ebenenabstand = --gap (5.4cqw)
      const planes = [".pl--grid", ".pl--wire", ".pl--brand", ".pl--text"].map((s) => root.querySelector<HTMLElement>(s)!);
      const glows = planes.map((p) => p.querySelector<HTMLElement>(".pl-glow")!);
      const cursor = root.querySelector<HTMLElement>(".lay-cursor")!;
      const ring = root.querySelector<HTMLElement>(".lay-cursor__ring")!;
      const px = (f: number) => () => W() * f;
      const py = (f: number) => () => H() * f;
      // Feste Grundhaltung des Stapels (bleibt über alle vier Schritte gleich); auf Tablet und Handy flacher und kleiner
      const mob = () => window.matchMedia("(max-width: 1080px)").matches;
      const pose = () => (mob() ? { ty: "1%", rx: 34, rz: -14, s: 0.82 } : { ty: "4%", rx: 46, rz: -22, s: 0.92 });

      // Während der Animation als eigene GPU-Ebene, danach frei → Chrome rastert die Ebenen wieder gestochen scharf
      // Läuft automatisch ab, sobald der Abschnitt zur Hälfte sichtbar ist (einmalig, ohne Scrollen); ca. 2,2 s pro Schritt
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out", duration: 0.6 },
        onStart: () => stack.classList.add("is-moving"),
        onUpdate: () => setStep(Math.min(N, Math.floor(tl.time()) + 1)),
        onComplete: () => stack.classList.remove("is-moving"),
      });
      tl.timeScale(0.45);
      ScrollTrigger.create({ trigger: track, start: "top 55%", once: true, onEnter: () => tl.play() });
      const click = (at: number) => {
        tl.to(cursor, { scale: 0.86, duration: 0.06, ease: "power2.in" }, at)
          .to(cursor, { scale: 1, duration: 0.14, ease: "back.out(3)" }, at + 0.06)
          .fromTo(ring, { scale: 0.3, opacity: 0.9 }, { scale: 1.8, opacity: 0, duration: 0.35, ease: "power2.out", immediateRender: false }, at + 0.04);
      };

      const p0 = pose();
      gsap.set(stack, { "--tx": "0%", "--ty": p0.ty, "--ry": "0deg", "--rx": `${p0.rx}deg`, "--rz": `${p0.rz}deg`, "--s": p0.s });

      // 1–4: Ebenen fallen nacheinander auf den Stapel, die aktive leuchtet
      planes.forEach((p, i) => {
        tl.fromTo(p, { z: () => (i + 2.6) * G() }, { z: () => i * G(), duration: 0.75, immediateRender: true }, i + 0.05)
          .fromTo(p, { opacity: 0 }, { opacity: 1, duration: 0.22, ease: "none", immediateRender: true }, i + 0.05)
          .fromTo(glows[i], { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "none", immediateRender: true }, i + 0.3);
        if (i < 3) tl.to(glows[i], { opacity: 0, duration: 0.3, ease: "none" }, i + 1.05);
        if (i > 0) tl.fromTo(q(`.l3-pin[data-z="${i}"] i`), { scaleY: 0 }, { scaleY: 1, duration: 0.35, stagger: 0.04, immediateRender: true }, i + 0.55);
      });

      // Raster: Spalten wachsen, Maßlinie spannt sich auf; ab Schritt 3 tritt es zurück
      tl.fromTo(q(".pl-cols i"), { scaleY: 0 }, { scaleY: 1, duration: 0.5, stagger: 0.025, immediateRender: true }, 0.25)
        .fromTo(q(".pl-dim"), { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.5, immediateRender: true }, 0.55)
        .fromTo(q(".pl-cols"), { opacity: 1 }, { opacity: 0.45, duration: 0.3, ease: "none" }, 2.1);
      // Marke: Foto fährt von unten auf
      tl.fromTo(q(".b-shutter"), { yPercent: 0 }, { yPercent: -101, duration: 0.6, ease: "power2.inOut", immediateRender: true }, 2.35)
        .fromTo(q(".b-photo img"), { scale: 1.3 }, { scale: 1, duration: 0.9, immediateRender: true }, 2.35);
      // Typografie: Headline steigt zeilenweise aus der Maske
      tl.fromTo(q(".t-line > span"), { yPercent: 105 }, { yPercent: 0, duration: 0.6, stagger: 0.1, immediateRender: true }, 3.35);

      // 5: Stapel klappt zusammen und wird zum Laptop, dann Handy, Anfrage und Kontaktwege
      planes.forEach((p, i) => tl.to(p, { z: i * 0.5, duration: 0.8, ease: "power3.inOut" }, 4));
      tl.to(q(".l3-pin, .pl-chip, .pl-dim, .pl-marks"), { opacity: 0, duration: 0.2, ease: "none" }, 4)
        .to(glows[3], { opacity: 0, duration: 0.2, ease: "none" }, 4)
        .fromTo(q(".l3-floor, .l3-ground"), { opacity: 1 }, { opacity: 0, duration: 0.4, ease: "none" }, 4)
        .fromTo(stack, { "--tx": "0%", "--ty": () => pose().ty, "--ry": "0deg", "--rx": () => `${pose().rx}deg`, "--rz": () => `${pose().rz}deg`, "--s": () => pose().s },
          { "--tx": "-5%", "--ty": "-1%", "--ry": "14deg", "--rx": "4deg", "--rz": "0deg", "--s": 0.94, duration: 1, ease: "power3.inOut", immediateRender: false }, 4)
        .fromTo(q(".l3-bezel, .l3-base, .l3-cam"), { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "none" }, 4.45)
        .fromTo(q(".pl--final"), { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "none" }, 4.55)
        .fromTo(q(".l3-glare"), { xPercent: -130 }, { xPercent: 130, duration: 0.55, ease: "power2.inOut" }, 4.7)
        .fromTo(q(".lay-phone"), { opacity: 0, "--px": "40%", "--py": "10%", "--pz": "0px", "--pry": "-35deg", "--pr": "6deg" },
          { opacity: 1, "--px": "0%", "--py": "0%", "--pz": () => `${W() * 0.06}px`, "--pry": "-12deg", "--pr": "0deg", duration: 0.7 }, 4.4)
        .fromTo(q(".lay-toast"), { opacity: 0, y: -12, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }, 4.75)
        .fromTo(q(".lay-paths li"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.06 }, 4.8);

      // Designer-Cursor: begleitet jeden Schritt und löst am Ende die Anfrage aus
      tl.fromTo(cursor, { x: px(0.74), y: py(0.18), opacity: 0 }, { x: px(0.5), y: py(0.5), opacity: 1, duration: 0.7, ease: "power2.inOut", immediateRender: true }, 0.1)
        .to(cursor, { x: px(0.6), y: py(0.4), duration: 0.7, ease: "power2.inOut" }, 1.2)
        .to(cursor, { x: px(0.67), y: py(0.33), duration: 0.6, ease: "power2.inOut" }, 2.05)
        .to(cursor, { x: px(0.4), y: py(0.44), duration: 0.7, ease: "power2.inOut" }, 3.0)
        .to(cursor, { x: px(0.31), y: py(0.68), duration: 0.55, ease: "power2.inOut" }, 4.1)
        .to(cursor, { opacity: 0, duration: 0.15, ease: "none" }, 4.85);
      click(1.85); click(2.3); click(3.3); click(4.68);

      return () => { root.classList.remove("lay--gsap"); };
    });
    return () => { mm.revert(); };
  }, { scope: ref });

  const cls = Array.from({ length: step }, (_, i) => `s${i + 1}`).join(" ");

  return (
    <section ref={ref} className="lay lay--fr" id="schicht-fuer-schicht" aria-labelledby="lay-title" style={v({ "--steps": N })}>
      <div className="lay-track">
        <div className="lay-pin">
          <div className="lay__glow" aria-hidden="true" />
          <div className="container lay-grid">
            <div className="lay-left">
              <div className="lay-head">
                <SectionHeading eyebrow="Schicht für Schicht" title="So entsteht Ihre" highlight="neue Website"
                  intro="Geplant wie ein Haus: erst das Fundament, dann die Räume, dann die Einrichtung." />
              </div>
              <h3 className="sr-only" id="lay-title">Die fünf Schichten einer Website</h3>
              <ol className="lay-steps">
                {STEPS.map((s, i) => (
                  <li key={s.tag} className={`lay-step ${i + 1 === step ? "is-on" : ""} ${i + 1 < step ? "is-done" : ""}`} aria-current={i + 1 === step ? "step" : undefined}>
                    <span className="lay-step__n">{s.tag}</span>
                    <h4 className="lay-step__title">{tidy(s.title)}</h4>
                    <p className="lay-step__text">{tidy(s.text)}</p>
                    {i === N - 1 && (
                      <div className="lay-step__actions">
                        <a className="lay-step__more" href="#beispiele" data-cursor tabIndex={i + 1 === step ? 0 : -1}>Alle Beispiele <Icon name="arrow-right" size={14} /></a>
                        <small className="lay-step__note">Fliesen Reuter ist ein fiktiver Betrieb, ein Musterdesign von Pfalz Multiservice.</small>
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </div>

            <div className={`lay-stage ${cls}`} data-step={step} aria-hidden="true">
              <div className="lay-hud">
                <span key={step} className="lay-hud__n">{nn(step)} / {nn(N)}</span>
                <span key={"t" + step} className="lay-hud__t">{STEPS[step - 1].stage}</span>
                <span className="lay-hud__dots">{STEPS.map((_, i) => <i key={i} className={i < step ? "on" : ""} />)}</span>
              </div>

              <div className="l3-scene">
                <div className="l3-floor" />
                <div className="l3-tilt">
                  <div className="l3-stack">
                    <i className="l3-ground" />
                    <div className="l3-bezel" /><i className="l3-cam" /><div className="l3-base"><i className="l3-notch" /></div>
                    <GridPlane />
                    <WirePlane />
                    <BrandPlane />
                    <TextPlane />
                    {[1, 2, 3].flatMap((z) => PIN_CORNERS.map(([l, t]) => (
                      <span key={`${z}${l}${t}`} className="l3-pin" data-z={z} style={v({ "--z": z, left: l, top: t })}><i /></span>
                    )))}
                    <div className="pl pl--final" style={v({ "--z": 4 })}>
                      <Image src="/images/beispiele/fliesenleger-start.png" alt="" fill sizes="(max-width: 1080px) 92vw, 720px" />
                      <i className="l3-glare" />
                    </div>
                  </div>
                  <Phone />
                </div>

                <div className="lay-cursor">
                  <svg viewBox="0 0 20 22" width="20" height="22" aria-hidden="true">
                    <path d="M2 1.5 L2 18.5 L6.6 14.4 L9.6 21 L12.6 19.6 L9.7 13.1 L16 12.6 Z" fill="#fff" stroke="#000" strokeWidth="1.4" strokeLinejoin="round" />
                  </svg>
                  <i className="lay-cursor__ring" />
                </div>

                <div className="lay-card lay-swatch">
                  <span className="lay-swatch__title">Farbpalette</span>
                  <div className="lay-swatch__row">
                    {[["#EEECE7", "Kalkweiß"], ["#A29D95", "Betongrau"], ["#232527", "Schiefer"], ["#B6935B", "Messing"]].map(([c, n], i) => (
                      <span key={c} className="sw" style={v({ "--c": c, "--i": i })}>
                        <span className="sw__slot"><i className="sw__chip" /><b className="sw__tick"><Icon name="check" size={9} /></b></span>
                        <small>{n}</small>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="lay-card lay-type">
                  <span className="lay-type__aa">Aa</span>
                  <span><b>Archivo Expanded</b><small>JetBrains Mono</small></span>
                </div>

                <div className="lay-toast">
                  <span className="lay-toast__icon"><Icon name="mail" size={14} /></span>
                  <span><b>Neue Anfrage</b><small>Aufmaß · gerade eben</small></span>
                </div>
                <ul className="lay-paths">
                  {([["phone", "Anruf"], ["clipboard-list", "Anfrage"], ["calendar-days", "Aufmaß"]] as const).map(([ic, t], i) => (
                    <li key={t} style={v({ "--i": i })}><Icon name={ic} size={13} />{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Smartphone wie bei den Musterbeispielen: maximales Display, schmaler Rand */
function Phone() {
  return (
    <div className="lay-phone">
      <Image src="/images/beispiele/fliesenleger-mobile.png" alt="" fill sizes="170px" />
    </div>
  );
}

/** Beschriftung einer Ebene: Nummer, Name, technische Angabe; dazu Schnittmarken und Leuchtkante */
function Chip({ n, t, spec }: { n: number; t: string; spec: string }) {
  return (
    <>
      <span className="pl-chip"><b>{nn(n)}</b>{t}<small>{spec}</small></span>
      <span className="pl-marks" />
      <span className="pl-glow" />
    </>
  );
}

/** Ebene 1: Fundament mit 12-Spalten-Raster */
function GridPlane() {
  return (
    <div className="pl pl--grid" style={v({ "--z": 0, "--n": 1 })}>
      <Chip n={1} t="Raster" spec="12 Spalten · Fugenraster" />
      <div className="pl-cols">{Array.from({ length: 12 }, (_, i) => <i key={i} style={v({ "--i": i })} />)}</div>
      <span className="pl-dim"><b>1200 px</b></span>
    </div>
  );
}

/** Ebene 2: Drahtgitter mit Beschriftung */
function WirePlane() {
  return (
    <div className="pl pl--wire" style={v({ "--z": 1, "--n": 2 })}>
      <Chip n={2} t="Wireframe" spec="Navigation → Botschaft → Anfrage" />
      <div className="p-nav">
        <span className="p-logo"><i className="w" /></span>
        <span className="p-links">{LINKS.map(([l, w]) => <span key={l} style={v({ "--w": w })}><i className="w w--thin" /></span>)}</span>
        <span className="p-btn p-btn--nav w-box"><i className="w w--thin" /></span>
      </div>
      <div className="p-eyebrow"><i className="w w--thin" style={v({ "--w": 28 })} /></div>
      <div className="p-h1"><i className="w w--h1" style={v({ "--w": 37 })} /><i className="w w--h1" style={v({ "--w": 33 })} /></div>
      <div className="p-lead">{[30, 31, 28, 12].map((w, i) => <i key={i} className="w w--txt" style={v({ "--w": w })} />)}</div>
      <div className="p-ctas"><span className="p-btn p-btn--a w-box" /><span className="p-btn p-btn--b w-box" /></div>
      <div className="p-trust"><i className="w w--thin" style={v({ "--w": 22 })} /></div>
      <div className="p-img w-box w-x" />
      <em className="p-tag" style={v({ "--i": 0, top: "8%", left: "30%" })}>Navigation</em>
      <em className="p-tag" style={v({ "--i": 1, top: "41%", left: "46%" })}>Kernbotschaft</em>
      <em className="p-tag" style={v({ "--i": 2, top: "78%", left: "40%" })}>Anfrage</em>
      <em className="p-tag" style={v({ "--i": 3, top: "52%", left: "70%" })}>Bild</em>
    </div>
  );
}

/** Ebene 3: Marke – Farben, Logo, Foto (Hero-Foto von Fliesen Reuter, vollflächig) */
function BrandPlane() {
  return (
    <div className="pl pl--brand" style={v({ "--z": 2, "--n": 3 })}>
      <Chip n={3} t="Bild & Farbe" spec="4 Farben · 1 Hauptmotiv" />
      <div className="p-img b-photo"><Image src="/images/schichten/fliesen-bad.webp" alt="" fill sizes="(max-width: 1080px) 92vw, 720px" /><i className="b-shutter" /></div>
      <div className="p-strip" />
      <div className="p-nav p-nav--line">
        <span className="p-logo"><span className="p-mark" /></span>
        <span />
        <span className="p-btn p-btn--nav b-solid" />
      </div>
      <div className="p-ctas"><span className="p-btn p-btn--a b-solid" /><span className="p-btn p-btn--b b-ghost" /></div>
      <div className="p-trust p-trust--line" />
    </div>
  );
}

/** Ebene 4: Texte */
function TextPlane() {
  return (
    <div className="pl pl--text" style={v({ "--z": 3, "--n": 4 })}>
      <Chip n={4} t="Typografie" spec="Archivo Expanded · 132 / 19 / 12 px" />
      <div className="p-strip t-mono t-center">Musterdesign · Fiktiver Betrieb</div>
      <div className="p-nav">
        <span className="p-logo t-logo">Fliesen Reuter</span>
        <span className="p-links">{LINKS.map(([l, w]) => <span key={l} className="t-link" style={v({ "--w": w })}>{l}</span>)}</span>
        <span className="p-btn p-btn--nav t-btn t-btn--dark">Aufmaß anfragen</span>
      </div>
      <div className="p-h1 t-h1"><span className="t-line"><span>Fuge für</span></span><span className="t-line"><span>Fuge.</span></span><span className="t-line"><span className="t-brass">Perfekt.</span></span></div>
      <div className="p-lead t-lead">Fliesenlegermeister in zweiter Generation aus Frankenthal. Wir messen auf, Sie bekommen einen Festpreis.</div>
      <div className="p-ctas"><span className="p-btn p-btn--a t-btn t-btn--dark">Aufmaß anfragen →</span><span className="p-btn p-btn--b t-btn">Referenzen ansehen</span></div>
      <div className="p-trust t-mono">Meisterbetrieb · Festpreis nach Aufmaß · 5 Jahre Gewährleistung</div>
      <div className="p-cap t-mono">B01 · Feinsteinzeug 60 × 120 cm · Fuge 2 mm</div>
    </div>
  );
}
