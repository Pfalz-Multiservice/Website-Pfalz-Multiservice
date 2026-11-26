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
  /** Einleitung im Seitenkopf (zwei Zeilen, \n trennt) */
  intro: string;
  /** Zwei Absätze für den Abschnitt „Ihr Webdesigner für <Ort>“ */
  text: [string, string];
  points: { title: string; text: string }[];
  faq: Faq[];
  /** Wirtschaft vor Ort: eigene, belegte Fakten je Stadt (Quellen im Kommentar am Eintrag) */
  economy: {
    text: [string, string];
    facts: { value: string; label: string }[];
    /** Was eine Website für Betriebe in dieser Stadt leisten sollte */
    needs: { title: string; text: string }[];
  };
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
    intro: "Websites für Zulieferer, Handwerk und Dienstleister aus Frankenthal, zum Festpreis und ohne Abo.\nIhr Ansprechpartner sitzt rund 11 Kilometer entfernt in Worms.",
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
      ["Lohnt sich eine eigene Website für einen Zulieferer in Frankenthal?", "Ja, wenn Ihre Kunden Sie vor dem ersten Anruf prüfen. Einkäufer und Projektleiter schauen sich Leistungen, Referenzen und Zertifikate meist online an. Dafür eignet sich eine eigene Seite je Leistung, die Google einzeln findet, wie im Paket Business für 299 €."],
    ],
    // Quellen: IHK Pfalz (Bevölkerung 31.12.2024; Standortumfrage ~1.400 Unternehmen; Gewerbeflächen „rar“),
    // RHEINPFALZ (KSB-Stammsitz, Großpumpen, rund 2.000 Mitarbeiter in Frankenthal), Entfernung: Luftlinie Stadtmitte Worms
    economy: {
      text: [
        "Frankenthal ist Industriestadt. Der Pumpen- und Armaturenhersteller KSB hat hier seinen Stammsitz und fertigt im Werk unter anderem Großpumpen. Rund um solche Werke arbeiten Zulieferer, Wartungsbetriebe und Handwerker, die ihre Kunden oft in anderen Firmen finden.",
        "Gewerbeflächen sind in Frankenthal knapp, das hält auch die IHK Pfalz fest. Viele Betriebe wachsen deshalb nicht mit neuen Hallen, sondern mit neuen Aufträgen. Eine Website, die zeigt, was Sie können und für wen Sie arbeiten, ist dafür der günstigste Hebel.",
      ],
      facts: [
        { value: "rund 48.100", label: "Einwohner (Ende 2024)" },
        { value: "rund 11 km", label: "Luftlinie bis zu uns nach Worms" },
        { value: "≈ 1.400", label: "Unternehmen von der IHK zum Standort befragt" },
        { value: "KSB", label: "Stammsitz des Pumpen- und Armaturenherstellers" },
      ],
      needs: [
        { title: "Für Firmenkunden geschrieben", text: "Leistungen, Referenzen und Zertifikate so, dass Einkäufer Sie vor dem ersten Anruf einordnen können." },
        { title: "Kernstadt und Ortsbezirke", text: "Eppstein, Flomersheim, Mörsch und Studernheim gehören dazu. Wer dort sucht, soll Sie finden." },
        { title: "Kurzer Weg", text: "Wir sitzen rund 11 Kilometer entfernt in Worms. Termine nach Vereinbarung." },
      ],
    },
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
    intro: "Websites für Mittelstand, Handwerk und Dienstleister aus Ludwigshafen, von Oggersheim bis Rheingönheim.\nZum Festpreis, ohne Abo, persönlich betreut aus Worms.",
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
      ["Arbeiten Sie auch für Dienstleister mit Firmenkunden?", "Ja. Unsere Seite „Website für Unternehmen“ ist genau dafür gedacht, etwa für Gebäudereinigung, Technik oder Logistik. Wichtig sind dort Referenzen, ein klarer Leistungsumfang und ein schneller Weg zum Angebot."],
    ],
    // Quellen: Stadt/dewiki (177.222 Einwohner 31.12.2024), IHK Pfalz (rund 57 % Wirtschaftskraft aus produzierendem Gewerbe,
    // Standortumfrage ~3.600 Unternehmen), W.E.G. Ludwigshafen (Mittelstandspark Mannheimer Straße ~16 ha, trimodales Containerterminal),
    // RHEINPFALZ (14 Stadtteile, Oggersheim der größte), Entfernung: Luftlinie Stadtmitte Worms
    economy: {
      text: [
        "Ludwigshafen ist als Hauptsitz der BASF bekannt. Rund 57 Prozent der Wirtschaftskraft kommen laut IHK Pfalz aus dem produzierenden Gewerbe, so viel wie in keiner anderen Stadt oder keinem Kreis der Pfalz. Dazu kommen Hafen und Logistik mit einem trimodalen Containerterminal.",
        "Die Stadt setzt zugleich auf den Mittelstand: Mit dem Mittelstandspark Mannheimer Straße entstehen rund 16 Hektar neue Flächen für Unternehmen. Für Dienstleister und Handwerk heißt das: Viele Kunden sind selbst Firmen, und sie vergleichen Anbieter online, bevor sie anfragen.",
      ],
      facts: [
        { value: "177.222", label: "Einwohner (Ende 2024)" },
        { value: "≈ 57 %", label: "der Wirtschaftskraft aus dem produzierenden Gewerbe" },
        { value: "14", label: "Stadtteile, Oggersheim ist der größte" },
        { value: "rund 19 km", label: "Luftlinie bis zu uns nach Worms" },
      ],
      needs: [
        { title: "Für Firmenkunden geschrieben", text: "Leistungsumfang, Referenzen und ein klarer Ansprechpartner, damit Einkäufer Sie schnell vergleichen können." },
        { title: "Technik verständlich erklärt", text: "Komplexe Leistungen in klare Abschnitte gegliedert, mit Anfrageformular statt langer Texte." },
        { title: "Ihr Stadtteil zuerst", text: "Von Oggersheim bis Ruchheim: Wir nennen den Stadtteil, in dem Sie arbeiten, und die Orte, in die Sie fahren." },
      ],
    },
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
    intro: "Websites für Geschäfte in den Quadraten, Handwerk und Dienstleister in Mannheim.\nFestpreis statt Agenturpreis, persönlich betreut aus Worms.",
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
      ["Wie gebe ich eine Adresse in den Quadraten richtig an?", "Genauso wie im Google-Unternehmensprofil: Quadrat, Hausnummer und Postleitzahl, ohne Straßennamen. Auf der Website ergänzen wir eine Karte und einen kurzen Wegehinweis. Gleiche Angaben auf Website und Google-Profil helfen Kunden und der Zuordnung bei Google."],
    ],
    // Quellen: IHK Rhein-Neckar (Magazin 2/2026: „Industrie, Handel, Dienstleistung“, jeder dritte Euro des regionalen
    // Einzelhandels fließt nach Mannheim; Kaufkraftanalyse 2024: Quadrate verlieren, Standorte außerhalb legen zu),
    // Stadt Mannheim („Stadt im Quadrat“: Adressen wie E5 oder G7), HWK Mannheim Rhein-Neckar-Odenwald (13.916 Betriebe, 30.06.2024),
    // Entfernung: Luftlinie Stadtmitte Worms
    economy: {
      text: [
        "Mannheim ist Industrie, Handel und Dienstleistung zugleich, so beschreibt es die IHK Rhein-Neckar. Noch fließt jeder dritte Euro, den die Region im Einzelhandel ausgibt, nach Mannheim. Die Kaufkraftanalyse der IHK zeigt aber auch: Die Innenstadt in den Quadraten verliert, Standorte außerhalb legen zu.",
        "Für Geschäfte und Gastronomie in den Quadraten heißt das: Kunden entscheiden oft unterwegs am Handy, wohin sie gehen. Für Handwerksbetriebe, im Kammerbezirk Mannheim Rhein-Neckar-Odenwald sind es fast 14.000, zählt dagegen, bei der Suche nach dem Gewerk im eigenen Stadtteil aufzutauchen.",
      ],
      facts: [
        { value: "jeder 3. Euro", label: "des regionalen Einzelhandels fließt nach Mannheim" },
        { value: "13.916", label: "Handwerksbetriebe im Kammerbezirk (Mitte 2024)" },
        { value: "E5, G7 …", label: "Adressen ohne Straßennamen in den Quadraten" },
        { value: "rund 18 km", label: "Luftlinie bis zu uns nach Worms" },
      ],
      needs: [
        { title: "Adresse im Quadrat", text: "Quadrat und Hausnummer mit Karte und kurzem Wegehinweis, damit niemand suchen muss." },
        { title: "Öffnungszeiten am Handy", text: "Gut sichtbar und genauso wie im Google-Profil, für Kunden, die spontan entscheiden." },
        { title: "Gewerk und Stadtteil", text: "Für Handwerker: Leistung und Einsatzgebiet in Titeln und Texten, von Neckarau bis Sandhofen." },
      ],
    },
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
    intro: "Websites für Betriebe, Weingüter und Arbeitgeber in Alzey und Rheinhessen.\nZum Festpreis, ohne Abo, persönlich betreut aus Worms.",
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
      ["Kann die Website auch Stellenanzeigen enthalten?", "Ja. Eine eigene Karriere-Seite mit offenen Stellen, Ansprechpartner und Bewerbungsweg ist im Paket Business möglich. Neue Stellen tragen wir im Rahmen der Wartung ein oder einzeln für 39 € pro Stunde."],
    ],
    // Quellen: dewiki/Statistik (19.468 Einwohner 31.12.2024; Kreisstadt seit 1969), IHK für Rheinhessen (KMU-geprägt,
    // größtes Weinanbaugebiet; Unternehmensbefragung Alzey Juni/Juli 2026: >400 Unternehmen, Stärken Verkehrsanbindung und
    // Flächenangebot, mehr als die Hälfte mit Fachkräfteproblemen), Stadt Alzey (Autobahnkreuz A61/A63 nördlich der Stadt),
    // rheinhessen.de (Weinbauamt der Landwirtschaftskammer in Alzey)
    economy: {
      text: [
        "Alzey ist seit 1969 Kreisstadt des Landkreises Alzey-Worms und liegt mitten in Rheinhessen, dem größten Weinanbaugebiet Deutschlands. Die Wirtschaft der Region ist von kleinen und mittelständischen Unternehmen geprägt, und in Alzey sitzt das Weinbauamt der Landwirtschaftskammer für Rheinhessen.",
        "In einer Befragung der IHK für Rheinhessen im Sommer 2026 nannten Alzeyer Unternehmen vor allem die Verkehrsanbindung und das Flächenangebot als Stärken. Mehr als die Hälfte berichtete zugleich von Schwierigkeiten, Fachkräfte zu finden. Auch dabei hilft eine gute Website, denn Bewerber schauen zuerst online nach.",
      ],
      facts: [
        { value: "19.468", label: "Einwohner (Ende 2024)" },
        { value: "Kreisstadt", label: "des Landkreises Alzey-Worms" },
        { value: "A61 / A63", label: "Autobahnkreuz nördlich der Stadt" },
        { value: "400+", label: "Unternehmen in der IHK-Befragung 2026" },
      ],
      needs: [
        { title: "Für Weingüter", text: "Weinliste, Weinproben und Hoffeste mit Terminen. Ein Online-Shop ist nach Angebot möglich." },
        { title: "Karriere-Seite", text: "Offene Stellen, Ansprechpartner und Bewerbungsweg auf einer eigenen Seite, für Bewerber aus der Region." },
        { title: "Stadtteile und Umland", text: "Weinheim, Heimersheim, Dautenheim und Schafhausen sowie die Orte im Alzeyer Land." },
      ],
    },
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
    intro: "Websites für Fachbetriebe, Geschäfte und Gastgeber in Grünstadt und im Leiningerland.\nZum Festpreis, ohne Abo, persönlich betreut aus Worms.",
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
      ["Mein Betrieb sitzt im Gewerbegebiet Grünstadt. Was gehört auf die Website?", "Vor allem Ihre Spezialität: was Sie machen, für wen und in welchem Umkreis. Eine eigene Seite je Leistung, wie im Paket Business, hilft, für einzelne Suchbegriffe gefunden zu werden. Dazu Fotos Ihrer Arbeiten, ein Ansprechpartner und ein Anfrageformular."],
    ],
    // Quellen: Wikivoyage (14.169 Einwohner 2023; bedeutendste Stadt am Nordabschnitt der Weinstraße), Wochenblatt Grünstadt
    // (mittelständische Industrie, Einkaufsstadt mit Fußgängerzone; Leiningerland mit 21 Ortsgemeinden; Gewerbegebiet „Quadrat der
    // Spezialisten“ im Wirtschafts-Forum Grünstadt), RHEINPFALZ (Industriemarkt mit rund 120 Firmen), Entfernung: Luftlinie Stadtmitte Worms
    economy: {
      text: [
        "Grünstadt ist die bedeutendste Stadt am Nordabschnitt der Deutschen Weinstraße. Mittelständische Industrie und viele Einzelhandels- und Gewerbebetriebe machen die Stadt mit ihrer Fußgängerzone zu einer beliebten Einkaufsstadt für das ganze Leiningerland.",
        "Das Gewerbegebiet trägt den Beinamen „Quadrat der Spezialisten“ und ist im Wirtschafts-Forum Grünstadt organisiert, zusammen mit Innenstadt und Leiningerland. Zum Industriemarkt im Gewerbegebiet kamen schon rund 120 Firmen als Aussteller. Online gilt dasselbe: Wer seine Spezialität klar zeigt, wird gefunden.",
      ],
      facts: [
        { value: "rund 14.000", label: "Einwohner, mit Asselheim und Sausenheim" },
        { value: "„Quadrat der Spezia\u00ADlisten“", label: "Beiname des Gewerbegebiets" },
        { value: "21", label: "Ortsgemeinden im Leiningerland ringsum" },
        { value: "rund 15 km", label: "Luftlinie bis zu uns nach Worms" },
      ],
      needs: [
        { title: "Fachbetrieb im Gewerbegebiet", text: "Jede Leistung einzeln beschrieben, damit Sie für Ihre Spezialität gefunden werden." },
        { title: "Geschäft in der Fußgängerzone", text: "Öffnungszeiten, Angebot und Anfahrt am Handy auf einen Blick." },
        { title: "Das Leiningerland mitdenken", text: "Asselheim, Sausenheim und die Orte ringsum gehören in Ihr Einzugsgebiet." },
      ],
    },
  },
]);

export const ortHref = (slug: string) => `/webdesign/${slug}`;
