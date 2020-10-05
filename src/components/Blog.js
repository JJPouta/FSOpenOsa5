import React from 'react'
const Blog = ({ blog }) => (
  <div>
    <p><b>Blogin aihe:</b>{blog.title} <b>Kirjoittaja:</b> {blog.author}</p>
  </div>
)

export default Blog
