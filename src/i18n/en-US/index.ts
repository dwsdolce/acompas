// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  welcome: 'Welcome to Palmas app',
  notFound: {
    header: 'Sorry, this page doesn\'t exist.',
    btn: 'Go back to patterns'
  },
  help: 'Help',
  tuning: 'Tuning fork',
  shortcuts: 'Shortcuts',
  privacy: 'Privacy policy',
  source: 'Source code',
  issues: 'Issues',
  doc: {
    welcome: {
      title: 'Welcome to the Palmas app',
      content: `
This app is designed to help you learn and practice your musical instrument.
It is a work in progress, so please be patient with us as we continue to improve it.
If you have any questions or suggestions, please contact us.`
    },
    getStarted: {
      title: 'Get started',
      content: `
- Select a **pattern** from the list. A pattern (also called "palo" in flamenco) is a rhythmic style.
- Adjust the **tempo** (speed) of the pattern.
- Select **instruments** in the mixer.
- **Start** playing the metronome.`
    },
    options: {
      title: 'List of options',
      content: {
        theme: {
          title: 'Theme',
          content: `
You can choose between light and dark themes.
The dark theme is more suitable for low-light environments, while the light theme is more suitable for bright environments.`,
        },
        lang: {
          title: 'Language',
          content: `
Choose the interface language of the application.
The change is applied immediately to all texts.
Your selection is stored locally (in the browser / device) so it will be kept next time you open the app.`,
        },
        tempo: {
          title: 'Tempo',
          content: `
There are 2 ways to define the tempo: the knob circle, and you can decrement/increment the bpm with the + and - buttons.
You can also type the tempo directly in the input field, use the mouse wheel, or the up and down arrow keys.
The tempo is the speed of the metronome, measured in beats per minute.`,
        },
        mixer: {
          title: 'Instruments mixer',
          content: `
Select playing instruments (make sure to have at least one active instrument),
set the relative volume of each, choose whether it plays eighth notes as well as
beats, and pick which one is drawn in the visualization.`,
        },
        improvise: {
          title: 'Improvise',
          content: `
If it is on, then sometimes the metronome will stop sticking to the pre-programmed pattern and play random beats for one or more instrument(s).
This produces some "surprise" in the pattern.`,
        },
        humanize: {
          title: 'Humanize',
          content: 'If it is on, then the metronome will play the beats with a little random deviation, simulating the human touch.',
        },
        swing: {
          title: 'Swing',
          content: 'If its value is 0, the eighth note is exactly half a quarter note. When it approaches to 1, a lag is applied, for a "jazz-like" rhythm feel.',
        },
        reverb: {
          title: 'Reverb',
          content: 'Adjust the reverb of the sound. It simulates a room or a hall effect.',
        },
        startBeat: {
          title: 'Start beat',
          content: `
Change the start beat (which beat selected the pattern starts on).
This is useful if you want to start the pattern on a different beat.
For example, if you want to start on the 2nd beat of the pattern, set the start beat to 2.
The start beat is also useful if you want to practice a particular part of the pattern.
The notes between the start beat and the begining of the pattern will be played as a click sound.`,
        },
        viewMode: {
          title: 'View mode',
          content: 'Choose between dots, counter and clock visualisations.',
        },
        reset: {
          title: 'Reset',
          content: 'Reset the metronome\'s settings to the default values. You can reset all settings or reset settings for the current pattern.',
        }
      }
    },
    appSettings: {
      title: 'Application Settings',
      content: {
        theme: {
          title: 'Theme Mode',
          content: `
**Light and Dark Theme Options**

Palmas offers both light and dark themes to provide the best visual experience:

- **Light Theme**: Clean, bright interface ideal for well-lit environments. Features white backgrounds with dark text for maximum readability in daylight.
- **Dark Theme**: Easy on the eyes with dark backgrounds and light text. Perfect for low-light conditions, reduces eye strain during extended practice sessions, and saves battery on OLED screens.

**How to Switch:**
- Use the theme toggle button in the left navigation menu
- Changes apply immediately across the entire application
- Your preference is automatically saved and restored on app restart

**Automatic Detection:**
The app respects your device's system theme preference by default, but you can override this setting at any time.`
        },
        language: {
          title: 'Language Selection',
          content: `
**Multi-language Support**

Palmas is available in 9 languages to serve the global flamenco community:

- **English** (en-US) - Default language
- **Spanish** (Español) - Native flamenco terminology
- **French** (Français) - Full translation
- **German** (Deutsch) - Complete localization
- **Italian** (Italiano) - Full interface translation
- **Japanese** (日本語)
- **Chinese** (简体中文) - Simplified
- **Arabic** (العربية) - Right to left
- **Persian** (فارسی) - Right to left

**Features:**
- All menus, buttons, and help text are translated
- Flamenco pattern names remain in Spanish for authenticity
- Language changes apply instantly without app restart
- Settings are saved locally on your device

**How to Change Language:**
Use the language selector in the left navigation menu to switch between available languages.`
        },
        visualization: {
          title: 'Visualization Modes',
          content: `
**Three Display Options for Beat Visualization**

Choose the visualization that best suits your practice style:

**1. Dots Mode**
- Clean, minimalist display with animated dots
- Each dot represents a beat in the pattern
- Active beats are highlighted with color and animation
- Perfect for visual learners who prefer simple, uncluttered displays
- Excellent for focusing on pattern structure

**2. Counter Mode**
- Digital beat counter showing current position
- Displays current beat number and total beats in pattern
- Clear numerical progression through the compás
- Ideal for musicians who think in numbers
- Helpful for learning complex pattern structures and timing

**3. Clock Mode**
- Circular clock-face visualization
- Beats arranged around a clock with animated hand
- Provides intuitive sense of cyclical rhythm
- Great for understanding the circular nature of flamenco compás
- Visual representation matches traditional flamenco counting methods

**How to Switch:**
Access visualization options through the settings menu. Changes apply immediately, and your preference is saved automatically.

**Tips:**
- Try different modes during practice to find what works best for you
- Clock mode is particularly effective for 12-beat patterns like Soleá
- Counter mode helps when learning to count complex rhythms
- Dots mode minimizes distractions for advanced practitioners`
        },
        reading: {
          title: 'Reading the display',
          content: `
**Two things at once**

Every visualization shows two different things layered together, and they are
not the same thing:

- The **compás** — the pulse of the palo itself. This is the abstract pattern: where the
  accents fall in the cycle, regardless of who is playing.
- The **palmas** — what the instrument you are watching actually strikes. A
  player does not simply hit the accents; each instrument plays its own figure
  against them.

Abandolaos is the clearest example. Its pulse falls on 6, 2 and 4, while the
palmas claras strike on 1 and 3. A display showing only the compás would
contradict what you are hearing.

**Colour means accented**

- A **red** dot is an accented beat of the compás. Grey dots are the
  unaccented ones, and they shrink as they matter less — a counted beat, then
  an uncounted pulse, then an off-beat subdivision.
- A **blue** ring is an accented strike by the instrument being drawn. Thinner
  rings in the foreground colour are its softer strikes. No ring at all means
  that instrument is silent on that beat.

The ring is set slightly off the dot so it reads as a ring rather than a
larger dot. Thickness carries the same information as the colour, so nothing
depends on telling red from blue.

The counter and the clock say the same thing in their own shapes: a bar under
the number, and a tick outside the dial, thicker or longer for a harder strike
and coloured when it is the accented one.

**Eighth notes**

An instrument can play on the half-beats as well as the beats. The **8th**
column in the instruments mixer turns that on for each instrument separately.

When it is on, the off-beat positions appear between the counted beats, drawn
smaller. When it is off they are still there but invisible, so the spacing of
the beats never shifts as you toggle it.

**Choosing which instrument is drawn**

Only one instrument can be drawn at a time — two figures overlaid would be
unreadable. The **Shown** column in the mixer chooses which one.

It is never an instrument you cannot hear: your choice holds for as long as
that instrument stays active, and otherwise the first active instrument is
drawn. Since the mixer will not let you switch everything off, there is always
exactly one.`
        },
        sync: {
          title: 'Audio/visual delay',
          content: `
**When the sound and the animation disagree**

The beat you see and the beat you hear should land together. If the click
arrives *after* the dot lights up, this setting is the fix: it holds the
animation back until the sound catches up.

It is measured in milliseconds, and the slider also shows the delay as a
fraction of a beat at your current tempo — a fixed 120 ms matters far more at
200 bpm than at 60.

**Why it happens**

Every audio path adds delay: the browser's own buffering, the operating
system, and then whatever the sound travels through. The app already asks the
browser how much latency it is adding and compensates for that automatically.
What it cannot see is the rest.

**Bluetooth is the usual culprit.** Wireless headphones and speakers add
between roughly 100 and 300 milliseconds that nothing reports, so the app has
no way to know about it. Wired output rarely needs any adjustment at all.

**How to set it**

Start the metronome, watch a beat you can pick out easily — an accented one —
and raise the slider until the sound and the animation land together. Trust
your ear rather than the number: the right value is the one where they agree,
and it will differ between your headphones and your speakers.

The setting is saved on this device, so it persists between sessions. If you
switch between wired and wireless, expect to change it back.`
        }
      }
    },
    visualizationModes: {
      dots: 'Dots',
      counter: 'Counter',
      clock: 'Clock'
    },
    utils: {
      wikipediaUrl: 'Wikipedia article:',
      videoExample: 'Video example:',
      openLink: 'Open link',
      source: 'Source: Wikipedia',
      beats: '{count} beats',
      disabled: 'This option is disabled for this pattern.'
    },
    searchPattern: {
      title: 'Search for a pattern',
      content: `
Many flamenco **palos** are actually derived from other rhythmical structures.
For example, "farruca" is derived from "tientos", "columbiana" or "garrotín" are kinds of "tangos".
Here you can input the name of any "palo" you ever heard of and Palmas will search for the patterns which it is derived from.
- Search for a pattern by typing its name or a part of it.
- The search is case insensitive.
- The search is performed on the pattern name and on the linked patterns.
- The search is performed on the whole string, not on the words.`
    },
    shortcuts: {
      title: 'The following shortcuts are available for usage with the keyboard:',
      space: 'Play/Stop the metronome',
      up: 'Increment the tempo (maintain key pressed to increment faster)',
      down: 'Decrement the tempo (maintain key pressed to decrement faster)',
      left: 'Previous pattern',
      right: 'Next pattern',
      esc: 'Close the modal window',
      tab: 'Change focus button'
    },
    reset: {
      title: 'Restore default parameters',
      warning: 'Warning! This will delete your metronome settings.',
      close: 'Close',
      proceed: 'Proceed',
      success: 'Success! Your metronome setting has been reset.',
    },
    context: {
      title: 'Select a context',
    },
    reverb: {
      title: 'Reverb decay',
      content: 'Set a decay for sounds reverb'
    },
    swing: {
      title: 'Swing',
      content: 'Set a swing value for the metronome',
      caption: 'If its value is 0, the eighth note is exactly half a quarter note. When it approaches to 1, a lag is applied, for a "jazz-like" rythm flavour.'
    },
    startBeat: {
      title: 'Start beat',
      content: 'Set the beat where the metronome will start playing'
    },
    mixer: {
      title: 'Instruments mixer',
      content: 'Select the instruments you want to play',
      active: {
        title: 'Active',
        content: 'Play this instrument'
      },
      shown: {
        title: 'Shown',
        content: 'Draw this instrument in the visualization'
      },
      eighth: {
        title: '8th',
        content: 'Toggle eighth notes'
      },
      volume: {
        title: 'Volume (db)',
        content: 'Increase or decrease instrument volume'
      }
    },
    pattern: {
      title: 'Select a pattern',
      search: 'Search for a pattern',
      searchSm: 'Search',
    },
    prestart: {
      title: 'Prestart from beat',
      content: 'Optionaly define a beat from which a precount click will start before the actual loop starts.'
    },
    privacy: {
      title: 'Privacy policy',
      content: `
We don't collect any personal data.

When you open the help for a rhythm, the app asks Wikipedia for that article's summary, so it can show it in your language. Wikipedia sees your IP address and which article was requested. Nothing else leaves your device.`
    },
    tempo: {
      title: 'Tempo',
      content: 'Set the tempo of the metronome',
      bpm: 'BPM'
    },
    update: {
      title: 'App initialization',
      content: `
The settings of the app have to be (re-)initialized.

If you were using a previous version of this app, you will lose all your settings and patterns.
But this is the only way to get the new features. If it is your first use, this will change nothing so go ahead.`,
      button: 'Reload app'
    },
    tuning: {
      title: 'Tuning fork',
      content: 'Play a tuning fork sound',
      caption: 'all',
      play: 'Play',
      stop: 'Stop'
    },
    changelog: {
      title: 'Changelog',
      description: 'Latest changes and updates to Palmas',
    }
  },
  buttons: {
    context : 'Select context',
    pattern: 'Pattern',
    restore: 'Restore settings',
    options: 'Rhythm options',
    settings: 'App settings'
  },
  notify: {
    loading: 'Loading…',
    audioInit: 'Initializing audio…',
    loadSamplesFailed: 'Failed to load the audio samples!',
    startSequencesFailed: 'Failed to start audio sequences. Please try again.',
    fetchDataError: 'Error fetching data',
    oneInstrumentRequired: 'At least one instrument must be selected!',
    tempo: {
      verySlow: 'Your tempo is very slow',
      veryFast: 'Your tempo is very fast',
      rhythmVerySlow: 'Your rhythm is very slow',
      porTientos: 'Your tempo is por tientos',
      verySlowTientos: 'Your tempo is very slow, even for tientos',
      tangosRumbas: 'Your tempo is more like tangos or rumbas',
      porBuleria: 'Your tempo is por bulería',
      porRumba: 'Your tempo is por rumba',
      soleaBuleriaAlegria: 'Your tempo is solea por bulería or alegría'
    },
    browserUnsupported: {
      title: 'Update your browser!',
      message: 'Your browser doesn\'t support one or more technologies used by this app. Please come back with another one or another version of this one.'
    }
  },
  sync: {
    title: 'Audio/visual delay',
    caption: 'Shift the on-screen beat to match the sound. Increase it if the click is heard after the animation — typically with Bluetooth headphones.'
  }
}
