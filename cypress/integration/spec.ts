describe('E2E test', () => {
  it('should send a transfer', () => {
    cy.visit('/');

    cy.get("[data-test-hook='customInput']").type('Coca-cola');
    cy.get("[data-test-hook='customCurrencyInput']").eq(1).clear();
    cy.get("[data-test-hook='customCurrencyInput']").eq(1).type('123.45');
    cy.get("[data-test-hook='submitButton']").click();
    cy.get("[data-test-hook='reviewTransferModal.toAccount']").should(
      'have.text',
      'Coca-cola'
    );
    cy.get("[data-test-hook='reviewTransferModal.amount']").should(
      'contain.text',
      ' €123.45'
    );
    cy.get("[data-test-hook='reviewTransferModal.sendButton']").click();

    cy.get("[data-test-hook='customCurrencyInput']").should(
      'contain.value',
      '1111.11'
    );

    cy.get("[data-test-hook='filterInput']").type('Coca-cola');
    cy.get("[data-test-hook='transactionMerchantName']").should(
      'contain.text',
      'Coca-cola'
    );
    cy.get("[data-test-hook='transactionAmount']").should(
      'contain.text',
      '€123.45'
    );
    cy.get("[data-test-hook='transactionType']").should(
      'contain.text',
      'Online Transfer'
    );
    cy.get("[data-test-hook='transactionDate']")
      .should('have.attr', 'title')
      .and('contain', new Date().getDate())
      .and('contain', new Date().getFullYear());
  });
});
