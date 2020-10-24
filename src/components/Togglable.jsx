import React, {useState} from 'react'


const Togglable = (props) => {

  const [visible, setVisible] = useState(false)

  const blockHidden = { display: visible ? 'none' : '' }
  const blockVisible = { display: visible ? '' : 'none' }

  const changeBlockVisibility = () => {
    setVisible(!visible)
  }
   
  return(<div>
    <div style={blockHidden}>
      <button id='newBlogBtn' onClick={changeBlockVisibility}>New blog</button>
    </div>
    <div style={blockVisible}>
      {props.children}
      <button onClick={changeBlockVisibility}>Cancel</button>
    </div>
  </div>) 
    
    
}

export default Togglable