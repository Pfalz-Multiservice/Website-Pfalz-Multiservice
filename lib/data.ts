import { tidyDeep } from "./typo";
// Inhalte 1:1 aus dem UI-Kit (ui_kits/website/data.jsx)
export const IMG = "/images/";

export const CONTACT = {
  phone: "+49 160 5086983",
  phoneHref: "tel:+491605086983",
  email: "kontakt@pfalz-multiservice.de",
  city: "67551 Worms",
  whatsapp: "https://wa.me/491605086983",
};

export type IconName =
  | "shopping-cart" | "recycle" | "warehouse" | "truck" | "monitor-cog" | "wrench"
  | "lightbulb" | "layers" | "file-check" | "map-pin" | "message-circle" | "phone"
  | "mail" | "check" | "arrow-right" | "chevron-down" | "chevron-right"
  | "circle-arrow-right" | "star" | "menu" | "x" | "arrow-up" | "external-link" | "layout-template"
  | "clapperboard" | "camera" | "pen-tool" | "languages"
  | "key-round" | "lock-keyhole" | "folder-code" | "copyright" | "search-check" | "clipboard-list" | "gauge" | "pencil-line"
  | "search" | "sliders-horizontal" | "calendar-days" | "ticket" | "sparkles" | "smartphone" | "gift" | "package-check"
  | "blinds" | "circle-plus" | "refresh-cw" | "shield-check" | "thermometer" | "network"
  | "phone-off" | "search-x" | "receipt" | "user-x";

export type Service = {
  id: string;
  icon: IconName;
  title: string;
  short: string;
  text: string;
  image: string;
  side?: boolean;
  /** eigene Zielseite statt /leistungen/<id> */
  href?: string;
  /** Meta-Beschreibung (max. ca. 155 Zeichen) */
  seo?: string;
  /** Seitentitel im Suchergebnis mit Ort (max. ca. 38 Zeichen, „ · Pfalz Multiservice“ kommt dazu) */
  seoTitle?: string;
  /** Häufige Fragen auf der Leistungsseite */
  faq?: Faq[];
  /** Kasten „Typische Anliegen“ auf der Leistungsseite */
  points?: { title: string; items: string[]; note?: string };
  /** Kleingedrucktes unter dem Inhalt (z. B. Markenhinweis) */
  legal?: string;
};

export type Faq = [question: string, answer: string];

/** Angaben zum Unternehmen für „Über uns“, Footer und strukturierte Daten */
export const COMPANY = {
  owner: "Jasmin Beer",
  founded: "2021",
  hours: "Termine nach Vereinbarung",
  /** Ortsmitte Worms (bewusst ohne Straße) */
  geo: { latitude: 49.6341, longitude: 8.3507 },
};

const PRICE_FAQ = (what: string): Faq => [
  `Was kostet ${what}?`,
  "Nach einer kurzen Bedarfsanalyse erhalten Sie ein verbindliches Angebot. Sie kennen Umfang und Kosten, bevor wir beginnen, ohne versteckte Posten.",
];

export const SERVICES: Service[] = tidyDeep([
  {
    id: "web",
    seo: "Webdesign und Website-Wartung aus Worms: individuelle Websites ab 199 €, Betreuung ab 39 € im Monat. Persönlich, ohne Baukasten.",
    href: "/webdesign",
    icon: "monitor-cog",
    title: "Web Maintenance & Management",
    short: "Webdesign, Aufbau & Betreuung",
    text: "Laufende technische Betreuung von Websites und Online-Shops: Updates, Sicherheitsüberwachung, Pflege der Inhalte und Systemverwaltung. Aus dem Betrieb eigener Online-Shops bringen wir praktische Erfahrung mit.",
    image: IMG + "webdesign-hero.jpg",
  },
  {
    id: "reselling",
    seoTitle: "Reselling & Restpostenankauf Worms",
    faq: [
      ["Welche Ware kaufen Sie an?", "Überbestände, Restposten und Retourenware. Schildern Sie uns kurz Art, Menge und Zustand, am besten mit ein paar Fotos."],
      ["Was passiert mit der angekauften Ware?", "Wir bereiten sie auf und bringen sie über unsere eigenen Vertriebskanäle zurück in den Markt, statt sie abzuschreiben oder zu entsorgen."],
      ["Welche Vorteile habe ich als Händler?", "Gebundenes Kapital wird schnell wieder flüssig, Lagerfläche wird frei und die Ware wird weiter genutzt statt vernichtet."],
    ],
    seo: "Restposten-Ankauf aus Worms: Wir kaufen Überbestände, Restposten und Retouren an und bringen sie zurück in den Markt. Ihr Kapital wird schnell frei.",
    icon: "recycle",
    title: "Reselling & Asset Recovery",
    short: "Werterhalt statt Abschreibung",
    text: "Überbestände, Restposten und Retourenware binden Kapital und Lagerfläche. Wir kaufen Warenbestände an, bereiten sie auf und führen sie über unsere Vertriebskanäle in den Markt zurück. Für unsere Partner bedeutet das schnelle Liquidität, reduzierte Lagerkosten und einen nachhaltigen Umgang mit Ressourcen.",
    image: IMG + "reselling-wareneingang.jpg",
  },
  {
    id: "ecommerce",
    seoTitle: "E-Commerce & Fulfillment in Worms",
    faq: [
      ["Was umfasst der Bereich E-Commerce?", "Den gesamten Ablauf im Online-Handel: Beschaffung, Einstellen der Artikel, Verkauf und Versandabwicklung, also Lagerung, Verpackung und Versand."],
      ["Verkaufen Sie über eigene Shops oder über Marktplätze?", "Beides. Wir betreiben eigene Online-Shops und nutzen zusätzlich etablierte Marktplätze. So erreichen Artikel mehr Käufer, ohne dass die Abläufe aufwendig werden."],
      PRICE_FAQ("die Unterstützung im E-Commerce"),
    ],
    seo: "E-Commerce aus Worms: eigene Shops und Marktplätze, Einstellen der Artikel, Pflege von Beständen und Preisen, Lagerung, Verpackung und Versand aus einer Hand.",
    icon: "shopping-cart",
    title: "E-Commerce",
    short: "Online-Handel mit System: vom Artikel bis zum Paket",
    text: "Erfolgreicher Online-Handel lebt von sauberen Abläufen. Wir betreiben eigene Online-Shops und verkaufen über die großen Marktplätze. Dieses Wissen setzen wir für Ihren Handel ein: Wir erfassen Ihre Artikel mit Fotos und Beschreibung, erstellen verkaufsstarke Angebote, pflegen Bestände und Preise und übernehmen Lagerung, Verpackung und Versand. Sie behalten den Überblick, wir kümmern uns um die Abwicklung.",
    image: IMG + "ecommerce-versand.jpg",
  },
  {
    id: "clearance",
    seoTitle: "Räumung & Entrümpelung in Worms",
    faq: [
      ["Welche Flächen räumen Sie?", "Garagen, Lager, Hallen und Gewerbeflächen in Worms und der Pfalz, vollständig bis zur besenreinen Übergabe."],
      ["Wie läuft eine Räumung ab?", "Bestandsaufnahme vor Ort, verbindliches Festpreis-Angebot, Durchführung zum vereinbarten Termin und besenreine Übergabe."],
      ["Was passiert mit dem Räumgut?", "Verwertbare Bestände führen wir in den Wirtschaftskreislauf zurück, alles Weitere wird fachgerecht entsorgt."],
    ],
    seo: "Räumung von Garagen, Lagern, Hallen und Gewerbeflächen in Worms und der Pfalz: Festpreis-Angebot, fachgerechte Verwertung, besenreine Übergabe.",
    icon: "truck",
    title: "Clearance Services",
    short: "Strukturierte Räumung, fachgerechte Verwertung",
    text: "Vollständige Räumung und Entrümpelung von Garagen, Lagern, Hallen und Gewerbeflächen: Bestandsaufnahme, verbindliches Angebot, Durchführung und besenreine Übergabe. Verwertbare Bestände werden in den Wirtschaftskreislauf zurückgeführt, alles Weitere fachgerecht entsorgt.",
    image: IMG + "clearance-raeumung.jpg",
  },
  {
    id: "facility",
    seoTitle: "Solutions: Probleme lösen in Worms und der Region",
    faq: [
      ["Bei welchen Problemen helfen Sie?", "Bei nahezu allem, was den Betrieb oder den Alltag ausbremst: organisatorische Engpässe, festgefahrene Abläufe, Störungen oder Aufgaben ohne klaren Zuständigen. Ob wir selbst lösen oder einen spezialisierten Partner einbinden, entscheiden wir nach der Analyse."],
      ["Wie gehen Sie vor?", "Erst Analyse, dann Lösungsweg, dann Umsetzung. Wir ermitteln die eigentliche Ursache, stimmen den Weg mit Ihnen ab und setzen ihn konsequent um. Danach dokumentieren wir kurz, was getan wurde, damit das Problem nicht wiederkommt."],
      ["Arbeiten Sie mit Partnern zusammen?", "Ja. Für Spezialaufgaben greifen wir auf ein Netzwerk geprüfter Betriebe aus Worms und der Region zurück. Sie haben trotzdem nur einen Ansprechpartner: uns."],
      ["Helfen Sie auch Privatkunden?", "Ja. Wir lösen Probleme für Unternehmen ebenso wie für Privatkunden, in Worms und der Region."],
      PRICE_FAQ("ein Einsatz"),
    ],
    seo: "Solutions aus Worms: Wir lösen Probleme und Störungen jeder Art, für Unternehmen und Privatkunden. Ursachenanalyse, klarer Lösungsweg, Umsetzung mit Partnern aus der Region.",
    icon: "wrench",
    title: "Solutions",
    short: "Wir lassen Probleme verschwinden. Spurlos.",
    text: "Manche Herausforderungen passen in keine Schublade: ein Engpass, der den Betrieb ausbremst, ein Ablauf, der hakt, oder eine Störung, für die sich niemand zuständig fühlt. Genau hier setzen wir an. Mit einer strukturierten Ursachenanalyse (Root Cause Analysis) identifizieren wir das eigentliche Problem, definieren einen belastbaren Lösungsweg und setzen ihn konsequent um, im Unternehmen ebenso wie im privaten Umfeld. Als zentraler Ansprechpartner (Single Point of Contact) koordinieren wir bei Bedarf qualifizierte Partner aus der Region und behalten das Ergebnis im Blick, bis das Problem dauerhaft beseitigt ist.",
    points: {
      title: "So gehen wir vor",
      items: [
        "Analyse: Ursache statt Symptom",
        "Lösungsweg: klar definiert und mit Ihnen abgestimmt",
        "Umsetzung: schnell, sauber und dokumentiert",
        "Netzwerk: geprüfte Partner aus der Region",
        "Nachsorge: damit das Problem nicht wiederkommt",
      ],
      note: "Schildern Sie uns kurz die Situation. Wir sagen Ihnen ehrlich, wie wir sie lösen.",
    },
    image: IMG + "solutions-pier.jpg",
  },


  {
    id: "smarthome",
    seoTitle: "KNX-Anlage ändern & erweitern Worms",
    faq: [
      ["Was kostet eine Änderung an meiner KNX-Anlage?", "Änderungen gibt es ab 59 €. Nach einer kurzen, ehrlichen Einschätzung erhalten Sie vorab einen Festpreis."],
      ["Ich habe keine Projektdatei mehr. Geht das trotzdem?", "Projektdatei vorhanden? Super. Wenn nicht, finden wir eine Lösung. Schildern Sie uns kurz Ihre Anlage, dann sagen wir Ihnen ehrlich, was möglich ist."],
      ["Übernehmen Sie auch Elektroinstallation oder Planung?", "Nein. Wir programmieren und ändern bestehende KNX-Anlagen. Elektroinstallation und die Planung neuer Anlagen gehören nicht zu unserem Angebot."],
      ["Wie läuft ein Auftrag ab?", "Sie schildern uns Ihr Anliegen, wir geben Ihnen eine ehrliche Einschätzung, Sie erhalten vorab einen Festpreis, und wir setzen um, testen und übergeben."],
    ],
    seo: "KNX-Anlage ändern oder erweitern ab 59 €: Lichtszenen, Jalousien, neue Geräte, Fehlersuche. Programmierung bestehender Anlagen in Worms und der Pfalz.",
    side: true,
    icon: "lightbulb",
    title: "Smart Home & KNX",
    short: "KNX-Anlagen ändern und erweitern",
    text: "Sie haben eine KNX-Anlage und brauchen Hilfe? Wir programmieren und ändern Ihre bestehende Anlage: schnell, fair und ohne Fachchinesisch. Der Elektriker ist nicht mehr erreichbar, die Programmierung nicht auffindbar oder die Anlage soll einfach etwas Neues können? Schildern Sie uns kurz Ihr Anliegen, wir sagen Ihnen ehrlich, was möglich ist.",
    points: {
      title: "Typische Anliegen",
      items: [
        "Lichtszenen, Zeitschaltungen und Automatisierungen anpassen oder neu anlegen",
        "Jalousien- und Beschattungssteuerung ändern",
        "Neue Geräte in Ihre bestehende Anlage einbinden",
        "Funktionen umprogrammieren, die nicht mehr wie gewünscht laufen",
        "Fehlersuche, wenn Ihre Anlage nicht mehr richtig reagiert",
        "Sicherung (Backup) Ihrer KNX-Projektdatei",
      ],
      note: "Projektdatei vorhanden? Super. Wenn nicht, finden wir eine Lösung. Wir programmieren und ändern, Elektroinstallation gehört nicht zu unserem Angebot.",
    },
    legal: "KNX ist eine eingetragene Marke der KNX Association.",
    image: IMG + "smarthome-knx-verteiler.jpg",
  },
]);

/** Link einer Leistung: eigene Seite (z. B. /webdesign) oder /leistungen/<id> */
export const serviceHref = (s: Service) => s.href ?? `/leistungen/${s.id}`;

/** Kacheln auf der Startseite */
export function homeServiceOrder(): Service[] {
  // Reihenfolge wie SERVICES: Hauptthemen Web, Reselling, E-Commerce zuerst
  return SERVICES.filter((s) => !s.side);
}

export const USPS: { title: string; text: string; lines?: [string, string] }[] = tidyDeep([
  { title: "Alles aus einer Hand", text: "Ein Kontakt für alle Aufgaben\nstatt vieler einzelner Dienstleister.", lines: ["Ein Kontakt für alle Aufgaben statt", "vieler einzelner Dienstleister."] },
  { title: "Verbindliche Angebote", text: "Sie kennen Umfang und Kosten,\nbevor wir beginnen.", lines: ["Sie kennen Umfang und Kosten,", "bevor wir beginnen."] },
  { title: "Schnell vor Ort", text: "Regional in Worms verankert und\nkurzfristig einsatzbereit.", lines: ["Regional in Worms verankert und", "kurzfristig einsatzbereit."] },
]);

/** Zahlenleiste direkt unter dem Hero */
export const STATS: { value: string; label: string }[] = tidyDeep([
  { value: "seit 2021", label: "inhabergeführt in Worms" },
  { value: "6", label: "Leistungen aus einer Hand" },
  { value: "< 1 Werktag", label: "Antwortzeit auf Anfragen" },
  { value: "Festpreis", label: "verbindlich vor Beginn" },
]);

/** Die zwei Hauptthemen der Startseite als große Header: Titel, zwei Sätze, drei Stichpunkte */
export const CORE: { id: string; kicker: string; title: string; text: string; items: string[]; link: string; image?: string }[] = tidyDeep([
  {
    id: "web",
    kicker: "Web Maintenance & Management",
    title: "Websites mit Wirkung",
    text: "Wir entwickeln moderne Websites mit eigener Handschrift: vom klaren One-Pager bis zum Auftritt mit 3D-Effekten und Scroll-Animationen. Technisch sauber umgesetzt und nach dem Start persönlich betreut.",
    items: ["One-Pager und mehrseitige Auftritte", "3D-Effekte und Animationen", "Betreuung, Updates und Sicherheit"],
    link: "Zum Webdesign",
  },
  {
    id: "ecommerce",
    kicker: "E-Commerce",
    title: "Online-Handel aus einer Hand",
    text: "Wir betreiben eigene Online-Shops und verkaufen über die großen Marktplätze. Mit dieser Praxis begleiten wir Ihren Handel: vom Einstellen der Artikel über die Pflege von Beständen und Preisen bis zum versandfertigen Paket.",
    items: ["Eigener Shop und Marktplätze", "Artikel, Bestände und Preise im Griff", "Lagerung, Verpackung und Versand"],
    link: "Zum E-Commerce",
  },
]);

/** Kacheln „Weitere Leistungen“: alles außer den zwei Hauptthemen */
export function homeSubServices(): Service[] {
  const core = new Set(CORE.map((c) => c.id));
  return SERVICES.filter((s) => !core.has(s.id));
}

export const STEPS: [string, string, string][] = tidyDeep([
  ["01", "Anfrage", "Sie schildern Ihr Anliegen per Formular, Telefon oder WhatsApp."],
  ["02", "Bedarfsanalyse", "Persönliches Gespräch oder Besichtigung vor Ort."],
  ["03", "Angebot", "Verbindlich und mit transparentem Leistungsumfang."],
  ["04", "Umsetzung", "Termingerecht, und wir bleiben Ihr Ansprechpartner."],
]);

/** Häufige Fragen auf der Startseite */
export const HOME_FAQ: Faq[] = tidyDeep([
  ["Welche Leistungen bietet Pfalz Multiservice an?", "Webdesign und die Betreuung von Websites, den Ankauf von Restposten und Überbeständen, Online-Handel, Räumungen und Entrümpelungen, Lösungen für Probleme und Störungen jeder Art sowie Änderungen an bestehenden KNX-Anlagen, alles mit einem Ansprechpartner."],
  ["In welchem Gebiet sind Sie tätig?", "In Worms und der Umgebung, unter anderem in Frankenthal, Ludwigshafen, Mannheim, Alzey, Grünstadt und Bensheim. Webdesign bieten wir auch überregional an."],
  ["Arbeiten Sie für Firmen und Privatkunden?", "Ja. Wir arbeiten für Unternehmen ebenso wie für Privatkunden, zum Beispiel bei Räumungen oder wenn ein Problem schnell gelöst werden muss."],
  ["Wie läuft eine Anfrage ab?", "Sie schildern Ihr Anliegen per Formular, Telefon oder WhatsApp. Nach einem Gespräch oder einer Besichtigung erhalten Sie ein verbindliches Angebot, danach setzen wir den Auftrag termingerecht um."],
  ["Was kostet ein Auftrag?", "Das hängt vom Umfang ab. Sie erhalten vorab ein verbindliches Angebot und kennen die Kosten, bevor wir beginnen. Für Websites gibt es Festpreise ab 199 €."],
  ["Wann sind Sie erreichbar?", "Telefonisch und per WhatsApp unter +49 160 5086983 oder per E-Mail an kontakt@pfalz-multiservice.de. Termine vor Ort vereinbaren wir individuell."],
]);

export const AREA = ["Worms", "Frankenthal", "Ludwigshafen", "Mannheim", "Alzey", "Grünstadt", "Bensheim", "Eich", "Bad Dürkheim"];

export const FOOTER_TEXT = tidyDeep(
  "Von E-Commerce und Warenankauf über Lagerung und Räumung bis zur Betreuung von Websites und Objekten: Pfalz Multiservice bündelt Dienstleistungen für Unternehmen und Privatkunden in der Region Worms.");

export const CTA = tidyDeep({
  title: "Lassen Sie uns über Ihr",
  highlight: "Vorhaben sprechen",
  intro: "Schildern Sie uns kurz Ihr Anliegen. Wir antworten innerhalb von 24 Stunden (werktags) mit einem passenden Lösungsvorschlag.",
});

/** Webdesign-Musterdesigns (eigenes Projekt, erreichbar unter EXAMPLES_URL/<slug>) */
export type Example = {
  slug: string;
  name: string;
  branch: string;
  text: string;
  tags: string[];
};

// Reihenfolge = Raster auf /webdesign: oben links, oben rechts, unten links, unten rechts
export const EXAMPLES: Example[] = tidyDeep([
  {
    slug: "fliesenleger",
    name: "Fliesen Reuter",
    branch: "Fliesenlegermeister · Frankenthal",
    text: "Die ganze Seite liegt auf einem Fugenraster: Fliesen klappen im Hero vom Rohbau zum fertigen Bad, dazu Fliesen-Konfigurator, Flächenrechner und Vorher-Nachher.",
    tags: ["Fliesen-Konfigurator", "Flächenrechner", "Vorher-Nachher"],
  },
  {
    slug: "elektriker",
    name: "Elektro Kaiser",
    branch: "Elektro · Photovoltaik · Smart Home",
    text: "Interaktives 3D-Haus mit Energiefluss, PV-Rechner, Tagesverlauf der Anlage und Smart-Home-Szenen.",
    tags: ["3D-Energiefluss", "PV-Rechner", "Smart Home"],
  },
  {
    slug: "weingut",
    name: "Weingut Hollerbach",
    branch: "Weingut · Südliche Weinstraße",
    text: "Editorial-Design mit großer Serifen-Typografie: Weinkarte mit Filter, Porträts der Lagen und Buchung von Weinproben.",
    tags: ["Editorial Design", "Weinkarte", "Weinprobe buchen"],
  },
  {
    slug: "restaurant",
    name: "Gasthaus Zum Rebstock",
    branch: "Gehobene Pfälzer Küche · Deidesheim",
    text: "Warme Gasthaus-Atmosphäre mit Live-Öffnungsstatus, Speisekarte, Karte der Partnerhöfe und Raumplan für Feiern.",
    tags: ["Live-Öffnungszeiten", "Speisekarte", "Tischreservierung"],
  },
]);

/** Klassische Musterdesigns mit Menü – Unterseiten für den Seiten-Umschalter */
export type ClassicExample = Example & {
  pages: { key: string; label: string; path: string }[];
};

export const CLASSIC_EXAMPLES: ClassicExample[] = tidyDeep([
  {
    slug: "seifenmanufaktur",
    name: "Honigstück",
    branch: "Seifenmanufaktur · Online-Shop",
    text: "Ruhiger, warmer Online-Shop: Produktfilter, Warenkorb, Geschenkideen und eine Karte, woher die Zutaten kommen.",
    tags: ["6 Seiten", "Produktfilter", "Warenkorb"],
    pages: [
      { key: "start", label: "Start", path: "" },
      { key: "shop", label: "Shop", path: "" },
      { key: "geschenke", label: "Geschenke", path: "" },
      { key: "zutaten", label: "Zutaten", path: "" },
      { key: "manufaktur", label: "Manufaktur", path: "" },
      { key: "kontakt", label: "Kontakt", path: "" },
    ],
  },
  {
    slug: "beratungsbuero",
    name: "Umraum",
    branch: "Beratungsbüro · Ludwigshafen",
    text: "Seriöser Auftritt für ein Beratungsbüro: Leistungen mit Schnell-Check, Projekte mit Vorher-Nachher-Grundriss, klarer Ablauf und Team.",
    tags: ["6 Seiten", "Schnell-Check", "Projektgalerie"],
    pages: [
      { key: "start", label: "Start", path: "" },
      { key: "leistungen", label: "Leistungen", path: "/leistungen" },
      { key: "projekte", label: "Projekte", path: "/projekte" },
      { key: "ablauf", label: "Ablauf", path: "/ablauf" },
      { key: "ueber-uns", label: "Über uns", path: "/ueber-uns" },
      { key: "kontakt", label: "Kontakt", path: "/kontakt" },
    ],
  },
]);

/** Neues Shop-Design: wird auf /webdesign einzeln vorgestellt (eigene Sektion, nicht im Beispiel-Raster) */
export type ShopExample = ClassicExample & {
  claim: string;
  stats: [string, string][];
  features: { icon: IconName; title: string; text: string }[];
};

export const SHOP_EXAMPLE: ShopExample = tidyDeep({
  slug: "anime-shop",
  name: "KIRA KIRA",
  branch: "Anime & Sammelkarten · Online-Shop mit Laden",
  claim: "Ein Online-Shop, der sich wie ein Erlebnis anfühlt und trotzdem in Sekunden verkauft.",
  text: "Akihabara bei Nacht im Browser: Neonschilder, Holo-Karten, die zur Maus kippen, ein Booster zum Aufreißen und ein 3D-Gacha-Automat mit Deal des Tages. Darunter steckt ein vollständiger Shop mit Filtern, Live-Suche, Warenkorb und Vorbestellungen.",
  tags: ["10 Seiten", "Online-Shop", "3D & Holo-Effekte"],
  pages: [
    { key: "start", label: "Start", path: "" },
    { key: "shop", label: "Shop", path: "#/shop" },
    { key: "singles", label: "Einzelkarten", path: "#/singles" },
    { key: "produkt", label: "Produkt", path: "#/produkt/p02" },
    { key: "vorbestellen", label: "Vorbestellen", path: "#/vorbestellungen" },
    { key: "warenkorb", label: "Warenkorb", path: "#/shop" },
  ],
  stats: [["10", "Seiten"], ["52", "Produkte"], ["7", "Filter"], ["2", "Designs: Tag & Nacht"]],
  features: [
    { icon: "sliders-horizontal", title: "Filter & Sortierung", text: "Nach Marke, Produktart, Sprache, Zustand, Preis und Lagerstand. Am Handy als Bottom-Sheet." },
    { icon: "search", title: "Live-Suche", text: "Treffer erscheinen beim Tippen, mit Vorschau, Preis und Tastaturbedienung." },
    { icon: "shopping-cart", title: "Warenkorb", text: "Seitenleiste mit Mengenänderung und Balken bis zum Gratis-Versand." },
    { icon: "package-check", title: "Produktseiten", text: "Galerie, Lagerstatus, Inhalt der Box, Versandinfos und „Passt dazu“-Empfehlungen." },
    { icon: "calendar-days", title: "Vorbestellungen", text: "Release-Kalender mit Countdown und „Erinnere mich“ für jedes neue Produkt." },
    { icon: "gift", title: "Aktionen & Gutscheine", text: "Deal des Tages und Gutschein-Code als Spiel verpackt: Kunden kommen wieder." },
    { icon: "camera", title: "Ankauf mit Foto-Upload", text: "Kunden schicken Fotos und Beschreibung, Sie antworten mit einem Angebot." },
    { icon: "ticket", title: "Events & Anmeldung", text: "Turniere und Workshops mit freien Plätzen und Anmeldeformular." },
    { icon: "sparkles", title: "Effekte mit Wow", text: "Holo-Karten, 3D-Automat, Manga-Seitenwechsel, Maskottchen mit Tipps." },
    { icon: "smartphone", title: "Mobil zuerst", text: "Geprüft ab 360 px, Neigung am Handy, große Tippflächen." },
    { icon: "gauge", title: "Schnell trotz Effekten", text: "WebP-Bilder mit Vorschau, Schriften als Subset, 3D lädt erst bei Bedarf." },
    { icon: "check", title: "Barrierearm", text: "Tastaturbedienung, sichtbarer Fokus, ruhige Variante bei reduzierter Bewegung." },
  ],
});

/** Webdesign-Seite: Pakete, Ablauf, FAQ */
/** Problem-Karten Webdesign: aus Recherche zu Auslösern und Ängsten kleiner Betriebe (Bitkom/ZDH 2025, HWK-Warnungen, Analyse 500 Handwerker-Seiten 2025) */
export type WebProblem = { icon: IconName; title: string; text: string; tags: string[]; fix: string };
export const WEB_PROBLEMS: WebProblem[] = tidyDeep([
  { icon: "phone-off", title: "Keine Anfragen", text: "Die Seite ist online, doch das Telefon bleibt still. Besucher klicken weg, statt anzufragen.",
    tags: ["Keine Anrufe", "Keine Preise", "Kein Gesicht"], fix: "Echte Fotos, klare Preise und ein Anruf-Knopf, der mit einem Tipp verbindet." },
  { icon: "search-x", title: "Bei Google unsichtbar", text: "Wer in Worms nach Ihrer Leistung sucht, landet beim Mitbewerber und nicht bei Ihnen.",
    tags: ["Google", "Maps", "Handy"], fix: "Saubere Technik, lokale Suchbegriffe und Anbindung an Ihr Google-Unternehmensprofil." },
  { icon: "receipt", title: "Teure Verträge", text: "Monatliche Raten, lange Laufzeit, Kleingedrucktes. Und Sie zahlen jahrelang weiter.",
    tags: ["Abo-Falle", "Mindestlaufzeit", "Kleingedrucktes"], fix: "Festpreis ab 199 €, kein Abo. Den Preis kennen Sie, bevor wir beginnen." },
  { icon: "user-x", title: "Webdesigner weg", text: "Domain und Zugänge laufen auf den Anbieter. Ist er nicht mehr erreichbar, kommen Sie nicht ran.",
    tags: ["Domain", "Zugangsdaten", "Quellcode"], fix: "Sie bekommen 100 % aller Projektdaten: Quellcode, Zugänge, Domain auf Ihren Namen. Nichts wird verschwiegen, alles ist transparent." },
]);

export type WebPackage = { name: string; price: string; unit?: string; note: string; items: string[]; badge?: string; tagline?: string; regular?: string;
  /** Preis bei Jahreszahlung (12 Monate nutzen, 10 zahlen) */
  priceYear?: string; unitYear?: string; regularYear?: string;
  /** rechnerischer Monatspreis bei Jahreszahlung */
  priceYearMonthly?: string };
/** Inhalte 1:1 aus der Preisliste (Preisliste 2026, Stand 01.11.2026) */
/** Pakete: Grundleistungen in jedem Paket, darüber die Besonderheit des Pakets */
export const WEB_BASE_ITEMS: string[] = tidyDeep(["Individuelles Design", "Responsive für alle Geräte", "Individuelle Icons", "Ladezeit-Optimierung", "DSGVO-konform", "Impressum & Datenschutz", "Übergabe-Paket"]);
export const WEB_PACKAGES: WebPackage[] = tidyDeep([
  {
    name: "Start", price: "199 €", unit: "einmalig", tagline: "Für den schnellen, starken Auftritt auf einer Seite.", note: "OnePager · bis 5 Abschnitte · mehrere Bildlizenzen",
    items: ["Alle Inhalte übersichtlich auf einer Seite", ...WEB_BASE_ITEMS],
  },
  {
    name: "Business", price: "299 €", unit: "einmalig", badge: "Beliebt", tagline: "Für Betriebe, die mehr zeigen wollen.", note: "OnePager oder bis 8 Seiten · Bildlizenzen inklusive",
    items: ["Mehrere Seiten mit Menü und Unterseiten", ...WEB_BASE_ITEMS],
  },
  {
    name: "Shop / Premium", price: "individuell", unit: "nach Angebot", tagline: "Für Online-Shops und größere Projekte.", note: "Bis 20 Seiten · Shop oder Sonderfunktionen · Bildlizenzen inklusive",
    items: ["Online-Shop oder besondere Funktionen", ...WEB_BASE_ITEMS],
  },
]);

/** Betreuung nach dem Livegang */
export const WEB_CARE: WebPackage[] = tidyDeep([
  {
    name: "Wartung", price: "39 €", unit: "/ Monat", priceYear: "390 €", unitYear: "/ Jahr", priceYearMonthly: "32,50 €", note: "Die Basis-Betreuung",
    items: ["Bis 1 Std. Änderungen pro Monat", "Domain- und E-Mail-Einrichtung"],
  },
  {
    name: "Wartung Pro", price: "59 €", unit: "/ Monat", priceYear: "590 €", unitYear: "/ Jahr", priceYearMonthly: "49,17 €", note: "Für aktive Unternehmens-Websites",
    items: ["Bis 2 Std. Änderungen pro Monat", "Premium-Hosting auf EU-Servern inklusive", "Tägliche Backups", "Google-Unternehmensprofil einrichten, optimieren & pflegen", "Einrichtung von Domain, E-Mail und Hosting"],
  },
  {
    name: "Wartung Premium", price: "99 €", unit: "/ Monat", priceYear: "990 €", unitYear: "/ Jahr", priceYearMonthly: "82,50 €", note: "Für große Projekte mit viel Content",
    items: ["Bis 3 Std. Änderungen pro Monat", "Neue Inhalte mehrmals pro Monat, z. B. Blogs", "KI-Fotos & 3D-Motion-Clips", "Google-Unternehmensprofil einrichten, optimieren & pflegen", "Premium-Hosting inklusive, 99,9 % Uptime-Garantie", "Antwort innerhalb von 24 Std. (werktags)"],
  },
]);

/** Gut zu wissen zum Wartungsprogramm (Preisliste 2026) */
export const WEB_CARE_NOTES: { title: string; text: string }[] = tidyDeep([
  { title: "Reaktionszeit", text: "Premium 24 Std., Wartung und Pro 48 Std. (werktags). 100 % Erreichbarkeit kann niemand garantieren." },
  { title: "Nicht enthalten", text: "Redesign, Neuentwicklung, Hack-Behebung und vom Kunden verursachte Fehler: 39 € pro Stunde." },
]);

/** In allen Paketen inklusive – ohne Aufpreis */
export const WEB_INCLUDED = tidyDeep([
  "Design für Smartphone und Desktop", "Menü und Navigation", "FAQ-Bereich", "Kontaktformular", "WhatsApp-Button",
  "Anfahrt mit Link zu Google Maps", "Social-Media-Links", "Texte erstellen oder\nalte Inhalte übernehmen",
  "Kuratierte Bildauswahl,\nBildlizenzen inklusive", "SEO: Suchbegriffe und Meta-Texte", "Vorbereitet für Google- und KI-Suche",
  "Online-Terminbuchung", "Google-Bewertungen einbinden", "Vorher-Nachher-Galerie", "Klickbare Telefonnummer", "XML-Sitemap für Google",
  "Strukturierte Daten für Google", "Vorschaubild für WhatsApp und Social Media", "Favicon mit Ihrem Logo", "Eigene Fehlerseite (404)",
]);

/** „Was bekomme ich?“ – der Leistungsumfang jeder Website, klar benannt */
export const WEB_DELIVER: { icon: IconName; title: string; text: string }[] = tidyDeep([
  { icon: "layout-template", title: "Individuelles Webdesign", text: "Eigenes Design für Ihren Betrieb, kein Baukasten, keine Vorlage von der Stange." },
  { icon: "monitor-cog", title: "Für Handy, Tablet & PC", text: "Geprüft ab 360 px Breite, ohne seitliches Scrollen und mit großen Tippflächen." },
  { icon: "search-check", title: "SEO-Grundlagen", text: "Seitentitel, Beschreibungen, Überschriften, Sitemap, robots.txt und strukturierte Daten für Google und KI-Suche." },
  { icon: "gauge", title: "Ladezeit-Optimierung", text: "Bilder in modernen Formaten, schlanker Code, gemessen mit PageSpeed." },
  { icon: "lock-keyhole", title: "DSGVO-konform", text: "Keine Tracking-Cookies, Schriften vom eigenen Server, Kontaktformular ohne Drittanbieter." },
  { icon: "file-check", title: "Impressum & Datenschutz", text: "Wir binden Ihre rechtlichen Angaben ein und halten sie aktuell. Keine Rechtsberatung." },
  { icon: "message-circle", title: "Kontaktwege", text: "Formular direkt in Ihr Postfach, dazu WhatsApp, Telefon und E-Mail." },
  { icon: "external-link", title: "Fertig veröffentlicht", text: "Online unter Ihrer eigenen Domain, mit SSL-Verschlüsselung, sobald Sie freigegeben haben." },
]);

/** Übergabe-Paket – in jedem Paket gleich enthalten */
export type HandoverItem = { icon: IconName; title: string; text: string };
export const WEB_FIX_DAYS = 30;
export const WEB_HANDOVER: { group: string; items: HandoverItem[] }[] = tidyDeep([
  {
    group: "Eigentum & Unabhängigkeit",
    items: [
      { icon: "key-round", title: "Domain & Hosting auf Ihren Namen", text: "Der Vertrag läuft direkt zwischen Ihnen und dem Anbieter, nicht über uns." },
      { icon: "lock-keyhole", title: "Alle Zugangsdaten gehören Ihnen", text: "Sicher bei der Übergabe überreicht, nicht im Klartext per E-Mail." },
      { icon: "folder-code", title: "Quellcode & Dateien", text: "Als ZIP oder Git-Repository, ohne Lock-in.\nSie können jederzeit wechseln." },
      { icon: "copyright", title: "Nutzungsrechte an Texten & Bildern", text: "Alles, was wir für Sie erstellen, dürfen Sie nach vollständiger Bezahlung unbefristet nutzen." },
    ],
  },
  {
    group: "Dokumentation",
    items: [
      { icon: "search-check", title: "SEO- & KI-Dokumentation", text: "Prüfbericht mit 43 Punkten als PDF: wie Ihre Website für Google und die KI-Suche aufgestellt ist." },
      { icon: "clipboard-list", title: "Übergabeblatt", text: "Domain, Hosting, E-Mail-Postfach, Ziel des Kontaktformulars und Vertragslaufzeiten auf einen Blick." },
      { icon: "gauge", title: "PageSpeed-Messung", text: "Ladezeit auf Smartphone und Desktop, gemessen und dokumentiert zum Livegang." },
    ],
  },
  {
    group: "Nach dem Livegang",
    items: [
      { icon: "pencil-line", title: `${WEB_FIX_DAYS} Tage kostenlose Korrekturen`, text: "Kleine Korrekturen nach dem Livegang übernehmen wir ohne Berechnung." },
    ],
  },
]);

/** Zusatzleistungen – optional zu jedem Paket (Preise bewusst nicht auf der Website) */
export const WEB_ADDONS: { icon: IconName; title: string; text: string }[] = tidyDeep([
  { icon: "clapperboard", title: "3D Motion & Cinematic Video", text: "Animierte Website mit KI-Videoclips in Kino-Optik:\nDolly-Zoom, 360°-Orbit, FPV-Drohnenflug." },
  { icon: "camera", title: "KI-Fotografie in Studioqualität", text: "Fotorealistische Produkt- und Szenen-Shots mit\nRelight und Upscale, so viele, wie nötig." },
  { icon: "pen-tool", title: "Logo-Design", text: "Ein eigenes Logo für Ihren Auftritt." },
  { icon: "languages", title: "Mehrsprachigkeit", text: "Ihre Website zusätzlich in einer anderen Sprache." },
]);

export const WEB_STEPS: [string, string, string][] = tidyDeep([
  ["01", "Anfrage", "Sie schildern kurz Ihr Vorhaben, per Formular, Telefon oder WhatsApp. Kostenlos, Antwort innerhalb von 24 Std. (werktags)."],
  ["02", "Gespräch", "Wir klären gemeinsam, was Sie wirklich brauchen, und was nicht."],
  ["03", "Angebot", "Sie erhalten einen Festpreis mit klarem Leistungsumfang."],
  ["04", "Entwurf & Freigabe", "Sie sehen alles vorab. Nichts geht ohne Ihr OK online."],
  ["05", "Livegang", "Ihre Website geht online. Auf Wunsch betreuen wir sie danach weiter."],
]);

export const WEB_FAQ: [string, string][] = tidyDeep([
  ["Was kostet eine Website?", "Start (OnePager, bis 5 Abschnitte) kostet 199 €, Business (OnePager oder mehrseitige Website, bis 8 Seiten) kostet 299 €. Beides sind einmalige Festpreise. Online-Shops und Sonderprojekte bis 20 Seiten bieten wir individuell nach Angebot an. Versteckte Kosten gibt es nicht."],
  ["Was ist im Preis enthalten?", "In jedem Paket: individuelles Design, responsive Umsetzung für alle Geräte, individuelle Icons, Ladezeit-Optimierung, DSGVO-konforme Umsetzung, eingebundenes Impressum und Datenschutz, Bildlizenzen und das Übergabe-Paket. Dazu ohne Aufpreis: Design für Smartphone und Desktop, Menü und Navigation, FAQ-Bereich, Kontaktformular, WhatsApp-Button, Anfahrt mit Link zu Google Maps, Social-Media-Links, Texte erstellen oder übernehmen, kuratierte Bildauswahl, SEO-Grundlagen, Vorbereitung für Google- und KI-Suche, Online-Terminbuchung, Google-Bewertungen und Vorher-Nachher-Galerie."],
  ["Was gehört zur SEO-Grundoptimierung?", "Seitentitel und Beschreibungen für jede Seite, eine saubere Überschriften-Struktur, Bildbeschreibungen, eine XML-Sitemap, robots.txt, strukturierte Daten für Ihren Betrieb und die Anmeldung bei der Google Search Console. Platz 1 bei Google kann seriös niemand versprechen, aber Ihre Website ist technisch so aufgestellt, dass Google und KI-Suchen sie gut lesen können."],
  ["Was heißt DSGVO-konform bei Ihnen?", "Keine Tracking- oder Werbe-Cookies, keine Schriften von Google-Servern, Kontaktformular ohne Drittanbieter und verschlüsselte Verbindung per SSL. Impressum und Datenschutzerklärung binden wir ein; die Inhalte stammen von Ihnen oder einem Generator Ihrer Wahl, eine Rechtsberatung ersetzen wir nicht."],
  ["Welche laufenden Kosten kommen nach dem Livegang?", "Nur Hosting und Domain, die Sie direkt beim Anbieter Ihrer Wahl bezahlen, nicht über uns. Wie hoch sie sind, hängt von Anbieter und Tarif ab; den Betrag weisen wir in Ihrem Angebot getrennt aus. Es gibt kein verstecktes Abo. Wartung ist freiwillig und monatlich kündbar."],
  ["Mit welcher Technik bauen Sie Websites?", "Je nach Bedarf: als schlanke HTML-Website oder mit Node.js, wenn interaktive Funktionen wie Rechner, Filter oder Animationen gefragt sind. Wir arbeiten ohne Baukasten, deshalb laden die Seiten schnell und sehen nicht aus wie tausend andere."],
  ["Wie funktioniert das Kontaktformular auf meiner Website?", "Anfragen aus dem Kontaktformular verschicken wir über den E-Mail-Server (SMTP) Ihres eigenen Postfachs direkt zu Ihnen. Es ist kein Drittanbieter zwischengeschaltet, Ihre Daten bleiben bei Ihnen."],
  ["Welchen Hoster empfehlen Sie?", "Wir arbeiten mit einigen Hosting-Anbietern zusammen. Gerne beraten wir Sie, welcher zu Ihrem Vorhaben passt. Sie können aber auch jeden anderen Anbieter wählen oder Ihr bestehendes Paket behalten."],
  ["Muss ich mich selbst um Domain, Hosting und E-Mail kümmern?", "Nein. Auf Wunsch begleiten wir Sie durch den kompletten Ablauf: Domain sichern, Hosting und E-Mail-Postfach einrichten, Kontaktformular anbinden, Website veröffentlichen und das Google-Unternehmensprofil anlegen. Die Einrichtung von Domain, E-Mail und Hosting ist in Wartung Pro und Premium enthalten."],
  ["Gehört mir die Website am Ende?", "Ja, vollständig, und das in jedem Paket. Nach vollständiger Bezahlung erhalten Sie alle Nutzungsrechte und Zugangsdaten. Domain und Hosting laufen auf Ihren Namen, alle Zugangsdaten gehören Ihnen und Sie erhalten den Quellcode als ZIP oder Git-Repository. Texte und Bilder, die wir erstellen, dürfen Sie unbefristet nutzen. Dazu bekommen Sie ein Übergabeblatt, eine SEO- und KI-Dokumentation als PDF und eine PageSpeed-Messung zum Livegang. Kleine Korrekturen in den ersten 30 Tagen nach dem Livegang sind kostenlos."],
  ["Gibt es ein Abo oder eine Vertragsbindung?", "Nein. Kein Abo, kein Zwang. Die Website kostet einmalig und gehört Ihnen. Wartung können Sie auf Wunsch ab 39 € im Monat dazubuchen, monatlich kündbar, müssen es aber nicht."],
  ["Wie schnell antworten Sie auf meine Anfrage?", "Innerhalb von 24 Stunden an Werktagen, ob per Formular, Briefing, E-Mail oder WhatsApp. Bei Wartung Premium gilt dieselbe Reaktionszeit von 24 Stunden für Ihre Änderungswünsche."],
  ["Wie lange dauert es, bis meine Website online ist?", "Das hängt vom Umfang ab. Den Zeitplan legen wir vorab gemeinsam fest, damit Sie vor dem Start wissen, wann Ihre Seite online geht."],
  ["Was brauchen Sie von mir?", "Ihr Logo, ein paar Fotos und Stichpunkte zu Ihren Leistungen reichen für den Anfang. Texte erstellen wir auf Wunsch, eine kuratierte Bildauswahl ist inklusive. Alles Weitere besprechen wir im Gespräch."],
  ["Kümmern Sie sich auch nach dem Livegang um die Website?", "Ja, wenn Sie möchten. Sie melden Ihre Änderungen, wir setzen sie um: mit Wartung (39 € im Monat, bis 1 Std.), Wartung Pro (59 € im Monat, bis 2 Std.) oder Wartung Premium (99 € im Monat, bis 3 Std.), jeweils monatlich kündbar. Einzelne Änderungen ohne Paket kosten 39 € pro Stunde. In Wartung Pro und Premium ist Premium-Hosting auf EU-Servern enthalten, sonst zahlen Sie Hosting und Domain direkt beim Anbieter Ihrer Wahl."],
  ["Ich habe schon eine Website. Können Sie die übernehmen?", "Ja. Wir überarbeiten auch bestehende Websites und übernehmen alte Inhalte. Schicken Sie uns zuerst den Link für den kostenlosen Website-Check."],
  ["Für wen ist das Angebot?", "Unser Webdesign- und Wartungsangebot richtet sich ausschließlich an Unternehmer im Sinne von § 14 BGB, also Gewerbetreibende, Selbstständige und Betriebe. Verträge mit Verbrauchern schließen wir hierüber nicht."],
  ["Sind die Beispiele echte Kunden?", "Nein. Die Beispiele sind Musterdesigns für erfundene Betriebe. Sie zeigen, was möglich ist. Ihre Website gestalten wir individuell für Ihren Betrieb."],
]);

/** Partner aus der Region (Freigabe für Name, Logo und Fotos liegt vor). Weitere Partner einfach unten anhängen. */
export type Partner = {
  slug: string;
  name: string;
  branch: string;
  host: string;
  url: string;
  logo: string;
  photo: string;
  /** Kopfbild des Partnerabschnitts auf /partner */
  header: string;
  since: string;
  short: string;
  text: string;
  facts: [string, string][];
  awards: string[];
};

const UTM = "utm_source=pfalz-multiservice&utm_medium=referral&utm_campaign=partner";
const withUtm = (url: string) => `${url}${url.includes("?") ? "&" : "?"}${UTM}`;

export const PARTNERS: Partner[] = tidyDeep([
  {
    slug: "verve-apartments",
    name: "Verve Apartments",
    branch: "Ferienwohnungen in Worms",
    host: "verveapartments.de",
    url: withUtm("https://verveapartments.de"),
    logo: "/images/partner/verve/logo.png",
    photo: "/images/partner/verve/p1.jpg",
    header: "/images/partner/verve/hero.jpg",
    since: "Partner aus Worms",
    short: "Vier Ferienwohnungen in Worms für bis zu 9 Personen: für Familien, Gruppen, Geschäftsreisende und Projektteams.",
    text: "Verve Apartments und Pfalz Multiservice arbeiten eng zusammen. Wenn es irgendwo hakt, ob bei der Technik, rund um die Immobilien oder bei allem anderen, sind wir zur Stelle.",
    facts: [["4", "Unterkünfte in Worms"], ["bis 9", "Personen pro Unterkunft"], ["4,8", "Sterne aus 200 Bewertungen"]],
    awards: ["Airbnb Superhost seit 2024", "Booking.com Traveller Review Award", "Vrbo Premium-Gastgeber"],
  },
  {
    slug: "multimedia-service-schaffner",
    name: "Multimedia Service Schaffner",
    branch: "Computer- und Technikservice in Worms",
    host: "multimedia-service-schaffner.de",
    url: withUtm("https://www.multimedia-service-schaffner.de"),
    logo: "/images/partner/schaffner/logo.png",
    photo: "/images/partner/schaffner/p1.jpg",
    header: "/images/partner/schaffner/hero-4k.jpg",
    since: "Partner aus Worms",
    short: "Computer, WLAN, Smart Home, TV und HiFi: eingerichtet, repariert und erklärt, direkt bei den Kunden zu Hause in Worms und Umgebung.",
    text: "Multimedia Service Schaffner und Pfalz Multiservice ergänzen sich. Wenn bei unseren Kunden Computer, WLAN, Fernseher oder Smart Home nicht mehr wollen, ist das Team von Mirco Schaffner zur Stelle. Umgekehrt sind wir da, wenn es um Webdesign, die Wartung der Website und alles Weitere rund um den Auftritt im Netz geht.",
    facts: [["10+", "Jahre Erfahrung vor Ort"], ["5", "Köpfe im Team"], ["5,0", "Sterne bei Google"]],
    awards: ["FRITZ! Premium Partner 2026", "Starlink-zertifiziert", "Reolink-Partner"],
  },
]);

/** Unterkunftstipp auf Leistungsseiten: Verve Apartments, Bereich für Projektteams */
export const PARTNER_STAY = { partner: PARTNERS[0], href: withUtm("https://verveapartments.de/de/projektteams") };
