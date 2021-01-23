import audioSettings from '../../../../src/store/data/audioDefaultSettings'
import palosDefaultSettings from '../../../../src/store/data/palosDefaultSettings'
import { deepCopy, forEachValue } from '../../../../src/assets/utils'

let testData = [
  {
    palo: 'buleria-12',
    preCount: 0,
    startBeat: 0,
    expectedIntroductionLength: 0,
    expextedLoopLength: 24
  },
  {
    palo: 'buleria-12',
    preCount: 6,
    startBeat: 12,
    expectedIntroductionLength: 25,
    expextedLoopLength: 24
  },
  {
    palo: 'buleria-12',
    preCount: 12,
    startBeat: 0,
    expectedIntroductionLength: 25,
    expextedLoopLength: 24
  },
  {
    palo: 'tangos',
    preCount: 0,
    startBeat: 0,
    expectedIntroductionLength: 0,
    expextedLoopLength: 16
  },
  {
    palo: 'tangos',
    preCount: 2,
    startBeat: 12,
    expectedIntroductionLength: 8,
    expextedLoopLength: 16
  },
  {
    palo: 'tangos',
    preCount: 4,
    startBeat: 0,
    expectedIntroductionLength: 8,
    expextedLoopLength: 16
  },
]

describe('Metronome plugin', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
    cy.get('#closePrivacyDialogBtn')
      .click()
    cy.get('#playBtn')
      .should('contain', 'play_arrow')
    cy.get('#appMain')
      .should('be.visible')
  })

  it('has proper page title', () => {
    cy.title()
      .should('include', 'A Compás')
  })

  // it('can prepare correct metronomeData', () => {
  //   const audio = new Audio()
  //   let audioFormat
  //
  //   if (audio.canPlayType('audio/flac')) {
  //     audioFormat = 'flac'
  //   } else if (audio.canPlayType('audio/mpeg')) {
  //     audioFormat = 'mp3'
  //   } else if (audio.canPlayType('audio/mp4')) {
  //     audioFormat = 'mp4'
  //   } else if (audio.canPlayType('audio/wav')) {
  //     audioFormat = 'wav'
  //   } else if (audio.canPlayType('audio/ogg')) {
  //     audioFormat = 'ogg'
  //   } else {
  //     throw new Error('None of the available audio formats can be played')
  //   }
  //
  //   const path = 'audio/'
  //
  //   forEachValue(audioSettings, (value, key) => {
  //     for (let i = 0; i < value.length; i++) {
  //       const url = path + value[i].src + '.' + audioFormat
  //       cy.fixture(url, 'base64').then((sound) => {
  //         const uri = `data:audio/${audioFormat};base64,`+ sound
  //         const audio = new Audio(uri)
  //
  //         audio.play()
  //       })
  //     }
  //   })
  //
  //   // for (let testObj in testData) {
  //
  //   // }
  // })
})
