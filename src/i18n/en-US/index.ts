// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  welcome: 'Welcome to A Compás app',
  notFound: {
    header: 'Sorry, this page doesn\'t exist.',
    btn: 'Go back to patterns'
  },
  donate: 'Donate',
  help: 'Help',
  tuning: 'Tuning fork',
  shortcuts: 'Shortcuts',
  privacy: 'Privacy policy',
  android: 'Get the Android app',
  follow: 'Follow us',
  share: 'Share',
  source: 'Source code',
  issues: 'Issues',
  doc: {
    welcome: {
      title: 'Welcome to the A Compás app',
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
set its own relative volume, and wether playing quarter notes or eighth notes.`,
        },
        improvise: {
          title: 'Improvise',
          content: `
If it is on, then sometimes the metronome will stop sticking to the pre-programmed pattern and play random beats for one or more instrument(s).
This produces some "surprise" in the pattern.`,
        },
        humanize: {
          title: 'Humanize',
          content: `If it is on, then the metronome will play the beats with a little random deviation, simulating the human touch.`,
        },
        swing: {
          title: 'Swing',
          content: `If its value is 0, the eighth note is exactly half a quarter note. When it approaches to 1, a lag is applied, for a "jazz-like" rhythm feel.`,
        },
        reverb: {
          title: 'Reverb',
          content: `Adjust the reverb of the sound. It simulates a room or a hall effect.`,
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
          content: `Choose between dots, counter and clock visualisations.`,
        },
        reset: {
          title: 'Reset',
          content: `Reset the metronome's settings to the default values. You can reset all settings or reset settings for the current pattern.`,
        }
      }
    },
    utils: {
      wikipediaUrl: 'Wikipedia article:',
      videoExample: 'Video example:',
      openLink: 'Open link',
      disabled: 'This option is disabled for this pattern.'
    },
    searchPattern: {
      title: 'Search for a pattern',
      content: `
Many flamenco **palos** are actually derived from other rhythmical structures.
For example, "farruca" is derived from "tientos", "columbiana" or "garrotín" are kinds of "tangos".
Here you can input the name of any "palo" you ever heard of and A Compás will search for the patterns which it is derived from.
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
This app uses a tool called **Matomo** to collect anonymised visits analytics data.

If you activate the option below, Matomo will set a cookie in the web browser (for the acompas.org website),
or in the mobile device (for the Android app),
and observe some of your actions in the app
(essentially metronome 'Play' and 'Stop' actions to infer time playing),
anonymising your IP address.

This information is only part of our usage statistics (to have an idea about how many users we have). We don't sell nor give access to this data to anyone else.
You can enable or disable this feature when you want to.`,
      allow: `
We don't collect any nominative personal data.

**Allow this app to send us some anonymised usage data ?**`,
      enable: 'Enable & close',
      close: 'Close',
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
    }
  },
  buttons: {
    context : 'Select context',
    pattern: 'Pattern',
    restore: 'Restore settings',
    options: 'Rhythm options',
    settings: 'App settings'
  }
}
