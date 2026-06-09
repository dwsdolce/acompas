// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Azione fallita',
  success: 'Azione completata con successo',
  welcome: 'Benvenuto nell\'app A Compás',
  notFound: {
    header: 'Spiacenti, questa pagina non esiste.',
    btn: 'Torna ai pattern'
  },
  donate: 'Dona',
  help: 'Aiuto',
  tuning: 'Diapason',
  shortcuts: 'Scorciatoie',
  privacy: 'Politica sulla privacy',
  android: 'Scarica l\'app Android',
  follow: 'Seguici',
  share: 'Condividi',
  source: 'Codice sorgente',
  issues: 'Problemi',
  doc: {
    welcome: {
      title: 'Benvenuto nell\'app A Compás',
      content: `
Questa app è progettata per aiutarti ad imparare e praticare con il tuo strumento musicale.
È un lavoro in corso, quindi ti preghiamo di essere paziente mentre continuiamo a migliorarla.
Se hai domande o suggerimenti, ti preghiamo di contattarci.`
    },
    getStarted: {
      title: 'Inizia',
      content: `
- Seleziona un **pattern** dall'elenco. Un pattern (chiamato anche "palo" nel flamenco) è uno stile ritmico.
- Regola il **tempo** (velocità) del pattern.
- Seleziona gli **strumenti** nel mixer.
- **Avvia** il metronomo.`
    },
    options: {
      title: 'Elenco delle opzioni',
      content: {
        theme: {
          title: 'Tema',
          content: `
Puoi scegliere tra tema chiaro e scuro.
Il tema scuro è più adatto per ambienti con poca luce, mentre il tema chiaro è più adatto per ambienti luminosi.`,
        },
        lang: {
          title: 'Lingua',
          content: `
Scegli la lingua dell'interfaccia dell'applicazione.
Il cambiamento viene applicato immediatamente a tutti i testi.
La tua selezione viene memorizzata localmente (nel browser / dispositivo) quindi verrà mantenuta la prossima volta che apri l'app.`,
        },
        tempo: {
          title: 'Tempo',
          content: `
Ci sono 2 modi per definire il tempo: la manopola circolare, e puoi decrementare/incrementare i BPM con i pulsanti + e -.
Puoi anche digitare il tempo direttamente nel campo di input, usare la rotella del mouse o i tasti freccia su e giù.
Il tempo è la velocità del metronomo, misurata in battiti per minuto.`,
        },
        mixer: {
          title: 'Mixer strumenti',
          content: `
Seleziona gli strumenti in riproduzione (assicurati di avere almeno uno strumento attivo),
imposta il suo volume relativo, e se suona note da un quarto o da un ottavo.`,
        },
        improvise: {
          title: 'Improvvisa',
          content: `
Se è attivato, a volte il metronomo smetterà di seguire il pattern pre-programmato e suonerà battiti casuali per uno o più strumenti.
Questo produce una "sorpresa" nel pattern.`,
        },
        humanize: {
          title: 'Umanizza',
          content: 'Se è attivato, il metronomo suonerà i battiti con una piccola deviazione casuale, simulando il tocco umano.',
        },
        swing: {
          title: 'Swing',
          content: 'Se il suo valore è 0, la nota da un ottavo è esattamente la metà di una nota da un quarto. Quando si avvicina a 1, viene applicato un ritardo, per una sensazione ritmica "jazz-like".',
        },
        reverb: {
          title: 'Riverbero',
          content: 'Regola il riverbero del suono. Simula l\'effetto di una stanza o di una sala.',
        },
        startBeat: {
          title: 'Battito di inizio',
          content: `
Cambia il battito di inizio (su quale battito inizia il pattern selezionato).
Questo è utile se vuoi iniziare il pattern su un battito diverso.
Ad esempio, se vuoi iniziare sul 2° battito del pattern, imposta il battito di inizio a 2.
Il battito di inizio è anche utile se vuoi praticare una parte particolare del pattern.
Le note tra il battito di inizio e l'inizio del pattern verranno suonate come un suono di click.`,
        },
        viewMode: {
          title: 'Modalità visualizzazione',
          content: 'Scegli tra visualizzazioni a punti, contatore e orologio.',
        },
        reset: {
          title: 'Reset',
          content: 'Ripristina le impostazioni del metronomo ai valori predefiniti. Puoi resettare tutte le impostazioni o resettare le impostazioni per il pattern corrente.',
        }
      }
    },
    appSettings: {
      title: 'Impostazioni applicazione',
      content: {
        theme: {
          title: 'Modalità tema',
          content: `
**Opzioni tema chiaro e scuro**

A Compás offre temi chiari e scuri per fornire la migliore esperienza visiva:

- **Tema chiaro**: Interfaccia pulita e luminosa ideale per ambienti ben illuminati. Presenta sfondi bianchi con testo scuro per massima leggibilità alla luce del giorno.
- **Tema scuro**: Facile per gli occhi con sfondi scuri e testo chiaro. Perfetto per condizioni di scarsa illuminazione, riduce l'affaticamento degli occhi durante sessioni di pratica prolungate e risparmia batteria su schermi OLED.

**Come cambiare:**
- Usa il pulsante di cambio tema nel menu di navigazione sinistro
- I cambiamenti si applicano immediatamente a tutta l'applicazione
- La tua preferenza è automaticamente salvata e ripristinata al riavvio dell'app`
        },
        language: {
          title: 'Selezione lingua',
          content: `
**Supporto multilingue**

A Compás è disponibile in 9 lingue per servire la comunità flamenca globale:

- **Inglese** (en-US) - Lingua predefinita
- **Francese** (Français) - Traduzione completa
- **Spagnolo** (Español) - Terminologia flamenca nativa
- **Tedesco** (Deutsch) - Localizzazione completa
- **Italiano** (Italiano) - Traduzione completa dell'interfaccia
- **Giapponese** (日本語) - Supporto mercato asiatico
- **Cinese** (中文) - Cinese semplificato
- **Arabo** (العربية) - Supporto da destra a sinistra
- **Persiano** (فارسی) - Localizzazione farsi

**Come cambiare lingua:**
Usa il selettore di lingua nel menu di navigazione sinistro per alternare tra lingue disponibili.`
        },
        visualization: {
          title: 'Modalità visualizzazione',
          content: `
**Tre opzioni di visualizzazione per i battiti**

Scegli la visualizzazione che si adatta meglio al tuo stile di pratica:

**1. Modalità Punti**
- Display pulito e minimalista con punti animati
- Ogni punto rappresenta un battito nel pattern
- I battiti attivi sono evidenziati con colore e animazione

**2. Modalità Contatore**
- Contatore digitale che mostra la posizione attuale
- Mostra il numero del battito attuale e totale battiti nel pattern
- Progressione numerica chiara attraverso il compás

**3. Modalità Orologio**
- Visualizzazione circolare tipo quadrante orologio
- Battiti disposti attorno a un orologio con lancetta animata
- Fornisce sensazione intuitiva del ritmo ciclico`
        }
      }
    },
    utils: {
      wikipediaUrl: 'Articolo Wikipedia:',
      videoExample: 'Esempio video:',
      openLink: 'Apri link',
      source: 'Fonte: Wikipedia',
      beats: '{count} tempi',
      disabled: 'Questa opzione è disabilitata per questo pattern.'
    },
    searchPattern: {
      title: 'Cerca un pattern',
      content: `
Molti **palos** flamenchi sono effettivamente derivati da altre strutture ritmiche.
Ad esempio, "farruca" deriva da "tientos", "columbiana" o "garrotín" sono tipi di "tangos".
Qui puoi inserire il nome di qualsiasi "palo" di cui hai mai sentito parlare e A Compás cercherà i pattern da cui deriva.
- Cerca un pattern digitando il suo nome o una parte di esso.
- La ricerca non fa distinzione tra maiuscole e minuscole.
- La ricerca viene eseguita sul nome del pattern e sui pattern collegati.
- La ricerca viene eseguita sull'intera stringa, non sulle parole.`
    },
    shortcuts: {
      title: 'Le seguenti scorciatoie sono disponibili per l\'uso con la tastiera:',
      space: 'Riproduci/Ferma il metronomo',
      up: 'Incrementa il tempo (mantieni premuto il tasto per incrementare più velocemente)',
      down: 'Decrementa il tempo (mantieni premuto il tasto per decrementare più velocemente)',
      left: 'Pattern precedente',
      right: 'Pattern successivo',
      esc: 'Chiudi la finestra modale',
      tab: 'Cambia il pulsante di focus'
    },
    reset: {
      title: 'Ripristina parametri predefiniti',
      warning: 'Attenzione! Questo cancellerà le impostazioni del tuo metronomo.',
      close: 'Chiudi',
      proceed: 'Procedi',
      success: 'Successo! Le impostazioni del tuo metronomo sono state ripristinate.',
    },
    context: {
      title: 'Seleziona un contesto',
    },
    reverb: {
      title: 'Decadimento riverbero',
      content: 'Imposta un decadimento per il riverbero dei suoni'
    },
    swing: {
      title: 'Swing',
      content: 'Imposta un valore di swing per il metronomo',
      caption: 'Se il suo valore è 0, la nota da un ottavo è esattamente la metà di una nota da un quarto. Quando si avvicina a 1, viene applicato un ritardo, per un sapore ritmico "jazz-like".'
    },
    startBeat: {
      title: 'Battito di inizio',
      content: 'Imposta il battito da cui il metronomo inizierà a suonare'
    },
    mixer: {
      title: 'Mixer strumenti',
      content: 'Seleziona gli strumenti che vuoi suonare',
      active: {
        title: 'Attivo',
        content: 'Suona questo strumento'
      },
      eighth: {
        title: '8°',
        content: 'Attiva/disattiva note da un ottavo'
      },
      volume: {
        title: 'Volume (db)',
        content: 'Aumenta o diminuisci il volume dello strumento'
      }
    },
    pattern: {
      title: 'Seleziona un pattern',
      search: 'Cerca un pattern',
      searchSm: 'Cerca',
    },
    prestart: {
      title: 'Pre-inizio dal battito',
      content: 'Facoltativamente definisci un battito da cui inizierà un click di pre-conteggio prima che inizi il loop effettivo.'
    },
    privacy: {
      title: 'Politica sulla privacy',
      content: `
Questa app utilizza uno strumento chiamato **Matomo** per raccogliere dati analitici anonimi delle visite.

Se attivi l'opzione sottostante, Matomo imposterà un cookie nel browser web (per il sito web acompas.org),
o nel dispositivo mobile (per l'app Android),
e osserverà alcune delle tue azioni nell'app
(essenzialmente le azioni 'Play' e 'Stop' del metronomo per dedurre il tempo di utilizzo),
anonimizzando il tuo indirizzo IP.

Queste informazioni fanno parte solo delle nostre statistiche di utilizzo (per avere un'idea di quanti utenti abbiamo). Non vendiamo né diamo accesso a questi dati a nessun altro.
Puoi abilitare o disabilitare questa funzione quando vuoi.`,
      allow: `
Non raccogliamo alcun dato personale nominativo.

**Permettere a questa app di inviarci alcuni dati di utilizzo anonimi?**`,
      enable: 'Abilita e chiudi',
      close: 'Chiudi',
    },
    tempo: {
      title: 'Tempo',
      content: 'Imposta il tempo del metronomo',
      bpm: 'BPM'
    },
    update: {
      title: 'Inizializzazione app',
      content: `
Le impostazioni dell'app devono essere (ri-)inizializzate.

Se stavi usando una versione precedente di questa app, perderai tutte le tue impostazioni e pattern.
Ma questo è l'unico modo per ottenere le nuove funzionalità. Se è il tuo primo utilizzo, questo non cambierà nulla quindi procedi pure.`,
      button: 'Ricarica app'
    },
    tuning: {
      title: 'Diapason',
      content: 'Riproduci un suono di diapason',
      caption: 'tutto',
      play: 'Riproduci',
      stop: 'Ferma'
    },
    changelog: {
      title: 'Registro delle modifiche',
      description: 'Ultimi cambiamenti e aggiornamenti di A Compás',
      entries: [
        {
          version: '3.2.7',
          date: '2024-08-23',
          changes: [
            'Aggiunto store di contesto e selettore con viste colorate',
            'Aggiunta funzionalità filtro ricerca pattern',
            'Aggiunta finestra di aiuto per la ricerca pattern',
            'Aggiunta funzionalità mantieni sveglio per desktop',
            'Aggiornati pacchetti Quasar',
            'Corretti avvisi SaSS',
            'Aggiornato a Node 20',
            'Preparazione per compatibilità Android 34'
          ]
        },
        {
          version: '3.2.5',
          date: '2023-07-15',
          changes: [
            'Aggiunto e aggiornato sitemap.xml',
            'Corretti eventi Matomo',
            'Corretta posizione orologio inattivo',
            'Aggiornati pacchetti Quasar',
            'Miglioramenti prestazioni e correzioni bug'
          ]
        },
        {
          version: '3.2.4',
          date: '2023-07-06',
          changes: [
            'Correzioni bug e miglioramenti stabilità',
            'Miglioramenti minori interfaccia utente'
          ]
        },
        {
          version: '2.3.0',
          date: '2021-01-23',
          changes: [
            'Nuove funzionalità e miglioramenti',
            'Interfaccia utente migliorata'
          ]
        },
        {
          version: '2.0.0',
          date: '2018-01-04',
          changes: [
            'Riscrittura completa dell\'applicazione',
            'Nuovo design interfaccia moderno',
            'Motore metronomo migliorato',
            'Aggiunti più pattern flamenco'
          ]
        }
      ]
    }
  },
  buttons: {
    context : 'Seleziona contesto',
    pattern: 'Pattern',
    restore: 'Ripristina impostazioni',
    options: 'Opzioni ritmo',
    settings: 'Impostazioni app'
  },
  notify: {
    loading: 'Caricamento…',
    audioInit: 'Inizializzazione dell\'audio…',
    loadSamplesFailed: 'Impossibile caricare i campioni audio!',
    startSequencesFailed: 'Impossibile avviare le sequenze audio. Riprova.',
    fetchDataError: 'Errore nel recupero dei dati',
    oneInstrumentRequired: 'Deve essere selezionato almeno uno strumento!',
    tempo: {
      verySlow: 'Il tuo tempo è molto lento',
      veryFast: 'Il tuo tempo è molto veloce',
      rhythmVerySlow: 'Il tuo ritmo è molto lento',
      porTientos: 'Il tuo tempo è por tientos',
      verySlowTientos: 'Il tuo tempo è molto lento, anche per i tientos',
      tangosRumbas: 'Il tuo tempo è piuttosto da tangos o rumbas',
      porBuleria: 'Il tuo tempo è por bulería',
      porRumba: 'Il tuo tempo è por rumba',
      soleaBuleriaAlegria: 'Il tuo tempo è soleá por bulería o alegría'
    },
    browserUnsupported: {
      title: 'Aggiorna il tuo browser!',
      message: 'Il tuo browser non supporta una o più tecnologie utilizzate da questa app. Torna con un altro browser o un\'altra versione di questo.'
    }
  },
  sync: {
    title: 'Ritardo audio/visivo',
    caption: 'Sposta l\'animazione per farla coincidere con il suono. Aumenta il valore se il clic si sente dopo l\'animazione — tipicamente con le cuffie Bluetooth.'
  }
}