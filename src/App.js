import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import loginService from './services/login' 
import BlogCreatorForm from './components/CreationForm'
const NotificationBar = (props) => {
  return(<div>
    {props.user !== null && <p>User {props.user.name} logged in <button onClick={() => props.logoutfunc()}>Logout</button></p>}
    {props.type === "Error" && <p style={{color: 'red',border: '1px solid red'}}>Invalid login credentials</p>}
    {props.type === "BlogAdded" && <p style={{color: 'green',border: '1px solid green'}}>A new blog added: {props.blog.title} by {props.blog.author}</p>}
  </div>)
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [infoMessage, setInfoMessage] = useState(null) 
  const [password, setPassword] = useState('')
  const [currUser, setCurrUser] = useState(null)
  const [newBlog,setNewBlog] = useState(null) 

  // Uloskirjautuu sovelluksesta
  const logOut = () => {

    window.localStorage.removeItem('blogAppUser')
    setCurrUser(null)
    console.log("user logged out")
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
      console.log('örf')
      setInfoMessage("Error")
      setTimeout(() => {
        setInfoMessage(null)
      }, 3000)
    }
  }

  const blogBuilder = (value,id) => {

    // eslint-disable-next-line default-case
    switch (id) {
      case "newBlogTitle":
        setNewBlog({...newBlog,
        title: value})
        break;
      case "newBlogAuthor":
        setNewBlog({...newBlog,
        author: value})
        break;
      case "newBlogURL":
        setNewBlog({...newBlog,
        url: value})
        break;

       
    }

  }

  const createBlog = async (e) => {
    e.preventDefault()
    await blogService.createNew(newBlog)
    setInfoMessage('BlogAdded')
    setTimeout(() => {
      setInfoMessage(null)
      setNewBlog(null)
    }, 3000)
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
      {(currUser !== null || infoMessage !== null) && <NotificationBar user={currUser} type={infoMessage} blog={newBlog} logoutfunc={logOut}/>}
      {currUser === null && 
      <LoginForm loginFunction={handleLogin} usernameFunction={setUsername} passwordFunction={setPassword}/>}
    {currUser !== null &&
      <Togglable>
        <BlogCreatorForm changeValue={blogBuilder} blogCreateFunction={createBlog}/>
      </Togglable>
      }
      {currUser !== null &&
      blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>)}
    </div>
  )
}

export default App