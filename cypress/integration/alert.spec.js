/// <reference types = "cypress"/>

describe('Worn with alerts', () => {
  before(() => {
      cy.visit('https://www.wcaquino.me/cypress/componentes.html')
  });
  
  beforeEach(() => {
      cy.reload()
  });

  it('Alerts com mock', () => {
    const stub = cy.stub()
    cy.on('window:alert',stub)
    cy.get('#alert').click()
  });

  it('Confirm', () => {
    cy.on('window:confirm', msg =>{  
      expect(msg).to.be.equal('Confirm Simples')
    })
    cy.get('#confirm').click()
  });

  it('Prompt', () => {
    cy.window().then(win =>{
      cy.stub(win, 'prompt').returns('42')    
    });

    cy.on('window:prompt', msg =>{
      expect(msg).to.be.equal('Confirm')
      
    })
    cy.on('window:confirm', msg =>{
      expect(msg).to.be.equal('Era 42?')
    })
    cy.on('window:alert', msg =>{
      expect(msg).to.be.equal(':D')
    })
    cy.get('#prompt').click()
  });
});