describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    
    const testUser = {
      name: 'Test Man',
      username: 'testmaan',
      password: 'cypresstest'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', testUser) 

    cy.visit('http://localhost:3000')
  })
  
  it('Login form is shown at startup', function() {
    cy.contains('Insert credentials to log in')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#unameInput').type('testmaan')
      cy.get('#pwdInput').type('cypresstest')
      cy.get('#loginBtn').click()
    })

    it('fails with wrong credentials', function() {
      cy.get('#unameInput').type('kessila')
      cy.get('#pwdInput').type('xman')
      cy.get('#loginBtn').click()

      cy.contains('Invalid login credentials')

    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      
      cy.get('#unameInput').type('testmaan')
      cy.get('#pwdInput').type('cypresstest')
      cy.get('#loginBtn').click()
    })


    it('A blog can be created', function() {
      cy.get('#newBlogBtn').click()
      cy.get('#newBlogTitle').type('Test blog by Cypress')
      cy.get('#newBlogAuthor').type('Cy Robo')
      cy.get('#newBlogURL').type('www.cypress.kz')
      cy.get('#submitNewBlogBtn').click()
      
      cy.contains('Aihe:Test blog by Cypress Kirjoittaja: Cy Robo')
    })
  })

})

