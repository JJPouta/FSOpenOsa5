import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent } from '@testing-library/react'
import Blog from './Blog'



const blogObject = {
  title: 'TestBlogObject',
  author: 'Testman 44',
  url: 'www.test.nz',
  likes: 4455,
  user: {id: '5555s'}
}

//5.13
test('blogcontent tests, must contain', () => {
  

  const component = render(
    <Blog blog={blogObject} />
  )

  const smallBlogBlock = component.container.querySelector('.BlogInfo')
  // Nämä pitää olla
  expect(smallBlogBlock).toHaveTextContent('TestBlogObject')
  expect(smallBlogBlock).toHaveTextContent('Testman 44')
  
})


// // 5.13
test('blogcontent tests: must not contain -> fail', () => {
  
  const component = render(
    <Blog blog={blogObject} />
  )

  const smallBlogBlock = component.container.querySelector('.BlogInfo')

  // Näitä ei saa olla
  expect(smallBlogBlock).toHaveTextContent('www.test.nz')
  expect(smallBlogBlock).toHaveTextContent('4455')
  
})
  
// // 5.14
test('button click for full Blog info', () => {


  const component = render(
    <Blog blog={blogObject}/>)

  const button = component.getByText('View')
  fireEvent.click(button)

  const LargeBlogBlock = component.container.querySelector('.LargeBlogInfo')

  expect(LargeBlogBlock).toHaveTextContent('www.test.nz')
  expect(LargeBlogBlock).toHaveTextContent('4455')
})

//5.15
test('button click for full Blog info', async () => {

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blogObject} updateBlog={mockHandler}/>)

    
  const button = component.getByText('Like')
  fireEvent.click(button)
  fireEvent.click(button)
  
  expect(mockHandler.mock.calls).toHaveLength(2)
})
