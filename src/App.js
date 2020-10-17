import React, { useState, useEffect} from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import loginService from './services/login' 
import BlogCreatorForm from './components/CreationForm'
import blogService from './services/blogs'
import NotificationBar from './components/Notificationbar'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [infoMessage, setInfoMessage] = useState(null) 
  const [password, setPassword] = useState('')
  const [currUser, setCurrUser] = useState(null)
  const [count,setRenderCount] = useState(null)

  // Uloskirjautuu sovelluksesta
  const logOut = () => {

    window.localStorage.removeItem('blogAppUser')
    setCurrUser(null)
    console.log('user logged out')
  }
  
  const handleLogin = async (event) => {
    event.preventDefault()

    try 
    {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'blogAppUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setCurrUser(user)
      setUsername('')
      setPassword('')
    } catch (exp) {
      setInfoMessage({type: 'Error'})
      setTimeout(() => {
        setInfoMessage(null)
      }, 3000)
    }
  }

  const updateBlog = async (blog) => {

    console.log('called')
    const user = blog.user.id
    
    const newBlogContent = {...blog,
      likes: blog.likes += 1,
      user: user
    }
    
    await blogService.updateBlog(newBlogContent.id,newBlogContent)

    setRenderCount(() => count + 1)
  }


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setCurrUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <h2 style={{color:'purple'}}>BLOGS</h2>
      {(currUser !== null || infoMessage !== null) && <NotificationBar user={currUser} message={infoMessage} logoutfunc={logOut}/>}
      {currUser === null && 
      <LoginForm loginFunction={handleLogin} usernameFunction={setUsername} passwordFunction={setPassword}/>}
      {currUser !== null &&
      <Togglable>
        <BlogCreatorForm infoMSgFunction={setInfoMessage}/>
      </Togglable>
      }
      {currUser !== null &&
      blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog}/>)}
    </div>
  )
}

export default App