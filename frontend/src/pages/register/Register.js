import React from 'react'
import { Card, Form, FloatingLabel, Button } from 'react-bootstrap'

const Register = () => {

    const onSubmitHandler = (event)=>{
        event.preventDefault()
    }

  return (
    <div >
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
                        label="First Name"
                        style={{width:"20rem"}}
                    >
                        <Form.Control type="text" placeholder="John" />
                    </FloatingLabel>

                    <FloatingLabel
                        label="Last Name"
                        style={{marginTop:"2rem", width:"20rem"}}
                    >
                        <Form.Control type="text" placeholder="Doe" />
                    </FloatingLabel>

                    <FloatingLabel
                        label="Email Address"
                        style={{marginTop:"2rem", width:"25rem"}}
                    >
                        <Form.Control type="email" placeholder="johnDoe@email.com" />
                    </FloatingLabel>

                    <FloatingLabel
                        label="Password"
                        style={{marginTop:"2rem", width:"20rem"}}
                    >
                        <Form.Control type="password" placeholder='324kwewj34@' />
                    </FloatingLabel>

                    <FloatingLabel
                        label="Confirm Password"
                        style={{marginTop:"2rem", width:"20rem"}}
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

export default Register