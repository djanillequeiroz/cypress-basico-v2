Cypress.Commands.add('PreencherCamposObrigatoriosEEnviar', function() {
    cy.get('input[id="firstName"]').type('Morango')
    cy.get('input[id="lastName"]').type('Doce')
    cy.get('input[id="email"]').type('morango.doce@teste.com.br')
    cy.get('textarea[id="open-text-area"]').type('Teste Jane')
    cy.get('button[class="button"]').click()
})