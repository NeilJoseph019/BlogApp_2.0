import React from 'react'
import { Card } from 'react-bootstrap'

const AllPosts = (props) => {

    const postData = props.posts
    
    const formatDate = (dateString) =>{
        const date = new Date(dateString)
        const options = { day: 'numeric', month: 'short', year: 'numeric' }
        return date.toLocaleDateString('en-IE', options)
      }

    const post_details = {
                    
        user_name : postData.user,
        timestamp : formatDate(postData.timestamp),
        description : postData.description,
        image: postData.post_image
      }

  return (

    <Card
    key={postData.id}
    border='dark'
    bg='light'
    text='dark' 
    style={{width:'33rem', marginTop:'1rem'}}>
        <Card.Header>
        <div style={{ display:'flex', justifyContent: 'space-between'}}>
            <p>{post_details.user_name}</p> <p>{post_details.timestamp}</p>
        </div>
        </Card.Header>
        <Card.Body>
        <Card.Text>
            {post_details.description}
        </Card.Text>
        {
            (post_details.image !== null) && (
            <img 
            src={post_details.image} 
            alt='post media' 
            style={{width: "30rem", height: "30rem"}}></img>
            )

        }
        
        <div style={{ display:'flex', justifyContent: 'space-around'}}>
            <div>
            <p>Comment - 12</p>
            </div>
        </div>
        </Card.Body>
    </Card>
  )
}

export default AllPosts