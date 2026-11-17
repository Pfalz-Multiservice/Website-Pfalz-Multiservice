"use client";
import { useId, useState, type CSSProperties } from "react";
import { tidy } from "@/lib/typo";
import { Button } from "../Button";
import { Icon } from "../Icon";

/** Auswahlstufen für den Ertrag je Auftrag: unten fein, oben grob */
const WERTE = [100, 150, 200, 250, 300, 400, 500, 600, 750, 1000, 1250, 1500, 2000, 2500, 3000, 4000, 5000, 7500, 10000, 15000, 20000];
/** Wartung Premium (Stufe „Mehr Anfragen“), Preis laut Preisliste */
const PREMIUM = 99;

const nf = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 1 });
const zahl = (n: number) => nf.format(n);
const euro = (n: number) => `${nf.format(Math.round(n))} €`;
/** Kleine Werte mit einer Nachkommastelle, große gerundet */
const menge = (n: number) => zahl(n < 10 ? Math.round(n * 10) / 10 : Math.round(n));

type Werte = { besucher: number; heute: number; danach: number; quote: number; wert: number };

function Regler({ label, sub, hint, value, min, max, step, text, onChange }: {
  label: string; sub?: string; hint?: string; value: number; min: number; max: number; step: number; text: string; onChange: (v: number) => void;
}) {
  const id = useId();
  const p = ((value - min) / (max - min)) * 100;
  return (
    <div className="rechner__field">
      <div className="rechner__row">
        <label htmlFor={id} className="rechner__label">{label}{sub && <small className="rechner__sub">{sub}</small>}</label>
        <output htmlFor={id} className="rechner__value">{text}</output>
      </div>
      <input id={id} type="range" className="rechner__range" min={min} max={max} step={step} value={value}
        aria-valuetext={text} style={{ "--p": `${p}%` } as CSSProperties}
        onChange={(e) => onChange(Number(e.target.value))} data-cursor />
      {hint && <p className="rechner__hint">{hint}</p>}
    </div>
  );
}

/** Rechner zum Abschnitt „Rechenbeispiel“: Besucher, Anteil der Anfragen heute und danach, Abschlüsse und Ertrag je Auftrag */
export function AnfragenRechner({ wert = 2500 }: { wert?: number }) {
  const start: Werte = { besucher: 200, heute: 2, danach: 4, quote: 3, wert };
  const [v, setV] = useState<Werte>(start);
  const set = (patch: Partial<Werte>) => setV((old) => ({ ...old, ...patch }));

  const anfragenHeute = (v.besucher * v.heute) / 100;
  const anfragenDanach = (v.besucher * v.danach) / 100;
  const mehrAnfragen = anfragenDanach - anfragenHeute;
  const mehrAuftraege = (mehrAnfragen * v.quote) / 10;
  const mehrErtrag = mehrAuftraege * v.wert;
  const monate = Math.floor(v.wert / PREMIUM);
  const geaendert = (Object.keys(start) as (keyof Werte)[]).some((k) => v[k] !== start[k]);
  const breite = (n: number) => `${Math.max(4, (n / Math.max(anfragenDanach, anfragenHeute, 1)) * 100)}%`;

  return (
    <div className="rechner-hold">
    <div className="rechner pm-reveal" data-reveal="up">
      <div className="rechner__inputs">
        <p className="rechner__title">Ihre Zahlen</p>
        <Regler label="Besucher im Monat" value={v.besucher} min={50} max={3000} step={50} text={zahl(v.besucher)}
          onChange={(n) => set({ besucher: n })} />
        <Regler label="Heute fragen an" sub="Conversion Rate" value={v.heute} min={0.5} max={10} step={0.5} text={`${zahl(v.heute)} von 100`}
          onChange={(n) => set({ heute: n, danach: Math.max(n, v.danach) })} />
        <Regler label="Mit besserer Website" sub="Conversion Rate" value={v.danach} min={0.5} max={10} step={0.5} text={`${zahl(v.danach)} von 100`}
          onChange={(n) => set({ danach: n, heute: Math.min(n, v.heute) })} />
        <Regler label="Daraus werden Aufträge" value={v.quote} min={1} max={10} step={1} text={`${v.quote} von 10`}
          hint="So viele von zehn Anfragen werden bei Ihnen zum Auftrag."
          onChange={(n) => set({ quote: n })} />
        <Regler label="Ein Auftrag bringt Ihnen" value={Math.max(0, WERTE.indexOf(v.wert))} min={0} max={WERTE.length - 1} step={1} text={euro(v.wert)}
          hint="Was nach Material und Kosten im Schnitt übrig bleibt."
          onChange={(i) => set({ wert: WERTE[i] })} />
        <button type="button" className="rechner__reset" onClick={() => setV(start)} disabled={!geaendert} data-cursor>
          <Icon name="refresh-cw" size={15} /><span className="rechner__wide">Beispielwerte&nbsp;</span>zurücksetzen
        </button>
      </div>

      <div className="rechner__result" role="group" aria-label="Ergebnis der Rechnung">
        <p className="rechner__title">Anfragen im Monat</p>
        <div className="rechner__bars">
          <div className="rechner__bar">
            <span className="rechner__bar-label">Heute</span>
            <span className="rechner__bar-track"><span className="rechner__bar-fill" style={{ width: breite(anfragenHeute) }} /></span>
            <b className="rechner__bar-num">{menge(anfragenHeute)}</b>
          </div>
          <div className="rechner__bar rechner__bar--gold">
            <span className="rechner__bar-label">Danach</span>
            <span className="rechner__bar-track"><span className="rechner__bar-fill" style={{ width: breite(anfragenDanach) }} /></span>
            <b className="rechner__bar-num">{menge(anfragenDanach)}</b>
          </div>
        </div>

        <dl className="rechner__stats">
          <div><dt><span className="rechner__wide">Zusätzliche </span>Anfragen</dt><dd>+{menge(mehrAnfragen)}</dd></div>
          <div><dt><span className="rechner__wide">Zusätzliche </span>Aufträge</dt><dd>+{menge(mehrAuftraege)}</dd></div>
        </dl>

        <div className="rechner__sum" aria-live="polite">
          <span className="rechner__sum-label">Möglicher Mehrertrag im Monat</span>
          <b className="rechner__sum-value">{euro(mehrErtrag)}</b>
        </div>

        <div className="rechner__versus">
          <p className="rechner__payoff">
            <Icon name="check" size={18} />
            <span>{monate >= 3
              ? <>Ein einzelner Auftrag deckt die Kosten <b>um ein Vielfaches</b>.</>
              : <>Ein zusätzlicher Auftrag im Monat deckt die Kosten für Wartung Premium.</>}</span>
          </p>
        </div>

        <Button variant="accent" icon="arrow-right" href="/kontakt?leistung=web" fullWidth>Kostenloses Angebot</Button>
        <p className="rechner__note">Ein Rechenmodell mit Ihren Annahmen, keine Zusage.<span className="rechner__wide"> {tidy("Ihre echten Zahlen sehen Sie ab Wartung Pro in Ihrem Statistik-Dashboard.")}</span></p>
      </div>
    </div>
    </div>
  );
}
