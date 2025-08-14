// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Aktion fehlgeschlagen',
  success: 'Aktion war erfolgreich',
  welcome: 'Willkommen bei der A Compás App',
  notFound: {
    header: 'Entschuldigung, diese Seite existiert nicht.',
    btn: 'Zurück zu den Rhythmen'
  },
  donate: 'Spenden',
  help: 'Hilfe',
  tuning: 'Stimmgabel',
  shortcuts: 'Tastenkürzel',
  privacy: 'Datenschutzerklärung',
  android: 'Android-App herunterladen',
  follow: 'Folgen Sie uns',
  share: 'Teilen',
  source: 'Quellcode',
  issues: 'Probleme',
  doc: {
    welcome: {
      title: 'Willkommen bei der A Compás App',
      content: `
Diese App ist dafür entwickelt, Ihnen beim Erlernen und Üben Ihres Musikinstruments zu helfen.
Sie befindet sich noch in der Entwicklung, also haben Sie bitte Geduld, während wir sie weiter verbessern.
Falls Sie Fragen oder Vorschläge haben, kontaktieren Sie uns bitte.`
    },
    getStarted: {
      title: 'Erste Schritte',
      content: `
- Wählen Sie einen **Rhythmus** aus der Liste. Ein Rhythmus (auch "Palo" im Flamenco genannt) ist ein rhythmischer Stil.
- Passen Sie das **Tempo** (Geschwindigkeit) des Rhythmus an.
- Wählen Sie **Instrumente** im Mischpult aus.
- **Starten** Sie das Metronom.`
    },
    options: {
      title: 'Liste der Optionen',
      content: {
        theme: {
          title: 'Design',
          content: `
Sie können zwischen hellem und dunklem Design wählen.
Das dunkle Design ist besser für schwach beleuchtete Umgebungen geeignet, während das helle Design besser für helle Umgebungen geeignet ist.`,
        },
        lang: {
          title: 'Sprache',
          content: `
Wählen Sie die Benutzeroberflächen-Sprache der Anwendung.
Die Änderung wird sofort auf alle Texte angewendet.
Ihre Auswahl wird lokal gespeichert (im Browser / Gerät), sodass sie beim nächsten Öffnen der App beibehalten wird.`,
        },
        tempo: {
          title: 'Tempo',
          content: `
Es gibt 2 Möglichkeiten, das Tempo zu definieren: den Drehregler und Sie können die BPM mit den + und - Tasten verringern/erhöhen.
Sie können das Tempo auch direkt in das Eingabefeld eingeben, das Mausrad verwenden oder die Pfeiltasten nach oben und unten.
Das Tempo ist die Geschwindigkeit des Metronoms, gemessen in Schlägen pro Minute.`,
        },
        mixer: {
          title: 'Instrumenten-Mischpult',
          content: `
Wählen Sie spielende Instrumente aus (stellen Sie sicher, dass mindestens ein Instrument aktiv ist),
stellen Sie dessen relative Lautstärke ein und ob es Viertelnoten oder Achtelnoten spielt.`,
        },
        improvise: {
          title: 'Improvisieren',
          content: `
Wenn es aktiviert ist, wird das Metronom manchmal aufhören, sich an das vorprogrammierte Muster zu halten und zufällige Schläge für ein oder mehrere Instrument(e) spielen.
Dies erzeugt eine "Überraschung" im Rhythmus.`,
        },
        humanize: {
          title: 'Humanisieren',
          content: 'Wenn es aktiviert ist, spielt das Metronom die Schläge mit einer kleinen zufälligen Abweichung und simuliert so die menschliche Note.',
        },
        swing: {
          title: 'Swing',
          content: 'Wenn der Wert 0 ist, ist die Achtelnote genau die Hälfte einer Viertelnote. Wenn er sich 1 nähert, wird eine Verzögerung angewendet, für ein "Jazz-ähnliches" Rhythmusgefühl.',
        },
        reverb: {
          title: 'Hall',
          content: 'Passen Sie den Hall des Klangs an. Es simuliert einen Raum- oder Halleneffekt.',
        },
        startBeat: {
          title: 'Startschlag',
          content: `
Ändern Sie den Startschlag (bei welchem Schlag das ausgewählte Muster beginnt).
Dies ist nützlich, wenn Sie das Muster bei einem anderen Schlag starten möchten.
Zum Beispiel, wenn Sie beim 2. Schlag des Musters beginnen möchten, setzen Sie den Startschlag auf 2.
Der Startschlag ist auch nützlich, wenn Sie einen bestimmten Teil des Musters üben möchten.
Die Noten zwischen dem Startschlag und dem Beginn des Musters werden als Klick-Sound gespielt.`,
        },
        viewMode: {
          title: 'Ansichtsmodus',
          content: 'Wählen Sie zwischen Punkten, Zähler und Uhr-Visualisierungen.',
        },
        reset: {
          title: 'Zurücksetzen',
          content: 'Setzen Sie die Einstellungen des Metronoms auf die Standardwerte zurück. Sie können alle Einstellungen zurücksetzen oder die Einstellungen für das aktuelle Muster zurücksetzen.',
        }
      }
    },
    appSettings: {
      title: 'Anwendungseinstellungen',
      content: {
        theme: {
          title: 'Thema-Modus',
          content: `
**Helle und dunkle Thema-Optionen**

A Compás bietet sowohl helle als auch dunkle Themen für die beste visuelle Erfahrung:

- **Helles Thema**: Saubere, helle Oberfläche ideal für gut beleuchtete Umgebungen. Bietet weiße Hintergründe mit dunklem Text für maximale Lesbarkeit bei Tageslicht.
- **Dunkles Thema**: Augenfreundlich mit dunklen Hintergründen und hellem Text. Perfekt für schwache Lichtverhältnisse, reduziert Augenbelastung bei langen Übungseinheiten und spart Batterie bei OLED-Bildschirmen.

**Wie wechseln:**
- Verwenden Sie die Thema-Umschaltung im linken Navigationsmenü
- Änderungen werden sofort in der gesamten Anwendung angewendet
- Ihre Präferenz wird automatisch gespeichert und beim App-Neustart wiederhergestellt`
        },
        language: {
          title: 'Sprachauswahl',
          content: `
**Multi-Sprach-Unterstützung**

A Compás ist in 9 Sprachen verfügbar, um der globalen Flamenco-Gemeinschaft zu dienen:

- **Englisch** (en-US) - Standardsprache
- **Französisch** (Français) - Vollständige Übersetzung
- **Spanisch** (Español) - Native Flamenco-Terminologie
- **Deutsch** (Deutsch) - Komplette Lokalisierung
- **Italienisch** (Italiano) - Vollständige Oberflächenübersetzung
- **Japanisch** (日本語) - Asiatische Marktunterstützung
- **Chinesisch** (中文) - Vereinfachtes Chinesisch
- **Arabisch** (العربية) - Rechts-nach-links Unterstützung
- **Persisch** (فارسی) - Farsi-Lokalisierung

**Wie Sprache ändern:**
Verwenden Sie den Sprachauswahl im linken Navigationsmenü, um zwischen verfügbaren Sprachen zu wechseln.`
        },
        visualization: {
          title: 'Visualisierungsmodi',
          content: `
**Drei Anzeigeoptionen für Beat-Visualisierung**

Wählen Sie die Visualisierung, die am besten zu Ihrem Übungsstil passt:

**1. Punkte-Modus**
- Saubere, minimalistische Anzeige mit animierten Punkten
- Jeder Punkt repräsentiert einen Beat im Pattern
- Aktive Beats werden mit Farbe und Animation hervorgehoben

**2. Zähler-Modus**
- Digitaler Beat-Zähler zeigt aktuelle Position
- Zeigt aktuelle Beat-Nummer und Gesamt-Beats im Pattern
- Klare numerische Progression durch den Compás

**3. Uhr-Modus**
- Kreisförmige Uhren-Visualisierung
- Beats um eine Uhr mit animiertem Zeiger angeordnet
- Bietet intuitive Wahrnehmung des zyklischen Rhythmus`
        }
      }
    },
    utils: {
      wikipediaUrl: 'Wikipedia-Artikel:',
      videoExample: 'Video-Beispiel:',
      openLink: 'Link öffnen',
      disabled: 'Diese Option ist für dieses Muster deaktiviert.'
    },
    searchPattern: {
      title: 'Nach einem Rhythmus suchen',
      content: `
Viele Flamenco-**Palos** stammen tatsächlich von anderen rhythmischen Strukturen ab.
Zum Beispiel stammt "Farruca" von "Tientos" ab, "Columbiana" oder "Garrotín" sind Arten von "Tangos".
Hier können Sie den Namen eines beliebigen "Palo" eingeben, von dem Sie je gehört haben, und A Compás wird nach den Rhythmen suchen, von denen er abgeleitet ist.
- Suchen Sie nach einem Rhythmus, indem Sie seinen Namen oder einen Teil davon eingeben.
- Die Suche unterscheidet nicht zwischen Groß- und Kleinschreibung.
- Die Suche wird sowohl im Rhythmusnamen als auch in den verknüpften Rhythmen durchgeführt.
- Die Suche wird über die gesamte Zeichenfolge durchgeführt, nicht über einzelne Wörter.`
    },
    shortcuts: {
      title: 'Die folgenden Tastenkürzel sind für die Verwendung mit der Tastatur verfügbar:',
      space: 'Metronom abspielen/stoppen',
      up: 'Tempo erhöhen (Taste gedrückt halten für schnellere Erhöhung)',
      down: 'Tempo verringern (Taste gedrückt halten für schnellere Verringerung)',
      left: 'Vorheriger Rhythmus',
      right: 'Nächster Rhythmus',
      esc: 'Modal-Fenster schließen',
      tab: 'Fokus-Button wechseln'
    },
    reset: {
      title: 'Standardparameter wiederherstellen',
      warning: 'Warnung! Dies löscht Ihre Metronom-Einstellungen.',
      close: 'Schließen',
      proceed: 'Fortfahren',
      success: 'Erfolg! Ihre Metronom-Einstellungen wurden zurückgesetzt.',
    },
    context: {
      title: 'Kontext auswählen',
    },
    reverb: {
      title: 'Hall-Nachklang',
      content: 'Stellen Sie einen Nachklang für den Klang-Hall ein'
    },
    swing: {
      title: 'Swing',
      content: 'Stellen Sie einen Swing-Wert für das Metronom ein',
      caption: 'Wenn der Wert 0 ist, ist die Achtelnote genau die Hälfte einer Viertelnote. Wenn er sich 1 nähert, wird eine Verzögerung angewendet, für einen "Jazz-ähnlichen" Rhythmus-Geschmack.'
    },
    startBeat: {
      title: 'Startschlag',
      content: 'Stellen Sie den Schlag ein, bei dem das Metronom zu spielen beginnt'
    },
    mixer: {
      title: 'Instrumenten-Mischpult',
      content: 'Wählen Sie die Instrumente aus, die Sie spielen möchten',
      active: {
        title: 'Aktiv',
        content: 'Dieses Instrument spielen'
      },
      eighth: {
        title: '8tel',
        content: 'Achtelnoten umschalten'
      },
      volume: {
        title: 'Lautstärke (dB)',
        content: 'Instrumentenlautstärke erhöhen oder verringern'
      }
    },
    pattern: {
      title: 'Rhythmus auswählen',
      search: 'Nach einem Rhythmus suchen',
      searchSm: 'Suchen',
    },
    prestart: {
      title: 'Vorlauf ab Schlag',
      content: 'Optional einen Schlag definieren, ab dem ein Vorlauf-Klick startet, bevor die eigentliche Schleife beginnt.'
    },
    privacy: {
      title: 'Datenschutzerklärung',
      content: `
Diese App verwendet ein Tool namens **Matomo**, um anonymisierte Besuchsanalysedaten zu sammeln.

Wenn Sie die Option unten aktivieren, setzt Matomo ein Cookie im Webbrowser (für die Website acompas.org)
oder im mobilen Gerät (für die Android-App)
und beobachtet einige Ihrer Aktionen in der App
(hauptsächlich Metronom-'Abspielen'- und 'Stoppen'-Aktionen, um die Spielzeit abzuleiten),
wobei Ihre IP-Adresse anonymisiert wird.

Diese Information ist nur Teil unserer Nutzungsstatistik (um eine Vorstellung davon zu haben, wie viele Benutzer wir haben). Wir verkaufen diese Daten nicht und geben niemandem anderen Zugang dazu.
Sie können diese Funktion jederzeit aktivieren oder deaktivieren.`,
      allow: `
Wir sammeln keine nominativen persönlichen Daten.

**Dieser App erlauben, uns einige anonymisierte Nutzungsdaten zu senden?**`,
      enable: 'Aktivieren & schließen',
      close: 'Schließen',
    },
    tempo: {
      title: 'Tempo',
      content: 'Stellen Sie das Tempo des Metronoms ein',
      bpm: 'BPM'
    },
    update: {
      title: 'App-Initialisierung',
      content: `
Die Einstellungen der App müssen (erneut) initialisiert werden.

Wenn Sie eine frühere Version dieser App verwendet haben, verlieren Sie alle Ihre Einstellungen und Rhythmen.
Aber das ist der einzige Weg, um die neuen Funktionen zu erhalten. Wenn es Ihre erste Verwendung ist, ändert sich nichts, also machen Sie weiter.`,
      button: 'App neu laden'
    },
    tuning: {
      title: 'Stimmgabel',
      content: 'Einen Stimmgabel-Klang abspielen',
      caption: 'alle',
      play: 'Abspielen',
      stop: 'Stoppen'
    },
    changelog: {
      title: 'Changelog',
      description: 'Neueste Änderungen und Updates zu A Compás',
      entries: [
        {
          version: '3.2.7',
          date: '2024-08-23',
          changes: [
            'Kontext-Speicher und Auswahl mit Farbansichten hinzugefügt',
            'Pattern-Suchfilter-Funktionalität hinzugefügt',
            'Hilfedialog für Pattern-Suche hinzugefügt',
            'Desktop-Wach-bleiben-Funktionalität hinzugefügt',
            'Quasar-Pakete aktualisiert',
            'SaSS-Warnungen behoben',
            'Auf Node 20 aktualisiert',
            'Vorbereitung für Android 34-Kompatibilität'
          ]
        },
        {
          version: '3.2.5',
          date: '2023-07-15',
          changes: [
            'sitemap.xml hinzugefügt und aktualisiert',
            'Matomo-Events behoben',
            'Leerlauf-Uhrenposition behoben',
            'Quasar-Pakete aktualisiert',
            'Leistungsverbesserungen und Fehlerbehebungen'
          ]
        },
        {
          version: '3.2.4',
          date: '2023-07-06',
          changes: [
            'Fehlerbehebungen und Stabilitätsverbesserungen',
            'Kleinere UI-Verbesserungen'
          ]
        },
        {
          version: '2.3.0',
          date: '2021-01-23',
          changes: [
            'Neue Funktionen und Verbesserungen',
            'Verbesserte Benutzeroberfläche'
          ]
        },
        {
          version: '2.0.0',
          date: '2018-01-04',
          changes: [
            'Vollständige Neuentwicklung der Anwendung',
            'Neues modernes Interface-Design',
            'Verbessertes Metronom-Engine',
            'Mehr Flamenco-Patterns hinzugefügt'
          ]
        }
      ]
    }
  },
  buttons: {
    context : 'Kontext auswählen',
    pattern: 'Rhythmus',
    restore: 'Einstellungen wiederherstellen',
    options: 'Rhythmus-Optionen',
    settings: 'App-Einstellungen'
  }
}