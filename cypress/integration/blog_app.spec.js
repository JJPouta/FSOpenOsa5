describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    
    const testUser = {
      name: 'Test Man',
      username: 'testmaan',
      password: 'cypresstest'
    }

    const testBlogOne = 
    {
      author: 'Test Man',
      title: 'TestBlog 5000',
      url: 'www.testurl.kz',
      likes: 1
     
    }
    const testBlogTwo = 
    {
      author: 'Test Man',
      title: 'TestBlog 6000',
      url: 'www.testurl.kz',
      likes: 10
    }

    cy.request('POST', 'http://localhost:3001/api/users/', testUser) 
    cy.request('POST', 'http://localhost:3001/api/testing/testblog', testBlogOne) 
    cy.request('POST', 'http://localhost:3001/api/testing/testblog', testBlogTwo)

    cy.visit('http://localhost:3000')
  })
  
  // 5.17
  it('Login form is shown at startup', function() {
    cy.contains('Insert credentials to log in')
  })

  // 5.18
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

  // 5.19
  describe('When logged in', function() {
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

  
  describe('Blog likes and removal', function() {
    beforeEach(function() {
      
      cy.get('#unameInput').type('testmaan')
      cy.get('#pwdInput').type('cypresstest')
      cy.get('#loginBtn').click()

      // Luodaan uusi blogi
      cy.get('#newBlogBtn').click()
      cy.get('#newBlogTitle').type('Test blog by Cypress')
      cy.get('#newBlogAuthor').type('Cy Robo')
      cy.get('#newBlogURL').type('www.cypress.kz')
      cy.get('#submitNewBlogBtn').click()
      

    })

    // 5.20
    it('Likebutton does work', function() {
      
      // Odotetaan 2sek, jotta uusi blogi varmasti päivittyy
      cy.wait(2000)

      // Viimeisen blogin view nappula
      cy.get('.ViewBtns').eq(2).click()
      
      // Painetaan Like nappulaa
      cy.get('.LikeBtns').eq(2).click()

      // Viimeisen elementin likejen arvo pitäisi olla 11
      cy.get('.LikeRows').eq(2).should('contain','1')
      
    })

    // 5.21
    it.only('Blog deletion does work', function(){

      // Odotetaan 2sek, jotta uusi blogi varmasti päivittyy
      cy.wait(2000)

      // Viimeisen blogin view nappula
      cy.get('.ViewBtns').eq(2).click()
      
      // Painetaan viimeisen elementin Remove nappulaa
      cy.get('.RemoveBtns').eq(2).click()

      // Odotetaan 2sek, jotta blogilista päivittyy
      cy.wait(2000)

      // Viimeinen elmentti pitäisi olla kadonnut DOMista
      cy.get('.BlogInfo').eq(2).should('not.exist');

    })
  })

})

