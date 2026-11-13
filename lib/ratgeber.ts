/** Ratgeber: wenige, sachliche Artikel für Suchanfragen, bewusst ohne Bilder und ohne Platz auf Start- und Leistungsseiten */
export type GuideSection = { h: string; p?: string[]; l?: string[] };
export type Guide = {
  slug: string;
  title: string;
  /** Kurzer Titel für <title> und Vorschau (max. ~60 Zeichen, ohne Markenzusatz); die H1 bleibt `title` */
  seoTitle?: string;
  teaser: string;
  /** ISO-Datum der Veröffentlichung */
  date: string;
  /** Anzeige, z. B. „3. November 2026“ */
  dateLabel: string;
  sections: GuideSection[];
  faq?: [string, string][];
};

export const GUIDES: Guide[] = [
  {
    slug: "was-kostet-eine-website",
    title: "Was kostet eine Website? Einmalige Kosten, laufende Kosten und woran Sie faire Angebote erkennen",
    seoTitle: "Was kostet eine Website? Preise & laufende Kosten",
    teaser: "Wovon der Preis abhängt, welche Kosten nach dem Livegang bleiben und was eine Website bei uns kostet.",
    date: "2026-11-06",
    dateLabel: "6. November 2026",
    sections: [
      {
        h: "Kurz gesagt",
        p: [
          "Eine Website kostet einmal für die Erstellung und danach laufend für Domain und Hosting. Eine Betreuung nach dem Livegang ist freiwillig. Wie hoch der einmalige Betrag ist, hängt vor allem davon ab, wie viele Seiten Sie brauchen, welche Funktionen dazukommen und ob Texte und Bilder schon vorhanden sind.",
          "Bei uns beginnt eine individuelle Website bei 99 € im aktuellen Angebot (statt 199 €), eine Website mit bis zu acht Seiten kostet 299 €. Beides sind einmalige Festpreise.",
        ],
      },
      {
        h: "Wovon der Preis abhängt",
        l: [
          "Umfang: Eine einzelne Seite mit allen Infos ist schneller gebaut als eine Website mit Menü und vielen Unterseiten.",
          "Funktionen: Kontaktformular und Anfahrt sind Standard. Ein Online-Shop, Rechner, Filter oder eine Mehrsprachigkeit bedeuten deutlich mehr Arbeit.",
          "Inhalte: Liegen Texte und Fotos schon vor, oder müssen sie erst geschrieben und ausgewählt werden?",
          "Design: Ein eigenes Design für Ihren Betrieb braucht mehr Zeit als eine angepasste Vorlage, sieht dafür aber nicht aus wie tausend andere.",
          "Technik: Eine schlanke Website ohne Datenbank ist günstiger im Betrieb als ein System, das regelmäßig Updates braucht.",
        ],
      },
      {
        h: "Einmalige und laufende Kosten auseinanderhalten",
        p: [
          "Einmalig zahlen Sie für Planung, Design, Texte und Umsetzung. Laufend kommen Domain und Hosting dazu: die Adresse Ihrer Website und der Speicherplatz, auf dem sie liegt. Beides kostet bei den meisten Anbietern ein paar Euro im Monat, je nach Tarif.",
          "Wichtig ist, bei wem Sie diese laufenden Kosten zahlen. Laufen Domain und Hosting auf Ihren Namen, bleiben Sie unabhängig. Laufen sie über den Dienstleister, hängen Sie an ihm, auch wenn Sie später wechseln möchten.",
        ],
      },
      {
        h: "Was eine Website bei uns kostet",
        l: [
          "Start: 199 €, einmalig. Eine Seite mit bis zu fünf Abschnitten, ideal für einen schnellen, starken Auftritt.",
          "Business: 299 €, einmalig. Eine Seite oder eine Website mit Menü und bis zu acht Unterseiten.",
          "Shop oder Premium: individuell nach Angebot. Online-Shops und größere Projekte mit bis zu 20 Seiten oder besonderen Funktionen.",
          "In jedem Paket enthalten: individuelles Design, Darstellung für Smartphone und PC, Ladezeit-Optimierung, Umsetzung ohne Tracking-Cookies, Impressum und Datenschutz eingebunden, Bildlizenzen und ein Übergabe-Paket mit allen Zugangsdaten.",
        ],
        p: ["Alle Preise sind Festpreise und Endpreise: Als Kleinunternehmer nach § 19 UStG berechnen wir keine Umsatzsteuer. Unser Webdesign-Angebot richtet sich an Gewerbetreibende, Selbstständige und Betriebe."],
      },
      {
        h: "Was nach dem Livegang kostet",
        l: [
          "Domain und Hosting zahlen Sie direkt beim Anbieter Ihrer Wahl, nicht über uns. Den Betrag weisen wir in Ihrem Angebot getrennt aus. In Wartung Pro und Premium ist Premium-Hosting auf EU-Servern bereits enthalten.",
          "Betreuung ist freiwillig und monatlich kündbar: Wartung für 39 € im Monat (bis 1 Stunde Änderungen), Wartung Pro für 59 € (bis 2 Stunden) und Wartung Premium für 99 € (bis 3 Stunden).",
          "Bei jährlicher Zahlung nutzen Sie die Betreuung zwölf Monate und zahlen zehn: 390 €, 590 € oder 990 € im Jahr.",
          "Einzelne Änderungen ohne Paket kosten 39 € pro Stunde.",
        ],
      },
      {
        h: "Woran Sie versteckte Kosten erkennen",
        l: [
          "Ein monatlicher Betrag mit langer Mindestlaufzeit, ohne den die Website nicht weiterläuft.",
          "Domain und Hosting laufen auf den Namen des Dienstleisters statt auf Ihren.",
          "Bildlizenzen, Kontaktformular oder die Darstellung auf dem Smartphone werden extra berechnet.",
          "Für die Herausgabe Ihrer Dateien oder Zugangsdaten wird eine Gebühr verlangt.",
          "Änderungen werden nach Stunden abgerechnet, ohne dass Sie vorher erfahren, was sie kosten.",
        ],
      },
      {
        h: "So bekommen Sie einen verlässlichen Preis",
        p: ["Schildern Sie kurz, was Ihre Website können soll, und schicken Sie, falls vorhanden, den Link zu Ihrer bisherigen Seite. Nach einem kurzen Gespräch erhalten Sie einen Festpreis mit klarem Leistungsumfang. Sie wissen also vor dem Start, was die Website kostet und was danach anfällt."],
      },
    ],
    faq: [
      ["Gibt es bei Ihnen ein Abo?", "Nein. Die Website kostet einmalig und gehört Ihnen nach vollständiger Bezahlung. Eine Wartung können Sie dazubuchen, müssen es aber nicht."],
      ["Wem gehört die Website am Ende?", "Ihnen. Domain und Hosting laufen auf Ihren Namen, Sie erhalten alle Zugangsdaten und den Quellcode. Texte und Bilder, die wir für Sie erstellen, dürfen Sie unbefristet nutzen."],
      ["Was kostet ein Online-Shop?", "Das hängt von Sortiment, Zahlarten und Versand ab. Online-Shops bieten wir individuell nach Angebot an. Nach einem kurzen Gespräch nennen wir Ihnen einen Festpreis."],
    ],
  },
  {
    slug: "website-neu-oder-ueberarbeiten",
    title: "Website neu bauen oder überarbeiten: Woran Sie erkennen, was Ihr Betrieb braucht",
    seoTitle: "Website neu bauen oder überarbeiten? So entscheiden Sie",
    teaser: "Fünf Minuten genügen, um einzuschätzen, ob eine Auffrischung reicht oder ein Neustart sinnvoller ist.",
    date: "2026-10-27",
    dateLabel: "27. Oktober 2026",
    sections: [
      {
        h: "Kurz gesagt",
        p: ["Wenn Aufbau und Technik Ihrer Website noch passen und nur Texte und Bilder veraltet sind, reicht eine Überarbeitung. Sind Struktur, Technik oder Bedienung auf dem Smartphone das Problem, ist ein Neustart meist die ehrlichere und am Ende günstigere Lösung."],
      },
      {
        h: "Diese Anzeichen sprechen für einen Neustart",
        l: [
          "Die Seite lädt auf dem Smartphone langsam oder lässt sich nur seitlich scrollen.",
          "Besucher finden nicht sofort, was Sie anbieten und wie sie Sie erreichen.",
          "Die Technik wird nicht mehr gepflegt: Updates fehlen, Erweiterungen sind veraltet, niemand fühlt sich zuständig.",
          "Impressum und Datenschutzerklärung sind veraltet oder schwer zu finden.",
          "Kleine Änderungen dauern lange oder gehen nur über den Ersteller der Seite.",
        ],
      },
      {
        h: "Diese Anzeichen sprechen für eine Überarbeitung",
        l: [
          "Aufbau und Menü sind klar, Besucher finden den Kontakt schnell.",
          "Die Seite ist technisch aktuell und lädt zügig.",
          "Nur einzelne Inhalte, Fotos oder Öffnungszeiten sind nicht mehr aktuell.",
        ],
      },
      {
        h: "Sie haben noch gar keine Website?",
        p: ["Dann reicht für den Start oft eine einseitige Website mit Leistungen, Kontakt und Anfahrt. Sie wächst später mit: weitere Seiten, ein Kontaktformular, Terminbuchung oder ein Shop lassen sich ergänzen, ohne dass Sie von vorn beginnen müssen."],
      },
      {
        h: "So prüfen Sie Ihre Seite in fünf Minuten",
        l: [
          "Öffnen Sie die Seite auf dem Smartphone: Ist alles lesbar, ohne zu zoomen oder seitlich zu wischen?",
          "Suchen Sie den Kontaktweg: Ist er ohne Suchen sichtbar?",
          "Messen Sie die Ladezeit mit einem kostenlosen Test wie Google PageSpeed Insights.",
          "Prüfen Sie, ob Impressum und Datenschutzerklärung vorhanden und aktuell sind.",
          "Suchen Sie bei Google nach Ihrem Firmennamen und Ihrem Ort: Erscheint Ihre Seite mit passendem Titel?",
        ],
      },
    ],
    faq: [
      ["Kann ich meine alten Texte und Bilder weiterverwenden?", "Ja. Brauchbare Inhalte übernehmen wir gern in die neue Website und ergänzen oder überarbeiten, was fehlt."],
      ["Können Sie meine Seite vorab prüfen?", "Ja, der Website-Check ist kostenlos und unverbindlich. Senden Sie uns den Link per WhatsApp oder Formular."],
    ],
  },
  {
    slug: "website-wartung-was-gehoert-dazu",
    title: "Website-Wartung: Was dazugehört und was nicht",
    seoTitle: "Website-Wartung: Was dazugehört und was nicht",
    teaser: "Worauf es bei einer Betreuung nach dem Livegang ankommt und welche Fragen Sie vor dem Vertrag stellen sollten.",
    date: "2026-10-06",
    dateLabel: "6. Oktober 2026",
    sections: [
      {
        h: "Warum eine Website Pflege braucht",
        p: ["Eine Website ist nach dem Livegang nicht fertig. Öffnungszeiten ändern sich, Angebote kommen dazu, Technik altert und Formulare müssen weiter zuverlässig funktionieren. Wer das nicht selbst übernehmen möchte, kann es an eine Betreuung abgeben."],
      },
      {
        h: "Das gehört typischerweise dazu",
        l: [
          "Änderungen an Texten, Bildern, Öffnungszeiten und Preisen in einem vereinbarten Zeitrahmen.",
          "Regelmäßige Sicherungen, damit sich die Seite nach Fehlern wiederherstellen lässt.",
          "Kontrolle, ob die Seite erreichbar ist und das Kontaktformular funktioniert.",
          "Technische Aktualisierungen, soweit die Seite sie benötigt.",
          "Auf Wunsch Pflege des Google-Unternehmensprofils.",
        ],
      },
      {
        h: "Das ist meist nicht enthalten",
        p: ["Ein neues Design, neue Funktionen, die Behebung von Schäden durch fremde Zugriffe und Fehler, die durch Eingriffe Dritter entstanden sind, gehören in der Regel nicht in eine Monatspauschale. Das wird nach Aufwand berechnet, am besten vorher mit Ihnen abgestimmt."],
      },
      {
        h: "Das sollten Sie vor dem Vertrag klären",
        l: [
          "Wie viele Stunden Änderungen pro Monat sind enthalten, und verfallen ungenutzte Stunden?",
          "Wie schnell wird auf Ihre Meldung reagiert?",
          "Wie lange läuft der Vertrag, und wie kündigen Sie?",
          "Wem gehören Domain, Zugänge und Dateien, wenn Sie wechseln möchten?",
        ],
      },
      {
        h: "Bei uns",
        p: ["Unsere Wartung ist freiwillig und monatlich kündbar. Die Reaktionszeit beträgt bei Wartung Premium 24 Stunden, bei Wartung und Wartung Pro 48 Stunden, jeweils werktags. Domain, Zugangsdaten und Dateien gehören Ihnen. Die aktuellen Pakete finden Sie auf der Seite Webdesign."],
      },
    ],
    faq: [
      ["Muss ich eine Wartung buchen?", "Nein. Die Website gehört Ihnen und läuft auch ohne Wartung. Einzelne Änderungen lassen sich auch ohne Paket beauftragen."],
      ["Betreuen Sie auch Websites, die andere gebaut haben?", "Das prüfen wir im Einzelfall. Schicken Sie uns den Link, wir schauen uns die Seite an und sagen Ihnen ehrlich, ob und wie wir sie betreuen können."],
    ],
  },
  {
    slug: "domain-hosting-zugangsdaten",
    title: "Domain, Hosting, Zugangsdaten: Was Ihnen nach dem Livegang gehören sollte",
    seoTitle: "Domain, Hosting, Zugänge: Was Ihnen gehören sollte",
    teaser: "Eine kurze Checkliste, damit Sie von Ihrem Webdesigner nicht abhängig werden.",
    date: "2026-09-08",
    dateLabel: "8. September 2026",
    sections: [
      {
        h: "Domain und Hosting auseinanderhalten",
        p: ["Die Domain ist Ihre Adresse im Internet, zum Beispiel ihrbetrieb.de. Das Hosting ist der Speicherplatz, auf dem die Dateien Ihrer Website liegen. Beides wird bei Anbietern gebucht und kostet laufend ein paar Euro im Monat."],
      },
      {
        h: "Das sollte auf Ihren Namen laufen",
        l: [
          "Die Domain: Sie sollten als Inhaber eingetragen sein.",
          "Der Hosting-Vertrag: Er läuft am besten direkt zwischen Ihnen und dem Anbieter.",
          "Alle Zugangsdaten: Sie erhalten sie sicher übergeben, nicht im Klartext per E-Mail.",
        ],
      },
      {
        h: "Was Sie zusätzlich verlangen können",
        l: [
          "Den Quellcode und alle Dateien Ihrer Website, zum Beispiel als ZIP oder Git-Repository.",
          "Die Nutzungsrechte an Texten und Bildern, die für Sie erstellt wurden.",
          "Ein Übergabeblatt mit Domain, Hosting, E-Mail-Postfach und Vertragslaufzeiten auf einen Blick.",
        ],
      },
      {
        h: "Warum das wichtig ist",
        p: ["Gehören Domain und Zugänge dem Ersteller, sind Sie bei einem Wechsel oder Streit schnell festgesetzt. Wenn alles auf Ihren Namen läuft, können Sie jederzeit zu einem anderen Betreuer oder Anbieter wechseln."],
      },
      {
        h: "Bei uns",
        p: ["Domain und Hosting laufen auf Ihren Namen, Zugangsdaten und Dateien gehören Ihnen, und Sie erhalten ein Übergabeblatt. Wir arbeiten mit einigen Hosting-Anbietern zusammen und beraten Sie gern, welcher zu Ihrem Vorhaben passt. Eine Ausnahme sind die Wartungspakete Pro und Premium, bei denen wir das Hosting selbst betreiben; Domain und Inhalte gehören auch dort Ihnen."],
      },
    ],
    faq: [
      ["Muss ich mich selbst um Domain und Hosting kümmern?", "Nein. Auf Wunsch begleiten wir Sie durch Domain, Hosting und E-Mail-Postfach. Der Vertrag läuft trotzdem auf Ihren Namen."],
      ["Kann ich meinen Anbieter später wechseln?", "Ja. Weil Domain, Zugänge und Dateien Ihnen gehören, können Sie jederzeit wechseln oder die Seite von jemand anderem betreuen lassen."],
    ],
  },
  {
    slug: "html-wordpress-node-unterschiede",
    title: "HTML, WordPress oder Node.js: Die drei Wege zur eigenen Website im Überblick",
    seoTitle: "HTML, WordPress oder Node.js: Welche Website passt?",
    teaser: "Was hinter den drei Techniken steckt, wo ihre Stärken liegen und wie Sie die passende für Ihren Betrieb finden.",
    date: "2026-06-16",
    dateLabel: "16. Juni 2026",
    sections: [
      {
        h: "Kurz gesagt",
        p: ["Es gibt nicht die beste Technik, sondern die passende. Entscheidend ist, wie oft Sie Inhalte selbst ändern möchten und ob Ihre Website mehr können soll als Texte und Bilder zeigen."],
      },
      {
        h: "HTML: fertige Seiten ohne Datenbank",
        p: ["Eine HTML-Website besteht aus fertigen Seiten, die der Server unverändert ausliefert. Es gibt keine Datenbank und kein Redaktionssystem. Das macht sie sehr schnell, wartungsarm und schwer angreifbar. Änderungen nimmt in der Regel der Ersteller vor."],
      },
      {
        h: "WordPress: Redaktionssystem mit Datenbank",
        p: ["WordPress ist ein Redaktionssystem. Inhalte lassen sich im Browser selbst bearbeiten, und Erweiterungen, sogenannte Plugins, liefern zusätzliche Funktionen. Dafür braucht es laufende Updates für das System, das Design und alle Erweiterungen."],
      },
      {
        h: "Node.js: Technik für individuelle Funktionen",
        p: ["Node.js führt JavaScript auf dem Server aus. Darauf bauen moderne Frameworks Websites, die mehr können: Rechner, Filter, Formulare mit Prüfung, Animationen oder die Anbindung anderer Systeme. Das ist flexibel, aber aufwendiger in Entwicklung und Pflege."],
      },
      {
        h: "So entscheiden Sie",
        l: [
          "Wie oft ändern Sie Inhalte selbst? Häufig spricht für ein Redaktionssystem, selten für HTML.",
          "Soll die Seite mehr können als informieren? Dann kommt Node.js infrage.",
          "Wer kümmert sich um die Technik? Je mehr Technik, desto mehr Pflege.",
          "Wie wichtig sind Ladezeit und Sicherheit? Hier punkten schlanke Lösungen.",
        ],
      },
      {
        h: "Bei uns",
        p: ["Wir bauen Websites ohne Baukasten als schlanke HTML-Seite oder mit Node.js, wenn interaktive Funktionen gefragt sind. WordPress bauen wir nicht. Wenn für Ihr Vorhaben ein Redaktionssystem die bessere Wahl wäre, sagen wir Ihnen das ehrlich."],
      },
    ],
    faq: [
      ["Kann ich später die Technik wechseln?", "Ja, Inhalte und Design lassen sich übernehmen. Je nach Ausgangslage ist dafür ein Neuaufbau nötig."],
      ["Welche Technik ist am günstigsten im Betrieb?", "Meist die schlankeste: Eine HTML-Website braucht kaum Pflege und läuft auf einfachem Hosting."],
    ],
  },
  {
    slug: "html-website-vorteile-grenzen",
    title: "HTML-Website: schnell, sicher, wartungsarm – und wo die Grenzen liegen",
    seoTitle: "HTML-Website: Vorteile und Grenzen im Überblick",
    teaser: "Für wen sich eine Website aus fertigen Seiten lohnt und wann eine andere Technik besser passt.",
    date: "2026-07-07",
    dateLabel: "7. Juli 2026",
    sections: [
      {
        h: "Was eine HTML-Website ist",
        p: ["HTML ist die Grundsprache jeder Website. Bei einer HTML-Website liegen die fertigen Seiten als Dateien auf dem Server und werden unverändert an den Besucher ausgeliefert. Es gibt keine Datenbank, die erst Inhalte zusammensetzen muss."],
      },
      {
        h: "Das spricht für HTML",
        l: [
          "Kurze Ladezeiten, weil nichts berechnet werden muss.",
          "Wenig Angriffsfläche, weil es kein Redaktionssystem und keine Erweiterungen gibt, die sich einschleichen können.",
          "Günstiges Hosting: Ein einfacher Webspace genügt.",
          "Kaum Pflege: Es gibt keine Updates, die nachgezogen werden müssen.",
          "Volle Gestaltungsfreiheit, ohne Vorlage von der Stange.",
        ],
      },
      {
        h: "Hier stößt HTML an Grenzen",
        l: [
          "Sie ändern Inhalte nicht selbst per Eingabemaske, sondern über den Ersteller.",
          "Für Online-Shops mit Warenkorb, Mitgliederbereiche oder Konten ist HTML allein nicht gedacht.",
          "Sehr viele Seiten mit ständig wechselnden Inhalten sind mit einem Redaktionssystem bequemer.",
        ],
      },
      {
        h: "Für wen sich HTML lohnt",
        p: ["Für Betriebe mit einer klaren Leistungsübersicht, Kontakt und Anfahrt, deren Inhalte sich nur gelegentlich ändern: Handwerk, Beratung, Gastronomie oder Dienstleistung. Gelegentliche Änderungen lassen sich mit einer Betreuung zuverlässig erledigen."],
      },
    ],
    faq: [
      ["Ist HTML veraltet?", "Nein. HTML ist die Grundlage jeder Website. Moderne HTML-Seiten sind schnell, sauber und für Smartphones gemacht."],
      ["Kann eine HTML-Website später wachsen?", "Ja. Weitere Seiten, ein Kontaktformular oder Terminbuchung lassen sich ergänzen. Für größere Funktionen wechseln wir bei Bedarf auf Node.js."],
    ],
  },
  {
    slug: "wordpress-vorteile-und-pflegeaufwand",
    title: "WordPress im Überblick: Vorteile, Pflegeaufwand und für wen es passt",
    seoTitle: "WordPress: Vorteile, Pflegeaufwand, für wen es passt",
    teaser: "Ein ehrlicher Blick auf das bekannteste Redaktionssystem, auch wenn wir selbst nicht damit bauen.",
    date: "2026-07-28",
    dateLabel: "28. Juli 2026",
    sections: [
      {
        h: "Was WordPress ist",
        p: ["WordPress ist ein Redaktionssystem, auf Englisch Content-Management-System. Texte, Bilder und Seiten pflegen Sie in einer Eingabemaske im Browser. Das Aussehen bestimmt ein Design, zusätzliche Funktionen kommen über Erweiterungen, die Plugins heißen."],
      },
      {
        h: "Das spricht für WordPress",
        l: [
          "Sie ändern Inhalte selbst, ohne Programmierkenntnisse.",
          "Es ist weit verbreitet, deshalb gibt es viele Dienstleister und Anleitungen.",
          "Blog, Seiten und viele Zusatzfunktionen lassen sich mit Erweiterungen ergänzen.",
          "Bei vielen Seiten und häufigen Änderungen ist es bequem.",
        ],
      },
      {
        h: "Das sollten Sie bedenken",
        l: [
          "Das System, das Design und jede Erweiterung brauchen laufend Updates. Werden sie vergessen, entstehen Sicherheitslücken.",
          "Erweiterungen stammen oft von Drittanbietern. Manche sind kostenpflichtig oder werden nicht mehr gepflegt.",
          "Viele Erweiterungen und ein überladenes Design können die Ladezeit verschlechtern.",
          "Datenschutz: Manche Erweiterungen laden Inhalte von fremden Servern nach. Das muss man prüfen.",
        ],
      },
      {
        h: "Für wen WordPress passt",
        p: ["Für Betriebe, die ihre Inhalte häufig selbst ändern möchten, einen Blog betreiben oder viele Seiten pflegen. Wer wenig ändert und Wert auf Tempo und Ruhe legt, ist mit einer schlanken Lösung oft besser bedient."],
      },
      {
        h: "Unsere Haltung",
        p: ["Wir bauen keine WordPress-Websites, sondern HTML- oder Node.js-Seiten ohne Baukasten. Eine bestehende WordPress-Seite schauen wir uns im Einzelfall an und sagen Ihnen ehrlich, ob und wie wir sie betreuen können."],
      },
    ],
    faq: [
      ["Ist WordPress unsicher?", "Nicht von Haus aus. Das Risiko entsteht meist durch veraltete Versionen und nicht gepflegte Erweiterungen. Regelmäßige Wartung ist deshalb wichtig."],
      ["Muss ich WordPress selbst pflegen?", "Sie können Inhalte selbst ändern. Die technischen Updates übernimmt idealerweise jemand, der sich damit auskennt, zum Beispiel im Rahmen einer Wartung."],
    ],
  },
  {
    slug: "node-js-website-wann-sinnvoll",
    title: "Node.js-Website: Wann sich eine individuelle Lösung lohnt",
    seoTitle: "Node.js-Website: Wann sich eine Individuallösung lohnt",
    teaser: "Was Node.js bei einer Website leistet, welchen Aufwand es bedeutet und für welche Vorhaben es sich eignet.",
    date: "2026-08-18",
    dateLabel: "18. August 2026",
    sections: [
      {
        h: "Was Node.js ist",
        p: ["Node.js ist eine Laufzeitumgebung, die JavaScript auf dem Server ausführt. Frameworks wie Next.js bauen darauf moderne Websites. Seiten lassen sich vorab erzeugen und dadurch schnell ausliefern, und bei Bedarf läuft zusätzliche Logik im Hintergrund."],
      },
      {
        h: "Das spricht für Node.js",
        l: [
          "Interaktive Funktionen wie Rechner, Filter, Konfiguratoren oder Formulare mit Prüfung.",
          "Animationen und besondere Effekte, die über Standardlösungen hinausgehen.",
          "Anbindung anderer Systeme, zum Beispiel eines Terminkalenders oder einer Warenwirtschaft.",
          "Eigene, ungebundene Gestaltung ohne Baukasten.",
          "Kontaktformulare, die ohne Drittanbieter direkt in Ihr Postfach senden.",
        ],
      },
      {
        h: "Das bedeutet es an Aufwand",
        l: [
          "Mehr Entwicklungsaufwand als bei einer einfachen HTML-Seite.",
          "Das Hosting muss die Technik unterstützen. Welches passt, hängt von den Funktionen ab.",
          "Änderungen laufen in der Regel über den Entwickler, am besten im Rahmen einer Wartung.",
          "Die verwendeten Bausteine müssen aktuell gehalten werden.",
        ],
      },
      {
        h: "Wann sich Node.js lohnt",
        p: ["Wenn Ihre Website mehr leisten soll als informieren, zum Beispiel Besucher durch einen Ablauf führen, Angebote berechnen oder Daten verarbeiten. Für eine reine Visitenkarte ist es nicht nötig und eine HTML-Seite meist die schlankere Lösung."],
      },
      {
        h: "Bei uns",
        p: ["Wir setzen Node.js ein, wenn interaktive Funktionen gefragt sind, und sonst auf schlankes HTML. Das klären wir im Gespräch, bevor Sie ein Angebot erhalten. Domain und Zugangsdaten gehören immer Ihnen."],
      },
    ],
    faq: [
      ["Ist Node.js für kleine Betriebe zu aufwendig?", "Nicht, wenn Sie die Funktionen wirklich brauchen. Für eine einfache Visitenkarte empfehlen wir stattdessen HTML."],
      ["Kann ich später von HTML auf Node.js wechseln?", "Ja. Design und Inhalte lassen sich übernehmen, die Funktionen kommen schrittweise dazu."],
    ],
  },
];

export const guideHref = (slug: string) => `/ratgeber/${slug}`;
