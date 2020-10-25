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
      likes: 5
     
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
      cy.contains('Create New Blog')
    })

    it('fails with wrong credentials', function() {
     
      cy.wait(2000)
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
    it.only('Likebutton does work', function() {
      
      // Odotetaan 2sek, jotta uusi blogi varmasti päivittyy
      cy.wait(2000)

      // Viimeisen blogin view nappula
      cy.get('.ViewBtns').eq(2).click()
      
      // Painetaan Like nappulaa
      cy.get('.LikeBtns').eq(2).click()

      // Viimeisen elementin likejen arvo pitäisi olla 1
      cy.get('.LikeRows').eq(2).should('contain','1')
      
    })

    // 5.21
    it('Blog deletion does work', function(){

      // Odotetaan 2sek, jotta uusi blogi varmasti päivittyy
      cy.wait(2000)

      // Viimeisen blogin view nappula
      cy.get('.ViewBtns').eq(2).click()
      
      // Painetaan viimeisen elementin Remove nappulaa
      cy.get('.RemoveBtns').eq(2).click()

      // Odotetaan 2sek, jotta blogilista päivittyy
      cy.wait(3000)

      // Viimeinen elmentti pitäisi olla kadonnut DOMista
      cy.get('.BlogInfo').eq(2).should('not.exist');

    })

    // 5.22
    it('Blogs in desc. order based on likes', function(){

      // Odotetaan 2sek, jotta uusi blogi varmasti päivittyy
      cy.wait(2000)

      cy.get('.LikeRows').eq(0).as('LargestLike')
      cy.get('.LikeRows').eq(1).as('MidLike')
      cy.wait(2000)
      cy.get('.LikeRows').eq(2).as('LowestLike')

      cy.get('@LargestLike').then(($largest) => {

        const highest = parseInt($largest.text().replace(/\D/g, ""))

        cy.get('@MidLike').then(($mid) => {

          const mid = parseInt($mid.text().replace(/\D/g, ""))
          let compare1 = highest > mid
          expect(compare1).to.eq(true)

          cy.get('@LowestLike').then(($low) => {

            const lowest = parseInt($low.text().replace(/\D/g, ""))
            let compare2 = mid > lowest
            expect(compare2).to.eq(true)
          })
        })
      })
    })
  })
})

