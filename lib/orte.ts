import { tidyDeep } from "./typo";
import { IMG, type Faq } from "./data";

/**
 * Stadtseiten für „Webdesign <Ort>“ unter /webdesign/<slug>.
 * Jede Stadt hat eigene Texte, Stadtteile und Fragen – keine kopierten Seiten mit getauschtem Ortsnamen.
 * Worms hat eine eigene, ausführlichere Seite unter /webdesign-worms.
 */
export type Ort = {
  slug: string;
  name: string;
  /** Einordnung für Eyebrow und Schema, z. B. „Pfalz“ */
  region: string;
  /** Stadtteile, die im Text und im Schema (areaServed) genannt werden */
  districts: string[];
  /** Nachbarorte */
  nearby: string[];
  image: string;
  /** Bildausschnitt am Handy (Hochformat) */
  imageFocus?: string;
  /** Meta-Beschreibung (max. ca. 155 Zeichen) */
  description: string;
  /** Zwei Absätze für den Abschnitt „Ihr Webdesigner für <Ort>“ */
  text: [string, string];
  points: { title: string; text: string }[];
  faq: Faq[];
};

const PRICE_ANSWER =
  "Sie zahlen einen einmaligen Festpreis: Start (OnePager, bis 5 Abschnitte) kostet 199 €, Business (OnePager oder bis 8 Seiten) 299 €. Online-Shops und größere Projekte bieten wir nach Angebot an. Als Kleinunternehmer nach § 19 UStG berechnen wir keine Umsatzsteuer, die Preise sind Endpreise.";
const GOOGLE_ANSWER = (ort: string) =>
  `Wir bauen Ihre Seite schnell, mobil optimiert und technisch sauber, mit ${ort} in Titeln, Texten und strukturierten Daten. Eine bestimmte Platzierung kann niemand seriös versprechen. Ein gepflegtes Google-Unternehmensprofil, das auf die Website verlinkt, hilft zusätzlich.`;

export const ORTE: Ort[] = tidyDeep([
  {
    slug: "frankenthal",
    name: "Frankenthal",
    region: "Pfalz",
    districts: ["Eppstein", "Flomersheim", "Mörsch", "Studernheim"],
    nearby: ["Bobenheim-Roxheim", "Heßheim", "Lambsheim"],
    image: IMG + "webdesign-frankenthal.jpg",
    imageFocus: "50% 60%",
    description: "Webdesign für Frankenthal: individuelle Websites zum Festpreis ab 199 €, ohne Abo. Ihr Ansprechpartner sitzt in der Nachbarstadt Worms.",
    text: [
      "Frankenthal liegt direkt neben Worms, für uns ist es die nächste Stadt in Richtung Pfalz. Wir gestalten Websites für Handwerksbetriebe, Dienstleister, Praxen und Vereine aus der Innenstadt und aus den Vororten Eppstein, Flomersheim, Mörsch und Studernheim.",
      "Viele Betriebe in Frankenthal leben von Kunden aus der direkten Umgebung. Genau darauf richten wir Aufbau und Texte aus: Wer in Frankenthal nach Ihrer Leistung sucht, soll sofort sehen, was Sie anbieten, wo Sie sitzen und wie man Sie erreicht.",
    ],
    points: [
      { title: "Ansprechpartner in der Nachbarstadt", text: "Unser Sitz ist Worms. Termine in Frankenthal vereinbaren wir nach Absprache, vieles klärt sich per Telefon oder WhatsApp." },
      { title: "Für Kunden aus Frankenthal gemacht", text: "Ort, Vororte und Einzugsgebiet stehen dort, wo Google und Ihre Kunden sie erwarten." },
      { title: "Festpreis ab 199 €", text: "Einmalig, ohne Abo. Sie kennen den Preis, bevor wir beginnen." },
    ],
    faq: [
      ["Was kostet eine Website für einen Betrieb in Frankenthal?", PRICE_ANSWER],
      ["Sitzen Sie in Frankenthal?", "Nein, unser Sitz ist Worms, die Nachbarstadt. Termine in Frankenthal vereinbaren wir nach Absprache. Die meisten Abstimmungen laufen ohnehin per Telefon, WhatsApp oder E-Mail."],
      ["Werde ich mit der neuen Website in Frankenthal bei Google gefunden?", GOOGLE_ANSWER("Frankenthal")],
      ["Betreuen Sie die Website nach dem Start weiter?", "Wenn Sie möchten. Die Betreuung ist freiwillig und monatlich kündbar, ab 39 € im Monat. Ohne Paket kosten einzelne Änderungen 39 € pro Stunde."],
    ],
  },
  {
    slug: "ludwigshafen",
    name: "Ludwigshafen",
    region: "Pfalz",
    districts: ["Oggersheim", "Friesenheim", "Mundenheim", "Oppau", "Rheingönheim"],
    nearby: ["Frankenthal", "Mutterstadt", "Limburgerhof"],
    image: IMG + "webdesign-ludwigshafen.jpg",
    imageFocus: "38% 50%",
    description: "Webdesign für Ludwigshafen: individuelle Websites zum Festpreis ab 199 €, mobil optimiert und ohne Abo. Persönlich betreut aus Worms.",
    text: [
      "Ludwigshafen ist die größte Stadt der Pfalz, mit Stadtteilen, die fast wie eigene Orte funktionieren: Oggersheim, Friesenheim, Mundenheim, Oppau oder Rheingönheim. Wer dort einen Betrieb führt, wird meist im eigenen Stadtteil gesucht und nicht in der ganzen Stadt.",
      "Deshalb nennen wir auf Ihrer Website nicht nur Ludwigshafen, sondern den Stadtteil, in dem Sie arbeiten, und die Orte, in die Sie fahren. Das hilft Kunden bei der Entscheidung und Google bei der Zuordnung. Gestaltet wird jede Seite individuell, nicht aus einem Baukasten.",
    ],
    points: [
      { title: "Stadtteil statt nur Stadtname", text: "Ihr Stadtteil und Ihr Einzugsgebiet stehen in Titeln, Texten und in den Daten für Suchmaschinen." },
      { title: "Ein Ansprechpartner", text: "Sie sprechen direkt mit uns in Worms, nicht mit einer Hotline. Antwort innerhalb von 24 Stunden an Werktagen." },
      { title: "Festpreis ab 199 €", text: "Einmalig, ohne Abo. Alle Zugangsdaten bleiben in Ihrer Hand." },
    ],
    faq: [
      ["Was kostet eine Website für einen Betrieb in Ludwigshafen?", PRICE_ANSWER],
      ["Kommen Sie für ein Gespräch nach Ludwigshafen?", "Ja, nach Absprache. Unser Sitz ist Worms, Ludwigshafen gehört zu unserem Einsatzgebiet. Viele Kunden klären alles per Telefon, WhatsApp oder E-Mail und sparen sich den Termin."],
      ["Werde ich in meinem Stadtteil bei Google gefunden?", GOOGLE_ANSWER("Ludwigshafen und Ihrem Stadtteil")],
      ["Wem gehört die Website nach der Fertigstellung?", "Ihnen. Sie erhalten ein Übergabe-Paket mit allen Zugangsdaten. Domain und Hosting zahlen Sie direkt beim Anbieter Ihrer Wahl, damit Sie unabhängig bleiben."],
    ],
  },
  {
    slug: "mannheim",
    name: "Mannheim",
    region: "Rhein-Neckar",
    districts: ["Neckarau", "Käfertal", "Feudenheim", "Sandhofen", "Lindenhof"],
    nearby: ["Lampertheim", "Viernheim", "Ladenburg"],
    image: IMG + "webdesign-mannheim.jpg",
    imageFocus: "37% 50%",
    description: "Webdesign für Mannheim: individuelle Websites zum Festpreis ab 199 € statt Agenturpreisen. Persönlich betreut, ohne Abo, aus Worms.",
    text: [
      "In Mannheim gibt es viele Agenturen und entsprechend viele Websites, die sich ähneln. Für kleine Betriebe, Selbstständige und Vereine ist ein Agenturprojekt oft zu groß und zu teuer. Wir bauen individuelle Websites zum Festpreis, mit einem Ansprechpartner von der Anfrage bis zum Livegang.",
      "Ob Ihr Betrieb in Neckarau, Käfertal, Feudenheim, Sandhofen oder auf dem Lindenhof sitzt: Wir richten die Seite auf die Kunden aus, die Sie wirklich erreichen wollen. Wo viele Anbieter um dieselben Suchanfragen werben, zählt eine klare Aussage mehr als eine lange Seite.",
    ],
    points: [
      { title: "Festpreis statt Stundenzettel", text: "199 € oder 299 €, einmalig. Sie kennen den Preis, bevor wir beginnen." },
      { title: "Klare Aussage", text: "Was Sie anbieten, für wen und wo. So heben Sie sich von ähnlichen Seiten ab." },
      { title: "Direkter Draht", text: "Ein Ansprechpartner in Worms, erreichbar per Telefon, WhatsApp und E-Mail." },
    ],
    faq: [
      ["Was kostet eine Website für einen Betrieb in Mannheim?", PRICE_ANSWER],
      ["Warum ein Webdesigner aus Worms und keine Agentur aus Mannheim?", "Weil Sie bei uns einen festen Preis und einen festen Ansprechpartner bekommen. Mannheim gehört zu unserem Einsatzgebiet, Termine vor Ort sind nach Absprache möglich. Ob das zu Ihrem Vorhaben passt, klären wir im ersten Gespräch ehrlich."],
      ["Werde ich in Mannheim bei Google gefunden?", GOOGLE_ANSWER("Mannheim und Ihrem Stadtteil")],
      ["Bauen Sie auch Online-Shops?", "Ja. Online-Shops und größere Projekte bieten wir nach Angebot an. Wir betreiben selbst Online-Shops und kennen die Abläufe aus der Praxis."],
    ],
  },
  {
    slug: "alzey",
    name: "Alzey",
    region: "Rheinhessen",
    districts: ["Weinheim", "Heimersheim", "Dautenheim", "Schafhausen"],
    nearby: ["Flonheim", "Gau-Odernheim", "Wörrstadt"],
    image: IMG + "webdesign-pfalz.jpg",
    imageFocus: "58% 50%",
    description: "Webdesign für Alzey und Rheinhessen: individuelle Websites zum Festpreis ab 199 €, ohne Abo. Für Betriebe, Weingüter und Vereine.",
    text: [
      "Alzey ist die Kreisstadt des Landkreises Alzey-Worms und Anlaufpunkt für viele Orte in Rheinhessen. Wir gestalten Websites für Betriebe aus der Altstadt und aus den Stadtteilen Weinheim, Heimersheim, Dautenheim und Schafhausen, ebenso für Weingüter, Gastgeber und Vereine aus dem Umland.",
      "Auf dem Land entscheidet oft die Empfehlung, und danach schaut man im Netz nach. Dann muss die Website halten, was der gute Ruf verspricht: aktuelle Angaben, schnelle Ladezeit auf dem Handy und ein Weg zur Anfrage, der mit einem Klick funktioniert.",
    ],
    points: [
      { title: "Für Betriebe in Rheinhessen", text: "Vom Handwerksbetrieb bis zum Weingut: Aufbau und Texte passend zu Ihren Kunden vor Ort." },
      { title: "Schnell auf dem Handy", text: "Schlanke Technik, kurze Ladezeit, auch bei schwachem Netz im Umland." },
      { title: "Festpreis ab 199 €", text: "Einmalig, ohne Abo. Sie kennen den Preis, bevor wir beginnen." },
    ],
    faq: [
      ["Was kostet eine Website für einen Betrieb in Alzey?", PRICE_ANSWER],
      ["Arbeiten Sie auch für Weingüter und Vereine?", "Ja. Unser Webdesign richtet sich an Gewerbetreibende, Selbstständige, Betriebe und Vereine. Für Weingüter gehören zum Beispiel Weinliste, Öffnungszeiten und Anfahrt dazu, ein Online-Shop ist nach Angebot möglich."],
      ["Kommen Sie für ein Gespräch nach Alzey?", "Ja, nach Absprache. Unser Sitz ist Worms, Alzey gehört zu unserem Einsatzgebiet. Vieles lässt sich auch per Telefon, WhatsApp oder E-Mail klären."],
      ["Werde ich in Alzey bei Google gefunden?", GOOGLE_ANSWER("Alzey")],
    ],
  },
  {
    slug: "gruenstadt",
    name: "Grünstadt",
    region: "Pfalz",
    districts: ["Asselheim", "Sausenheim"],
    nearby: ["Bockenheim an der Weinstraße", "Kirchheim an der Weinstraße", "Eisenberg (Pfalz)"],
    image: IMG + "webdesign-pfalz.jpg",
    imageFocus: "58% 50%",
    description: "Webdesign für Grünstadt und das Leiningerland: individuelle Websites zum Festpreis ab 199 €, ohne Abo. Persönlich betreut aus Worms.",
    text: [
      "Grünstadt liegt an der Deutschen Weinstraße und ist das Zentrum des Leiningerlands. Wir gestalten Websites für Betriebe aus der Kernstadt, aus Asselheim und Sausenheim und aus den Orten ringsum.",
      "Hier treffen zwei Gruppen von Besuchern aufeinander: Kunden aus dem Ort und Gäste, die für Wein, Wandern oder ein Wochenende kommen. Eine gute Website bedient beide, mit klaren Angaben für Stammkunden und allem, was ein Gast vor der Anreise wissen will.",
    ],
    points: [
      { title: "Für Einheimische und Gäste", text: "Öffnungszeiten, Anfahrt und Angebot so, dass beide Gruppen schnell finden, was sie suchen." },
      { title: "Individuell gestaltet", text: "Ein eigenes Design für Ihren Betrieb statt einer Vorlage, die tausend andere auch nutzen." },
      { title: "Festpreis ab 199 €", text: "Einmalig, ohne Abo. Sie kennen den Preis, bevor wir beginnen." },
    ],
    faq: [
      ["Was kostet eine Website für einen Betrieb in Grünstadt?", PRICE_ANSWER],
      ["Sitzen Sie in Grünstadt?", "Nein, unser Sitz ist Worms. Grünstadt gehört zu unserem Einsatzgebiet, Termine vor Ort vereinbaren wir nach Absprache. Die meisten Abstimmungen laufen per Telefon, WhatsApp oder E-Mail."],
      ["Kann die Website auch auf Englisch erscheinen?", "Ja, eine zweite Sprache ist als Zusatzleistung möglich. Den Aufwand nennen wir Ihnen vorab im Angebot."],
      ["Werde ich in Grünstadt bei Google gefunden?", GOOGLE_ANSWER("Grünstadt")],
    ],
  },
]);

export const ortHref = (slug: string) => `/webdesign/${slug}`;
