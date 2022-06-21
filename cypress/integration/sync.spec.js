/// <reference types = "cypress"/>

describe('esperas...', () => {
  before(() => {
      cy.visit('https://www.wcaquino.me/cypress/componentes.html')
  });
  
  beforeEach(() => {
    cy.reload()
  });

  it('Deve aguardar o elemento estar disponivel', () => {
    cy.get('#novoCampo').should('not.exist')
    
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo').should('exist')
    cy.get('#novoCampo').type('funciona') 
  });
  
  it('Deve fazer retrys', () => {       
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo').should('exist').type('funciona')      
  });
  
  it('uso do find', () => {
    cy.get('#buttonList').click()
    cy.get('#lista li ').find('span')
      .should('contain', 'Item 1')

    cy.get('#lista li span')
    .should('contain', 'Item 2')
  });

  it('uso do timeout', () => {
    cy.get('#buttonListDOM').click()
    cy.get('#lista li span')
    .should('have.length', 1)
    cy.get('#lista li span')
    .should('have.length', 2)
  });

  it('click retry', () => {
    cy.get('#buttonCount').click().click()
    .should('have.value', '111')
  });

  it('should vs then', () => {
    cy.get('#buttonListDOM').click()
    cy.get('#lista li span').then($el =>{  // $el por convencao que esta se referenciando ao jquery
        console.log($el)
        expect($el).to.have.length(1)
        return 2
    }).and('eq', 2)
  });
});