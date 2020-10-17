import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({loginFunction,usernameFunction,passwordFunction}) => {

  LoginForm.propTypes = {
    loginFunction: PropTypes.func.isRequired,
    usernameFunction: PropTypes.func.isRequired,
    passwordFunction: PropTypes.func.isRequired
  }
    
  return(
    <div>
      <h2>Insert credentials to log in</h2>
      <form onSubmit={loginFunction}>
        <div>
          <div style={{margin: '10px'}}>
            <label style={{display: 'inline-block',width:'100px'}}>Username</label>
            <input id='unameInput' onChange={({ target }) => usernameFunction(target.value)} type="text" placeholder="Input your username"></input>
          </div>
          <div style={{margin: '10px'}}>
            <label style={{display: 'inline-block',width:'100px'}}>Password</label>
            <input id='pwdInput' onChange={({ target }) => passwordFunction(target.value)} type="text" placeholder="Input your password"></input>
          </div>
          <button id='loginBtn' style={{width:'80px',backgroundColor: 'blue',color:'white'}} type="submit">Login</button>
        </div>
      </form>
    </div>)
}

export default LoginForm