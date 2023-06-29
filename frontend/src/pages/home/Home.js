import axios from 'axios'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useSelector } from 'react-redux'


import { Card, Form, InputGroup, Button } from 'react-bootstrap'

import AllPosts from '../../components/allPostsComponent/AllPosts'
import { Link } from 'react-router-dom'

const Home = () => {

  const {access} = useSelector(state => state.tokens)
  const [user, setUser] = useState({})
  const [postData, setPostData] = useState({post_description: '', post_image: null })
  const [fetchAllPosts, setFetchAllPosts] = useState([])


  const fileFieldRef = useRef(null)

  useEffect(()=>{

    const fetchUserDetails = async() => {

      try{

        const config = {
          headers : {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${access}`
          }
        }

        const response = await axios.get('api/users/details/', config)
        if (response.status === 200){
          setUser(response.data[0])
        }
      }
      catch(error){
        console.log(error.message)
      }

    }

    fetchUserDetails()
      
  },[access])

  const fetchPosts = useCallback( async()=>{
    const config = {
      headers: {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${access}`
      }
    }

    try{
      const response = await axios.get('api/posts/', config)
      setFetchAllPosts(response.data)
    }
    catch(error){
      console.log(error.message)
    }
  },[access])


  useEffect(()=>{

    fetchPosts()
    
  },[access, fetchPosts])

  const onPostHandler = (event)=>{
      event.preventDefault()

      // For multiple images

      // const images = {}

      // if (postData.post_image){
      //   for (let i=0; i < (postData.post_image.length); i++){
      //     images[postData.post_image[i].name] = postData.post_image[i]
      //   }
      // }

      // OR

      // if (postData.post_image){
      //   // const imageFiles = Array.from(postData.post_image)
      // }

      //   // The Array.from() method can also be used to create a 
      //   // new array from other data structures, such as strings, 
      //   // sets, maps, or array-like objects. By passing an iterable object 
      //   // or an array-like object as an argument to Array.from(), 
      //   // you can create a new array with the same elements as the source object.


      //   console.log('uploaded Images: ' ,images)
      // }

      // console.log('uploaded Images: ' ,images)

      const dataUploaded = {
        'description' : postData.post_description,
        'post_image' : (postData.post_image ? postData.post_image[0] : " " )
        
      }

      const sendPostData = async()=>{

        const config = {
          headers : {
            'Content-Type' : 'multipart/form-data',
            'Authorization' : `Bearer ${access}`
          }
        }

        try{

          const response = await axios.post('api/posts/create_new_post/', dataUploaded, config)

          if (response.status === 200){

              setPostData({post_description: '', post_image: null })

              if (fileFieldRef.current){
                fileFieldRef.current.value = ''
              }

              fetchPosts()
          } 
        }
        catch(error){
          console.log(error.message)
        }

      }
      
      sendPostData()
  }
  
  return (
    <div>
      <section style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Card
        bg='dark'
        text='light' 
        style={{width:'40rem', marginTop:'3rem'}}>
          <Card.Body>
            <h3>Hi, {user.first_name}</h3>
            <h5>Email: {user.email}</h5>
            <Link to={'/user_posts'}>
              <Button variant="light">Your Posts</Button>
            </Link>
          </Card.Body>
        </Card>
      </section>
      <section style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Card
        border='dark'
        bg='light'
        text='dark' 
        style={{width:'35rem', marginTop:'3rem'}}>
          <Card.Body>
            <Card.Text>
              Write your mind:
            </Card.Text>
            <Form onSubmit={onPostHandler}>
              <InputGroup className="mb-3" border="dark">
                <Button 
                type='submit' 
                variant="outline-secondary" 
                >
                  Post
                </Button>
                <Form.Control
                  as="textarea" 
                  required
                  value={postData.post_description}
                  onChange={(e)=> setPostData({...postData, post_description : e.target.value})}
                />
              </InputGroup>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control 
                type="file" 
                // multiple 
                ref={fileFieldRef} 
                onChange={(e)=> setPostData({...postData, post_image : e.target.files})}/>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </section>
      
      <section style={{ display:'flex', justifyContent:'center', alignItems:'center', marginBottom:'3rem'}}>
        <Card
        border='dark'
        bg='secondary'
        text='light' 
        style={{width:'35rem', marginTop:'3rem'}}
        >
          <Card.Header>
            <h5>
              posts:
            </h5>
          </Card.Header>
          <Card.Body>
            <div>
              {
                fetchAllPosts.map((posts)=>{

                  return (
                  <AllPosts key={posts.id} posts ={posts} />
                  )
                })
              }
            </div>
          </Card.Body>
        </Card>
      </section>
    </div>
  )
}

export default Home