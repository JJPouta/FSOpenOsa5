import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login' 

const NotificationBar = (props) => {
  
  return(<div>
    {props.fullname !== null && <p>User {props.fullname} logged in</p>}
    {props.type === "Error" && <p style={{color: 'red',border: '1px solid red'}}>Invalid login credentials</p>}
    {props.type === "BlogAdded" && <p style={{color: 'green',border: '1px solid green'}}>A new blog added: {props.blogname} by {props.author}</p>}
  </div>)
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [infoMessage, setInfoMessage] = useState(null) 
  const [password, setPassword] = useState('')
  const [currUser, setCurrUser] = useState(null) 

  
  const handleLogin = async (event) => {
    event.preventDefault()

    try 
    {
      const user = await loginService.login({
        username, password
      })
      console.log(user)
      setCurrUser(user)
      setUsername('')
      setPassword('')
    } catch (exp) {
      setInfoMessage("Error")
      setTimeout(() => {
        setInfoMessage(null)
      }, 3000)
    }
  }


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      {(currUser !== null || infoMessage !== null) && <NotificationBar fullname={currUser.name} type={infoMessage} blogname={null} author={null}/>}
      {currUser === null && 
      <LoginForm loginFunction={handleLogin} usernameFunction={setUsername} passwordFunction={setPassword}/>}
      {currUser !== null &&
      blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>)}
    </div>
  )
}

export default App