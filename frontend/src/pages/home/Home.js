import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
// import { Link } from 'react-router'

import { Card, Form, InputGroup, Button } from 'react-bootstrap'

import AllPosts from '../../components/allPostsComponent/AllPosts'

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

  useEffect(()=>{

    const fetchPosts = async()=>{
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
    }
    fetchPosts()
    
  },[access])

  const onPostHandler = (event)=>{
      event.preventDefault()

      const formData = new FormData()

      formData.append("post_description", postData.post_description)
      if (postData.post_image){
        for (let i=0; i < (postData.post_image.length); i++){
          formData.append("post_img", [postData.post_image[i]])
        }
        
      }
      
      console.log(formData.get('post_description'))
      console.log(formData.get('post_img'))
      // console.log(formData.get('post_img_1'))

      setPostData({post_description: '', post_image: null })

      if (fileFieldRef.current){
        fileFieldRef.current.value = ''
      }

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
            {/* <Link to=''> */}
              <Button variant="light">Your Posts</Button>
            {/* </Link> */}
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
                  value={postData.post_description}
                  onChange={(e)=> setPostData({...postData, post_description : e.target.value})}
                />
              </InputGroup>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control 
                type="file" 
                multiple 
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
              <Card
              border='dark'
              bg='light'
              text='dark' 
              style={{width:'33rem', marginTop:'1rem'}}>
                <Card.Header>
                  <div style={{ display:'flex', justifyContent: 'space-between'}}>
                    <p>UserName</p> <p>30-May-2023</p>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Card.Title>Special title treatment</Card.Title>
                  <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                  </Card.Text>
                  <Button variant="primary">Edit</Button>
                  <div style={{ display:'flex', justifyContent: 'space-around'}}>
                    <div>
                      <p>Comment - 23</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
            
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