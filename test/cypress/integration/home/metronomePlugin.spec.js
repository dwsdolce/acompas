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
    window.localStorage.clear()
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
  it('can prepare correct metronomeData', () => {
    for (let testObj in testData) {
      
    }
  })
})
