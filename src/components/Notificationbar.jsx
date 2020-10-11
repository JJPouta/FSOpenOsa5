
import React from 'react'


const NotificationBar = (props) => {

  if(props.message !== null)
  {
    return(<div>
      {props.message.type === 'Error' && <p style={{color: 'red',border: '1px solid red'}}>Invalid login credentials</p>}
      {props.message.type === 'BlogAdded' && <p style={{color: 'green',border: '1px solid green'}}>A new blog added: {props.message.blog.title} by {props.message.blog.author}</p>}
    </div>)
  }
  else
  {
    return(<div>
      {props.user !== null && <p>User {props.user.name} logged in <button onClick={() => props.logoutfunc()}>Logout</button></p>}
    </div>)
  }
}

export default NotificationBar