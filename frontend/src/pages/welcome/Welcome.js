import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {

  const navigate = useNavigate()

  const loginHandler = ()=>{
    navigate('/login')
  }

  const registerHandler = ()=>{
    navigate('/register')
  }

  return (
    <div >
      <section style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
        <h3>Welcome</h3>
      </section>
      <section style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Card
        border="dark"
        bg='secondary'
        text='light'
        style={{marginTop:'3rem'}}
        >
          <Card.Header>Sign-in to use the app</Card.Header>
          <Card.Body>
            <Button variant='light' onClick={loginHandler}> Sign-in </Button>
            <Button variant='light' style={{marginLeft:'3rem'}} onClick={registerHandler}> Register </Button>
          </Card.Body>
        </Card>
      </section>
    </div>
  )
}

export default Welcome