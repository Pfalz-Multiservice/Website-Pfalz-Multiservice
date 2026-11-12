/**
 * Website-Briefing: alle Fragen 1:1 aus der Vorlage (Website-Briefing_Pfalz-Multiservice.pdf).
 * Die Struktur wird für das Formular, die Zusammenfassung und später für die E-Mail verwendet.
 */

export type BriefingField =
  | { id: string; label: string; kind: "text" | "email" | "tel" | "url"; hint?: string; required?: boolean; showIf?: [string, string] }
  | { id: string; label: string; kind: "area" | "areaLarge"; hint?: string; showIf?: [string, string] }
  | { id: string; label: string; kind: "check"; options: string[]; other?: boolean; hint?: string }
  | { id: string; label: string; kind: "files"; hint?: string };

export type BriefingSection = { nr: string; title: string; note?: string; warn?: string; fields: BriefingField[] };

export const BRIEFING_INTRO = {
  title: "Website-Briefing",
  subtitle: "Damit Ihre neue Website genau zu Ihrem Unternehmen passt.",
  facts: [
    ["Dauer", "ca. 15–20 Minuten"],
    ["Ausfüllen", "am Handy, PC oder Tablet"],
    ["Investition", "Websites ab 199 €"],
  ] as [string, string][],
  steps: [
    ["01", "Fragebogen", "Sie füllen aus, was Sie wissen. Alles andere klären wir gemeinsam."],
    ["02", "Konzept & Angebot", "Wir melden uns mit einem Vorschlag und einem Festpreis."],
    ["03", "Design & Vorschau", "Sie sehen Ihre Website, bevor sie online geht."],
    ["04", "Livegang", "Nach Ihrer Freigabe geht die Website online."],
  ] as [string, string, string][],
};

export const BRIEFING: BriefingSection[] = [
  {
    nr: "01", title: "Ihre Kontaktdaten",
    note: "Diese Angaben verwenden wir auch für Impressum und Google-Profil.",
    fields: [
      { id: "firma", label: "Firmenname (wie im Impressum)", kind: "text", required: true },
      { id: "rechtsform", label: "Rechtsform", kind: "text" },
      { id: "ansprechpartner", label: "Ansprechpartner/in", kind: "text", required: true },
      { id: "position", label: "Position", kind: "text" },
      { id: "strasse", label: "Straße, Hausnummer", kind: "text" },
      { id: "ort", label: "PLZ, Ort", kind: "text" },
      { id: "telefon", label: "Telefon", kind: "tel", hint: "Telefon oder E-Mail ist Pflicht" },
      { id: "email", label: "E-Mail", kind: "email", hint: "Telefon oder E-Mail ist Pflicht" },
      { id: "steuer", label: "USt-IdNr. / Steuernummer", kind: "text" },
      { id: "handelsregister", label: "Handelsregister (falls vorhanden)", kind: "text" },
      { id: "zeiten", label: "Öffnungs- bzw. Erreichbarkeitszeiten", kind: "area", hint: "z. B. Mo–Fr 9–18 Uhr, Sa nach Vereinbarung" },
      { id: "einzugsgebiet", label: "Einzugsgebiet / Orte, in denen Sie tätig sind", kind: "area" },
      { id: "gegruendet", label: "Gegründet im Jahr", kind: "text" },
      { id: "mitarbeitende", label: "Anzahl Mitarbeitende", kind: "text" },
    ],
  },
  {
    nr: "02", title: "Ihr Unternehmen & Angebot",
    fields: [
      { id: "unternehmen", label: "Was macht Ihr Unternehmen?", kind: "areaLarge", hint: "in 2–3 Sätzen" },
      { id: "leistungen", label: "Ihre wichtigsten Leistungen / Produkte", kind: "areaLarge", hint: "am wichtigsten zuerst" },
      { id: "unterschied", label: "Was unterscheidet Sie von Mitbewerbern?", kind: "areaLarge" },
    ],
  },
  {
    nr: "03", title: "Ziele & Zielgruppe",
    fields: [
      { id: "ziele", label: "Was soll die Website vor allem erreichen?", kind: "check", other: true, options: ["Mehr Anfragen", "Online verkaufen", "Terminbuchungen", "Bewerber gewinnen", "Vertrauen & Image", "Informieren"] },
      { id: "kontaktwege", label: "Wie sollen Besucher Kontakt aufnehmen?", kind: "check", options: ["Anruf", "Kontaktformular", "E-Mail", "WhatsApp", "Online-Termin", "Angebots-Anfrage"] },
      { id: "kunden", label: "Ihre Kunden sind überwiegend", kind: "check", options: ["Privatkunden", "Gewerbekunden", "Beides"] },
      { id: "kundenbeschreibung", label: "Beschreiben Sie Ihre typischen Kunden", kind: "area", hint: "z. B. Alter, Region, was ihnen wichtig ist" },
    ],
  },
  {
    nr: "04", title: "Bisheriger Auftritt & Vorbilder",
    fields: [
      { id: "website", label: "Aktuelle Website (falls vorhanden)", kind: "url" },
      { id: "websiteMeinung", label: "Was gefällt Ihnen daran, was stört Sie?", kind: "area" },
      { id: "vorbilder", label: "2 bis 3 Websites, die Ihnen gefallen, und warum", kind: "area", hint: "gern auch aus anderen Branchen" },
      { id: "mitbewerber", label: "Ihre wichtigsten Mitbewerber", kind: "area", hint: "Name oder Website" },
    ],
  },
  {
    nr: "05", title: "Design & Wirkung",
    fields: [
      { id: "logo", label: "Logo", kind: "check", options: ["Vektor-Logo (SVG, PDF, EPS)", "Nur als Bild (JPG/PNG)", "Kein Logo, bitte erstellen"] },
      { id: "farben", label: "Firmenfarben (HEX-Code oder Beschreibung)", kind: "text" },
      { id: "schriften", label: "Schriftarten (falls festgelegt)", kind: "text" },
      { id: "stil", label: "Gewünschter Stil", kind: "check", options: ["Modern & minimalistisch", "Klassisch & seriös", "Hochwertig & edel", "Freundlich & farbenfroh", "Technisch & sachlich", "3D / Next-Gen (animiert)"] },
      { id: "begriffe", label: "Drei Begriffe, wie die Website wirken soll", kind: "area" },
      { id: "nogo", label: "Was Sie auf keinen Fall möchten", kind: "area" },
    ],
  },
  {
    nr: "06", title: "Umfang, Seiten & Funktionen",
    fields: [
      { id: "umfang", label: "Umfang", kind: "check", options: ["OnePager (eine Seite)", "Mehrere Seiten (bis ca. 8)", "Große Website (bis ca. 20)", "Shop / Sonderprojekt", "Bitte beraten Sie mich"] },
      { id: "seiten", label: "Gewünschte Seiten / Bereiche", kind: "check", other: true, options: ["Startseite", "Über uns", "Leistungen", "Referenzen / Galerie", "Kundenbewertungen", "FAQ", "Team", "Karriere / Jobs", "Blog / News", "Kontakt & Anfahrt", "Preise"] },
      { id: "funktionen", label: "Funktionen", kind: "check", other: true, options: ["Kontaktformular", "Online-Terminbuchung", "WhatsApp-Button", "Google-Maps-Karte", "Vorher-Nachher-Galerie", "Google-Bewertungen", "Mehrsprachig", "Online-Shop", "Social-Media-Links"] },
      { id: "sprachen", label: "Welche Sprachen?", kind: "text", showIf: ["funktionen", "Mehrsprachig"] },
    ],
  },
  {
    nr: "07", title: "Inhalte: Texte & Bilder",
    note: "Gute Inhalte entscheiden, ob aus Besuchern Kunden werden. Sagen Sie uns, was bereits vorhanden ist.",
    fields: [
      { id: "texte", label: "Texte", kind: "check", options: ["Liefere ich selbst", "Sollen erstellt werden", "Teils / teils"] },
      { id: "fotos", label: "Fotos", kind: "check", options: ["Eigene Fotos vorhanden", "Fotoshooting (optional, Partner aus der Region)", "Stockfotos verwenden", "KI-Fotos erstellen lassen"] },
      { id: "faq1", label: "Häufige Kundenfrage 1", kind: "area", hint: "Aus den 5 häufigsten Fragen entsteht ein FAQ. Das ist wichtig für Google und die KI-Suche." },
      { id: "faq2", label: "Häufige Kundenfrage 2", kind: "area" },
      { id: "faq3", label: "Häufige Kundenfrage 3", kind: "area" },
      { id: "faq4", label: "Häufige Kundenfrage 4", kind: "area" },
      { id: "faq5", label: "Häufige Kundenfrage 5", kind: "area" },
      { id: "belege", label: "Belege für Ihre Qualität", kind: "area", hint: "z. B. Erfahrung, Projekte, Zertifikate, Auszeichnungen" },
      { id: "referenzen", label: "Kundenstimmen / Referenzen", kind: "check", options: ["Vorhanden (schicke ich mit)", "Google-Bewertungen nutzen", "Noch keine"] },
    ],
  },
  {
    nr: "08", title: "Google-Unternehmensprofil & SEO",
    note: "Name, Adresse und Telefon sollten auf Website, Google-Profil und allen Portalen identisch sein.",
    fields: [
      { id: "googleProfil", label: "Google-Unternehmensprofil", kind: "check", options: ["Vorhanden", "Bitte einrichten", "Weiß ich nicht"] },
      { id: "googleName", label: "Name im Google-Profil (falls vorhanden)", kind: "text" },
      { id: "portale", label: "Weitere Portale, auf denen Sie gelistet sind", kind: "area", hint: "z. B. Gelbe Seiten, MyHammer, 11880" },
      { id: "suchbegriffe", label: "Wonach sollen Kunden Sie finden?", kind: "area", hint: "z. B. „Fliesenleger Pirmasens“, „Hausmeister Worms“" },
      { id: "regionen", label: "Wichtigste Orte / Regionen für die Suche", kind: "area" },
    ],
  },
  {
    nr: "09", title: "Domain, Technik & Rechtliches",
    warn: "Bitte tragen Sie hier keine Passwörter ein. Zugänge klären wir separat und sicher.",
    fields: [
      { id: "domain", label: "Domain (Internetadresse)", kind: "check", options: ["Vorhanden", "Noch keine, bitte besorgen"] },
      { id: "wunschdomain", label: "Domain bzw. Wunschdomain", kind: "text" },
      { id: "anbieter", label: "Anbieter", kind: "text", hint: "z. B. Strato, IONOS" },
      { id: "emails", label: "Gewünschte E-Mail-Adressen", kind: "area", hint: "z. B. info@, kontakt@, vorname@" },
      { id: "uebernahme", label: "Inhalte der alten Website übernehmen? Wenn ja, welche?", kind: "area" },
      { id: "rechtliches", label: "Rechtliches", kind: "check", options: ["Datenschutz vorhanden", "Impressum vorhanden", "Branchen-Pflichtangaben"] },
    ],
  },
  {
    nr: "10", title: "Zeitplan, Budget & Betreuung",
    fields: [
      { id: "wunschtermin", label: "Wunschtermin für den Livegang", kind: "text" },
      { id: "deadline", label: "Feste Deadline? (z. B. Eröffnung)", kind: "text" },
      { id: "budget", label: "Budgetrahmen", kind: "check", options: ["bis 250 €", "250 bis 750 €", "750 bis 1.500 €", "über 1.500 €", "Bitte beraten Sie mich"] },
      { id: "pflege", label: "Pflege nach dem Livegang", kind: "check", options: ["Änderungen melden", "Wartungspaket gewünscht", "Noch offen"] },
      { id: "anmerkungen", label: "Sonstige Wünsche oder Anmerkungen", kind: "areaLarge" },
    ],
  },
  {
    nr: "11", title: "Dateien & Absenden",
    note: "Laden Sie hoch, was Sie schon haben. Mehrere Dateien möglich, je Datei bis 25 MB.",
    fields: [
      { id: "f_logo", label: "Logo (am besten SVG oder PDF)", kind: "files" },
      { id: "f_fotos", label: "Fotos: Betrieb, Team, Projekte", kind: "files" },
      { id: "f_texte", label: "Vorhandene Texte, Flyer, Broschüren", kind: "files" },
      { id: "f_referenzen", label: "Kundenstimmen / Referenzen", kind: "files" },
      { id: "f_zertifikate", label: "Zertifikate, Siegel, Partnerlogos", kind: "files" },
      { id: "f_vorbilder", label: "Screenshots von Vorbild-Websites", kind: "files" },
      { id: "vorbildLinks", label: "Links zu Vorbild-Websites", kind: "area" },
      { id: "ausfuellende", label: "Name der ausfüllenden Person", kind: "text" },
    ],
  },
];

/** Erlaubte Dateiformate (Endung → Beschreibung). Keine ausführbaren Dateien, keine Makro-Dokumente. */
export const UPLOAD_TYPES: Record<string, string> = {
  pdf: "PDF", svg: "SVG", eps: "EPS", ai: "Illustrator",
  png: "PNG", jpg: "JPG", jpeg: "JPG", webp: "WEBP", heic: "HEIC", heif: "HEIF", gif: "GIF", tif: "TIFF", tiff: "TIFF",
  docx: "Word", odt: "OpenDocument", txt: "Text", xlsx: "Excel", pptx: "PowerPoint",
  zip: "ZIP", mp4: "MP4", mov: "MOV",
};
/** Papier-Version zum Herunterladen (Datei unter public/ ablegen und hier eintragen, z. B. "/briefing/Website-Briefing_Pfalz-Multiservice.pdf") */
export const BRIEFING_PDF: string | null = null;

export const UPLOAD_MAX_MB = 25;
export const UPLOAD_MAX_FILES = 20;
export const UPLOAD_ACCEPT = Object.keys(UPLOAD_TYPES).map((e) => "." + e).join(",");
