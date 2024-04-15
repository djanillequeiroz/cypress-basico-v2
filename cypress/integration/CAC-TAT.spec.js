/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit('./src/index.html')
      })
    it('verifica o título da aplicação', function() {

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'teste, teste, teste, teste, teste, teste, teste, teste, teste,teste, teste, teste'
        cy.get('input[id="firstName"]').type('Morango')
        cy.get('input[id="lastName"]').type('Doce')
        cy.get('input[id="email"]').type('morango.doce@teste.com.br')
        cy.get('textarea[id="open-text-area"]').type(longText, { delay: 0})
        cy.get('button[class="button"]').click()
        cy.get('span[class="success"]').should('be.visible')
        cy.contains('Mensagem enviada com sucesso')

    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('input[id="firstName"]').type('Morango')
        cy.get('input[id="lastName"]').type('Doce')
        cy.get('input[id="email"]').type('morango.doceteste.com.br')
        cy.get('textarea[id="open-text-area"]').type('Teste Jane')
        cy.get('button[class="button"]').click()
        cy.get('.error').should('be.visible')
        cy.contains('Valide os campos obrigatórios')

    })
    it('Validar que o campo Telefone não aceita letras e caracteres', function(){
        cy.get('#phone').type('abcdefghlmnopqrstuvxzykw').should('not.have.text')
        cy.get('#phone').type('!@#$%&*()_+-=').should('have.value', '')


    })
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        const longText = 'teste Jane'
        cy.get('input[id="firstName"]').type('Morango')
        cy.get('input[id="lastName"]').type('Doce')
        cy.get('input[id="email"]').type('morango.doce@teste.com.br')
        cy.get('#phone-checkbox').check()
        cy.get('textarea[id="open-text-area"]').type(longText)
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.contains('Valide os campos obrigatórios')
    })
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('input[id="firstName"]').type('Morango').should('have.value', 'Morango')
            .clear().should('have.value', '')
        cy.get('input[id="lastName"]').type('Doce').should('have.value', 'Doce')
            .clear().should('have.value', '')
        cy.get('input[id="email"]').type('morango.doce@teste.com.br').should('have.value', 'morango.doce@teste.com.br')
            .clear().should('have.value', '')
          cy.get('#phone').type('9999999').should('have.value', '9999999')
            .clear().should('have.value', '')
    })
    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.PreencherCamposObrigatoriosEEnviar()
        cy.get('span[class="success"]').should('be.visible')
        cy.contains('Mensagem enviada com sucesso')

    })
    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        }) 
    })
    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product').select('YouTube')
        .should('have.value', 'youtube')
    
    })
    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product').select('mentoria')
        .should('have.value', 'mentoria')
    
    })
    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product').select(1)
        .should('have.value', 'blog')
    
    })
    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get(':nth-child(4) > input').check()
        .should('be.checked')
    })
    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .should('have.length', 2)
        .each(function($checkbox){
        cy.wrap($checkbox).check()
        cy.wrap($checkbox).should('be.checked')
        cy.get('input[type="checkbox"]').last()
        .uncheck()
        .should('not.be.checked')
    })
})
it('marca ambos checkboxes, depois desmarca o último - VERSÃO CORRETA', function(){
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')
})
it('seleciona um arquivo da pasta fixtures', function(){
    cy.get('#file-upload').selectFile('./cypress/fixtures/example.json')
      .then(input =>{
        expect(input[0].files[0].name).to.equal('example.json')
    })
})
it('seleciona um arquivo simulando um drag-and-drop', function(){
    cy.get('#file-upload').selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
      .then(input =>{
        expect(input[0].files[0].name).to.equal('example.json')
    })
})
it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
    cy.fixture('example.json', {encoding: null}).as('ExampleFile')
    cy.get('input[type="File"]')
        .selectFile('@ExampleFile')
        .then(input =>{
        expect(input[0].files[0].name).to.equal('example.json')
})
})
it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
    cy.get('a').should('have.attr', 'target', '_blank')
})
it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
    cy.get('a').invoke('removeAttr', 'target')
    .click()
})
it.only('testa a página da política de privacidade de forma independente', function(){
    cy.get('a').invoke('removeAttr', 'target')
    .click()
    cy.get('#title').should('have.text', 'CAC TAT - Política de privacidade')
})
})