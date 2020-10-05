import React from 'react'

const LoginForm = ({loginFunction}) => {



return(
<div>
    <h2>Insert credentials to log in</h2>
    <form onSubmit={loginFunction}>
        <div>
            <div>
                <label>Username</label>
                <input type="text" placeholder="Input your username"></input>
            </div>
            <div>
                <label>Password</label>
                <input type="text" placeholder="Input your password"></input>
            </div>
            <button type="submit">Login</button>
        </div>
    </form>
</div>)
}

export default LoginForm