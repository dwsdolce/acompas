import * as ctx from  '../../../../quasar.conf.js'

import palosDefaultSettings from '../../../../src/store/data/palosDefaultSettings'

describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('has proper page title', () => {
    cy.title()
      .should('include', 'A Compás')
  })
  it('can play using default settings', () => {
    cy.get('#playBtn')
      .should('contain', 'play_arrow')
      .click()
    cy.get('#playBtn')
      .should('contain', 'stop')
      .click()
  })
  it('can play each palo', () => {
    palosDefaultSettings.forEach(function(palo) {
      cy.get('#paloBtn')
        .click()
      cy.get('#palosDialog')
        .should('be.visible')
        .should('contain', palo.label)
      cy.get('#palosDialog .q-radio__label')
        .each(($elt, index, $labels) => {
          if ($elt.html() === palo.label) {
            cy.wrap($elt)
              .click()
            cy.get('#playBtn')
              .should('contain', 'play_arrow')
              .click()
            cy.get('#playBtn')
              .should('contain', 'stop')
              .click()
          }
        })
    })
  })
  it('can display the help popin', () => {
    cy.get('#menuBtn')
      .click()
    cy.get('#sideMenu')
      .should('be.visible')
    cy.get('#helpQItem')
      .click()
    cy.get('#helpDialog')
      .should('be.visible')
      .should('contain', 'Help')
    cy.get('#closeHelpBtn')
      .click()
    cy.get('#helpDialog')
      .should('not.contain', 'Help')
  })
  it('can display the tuning fork', () => {
    cy.get('#menuBtn')
      .click()
    cy.get('#sideMenu')
      .should('be.visible')
    cy.get('#tuningForkQItem')
      .click()
    cy.get('#tuningDialog')
      .should('be.visible')
      .should('contain', 'Tuning fork')
    cy.get('#tuningDialog .q-btn')
      .each(($elt, index, $btns) => {
        cy.wrap($elt)
          .click()
      })
  })
})

// describe('Home page tests', () => {
//   beforeEach(() => {
//     cy.visit('/');
//   });
//   it('has pretty background', () => {
//     cy.get('.landing-wrapper')
//       .should('have.css', 'background').and('match', /(".+(\/img\/background).+\.png)/);
//   });
//   it('has pretty logo', () => {
//     cy.get('.landing-wrapper img')
//       .should('have.class', 'logo-main')
//       .and('have.attr', 'src')
//       .and('match', /^(data:image\/svg\+xml).+/);
//   });
//   it('has very important information', () => {
//     cy.get('.instruction-wrapper')
//       .should('contain', 'SETUP INSTRUCTIONS')
//       .and('contain', 'Configure Authentication')
//       .and('contain', 'Database Configuration and CRUD operations')
//       .and('contain', 'Continuous Integration & Continuous Deployment CI/CD');
//   });
// });
