import React, {useState} from 'react'



const Blog = ({ blog,updateBlog,removeBlogById}) => {

  const [visible,setVisible] = useState(false)
  

  const largeBlogHidden = { display: visible ? 'none' : '',border: 'solid 1px purple',padding: '2px',marginTop:'5px' }
  const largeBlogVisible = { display: visible ? '' : 'none',border: 'solid 1px purple',padding: '2px',marginTop:'5px'}

  const changeBlockVisibility = () => {
    setVisible(!visible)
  }
  
  const blogRemoval = () => {

    const remove = window.confirm(`Remove blog: ${blog.title} by ${blog.author}`)
    
    if(remove)
    {
      removeBlogById(blog.id)
    }
  }

  return(
    <div>
      <div style={largeBlogHidden} className='BlogInfo'>
        <p><b>Aihe:</b>{blog.title} <b>Kirjoittaja:</b> {blog.author} <button className='ViewBtns' onClick={changeBlockVisibility}>View</button></p>
      </div>
      <div style={largeBlogVisible} className='LargeBlogInfo'>
        <p><b>Aihe:</b>{blog.title} <button className='HideBtns' onClick={changeBlockVisibility}>Hide</button></p>
        <p><b>URL:</b>{blog.url}</p>
        <p className='LikeRows'><b>Tykkäykset:</b>{blog.likes}<button onClick={() => updateBlog(blog)} className='LikeBtns'>Like</button></p>
        <p><b>Kirjoittaja:</b>{blog.author}</p>
        <p><button className='RemoveBtns' onClick={blogRemoval}>Remove</button></p>
      </div>  
    </div>)
}
  
  


export default Blog
