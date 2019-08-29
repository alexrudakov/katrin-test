describe('Form', ()=> {
  beforeEach(()=> {
    cy.visit("localhost:3000")
  })
  it ('it focuses the input', ()=> {
    cy.focused().should('have.class','contianer__form__input')
  })


  it('accepts input', () => {
    const input = 100
    cy.get('.contianer__form__input')
      .type(input)
      .should('have.value', input)
  })
})