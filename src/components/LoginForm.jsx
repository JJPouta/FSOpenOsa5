import React from 'react'

const LoginForm = ({loginFunction,usernameFunction,passwordFunction}) => {

  
return(
<div>
    <h2>Insert credentials to log in</h2>
    <form onSubmit={loginFunction}>
        <div>
            <div style={{margin: '10px'}}>
                <label style={{display: 'inline-block',width:'100px'}}>Username</label>
                <input onChange={({ target }) => usernameFunction(target.value)} type="text" placeholder="Input your username"></input>
            </div>
            <div style={{margin: '10px'}}>
                <label style={{display: 'inline-block',width:'100px'}}>Password</label>
                <input onChange={({ target }) => passwordFunction(target.value)} type="text" placeholder="Input your password"></input>
            </div>
            <button style={{width:'80px',backgroundColor: 'blue',color:'white'}} type="submit">Login</button>
        </div>
    </form>
</div>)
}

export default LoginForm