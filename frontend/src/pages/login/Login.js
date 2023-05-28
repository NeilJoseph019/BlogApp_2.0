import React from 'react'
import { Card, Form, FloatingLabel, Button } from 'react-bootstrap'

const Login = () => {

    const  onSubmitHandler = (event)=>{
        event.preventDefault()
    }

  return (
    <div>
        <section style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
            <h3> Welcome to the registeration page</h3>
        </section>
        <section style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Card
            border="dark"
            bg='secondary'
            text='dark'
            style={{marginTop:'3rem', padding:'2rem', width:"35rem"}}
            >
                <Form onSubmit={onSubmitHandler}>
                    
                    <FloatingLabel
                        label="User Name"
                        style={{width:"30rem"}}
                    >
                        <Form.Control type="text" placeholder="John" />
                    </FloatingLabel>

                    <FloatingLabel
                        label="Password"
                        style={{marginTop:"2rem", width:"30rem"}}
                    >
                        <Form.Control type="password" placeholder='324kwewj34@' />
                    </FloatingLabel>

                   

                    <Button variant="dark" style={{marginTop:"2rem", marginLeft:'11.5rem', width:'8rem'}}>Submit</Button>

                </Form>
            </Card>

        </section>
    </div>
  )
}

export default Login