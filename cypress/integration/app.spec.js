describe("my first test", () => {
  it('finds the content "type"', () => {
    cy.visit("localhost:3000")

    cy.contains('type').click()
  })
})