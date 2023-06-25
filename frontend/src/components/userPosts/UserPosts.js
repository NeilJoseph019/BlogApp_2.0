import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, Modal, Form, InputGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import axios from 'axios'

const UserPosts = () => {

    const {access} = useSelector(state=> state.tokens)

    const [userPostsData, setUserPostsData] = useState([])
    const [showEditModal, setShowEditModal] = useState(false);


    const dateFormat = (dateString)=>{
        const date = new Date(dateString)
        const options = { day: 'numeric', month: 'short', year: 'numeric' }
        return date.toLocaleDateString('en-IE', options)
    }


    useEffect(()=>{

        const fetchUserPosts = async()=>{

            const config = {
                headers :{
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${access}`
                }
            }

            try{

                const response = await axios.get('/api/posts/user_posts/', config)
                setUserPostsData(response.data)
            }
            catch(error){
                console.log(error.message)
            }
        }
        fetchUserPosts()
    },[access])

    const handleClose = () => setShowEditModal(false);

    const onUpdateHandler = (e)=>{
        e.preventDefault()
    }

  return (
    <div>
        <section style={{ margin:'2rem'}}>
            <Link to='/home'>
                <Button variant="outline-dark" > Back </Button>
            </Link>
        </section>
        <section style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Card
            border='dark'
            bg='secondary'
            text='light' 
            style={{width:'35rem', marginTop:'3rem'}}
            >
                <Card.Header>
                <h5>
                    Your posts:
                </h5>
                </Card.Header>
                <Card.Body>
                
                    <div>
                        {
                            userPostsData.map(post=>{

                                const post_details = {
                                    timestamp : dateFormat(post.timestamp),
                                    description : post.description,
                                    image: post.post_image
                                  }

                                return(
                                    <Card
                                    key={post.id}
                                    border='dark'
                                    bg='light'
                                    text='dark' 
                                    style={{width:'33rem', marginTop:'1rem'}}>
                                    <Card.Header>
                                        <div style={{ display:'flex', justifyContent: 'center'}}>
                                            <p>{post_details.timestamp}</p>
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Text>
                                        {post_details.description}
                                        </Card.Text>
                                        {
                                            (post_details.image !==null) && (
                                                <div>
                                                    <img 
                                                    src={post_details.image} 
                                                    alt='post media' 
                                                    style={{width: "30rem", height: "30rem"}} /> 
                                                </div>
                                            )
                                        }
                                        <Button 
                                        variant="primary" 
                                        style={{marginTop:'2rem'}}
                                        onClick={() => setShowEditModal(true)}
                                        >
                                            Edit
                                        </Button>

                                        <Modal 
                                        show={showEditModal} 
                                        onHide={handleClose} 
                                        animation={false} 
                                        backdrop="static"
                                        keyboard={false}    
                                        centered
                                        >
                                            <Modal.Header closeButton>
                                            <Modal.Title>Edit post</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form onSubmit={onUpdateHandler}>
                                                    <InputGroup className="mb-3" border="dark">
                                                        <Button 
                                                        type='submit' 
                                                        variant="outline-secondary" 
                                                        >
                                                        Post
                                                        </Button>
                                                        <Form.Control
                                                        as="textarea"
                                                        placeholder={post_details.description}
                                                        // value={}
                                                        // onChange={}
                                                        />
                                                    </InputGroup>
                                                    <Form.Group controlId="formFile" className="mb-3">
                                                        <Form.Label>Upload Image</Form.Label>
                                                        <Form.Control 
                                                        type="file" 
                                                        multiple 
                                                        // onChange={}
                                                        />
                                                    </Form.Group>
                                                </Form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                            
                                            <Button variant="primary" onClick={(handleClose)}>
                                                Save Changes
                                            </Button>
                                            </Modal.Footer>
                                        </Modal>
                                        <div style={{ display:'flex', justifyContent: 'space-around'}}>
                                        <div>
                                            <p>Comment - 23</p>
                                        </div>
                                        </div>
                                    </Card.Body>
                                    </Card>
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

export default UserPosts