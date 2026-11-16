/**
 * E-Mail an den Kunden nach dem Website-Briefing: Dank, nächste Schritte, Kopie der Angaben
 * und die Signatur von Jasmin Beer. Ohne Abhängigkeiten, damit sie sich auch als Vorschau rendern lässt.
 */

export type MailSection = { nr: string; title: string; rows: [string, string][] };

const NAVY = "#002347", GOLD = "#B8935A", TEXT = "#333333", MUTED = "#666666", LINE = "#E3E6EB";
const esc = (x: string) => x.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));

/** Signatur Jasmin Beer (Vorlage: Pfalz_Multiservice_Jasmin_Beer), Logo von der eigenen Website statt aus dem Webmail */
export function signatureHtml(site: string, logoSrc = `${site}/email/logo.png`) {
  const lbl = `font-size:10px;font-weight:bold;letter-spacing:1.4px;color:${GOLD};`;
  const link = `color:${NAVY};text-decoration:none;`;
  return `<table role="presentation" style="width:460px;max-width:100%;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:${TEXT};" border="0" width="460" cellspacing="0" cellpadding="0">
<tr><td style="padding:0 0 14px;"><a style="text-decoration:none;" href="${site}"><img style="display:block;width:230px;height:auto;border:0;" src="${logoSrc}" alt="Pfalz Multiservice – Ihr starker Partner in der Region" width="230"></a></td></tr>
<tr><td style="padding:0 0 14px;"><table role="presentation" border="0" width="100%" cellspacing="0" cellpadding="0"><tr>
<td style="background-color:${GOLD};font-size:0;line-height:0;height:4px;" bgcolor="${GOLD}" width="64" height="4">&nbsp;</td>
<td style="font-size:0;line-height:0;border-bottom:1px solid ${LINE};" height="1">&nbsp;</td></tr></table></td></tr>
<tr><td style="padding:0 0 10px;"><span style="font-size:19px;font-weight:bold;color:${NAVY};letter-spacing:0.2px;">Jasmin Beer</span><br><span style="font-size:11px;font-weight:bold;letter-spacing:1.6px;color:${GOLD};">INHABERIN</span></td></tr>
<tr><td style="padding:0 0 14px;"><table role="presentation" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.7;color:${TEXT};" border="0" cellspacing="0" cellpadding="0">
<tr><td style="${lbl}" width="52">TEL</td><td><a style="${link}" href="tel:+491605086983">+49 160 5086983</a> <span style="color:#999999;">· auch WhatsApp</span></td></tr>
<tr><td style="${lbl}">MAIL</td><td><a style="${link}" href="mailto:kontakt@pfalz-multiservice.de">kontakt@pfalz-multiservice.de</a></td></tr>
<tr><td style="${lbl}">WEB</td><td><a style="${link}" href="${site}">www.pfalz-multiservice.de</a></td></tr>
<tr><td style="${lbl}" valign="top">ORT</td><td>67551 Worms</td></tr>
</table></td></tr>
<tr><td style="padding:0 0 14px;font-size:11px;letter-spacing:0.6px;color:${MUTED};">Webdesign &amp; Wartung · Asset Recovery Reselling ·<br>E-Commerce · Lagerung · Räumung</td></tr>
<tr><td style="padding:0 0 14px;"><table role="presentation" border="0" cellspacing="0" cellpadding="0"><tr>
<td style="background-color:${NAVY};border-radius:4px;" bgcolor="${NAVY}"><a style="display:inline-block;padding:10px 18px;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;letter-spacing:0.6px;color:#ffffff;text-decoration:none;" href="${site}/kontakt">Unverbindlich anfragen →</a></td>
<td width="8">&nbsp;</td>
<td style="border:1px solid ${GOLD};border-radius:4px;"><a style="display:inline-block;padding:9px 16px;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;letter-spacing:0.6px;color:${NAVY};text-decoration:none;" href="https://wa.me/491605086983">WhatsApp</a></td>
</tr></table></td></tr>
<tr><td style="padding:10px 0 0;border-top:1px solid ${LINE};font-size:10px;line-height:1.5;color:#999999;">Pfalz Loadout · Inhaberin: Jasmin Beer · USt-IdNr. DE444410908</td></tr>
</table>`;
}

export const SIGNATURE_TEXT = `--
Jasmin Beer
Inhaberin · Pfalz Multiservice

Tel.: +49 160 5086983 (auch WhatsApp)
Mail: kontakt@pfalz-multiservice.de
Web: www.pfalz-multiservice.de
Ort: 67551 Worms

Webdesign & Wartung · Asset Recovery Reselling · E-Commerce · Lagerung · Räumung
Pfalz Loadout · Inhaberin: Jasmin Beer · USt-IdNr. DE444410908`;

/** Bestätigungs-Mail an den Kunden */
export function customerMail({ person, firma, stamp, sections, site, logoSrc }: { person: string; firma: string; stamp: string; sections: MailSection[]; site: string; logoSrc?: string }) {
  const steps: [string, string][] = [
    ["01", "Wir lesen Ihr Briefing und melden uns bei Rückfragen."],
    ["02", "Sie erhalten einen Vorschlag mit unverbindlichem Festpreis."],
    ["03", "Nach Ihrer Zusage sehen Sie Ihr Design vorab und geben es frei."],
  ];
  const filled = sections.map((s) => ({ ...s, rows: s.rows.filter(([, a]) => a !== "–") })).filter((s) => s.rows.length);

  const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Ihr Website-Briefing</title></head>
<body style="margin:0;padding:0;background:#F6F7F9;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#F6F7F9;"><tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="640" cellspacing="0" cellpadding="0" border="0" style="width:640px;max-width:100%;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:${TEXT};font-size:15px;line-height:1.6;">
<tr><td style="padding:32px 36px 8px;">
<p style="margin:0 0 16px;">Guten Tag ${esc(person)},</p>
<p style="margin:0 0 16px;">vielen Dank für Ihr Website-Briefing${firma ? ` für <b>${esc(firma)}</b>` : ""}! Wir haben Ihre Angaben erhalten und melden uns innerhalb von 24 Stunden (werktags) bei Ihnen.</p>
<p style="margin:0 0 8px;font-size:11px;font-weight:bold;letter-spacing:1.6px;color:${GOLD};">SO GEHT ES WEITER</p>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 20px;">
${steps.map(([n, t]) => `<tr><td valign="top" style="padding:4px 12px 4px 0;font-weight:bold;color:${GOLD};">${n}</td><td style="padding:4px 0;">${t}</td></tr>`).join("")}
</table>
<p style="margin:0 0 24px;">Mit dem Briefing entsteht noch kein Auftrag. Fragen? Antworten Sie einfach auf diese E-Mail oder schreiben Sie uns per <a href="https://wa.me/491605086983" style="color:${NAVY};">WhatsApp</a>.</p>
<p style="margin:0 0 28px;">Viele Grüße</p>
${signatureHtml(site, logoSrc)}
</td></tr>
<tr><td style="padding:28px 36px 36px;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top:1px solid ${LINE};"><tr><td style="padding:24px 0 0;">
<p style="margin:0 0 4px;font-size:11px;font-weight:bold;letter-spacing:1.6px;color:${GOLD};">KOPIE IHRER ANGABEN</p>
<p style="margin:0 0 8px;font-size:13px;color:${MUTED};">Eingegangen am ${esc(stamp)}. Leere Felder sind ausgelassen.</p>
${filled.map((s) => `<p style="margin:20px 0 6px;font-size:14px;font-weight:bold;color:${NAVY};"><span style="color:${GOLD};">${s.nr}</span>&nbsp; ${esc(s.title)}</p>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size:13px;line-height:1.5;">
${s.rows.map(([q, a]) => `<tr><td valign="top" style="padding:3px 14px 3px 0;color:${MUTED};width:42%;">${esc(q)}</td><td valign="top" style="padding:3px 0;white-space:pre-wrap;">${esc(a)}</td></tr>`).join("")}
</table>`).join("\n")}
</td></tr></table>
</td></tr>
</table>
<p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#999999;">Sie erhalten diese E-Mail, weil Sie auf pfalz-multiservice.de ein Website-Briefing abgeschickt haben.</p>
</td></tr></table>
</body></html>`;

  const text = `Guten Tag ${person},

vielen Dank für Ihr Website-Briefing${firma ? ` für ${firma}` : ""}! Wir haben Ihre Angaben erhalten und melden uns innerhalb von 24 Stunden (werktags) bei Ihnen.

So geht es weiter:
${steps.map(([n, t]) => `${n}  ${t}`).join("\n")}

Mit dem Briefing entsteht noch kein Auftrag. Fragen? Antworten Sie einfach auf diese E-Mail oder schreiben Sie uns per WhatsApp: +49 160 5086983

Viele Grüße

${SIGNATURE_TEXT}

————————————————————
Kopie Ihrer Angaben (eingegangen am ${stamp})
————————————————————
${filled.map((s) => `\n${s.nr} ${s.title.toUpperCase()}\n${s.rows.map(([q, a]) => `${q}:\n${a}`).join("\n\n")}`).join("\n")}
`;
  return { html, text };
}
