import * as ctx from  '../../../../quasar.conf.js'

describe('Landing', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('should let you play with defaults settings', () => {
    cy.title().should('include', 'A Compás')
    cy.get('#playBtn').should('contain', 'play_arrow').click()
    cy.get('#playBtn').should('contain', 'stop').click()
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
