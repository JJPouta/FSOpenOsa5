import React, {useState} from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog }) => {

  const [visible,setVisible] = useState(false)
  const [updatedBlog,setUpdatedBlog] = useState(blog)

  const largeBlogHidden = { display: visible ? 'none' : '',border: 'solid 1px purple',padding: '2px',marginTop:'5px' }
  const largeBlogVisible = { display: visible ? '' : 'none',border: 'solid 1px purple',padding: '2px',marginTop:'5px'}

  const changeBlockVisibility = () => {
    setVisible(!visible)
  }
  const updateBlog = async () => {

    // Tuleeko käyttäjän objekti user objektista vai onko se merkkijono
    const user = blog.user.id
    
    const newBlogContent = {...blog,
      likes: updatedBlog.likes += 1,
      user: user
    }
    
    await blogService.updateBlog(updatedBlog.id,newBlogContent)
   
    setUpdatedBlog({...newBlogContent})
    
  }


  return(
    <div>
      <div style={largeBlogHidden} className='BlogInfo'>
        <p><b>Aihe:</b>{blog.title} <b>Kirjoittaja:</b> {blog.author} <button className='ViewBtns' onClick={changeBlockVisibility}>View</button></p>
      </div>
      <div style={largeBlogVisible} className='LargeBlogInfo'>
        <p><b>Aihe:</b>{blog.title} <button className='HideBtns' onClick={changeBlockVisibility}>Hide</button></p>
        <p><b>URL:</b>{blog.url}</p>
        <p><b>Tykkäykset:</b>{blog.likes}<button onClick={updateBlog} className='LikeBtns'>Like</button></p>
        <p><b>Kirjoittaja:</b>{blog.author}</p>
      </div>  
    </div>)
}
  
  


export default Blog
