const PORT = 8000

describe('Pie Chart', () => {
  it('Visits the site', () => {
    cy.visit('http://localhost:' + PORT + '/demo.html')
  })

  it('Has 4 sectors', () => {
    cy.get('.sector').should('have.length', 4)
  })

  it('Has a title', () => {
    cy.get('.title-text').should('be.visible')
  })
})

