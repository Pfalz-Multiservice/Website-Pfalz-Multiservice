"use client";
import { useEffect, useRef, useState } from "react";
import { CONTACT, type IconName } from "@/lib/data";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { Eyebrow } from "../Eyebrow";
import { InView } from "../motion/InView";
import { KnxPlayground } from "./KnxPlayground";

/* Inhalte wie in der KNX-Anzeige von Pfalz Multiservice */
const POINTS = ["Szenen, Zeitschaltungen und Automatisierungen", "Neue Geräte in Ihre Anlage einbinden", "Fehlersuche und Umprogrammierung"];

const CASES: { icon: IconName; title: string; text: string }[] = [
  { icon: "lightbulb", title: "Lichtszenen & Zeitschaltungen", text: "anpassen oder neu anlegen" },
  { icon: "blinds", title: "Jalousien & Beschattung", text: "Steuerung ändern und verbessern" },
  { icon: "circle-plus", title: "Neue Geräte einbinden", text: "in Ihre bestehende Anlage" },
  { icon: "refresh-cw", title: "Funktionen umprogrammieren", text: "wenn etwas nicht mehr wie gewünscht läuft" },
  { icon: "search", title: "Fehlersuche", text: "wenn die Anlage nicht mehr richtig reagiert" },
  { icon: "shield-check", title: "Projektdatei sichern", text: "Backup Ihrer KNX-Programmierung" },
];

const STEPS: [string, string][] = [
  ["Anliegen schildern", "Per WhatsApp oder Formular kurz beschreiben, was gewünscht ist."],
  ["Ehrliche Einschätzung", "Wir sagen Ihnen, was möglich ist und was nicht."],
  ["Festpreis vorab", "Änderungen ab 59 €. Sie wissen vorher, was es kostet."],
  ["Umsetzung & Test", "Programmierung, Funktionstest und Übergabe."],
];

/** Zählt beim Erscheinen von 0 auf den Zielwert hoch */
function CountUp({ to, duration = 1200 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    setVal(0);
    let raf = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    const fail = window.setTimeout(() => setVal(to), 6000);
    return () => { io.disconnect(); cancelAnimationFrame(raf); window.clearTimeout(fail); };
  }, [to, duration]);
  return <span ref={ref}>{val}</span>;
}

/** Animierte KNX-Linie: ein Telegramm läuft über den Bus und schaltet nacheinander die Teilnehmer */
function KnxBus() {
  return (
    <div className="knx-bus" aria-hidden="true">
      <div className="knx-bus__head">
        <span className="knx-bus__live" /> KNX-Linie 1.1 <span className="knx-bus__sub">Busmonitor</span>
      </div>
      <div className="knx-bus__body">
        <span className="knx-bus__line" />
        <span className="knx-bus__pulse" />
        <div className="knx-node knx-node--src">
          <span className="knx-node__ic"><Icon name="sliders-horizontal" size={18} /></span>
          <span className="knx-node__txt"><b>Taster Wohnen</b><small>PA 1.1.12 · Tastsensor</small></span>
          <span className="knx-node__state">Szene „Abend“</span>
        </div>
        <div className="knx-node knx-node--1">
          <span className="knx-node__ic"><Icon name="lightbulb" size={18} /></span>
          <span className="knx-node__txt"><b>Licht Wohnzimmer</b><small>PA 1.1.3 · Dimmaktor</small></span>
          <span className="knx-node__state"><i className="s0">aus</i><i className="s1">40 %</i></span>
        </div>
        <div className="knx-node knx-node--2">
          <span className="knx-node__ic"><Icon name="blinds" size={18} /></span>
          <span className="knx-node__txt"><b>Jalousie Süd</b><small>PA 1.1.7 · Jalousieaktor</small></span>
          <span className="knx-node__state"><i className="s0">offen</i><i className="s1">50 %</i></span>
          <span className="knx-node__blind"><span /></span>
        </div>
        <div className="knx-node knx-node--3">
          <span className="knx-node__ic"><Icon name="thermometer" size={18} /></span>
          <span className="knx-node__txt"><b>Heizung Wohnen</b><small>PA 1.1.9 · Raumregler</small></span>
          <span className="knx-node__state"><i className="s0">19,0 °C</i><i className="s1">21,5 °C</i></span>
        </div>
      </div>
      <div className="knx-log">
        <span className="knx-log__l l1"><b>1/1/13</b> EG Wohnen Licht Dimmwert → 40 %</span>
        <span className="knx-log__l l2"><b>2/1/12</b> EG Wohnen Raffstore Position → 50 %</span>
        <span className="knx-log__l l3"><b>3/1/10</b> EG Wohnen Sollwert → 21,5 °C</span>
      </div>
    </div>
  );
}

export function KnxSections({ text, legal }: { text: string; legal?: string }) {
  return (
    <>
      {/* Einstieg: Botschaft, Preis, Haken + Live-Bus */}
      <section className="section knx-intro">
        <div className="container knx-intro__grid">
          <InView className="knx-intro__copy">
            <Eyebrow>KNX · Programmierung & Änderung</Eyebrow>
            <h2 className="knx-title">Ihre KNX-Anlage soll etwas <span className="knx-hl">Neues</span> können?</h2>
            <p className="knx-lead">{text}</p>
            <div className="knx-price">
              <span className="knx-price__lbl">Änderungen ab</span>
              <span className="knx-price__val"><CountUp to={59} /> €</span>
            </div>
            <ul className="knx-checks">
              {POINTS.map((p) => (
                <li key={p}>
                  <span className="knx-checks__box"><Icon name="check" size={16} /></span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="knx-actions">
              <Button variant="accent" iconLeft="message-circle" href={CONTACT.whatsapp}>Anliegen per WhatsApp schildern</Button>
              <Button variant="outline" icon="arrow-right" href="/kontakt?leistung=smarthome">Anfrage senden</Button>
            </div>
          </InView>
          <InView className="knx-intro__vis" threshold={0.3}>
            <KnxBus />
          </InView>
        </div>
      </section>

      {/* Selbst ausprobieren: Taster schaltet Licht, Szene und Raffstore */}
      <section className="section section--alt knx-play" id="ausprobieren">
        <div className="container">
          <div className="knx-head">
            <h2 className="knx-title knx-title--sec">Probieren Sie es <span className="knx-hl">aus</span></h2>
            <p className="knx-sub">Licht, Lichtfarbe, Raffstore und Temperatur: ein Tastendruck, ein Telegramm auf dem Bus, und der Raum reagiert. So fühlt sich eine gut programmierte Anlage an.</p>
          </div>
          <InView className="knx-play__in" threshold={0.15}><KnxPlayground /></InView>
        </div>
      </section>

      {/* Typische Anliegen */}
      <section className="section" id="anliegen">
        <div className="container">
          <div className="knx-head">
            <h2 className="knx-title knx-title--sec">Typische <span className="knx-hl">Anliegen</span></h2>
            <p className="knx-sub">Dafür sind wir bei bestehenden KNX-Anlagen da:</p>
          </div>
          <InView className="knx-cases" threshold={0.15}>
            {CASES.map((c) => (
              <div key={c.title} className="knx-case">
                <span className="knx-case__ic"><Icon name={c.icon} size={26} /></span>
                <span className="knx-case__txt"><b>{c.title}</b><span>{c.text}</span></span>
              </div>
            ))}
          </InView>
        </div>
      </section>

      {/* Ablauf */}
      <section className="section section--alt" id="ablauf">
        <div className="container">
          <div className="knx-head">
            <h2 className="knx-title knx-title--sec">So läuft&apos;s <span className="knx-hl">ab</span></h2>
          </div>
          <InView className="knx-steps" threshold={0.2}>
            <span className="knx-steps__line" aria-hidden="true" />
            {STEPS.map(([t, x], i) => (
              <div key={t} className="knx-step">
                <span className="knx-step__n">{String(i + 1).padStart(2, "0")}</span>
                <b className="knx-step__t">{t}</b>
                <span className="knx-step__x">{x}</span>
              </div>
            ))}
          </InView>
          <InView className="knx-file">
            <div className="knx-file__q">Projektdatei <span>vorhanden?</span></div>
            <p className="knx-file__a">Super! Wenn nicht, finden wir eine Lösung.</p>
          </InView>
          <p className="knx-note">Wir programmieren und ändern bestehende Anlagen. Elektroinstallation gehört nicht zu unserem Angebot.</p>
          {legal && <p className="svc-legal" style={{ marginTop: 8 }}>{legal}</p>}
        </div>
      </section>
    </>
  );
}
