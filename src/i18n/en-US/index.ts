// This is just an example,
// so you can safely delete all default props below

import { get } from "http";
import { title } from "process";
import { context } from "tone";

export default {
  failed: 'Action failed',
  success: 'Action was successful',

  welcome: 'Welcome to A Compás app',

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

  updated: 'App successfuly updated',

  doc: {
    welcome: {
      title: 'Welcome to A Compás app',
      content: `This app is designed to help you learn and practice your musical instrument.
                It is a work in progress, so please be patient with us as we continue to improve it.
                If you have any questions or suggestions, please contact us.`
    },
    getStarted: {
      title: 'Get started',
      content: `<ul>
                  <li>Select a <b>context</b> from the list. A context is like a musical style, containing a group of patterns.</li>
                  <li>Select a <b>pattern</b> from the list. A pattern (also called "palo" in flamenco) is a rhythmic style.</li>
                  <li>Adjust the <b>tempo</b> (speed) of the pattern.</li>
                  <li>Select <b>instruments</b> in the mixer.</li>
                  <li><b>Start</b> playing the metronome.</li>
                </ul>`
    },
    options: {
      title: 'List of options',
      content: {
        tempo: {
          title: 'Tempo',
          content: `There are 2 ways to define the tempo: the knob circle, and you can decrement/increment the bpm with the + and - buttons.
                    You can also type the tempo directly in the input field, use the mouse wheel, or the up and down arrow keys.
                    The tempo is the speed of the metronome, measured in beats per minute.`,
        },
        mixer: {
          title: 'Instruments mixer',
          content: `Select playing instruments (make sure to have at least one active instrument),
                    set its own relative volume, and wether playing quarter notes or eighth notes.`,
        },
        improvise: {
          title: 'Improvise',
          content: `If it is on, then sometimes the metronome will stop sticking to the pre-programmed pattern and play random beats for one or more instrument(s).
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
          content: `Change the start beat (which beat selected the pattern starts on).
                    This is useful if you want to start the pattern on a different beat.
                    For example, if you want to start on the 2nd beat of the pattern, set the start beat to 2.
                    The start beat is also useful if you want to practice a particular part of the pattern.
                    The notes between the start beat and the begining of the pattern will be played as a click sound.ct the beat where the metronome will start playing.`,
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
      content: `<p>
                  Many flamenco "palos" are actually derived from other rhythmical structures.
                  For example, "farruca" is derived from "tientos", "columbiana" or "garrotín" are kinds of "tangos".
                  Here you can input the name of any "palo" you ever heard of and A Compás will search for the patterns which it is derived from.
                </p>
                <ul>
                  <li>Search for a pattern by typing its name or a part of it.</li>
                  <li>The search is case insensitive.</li>
                  <li>The search is performed on the pattern name and on the linked patterns.</li>
                  <li>The search is performed on the whole string, not on the words.</li>
                </ul>`,
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
      proceed: 'Proceed'
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
      content: `<p>
                  This app uses a tool called "Matomo" to collect anonymised visits analytics data.
                  If you activate the option below, Matomo will set a cookie in the web browser (for the acompas.org website), or in the mobile device (for the Android app),
                  and observe some of your actions in the app
                  (essentially metronome 'Play' and 'Stop' actions to infer time playing),
                  anonymising your IP address.
                </p>
                <p>
                  This information is only part of our usage statistics (to have an idea about how many users we have). We don't sell nor give access to this data to anyone else.
                </p>
                <p>
                  You can enable or disable this feature when you want to.
                </p>`,
      allow: `<p>
                <b>We don't collect any nominative personal data.</b>
             </p>
             <p>
                <b>Allow this app to send us some anonymised usage data ?</b>
             </p>`,
      enable: 'Enable & close',
      close: 'Close',
    },
    tempo: {
      title: 'Tempo',
      content: 'Set the tempo of the metronome',
      bpm: 'BPM'
    },
    update: {
      title: 'App update',
      content: `<p>
                  You need to delete all your local settings and reload the page in order to use the new version of the app.
                </p>
                <p>
                  If you were previously using this app, you will lose all your settings and patterns. But this is the only way to get the new features. If it is your first use, this will change nothing so go ahead.
                </p>`
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
