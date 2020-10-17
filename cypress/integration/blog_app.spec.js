describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })
  
  it('Login form is shown at startup', function() {
    cy.contains('Insert credentials to log in')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#unameInput').type('lossimies')
      cy.get('#pwdInput').type('pppoo')
      cy.get('#loginBtn').click()
    })

    it('fails with wrong credentials', function() {
      cy.get('#unameInput').type('kessila')
      cy.get('#pwdInput').type('xman')
      cy.get('#loginBtn').click()

      cy.contains('Invalid login credentials')

    })
  })


})

