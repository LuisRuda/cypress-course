/// <reference types = "cypress"/>

describe('Worn with basic elements', () => {
  before(() => {
      cy.visit('https://www.wcaquino.me/cypress/componentes.html')
  });
  
  beforeEach(() => {
      cy.reload()
  });
  
  it('Text', () => {
    cy.get('body').should('contain', 'Cuidado onde clica, muitas armadilhas...')
    cy.get('span').should('contain', 'Cuidado onde clica, muitas armadilhas...')
    cy.get('span').should('contain', 'Cuidado onde clica, muitas armadilhas...') 
    cy.get('.facilAchar').should('contain', 'Cuidado onde clica, muitas armadilhas...')
    cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
  });

  it('Links', () => {
    cy.get('[href="#"]').click()
    cy.get('#resultado').should('have.text', 'Voltou!')

    cy.reload()
    cy.get('#resultado').should('have.not.text', 'Voltou!')
    cy.contains('Voltar').click()
    cy.get('#resultado').should('have.text', 'Voltou!')
  });

  it('TextFields', () => {
    cy.get('#formNome').type('Cypress Test')
    cy.get('#formNome').should('have.value', 'Cypress Test')
    cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input').type('???')
    cy.get('[data-cy=dataSobrenome]').type('Teste12345{backspace}{backspace}').should('have.value', 'Teste123')
  });

  it('RadioButton', () => {
    cy.get('#formSexoFem')
    .click()
    .should('be.checked')

    cy.get('#formSexoMasc')
    .should('not.be.checked')

    cy.get("[name='formSexo']")
    .should('have.length', 2)
  });

  it('CheckBox', () => {
    cy.get('#formComidaPizza')
    .click()
    .should('be.checked')

    cy.get('[name=formComidaFavorita]')
    .click({multiple:true})
    
    cy.get('#formComidaPizza').should('not.be.checked')
    cy.get('#formComidaVegetariana').should('be.checked')
  });

  it('ComboBox', () => {
    cy.get('[data-test=dataEscolaridade]')
    .select('2o grau completo')
    .should('have.value', '2graucomp')

    cy.get('[data-test=dataEscolaridade]')
    .select('1graucomp')
    .should('have.value', '1graucomp')
    
    cy.get('[data-test=dataEscolaridade] option').should('have.length', 8)
    cy.get('[data-test=dataEscolaridade] option').then($arr =>{
      const values = []
      
      $arr.each(function(){
          values.push(this.innerHTML)
      })
      expect(values).to.include.members(["Superior", "Mestrado"])
    })
  });
});