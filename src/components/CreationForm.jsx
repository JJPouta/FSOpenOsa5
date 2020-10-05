import React from 'react'


const BlogCreatorForm = ({blogCreateFunction,changeValue}) => {

return(
<div>
    <h3 style={{color: 'purple'}}>Create New Blog</h3>
    <form onSubmit={blogCreateFunction}>
        <div>
            <div style={{margin: '10px'}}>
                <label style={{display: 'inline-block',width:'100px'}}>Title</label>
                <input onChange={({ target }) => changeValue(target.value,target.id)} id="newBlogTitle" type="text"></input>
            </div>
            <div style={{margin: '10px'}}>
                <label style={{display: 'inline-block',width:'100px'}}>Author</label>
                <input onChange={({ target }) => changeValue(target.value,target.id)} id="newBlogAuthor" type="text"></input>
            </div>
            <div style={{margin: '10px'}}>
                <label style={{display: 'inline-block',width:'100px'}}>URL</label>
                <input onChange={({ target }) => changeValue(target.value,target.id)} id="newBlogURL" type="text"></input>
            </div>
            <button style={{width:'80px',backgroundColor: 'green',color:'white'}} type="submit">Create</button>
        </div>
    </form>
</div>)


}

export default BlogCreatorForm