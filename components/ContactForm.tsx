"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { CONTACT, SERVICES } from "@/lib/data";
import { Button } from "./Button";
import { Icon } from "./Icon";

type State = "idle" | "sending" | "sent" | "mailto";

export function ContactForm({ initial }: { initial?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("idle");
  const [ok, setOk] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");

  // Erfolgsmeldung einblenden
  useGSAP(() => {
    if (state !== "sent" && state !== "mailto") return;
    const el = ref.current!.querySelector(".success");
    gsap.timeline()
      .from(el!.querySelector(".success__badge"), { scale: 0, rotate: -120, duration: 0.9, ease: "back.out(1.8)" })
      .from(el!.querySelectorAll(".success > :not(.success__badge)"), { y: 24, opacity: 0, stagger: 0.1, duration: 0.9, ease: "expo.out" }, 0.2);
  }, { scope: ref, dependencies: [state] });

  const shake = (name: string) => {
    const f = ref.current?.querySelector(`[name="${name}"]`);
    if (f) gsap.fromTo(f, { x: -8 }, { x: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
  };

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    const errs: Record<string, string> = {};
    if (!data.name?.trim()) errs.name = "Bitte geben Sie Ihren Namen an.";
    if (!/.+@.+\..+/.test(data.email || "")) errs.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
    if (!data.message?.trim()) errs.message = "Bitte schildern Sie kurz Ihr Anliegen.";
    setErrors(errs);
    Object.keys(errs).forEach(shake);
    if (Object.keys(errs).length) return;

    setState("sending");
    setStatus("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) {
        // Erfolgreich gesendete Anfrage an die eigene Statistik melden (nur das Thema, keine Angaben zur Person)
        (window as { pmTrack?: (n: string, x?: string) => void }).pmTrack?.("anfrage", data.service);
        setState("sent");
        return;
      }
      const j = await res.json().catch(() => ({}));
      if (j.fallback) {
        // Kein Mail-Dienst konfiguriert: E-Mail-Programm mit vorausgefüllter Nachricht öffnen
        const body = `Name: ${data.name}\nUnternehmen: ${data.company || "-"}\nTelefon: ${data.phone || "-"}\nLeistungsbereich: ${data.service}\n\n${data.message}`;
        window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Anfrage: " + data.service)}&body=${encodeURIComponent(body)}`;
        setState("mailto");
        return;
      }
      throw new Error(j.error || "Senden fehlgeschlagen");
    } catch {
      setState("idle");
      setStatus(`Die Anfrage konnte nicht gesendet werden. Bitte schreiben Sie uns direkt an ${CONTACT.email} oder rufen Sie an: ${CONTACT.phone}.`);
    }
  }

  return (
    <div ref={ref} className="form-card pm-reveal" data-reveal="up">
      {state === "sent" ? (
        <div className="success" role="status">
          <span className="success__badge"><Icon name="check" size={28} /></span>
          <h3 className="success__title">Vielen <strong>Dank</strong></h3>
          <p style={{ margin: 0, font: "var(--type-body)", color: "var(--text-muted)" }}>Ihre Anfrage ist bei uns eingegangen. Wir antworten innerhalb von 24 Stunden (werktags) mit einem passenden Lösungsvorschlag.</p>
          <Button variant="outline" href="/">Zur Startseite</Button>
        </div>
      ) : state === "mailto" ? (
        <div className="success" role="status">
          <span className="success__badge"><Icon name="mail" size={26} /></span>
          <h3 className="success__title">Fast <strong>geschafft</strong></h3>
          <p style={{ margin: 0, font: "var(--type-body)", color: "var(--text-muted)" }}>
            Ihr E-Mail-Programm wurde mit Ihrer Anfrage geöffnet. Bitte senden Sie die Nachricht dort ab.
            Falls sich nichts geöffnet hat, schreiben Sie uns an <a href={`mailto:${CONTACT.email}`} style={{ color: "var(--brand-accent)" }}>{CONTACT.email}</a> oder per WhatsApp.
          </p>
          <Button variant="outline" iconLeft="message-circle" href={CONTACT.whatsapp}>WhatsApp</Button>
        </div>
      ) : (
        <form className="form-grid" onSubmit={submit} noValidate
          {...{ toolname: "kontakt_anfrage", tooldescription: "Anfrage an Pfalz Multiservice vorbereiten: Name, E-Mail und Nachricht ausfüllen. Absenden bestätigt die Person selbst." }}>
          <Field label="Name" name="name" required error={errors.name} autoComplete="name" />
          <Field label="Unternehmen" name="company" autoComplete="organization" />
          <Field label="E-Mail" name="email" type="email" required error={errors.email} autoComplete="email" />
          <Field label="Telefon" name="phone" type="tel" autoComplete="tel" />
          <label className="field full">
            <span className="field__label">Leistungsbereich</span>
            <span className="select-wrap">
              <select name="service" className="field__control" defaultValue={initial || "Allgemeine Anfrage"}>
                {["Allgemeine Anfrage", ...SERVICES.map((s) => s.title)].map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              <Icon name="chevron-down" size={18} />
            </span>
          </label>
          <div className="full">
            <Field label="Nachricht" name="message" required multiline error={errors.message} />
          </div>
          <div className="honey" aria-hidden="true">
            <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          </div>
          <label className="consent">
            <input type="checkbox" checked={ok} onChange={(e) => setOk(e.target.checked)} />
            <span className="consent__box">{ok && <Icon name="check" size={14} />}</span>
            <span>
              Ich stimme zu, dass meine Angaben zur Bearbeitung der Anfrage verwendet werden. Details in der{" "}
              <Link href="/datenschutz">Datenschutzerklärung</Link>.
            </span>
          </label>
          {status && <p className="form-status" role="alert">{status}</p>}
          <div className="form-foot">
            <span className="form-note">* Pflichtfelder</span>
            <Button type="submit" disabled={!ok || state === "sending"}>
              {state === "sending" ? "Wird gesendet …" : "Anfrage senden"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

function Field({ label, name, type = "text", required, multiline, error, autoComplete }: {
  label: string; name: string; type?: string; required?: boolean; multiline?: boolean; error?: string; autoComplete?: string;
}) {
  const cls = `field__control ${error ? "field__control--error" : ""}`;
  return (
    <label className="field">
      <span className="field__label">{label}{required && <span> *</span>}</span>
      {multiline
        ? <textarea name={name} rows={5} className={cls} aria-invalid={!!error} />
        : <input name={name} type={type} className={cls} aria-invalid={!!error} autoComplete={autoComplete} />}
      {error && <span className="field__err">{error}</span>}
    </label>
  );
}
