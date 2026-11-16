import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { putText, remove } from "@/lib/briefing-store";
import { BRIEFING, type BriefingField } from "@/lib/briefing";
import { FILE_TTL_DAYS, ID_RE, filesOf, inspect, ipOf, limited, parsePath, sameOrigin, sign } from "@/lib/briefing-server";
import { SITE } from "@/lib/site";
import { customerMail } from "@/lib/briefing-mail";
import { EMAIL_LOGO_PNG_BASE64 } from "@/lib/email-logo";

export const runtime = "nodejs";
export const maxDuration = 60;

type Values = Record<string, string | string[]>;

/**
 * Website-Briefing absenden: prüft Angaben und hochgeladene Dateien, schickt alles gegliedert
 * per E-Mail über das eigene Strato-Postfach (wie das Kontaktformular) und dem Kunden eine Kopie.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Nicht erlaubt" }, { status: 403 });
  if (limited("send:" + ipOf(req), 5, 60 * 60 * 1000)) return NextResponse.json({ error: "Zu viele Absendungen. Bitte später erneut versuchen." }, { status: 429 });

  const raw = await req.text();
  if (raw.length > 400_000) return NextResponse.json({ error: "Zu viel Text" }, { status: 413 });
  let data: { id?: string; startedAt?: number; website?: string; values?: Values };
  try { data = JSON.parse(raw); } catch { return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 }); }

  // Spamschutz: verstecktes Feld und Mindestzeit (niemand füllt das Briefing in 5 Sekunden aus)
  if (data.website) return NextResponse.json({ ok: true });
  if (!data.startedAt || Date.now() - Number(data.startedAt) < 5000) return NextResponse.json({ error: "Bitte nehmen Sie sich etwas Zeit zum Ausfüllen." }, { status: 422 });

  const id = String(data.id || "");
  const v: Values = {};
  for (const [k, val] of Object.entries(data.values || {})) {
    if (Array.isArray(val)) v[k] = val.slice(0, 40).map((x) => String(x).slice(0, 300));
    else v[k] = String(val ?? "").slice(0, 20_000);
  }
  const s = (k: string) => (typeof v[k] === "string" ? (v[k] as string).trim() : "");
  const oneLine = (x: string) => x.replace(/[\r\n]+/g, " ").trim();
  const firma = oneLine(s("firma")).slice(0, 200);
  const person = oneLine(s("ansprechpartner")).slice(0, 200);
  const email = oneLine(s("email")).slice(0, 200);
  const tel = oneLine(s("telefon")).slice(0, 100);
  const validMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!firma || !person || (!validMail && !tel)) return NextResponse.json({ error: "Firmenname, Ansprechpartner und E-Mail oder Telefon fehlen." }, { status: 422 });

  const user = process.env.SMTP_USER, pass = process.env.SMTP_PASS;
  if (!user || !pass) return NextResponse.json({ error: "Der Versand ist noch nicht eingerichtet." }, { status: 503 });

  // Links in der E-Mail zeigen auf genau die Website, über die abgeschickt wurde (Live oder Vorschau)
  const host = req.headers.get("x-forwarded-host") || new URL(req.url).host;
  const base = /(^|\.)pfalz-multiservice\.de$/.test(host) ? SITE : host.endsWith(".vercel.app") || host.startsWith("localhost") ? `${host.startsWith("localhost") ? "http" : "https"}://${host}` : SITE;

  /* ---------- Dateien prüfen ---------- */
  type Checked = { field: string; name: string; size: number; link?: string; rejected?: string };
  const files: Checked[] = [];
  if (ID_RE.test(id)) {
    const stored = (await filesOf(id).catch(() => [])).filter((b) => !b.pathname.endsWith("_abgeschickt.json"));
    for (const b of stored) {
      const p = parsePath(b.pathname);
      const name = b.pathname.split("/").pop() || "datei";
      if (!p) { await remove(b.pathname).catch(() => {}); continue; }
      const reason = await inspect(b.pathname, p.ext, b.size);
      if (reason) {
        await remove(b.pathname).catch(() => {});
        files.push({ field: p.field, name, size: b.size, rejected: reason });
      } else {
        files.push({ field: p.field, name, size: b.size, link: `${base}/api/briefing/file?p=${encodeURIComponent(b.pathname)}&s=${sign(b.pathname)}` });
      }
    }
  }

  /* ---------- Inhalt aufbauen: gegliedert wie die PDF ---------- */
  const answer = (f: BriefingField): string => {
    if (f.kind === "files") {
      const l = files.filter((x) => x.field === f.id);
      return l.length ? l.map((x) => (x.rejected ? `${x.name} – abgelehnt (${x.rejected})` : `${x.name} (${(x.size / 1048576).toFixed(1)} MB)`)).join("\n") : "–";
    }
    const val = v[f.id];
    const list = Array.isArray(val) ? [...val] : val && String(val).trim() ? [String(val).trim()] : [];
    const other = s(f.id + "__other");
    if (other) list.push(`Sonstiges: ${other}`);
    if (!list.length) return "–";
    return f.kind === "check" ? list.map((x) => `• ${x}`).join("\n") : list.join("\n");
  };

  const now = new Date();
  const stamp = now.toLocaleString("de-DE", { timeZone: "Europe/Berlin", dateStyle: "medium", timeStyle: "short" });
  const until = new Date(now.getTime() + FILE_TTL_DAYS * 86400000).toLocaleDateString("de-DE", { timeZone: "Europe/Berlin" });
  const sections = BRIEFING.map((sec) => ({ nr: sec.nr, title: sec.title, rows: sec.fields
    .filter((f) => !("showIf" in f && f.showIf) || (Array.isArray(v[f.showIf![0]]) && (v[f.showIf![0]] as string[]).includes(f.showIf![1])))
    .map((f) => [f.label, answer(f)] as [string, string]) }));

  const text = [
    `Website-Briefing: ${firma}`, `Eingegangen: ${stamp}`, "",
    ...sections.flatMap((sec) => [`${sec.nr} ${sec.title.toUpperCase()}`, "-".repeat(40), ...sec.rows.flatMap(([q, a]) => [`${q}:`, a, ""]), ""]),
  ].join("\n");

  const esc = (x: string) => x.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
  const okFiles = files.filter((f) => f.link);
  const html = `<div style="font-family:Arial,sans-serif;color:#141c27;max-width:760px">
<h2 style="margin:0 0 4px">Website-Briefing: ${esc(firma)}</h2>
<p style="margin:0 0 20px;color:#56606e">Eingegangen am ${esc(stamp)} über pfalz-multiservice.de/briefing</p>
${okFiles.length ? `<div style="background:#f3eee6;padding:14px 16px;margin-bottom:20px"><b>Hochgeladene Dateien (Download bis ${until}):</b><br>
${okFiles.map((f) => `<a href="${f.link}">${esc(f.name)}</a> (${(f.size / 1048576).toFixed(1)} MB)`).join("<br>")}
<br><small style="color:#56606e">Dateien wurden auf Typ und Inhalt geprüft. ZIP-Archive und Office-Dateien trotzdem nur mit aktuellem Virenschutz öffnen.</small></div>` : ""}
${sections.map((sec) => `<h3 style="margin:24px 0 8px;border-bottom:1px solid #dfe3e9;padding-bottom:6px"><span style="color:#b8925a">${sec.nr}</span> ${esc(sec.title)}</h3>
<table style="border-collapse:collapse;width:100%">${sec.rows.map(([q, a]) => `<tr><td style="vertical-align:top;padding:4px 16px 4px 0;color:#56606e;width:40%">${esc(q)}</td><td style="vertical-align:top;padding:4px 0;white-space:pre-wrap${a === "–" ? ";color:#9aa3ae" : ""}">${esc(a)}</td></tr>`).join("")}</table>`).join("\n")}
</div>`;

  const slug = firma.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "kunde";
  const day = now.toISOString().slice(0, 10);
  const json = JSON.stringify({ eingegangen: now.toISOString(), firma, abschnitte: sections.map((x) => ({ nr: x.nr, titel: x.title, antworten: Object.fromEntries(x.rows) })), dateien: files }, null, 2);

  const port = Number(process.env.SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST || "smtp.strato.de", port, secure: port === 465, auth: { user, pass } });
  const ort = oneLine(s("ort")).slice(0, 80);

  try {
    await transporter.sendMail({
      from: `"Pfalz Multiservice – Website-Briefing" <${user}>`,
      to: process.env.CONTACT_TO || user,
      ...(validMail ? { replyTo: { name: person, address: email } } : {}),
      subject: `Website-Briefing: ${firma}${ort ? ` (${ort})` : ""}`,
      text: (okFiles.length ? `Dateien (Download bis ${until}):\n${okFiles.map((f) => `${f.name}: ${f.link}`).join("\n")}\n\n` : "") + text,
      html,
      attachments: [
        { filename: `briefing-${slug}-${day}.txt`, content: text, contentType: "text/plain; charset=utf-8" },
        { filename: `briefing-${slug}-${day}.json`, content: json, contentType: "application/json; charset=utf-8" },
      ],
    });
  } catch (err) {
    console.error("[briefing] Versand fehlgeschlagen:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Versand fehlgeschlagen" }, { status: 502 });
  }

  // Markierung: Einsendung abgeschlossen (Dateien bleiben 30 Tage, nicht abgeschickte werden nach 2 Tagen gelöscht)
  if (ID_RE.test(id)) {
    await putText(`briefing/${id}/_abgeschickt.json`, JSON.stringify({ at: now.toISOString() })).catch(() => {});
  }

  // Bestätigung an den Kunden (ohne Dateilinks, mit Signatur)
  if (validMail) {
    const mail = customerMail({ person, firma, stamp, sections, site: SITE, logoSrc: "cid:pm-logo" });
    await transporter.sendMail({
      from: `"Pfalz Multiservice" <${user}>`,
      to: { name: person, address: email },
      replyTo: process.env.CONTACT_TO || user,
      subject: "Ihr Website-Briefing bei Pfalz Multiservice",
      text: mail.text,
      html: mail.html,
      attachments: [{ filename: "pfalz-multiservice.png", content: Buffer.from(EMAIL_LOGO_PNG_BASE64, "base64"), contentType: "image/png", cid: "pm-logo", contentDisposition: "inline" }],
    }).catch((err) => console.error("[briefing] Bestätigung fehlgeschlagen:", err instanceof Error ? err.message : err));
  }

  return NextResponse.json({ ok: true, rejected: files.filter((f) => f.rejected).map((f) => ({ name: f.name, reason: f.rejected })) });
}
