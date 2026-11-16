"use client";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BRIEFING, UPLOAD_ACCEPT, UPLOAD_MAX_FILES, UPLOAD_MAX_MB, UPLOAD_TYPES, type BriefingField } from "@/lib/briefing";
import { CONTACT } from "@/lib/data";
import { Button } from "../Button";
import { Icon } from "../Icon";

type Values = Record<string, string | string[]>;
type Files = Record<string, File[]>;
type Phase = { kind: "edit" } | { kind: "sending"; text: string; pct: number } | { kind: "sent"; rejected: { name: string; reason: string }[] };
/** Eine Datei an unseren Server schicken (mit Fortschritt) */
function sendFile(path: string, file: File, onProgress: (loaded: number) => void) {
  return new Promise<void>((resolve, reject) => {
    const x = new XMLHttpRequest();
    x.open("POST", "/api/briefing/upload?p=" + encodeURIComponent(path));
    x.setRequestHeader("Content-Type", "application/octet-stream");
    x.upload.onprogress = (e) => onProgress(e.loaded);
    x.onload = () => (x.status >= 200 && x.status < 300 ? resolve() : reject(new Error(x.statusText || "Upload fehlgeschlagen")));
    x.onerror = () => reject(new Error("Netzwerkfehler"));
    x.send(file);
  });
}
const newId = () => Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, "0")).join("");
/** Dateiname für den Speicher: nur sichere Zeichen */
function storeName(name: string) {
  const ext = (name.split(".").pop() || "").toLowerCase();
  const base = name.slice(0, name.length - ext.length - 1).normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "datei";
  return `${base}.${ext}`;
}
const STORE = "pm-briefing-v1";
const LAST = BRIEFING.length; // Index der Zusammenfassung

/** Gespeicherte Eingaben laden – nur im Browser dieses Geräts, kein Ablaufdatum */
function load(): { values: Values; step: number; id?: string; startedAt?: number } | null {
  try {
    const raw = window.localStorage.getItem(STORE);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function BriefingForm() {
  const top = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Values>({});
  const [files, setFiles] = useState<Files>({});
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [restored, setRestored] = useState(false);
  const [ok, setOk] = useState(false);
  const [biz, setBiz] = useState(false);
  const [notice, setNotice] = useState("");
  const startedAt = useRef(Date.now());
  const sid = useRef("");
  const [phase, setPhase] = useState<Phase>({ kind: "edit" });

  // Beim Öffnen: gespeicherten Stand wiederherstellen
  useEffect(() => {
    const saved = load();
    sid.current = saved?.id && /^[a-f0-9]{32}$/.test(saved.id) ? saved.id : newId();
    if (saved?.startedAt) startedAt.current = saved.startedAt;
    if (saved && Object.keys(saved.values || {}).length) {
      setValues(saved.values);
      setStep(Math.min(saved.step || 0, LAST));
      setRestored(true);
    }
  }, []);

  // Bei jeder Änderung zwischenspeichern (kein Zeitlimit, keine Sitzung, die abläuft)
  useEffect(() => {
    const t = window.setTimeout(() => {
      try {
        if (Object.keys(values).length) window.localStorage.setItem(STORE, JSON.stringify({ values, step, id: sid.current, startedAt: startedAt.current, savedAt: Date.now() }));
      } catch { /* Speicher nicht verfügbar – Formular funktioniert trotzdem */ }
    }, 400);
    return () => window.clearTimeout(t);
  }, [values, step]);

  const set = useCallback((id: string, v: string | string[]) => setValues((s) => ({ ...s, [id]: v })), []);
  const str = (id: string) => (typeof values[id] === "string" ? (values[id] as string) : "");
  const arr = (id: string) => (Array.isArray(values[id]) ? (values[id] as string[]) : []);

  const goto = (n: number) => {
    setStep(n);
    setNotice("");
    requestAnimationFrame(() => top.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  // Pflichtangaben aus Schritt 01 prüfen
  const checkContact = () => {
    const e: Record<string, string> = {};
    if (!str("firma").trim()) e.firma = "Bitte geben Sie den Firmennamen an.";
    if (!str("ansprechpartner").trim()) e.ansprechpartner = "Bitte geben Sie eine Ansprechperson an.";
    const mail = str("email").trim(), tel = str("telefon").trim();
    if (!mail && !tel) e.email = e.telefon = "Bitte geben Sie eine E-Mail-Adresse oder eine Telefonnummer an.";
    if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) e.email = "Diese E-Mail-Adresse sieht nicht vollständig aus.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 0 && !checkContact()) return;
    if (step === LAST - 1 && !str("ausfuellende").trim() && str("ansprechpartner")) set("ausfuellende", str("ansprechpartner"));
    goto(Math.min(step + 1, LAST));
  };

  const reset = () => {
    try { window.localStorage.removeItem(STORE); } catch { /* egal */ }
    sid.current = newId(); startedAt.current = Date.now();
    setValues({}); setFiles({}); setErrors({}); setRestored(false); setOk(false); goto(0);
  };

  const fileCount = useMemo(() => Object.values(files).reduce((n, l) => n + l.length, 0), [files]);

  const addFiles = (id: string, list: FileList | File[]) => {
    const add: File[] = [];
    const problems: string[] = [];
    for (const f of Array.from(list)) {
      const ext = f.name.split(".").pop()?.toLowerCase() || "";
      if (!UPLOAD_TYPES[ext]) problems.push(`„${f.name}“: Dieses Format nehmen wir aus Sicherheitsgründen nicht an.`);
      else if (f.size > UPLOAD_MAX_MB * 1024 * 1024) problems.push(`„${f.name}“ ist größer als ${UPLOAD_MAX_MB} MB.`);
      else if (fileCount + add.length >= UPLOAD_MAX_FILES) problems.push(`Höchstens ${UPLOAD_MAX_FILES} Dateien insgesamt.`);
      else add.push(f);
    }
    if (add.length) setFiles((s) => ({ ...s, [id]: [...(s[id] || []), ...add] }));
    setErrors((e) => ({ ...e, [id]: problems.join(" ") }));
  };
  const removeFile = (id: string, i: number) => setFiles((s) => ({ ...s, [id]: (s[id] || []).filter((_, k) => k !== i) }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phase.kind === "sending") return;
    if (!checkContact()) { goto(0); return; }
    if (!ok) { setNotice("Bitte bestätigen Sie noch die Datenschutzerklärung."); return; }
    if (!biz) { setNotice("Bitte bestätigen Sie, dass Sie als Unternehmer anfragen."); return; }
    const honey = (e.currentTarget as HTMLFormElement).querySelector<HTMLInputElement>('input[name="website"]')?.value || "";
    setNotice("");

    // 1) Dateien direkt in den sicheren Speicher hochladen (je Datei eine eigene Freigabe)
    const all = Object.entries(files).flatMap(([field, list]) => list.map((file) => ({ field, file })));
    const total = all.reduce((n, x) => n + x.file.size, 0) || 1;
    let done = 0;
    const failed: string[] = [];
    for (let i = 0; i < all.length; i++) {
      const { field, file } = all[i];
      const label = `Datei ${i + 1} von ${all.length} wird hochgeladen …`;
      setPhase({ kind: "sending", text: label, pct: Math.round((done / total) * 90) });
      try {
        await sendFile(`briefing/${sid.current}/${field}/${storeName(file.name)}`, file,
          (loaded) => setPhase({ kind: "sending", text: label, pct: Math.round(((done + loaded) / total) * 90) }));
      } catch {
        failed.push(file.name);
      }
      done += file.size;
    }
    if (failed.length) {
      setPhase({ kind: "edit" });
      setNotice(`Diese Dateien konnten nicht hochgeladen werden: ${failed.join(", ")}. Entfernen Sie sie oder senden Sie sie später per WhatsApp/E-Mail – Ihre Angaben bleiben gespeichert.`);
      return;
    }

    // 2) Antworten absenden
    setPhase({ kind: "sending", text: "Briefing wird gesendet …", pct: 95 });
    try {
      const res = await fetch("/api/briefing", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: sid.current, startedAt: startedAt.current, website: honey, values }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Senden fehlgeschlagen");
      try { window.localStorage.removeItem(STORE); } catch { /* egal */ }
      setPhase({ kind: "sent", rejected: j.rejected || [] });
      requestAnimationFrame(() => top.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    } catch (err) {
      setPhase({ kind: "edit" });
      setNotice(`${err instanceof Error ? err.message : "Senden fehlgeschlagen"}. Ihre Angaben bleiben auf diesem Gerät gespeichert. Versuchen Sie es erneut oder melden Sie sich unter ${CONTACT.phone}.`);
    }
  };

  if (phase.kind === "sent") {
    return (
      <div className="bf" ref={top}>
        <div className="bf__card bf__done" role="status">
          <span className="success__badge"><Icon name="check" size={28} /></span>
          <h2 className="bf__title">Vielen Dank!</h2>
          <p className="bf__note">Ihr Website-Briefing ist bei uns eingegangen. Wir melden uns innerhalb von 24 Stunden (werktags) mit einem unverbindlichen Vorschlag und Festpreis bei Ihnen.
            {str("email") ? " Eine Kopie Ihrer Angaben haben wir Ihnen per E-Mail geschickt." : ""}</p>
          {phase.rejected.length > 0 && (
            <p className="bf__warn"><Icon name="file-check" size={18} />Diese Dateien haben wir aus Sicherheitsgründen nicht angenommen: {phase.rejected.map((r) => `${r.name} (${r.reason})`).join(", ")}. Schicken Sie sie gern per WhatsApp oder E-Mail.</p>
          )}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
            <Button variant="accent" iconLeft="message-circle" href={CONTACT.whatsapp}>WhatsApp</Button>
            <Button variant="outline" iconLeft="mail" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</Button>
          </div>
        </div>
      </div>
    );
  }

  const section = BRIEFING[step];
  const pct = Math.round((Math.min(step, LAST) / LAST) * 100);

  return (
    <div className="bf" ref={top}>
      {/* Fortschritt */}
      <div className="bf__progress" aria-live="polite">
        <div className="bf__progress-row">
          <span className="bf__progress-label">{step < LAST ? `Schritt ${step + 1} von ${LAST}` : "Zusammenfassung"}</span>
          <span className="bf__progress-saved"><Icon name="check" size={14} /> Wird auf diesem Gerät gespeichert</span>
        </div>
        <div className="bf__bar" role="progressbar" aria-label="Fortschritt" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}><span style={{ width: `${pct}%` }} /></div>
        <ol className="bf__dots" aria-label="Abschnitte">
          {BRIEFING.map((s, i) => (
            <li key={s.nr}>
              <button type="button" className={`bf__dot ${i === step ? "is-on" : ""} ${i < step ? "is-done" : ""}`} onClick={() => (i === 0 || checkContact()) && goto(i)}
                aria-label={`${s.nr} ${s.title}`} aria-current={i === step ? "step" : undefined}>{s.nr}</button>
            </li>
          ))}
        </ol>
      </div>

      {restored && step < LAST && (
        <div className="bf__restored" role="status">
          <span>Willkommen zurück – Ihre bisherigen Eingaben sind noch da.</span>
          <button type="button" onClick={reset}>Neu beginnen</button>
        </div>
      )}

      <form className="bf__card" onSubmit={submit} noValidate>
        <div className="honey" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>

        {step < LAST ? (
          <fieldset className="bf__section" key={section.nr}>
            <legend className="bf__head">
              <span className="bf__nr">{section.nr}</span>
              <span className="bf__title">{section.title}</span>
            </legend>
            {section.note && <p className="bf__note">{section.note}</p>}
            {section.warn && <p className="bf__warn"><Icon name="file-check" size={18} />{section.warn}</p>}
            <div className="bf__grid">
              {section.fields.map((f) => {
                if ("showIf" in f && f.showIf && !arr(f.showIf[0]).includes(f.showIf[1])) return null;
                return (
                  <FieldView key={f.id} f={f} value={values[f.id]} other={str(f.id + "__other")} error={errors[f.id]}
                    onChange={(v) => set(f.id, v)} onOther={(v) => set(f.id + "__other", v)}
                    files={files[f.id] || []} onFiles={(l) => addFiles(f.id, l)} onRemove={(i) => removeFile(f.id, i)} />
                );
              })}
            </div>
          </fieldset>
        ) : (
          <Summary values={values} files={files} onEdit={goto} ok={ok} setOk={setOk} biz={biz} setBiz={setBiz} />
        )}

        {notice && <p className="bf__notice" role="alert">{notice}</p>}
        {phase.kind === "sending" && (
          <div className="bf__sending" role="status" aria-live="polite">
            <span>{phase.text}</span>
            <div className="bf__bar"><span style={{ width: `${phase.pct}%` }} /></div>
            <span className="bf__hint">Bitte die Seite nicht schließen.</span>
          </div>
        )}

        <div className="bf__nav">
          {step > 0 ? (
            <button type="button" className="bf__back" onClick={() => goto(step - 1)}><Icon name="arrow-right" size={16} className="bf__back-icon" /> Zurück</button>
          ) : <span />}
          {step < LAST
            ? <Button type="button" icon="arrow-right" onClick={next}>{step === LAST - 1 ? "Zur Zusammenfassung" : "Weiter"}</Button>
            : <Button type="submit" icon="arrow-right" disabled={!ok || !biz || phase.kind === "sending"}>{phase.kind === "sending" ? "Wird gesendet …" : "Briefing absenden"}</Button>}
        </div>
      </form>

      <p className="bf__help">
        Fragen beim Ausfüllen? Rufen Sie an unter <a href={CONTACT.phoneHref}>{CONTACT.phone}</a> oder schreiben Sie per{" "}
        <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
      </p>
    </div>
  );
}

function FieldView({ f, value, other, error, onChange, onOther, files, onFiles, onRemove }: {
  f: BriefingField; value: string | string[] | undefined; other: string; error?: string;
  onChange: (v: string | string[]) => void; onOther: (v: string) => void;
  files: File[]; onFiles: (l: FileList | File[]) => void; onRemove: (i: number) => void;
}) {
  const id = `bf-${f.id}`;
  const hintId = f.hint ? `${id}-hint` : undefined;
  const errId = error ? `${id}-err` : undefined;
  const describedBy = [hintId, errId].filter(Boolean).join(" ") || undefined;

  if (f.kind === "check") {
    const sel = Array.isArray(value) ? value : [];
    const toggle = (o: string) => onChange(sel.includes(o) ? sel.filter((x) => x !== o) : [...sel, o]);
    return (
      <fieldset className="bf__field bf__field--full">
        <legend className="field__label">{f.label}</legend>
        {f.hint && <span className="bf__hint" id={hintId}>{f.hint}</span>}
        <div className="bf__checks">
          {f.options.map((o) => (
            <label key={o} className={`bf__check ${sel.includes(o) ? "is-on" : ""}`}>
              <input type="checkbox" checked={sel.includes(o)} onChange={() => toggle(o)} />
              <span className="bf__box">{sel.includes(o) && <Icon name="check" size={14} />}</span>
              <span>{o}</span>
            </label>
          ))}
        </div>
        {f.other && (
          <label className="bf__other">
            <span className="bf__hint">Sonstiges</span>
            <input className="field__control" value={other} onChange={(e) => onOther(e.target.value)} />
          </label>
        )}
      </fieldset>
    );
  }

  if (f.kind === "files") return <FileDrop id={id} label={f.label} files={files} error={error} onFiles={onFiles} onRemove={onRemove} />;

  const v = typeof value === "string" ? value : "";
  const area = f.kind === "area" || f.kind === "areaLarge";
  return (
    <div className={`bf__field ${area ? "bf__field--full" : ""}`}>
      <label className="field__label" htmlFor={id}>{f.label}{"required" in f && f.required && <span> *</span>}</label>
      {f.hint && <span className="bf__hint" id={hintId}>{f.hint}</span>}
      {area ? (
        <textarea id={id} className={`field__control bf__area ${f.kind === "areaLarge" ? "bf__area--lg" : ""}`} value={v}
          onChange={(e) => onChange(e.target.value)} aria-describedby={describedBy} rows={f.kind === "areaLarge" ? 5 : 3} />
      ) : (
        <input id={id} className={`field__control ${error ? "field__control--error" : ""}`} value={v} onChange={(e) => onChange(e.target.value)}
          type={f.kind === "url" ? "text" : f.kind} inputMode={f.kind === "url" ? "url" : undefined} aria-invalid={!!error} aria-describedby={describedBy}
          autoComplete={({ firma: "organization", ansprechpartner: "name", email: "email", telefon: "tel", strasse: "street-address", ort: "address-level2" } as Record<string, string>)[f.id]} />
      )}
      {error && <span className="field__err" id={errId}>{error}</span>}
    </div>
  );
}

function FileDrop({ id, label, files, error, onFiles, onRemove }: {
  id: string; label: string; files: File[]; error?: string; onFiles: (l: FileList | File[]) => void; onRemove: (i: number) => void;
}) {
  const [over, setOver] = useState(false);
  return (
    <div className="bf__field bf__field--full">
      <span className="field__label" id={`${id}-l`}>{label}</span>
      <label className={`bf__drop ${over ? "is-over" : ""}`} htmlFor={id}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); onFiles(e.dataTransfer.files); }}>
        <Icon name="arrow-up" size={20} />
        <span><b>Dateien auswählen</b> oder hierher ziehen</span>
        <span className="bf__hint">PDF, Bilder, Office, ZIP · je Datei bis {UPLOAD_MAX_MB} MB</span>
        <input id={id} type="file" multiple accept={UPLOAD_ACCEPT} aria-labelledby={`${id}-l`}
          onChange={(e) => { if (e.target.files) onFiles(e.target.files); e.target.value = ""; }} />
      </label>
      {files.length > 0 && (
        <ul className="bf__files">
          {files.map((f, i) => (
            <li key={f.name + i}>
              <span>{f.name}</span><span className="bf__hint">{(f.size / 1024 / 1024).toFixed(1)} MB</span>
              <button type="button" onClick={() => onRemove(i)} aria-label={`${f.name} entfernen`}><Icon name="x" size={16} /></button>
            </li>
          ))}
        </ul>
      )}
      {error && <span className="field__err">{error}</span>}
    </div>
  );
}

function Summary({ values, files, onEdit, ok, setOk, biz, setBiz }: {
  values: Values; files: Files; onEdit: (n: number) => void; ok: boolean; setOk: (b: boolean) => void; biz: boolean; setBiz: (b: boolean) => void;
}) {
  const show = (f: BriefingField) => {
    if (f.kind === "files") return (files[f.id] || []).map((x) => x.name).join(", ");
    const v = values[f.id];
    const o = values[f.id + "__other"];
    const list = Array.isArray(v) ? [...v] : v ? [v] : [];
    if (typeof o === "string" && o.trim()) list.push(`Sonstiges: ${o}`);
    return list.join(" · ");
  };
  return (
    <div className="bf__section">
      <div className="bf__head"><span className="bf__nr">✓</span><span className="bf__title">Alles prüfen & absenden</span></div>
      <p className="bf__note">Bitte prüfen Sie Ihre Angaben. Mit „Ändern“ springen Sie direkt zum Abschnitt.</p>
      <div className="bf__sum">
        {BRIEFING.map((s, i) => (
          <section key={s.nr} className="bf__sum-sec">
            <header><span className="bf__nr">{s.nr}</span><h3>{s.title}</h3><button type="button" onClick={() => onEdit(i)}>Ändern</button></header>
            <dl>
              {s.fields.map((f) => (
                <div key={f.id}><dt>{f.label}</dt><dd className={show(f) ? "" : "is-empty"}>{show(f) || "–"}</dd></div>
              ))}
            </dl>
          </section>
        ))}
      </div>
      <label className="consent bf__consent">
        <input type="checkbox" checked={ok} onChange={(e) => setOk(e.target.checked)} />
        <span className="consent__box">{ok && <Icon name="check" size={14} />}</span>
        <span>Ich habe die <Link href="/datenschutz">Datenschutzerklärung</Link> gelesen und bin einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage verwendet werden. *</span>
      </label>
      <label className="consent bf__consent">
        <input type="checkbox" checked={biz} onChange={(e) => setBiz(e.target.checked)} />
        <span className="consent__box">{biz && <Icon name="check" size={14} />}</span>
        <span>Ich frage als Unternehmer (§ 14 BGB) an, also gewerblich oder selbstständig, nicht als Verbraucher. *</span>
      </label>
      <p className="bf__note">Mit dem Absenden entsteht noch kein Auftrag – Sie erhalten zuerst ein unverbindliches Angebot.</p>
    </div>
  );
}
