/// <reference types = "cypress"/>

describe('dynamic tests', () => {
  beforeEach(() => {
    cy.visit('https://www.wcaquino.me/cypress/componentes.html')
  });
  
  beforeEach(() => {
    cy.reload()
  });  

  const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']
  foods.forEach(food =>{
    it(`cadastro variado ${food}`, () => {
      cy.get('#formNome').type('usuario')
      cy.get('#formSobrenome').type('qualquer')
      cy.get(`[name=formSexo][value=F]`).click()
      cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::input`).click()
      cy.get('#formEscolaridade').select('Doutorado')
      cy.get('#formEsportes').select('Corrida')
      cy.get('#formCadastrar').click()
      cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
    });
  })

  it('deve selecionar todos usando o each', () => {
    cy.get('#formNome').type('usuario')
    cy.get('#formSobrenome').type('qualquer')
    cy.get(`[name=formSexo][value=F]`).click()

    cy.get('[name=formComidaFavorita]').each($el => {
      if ($el.val()!= 'vegetariano') 
          cy.wrap($el).click()
    })

    cy.get('#formEscolaridade').select('Doutorado')
    cy.get('#formEsportes').select('Corrida')
  });
}); 