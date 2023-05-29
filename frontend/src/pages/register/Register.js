import React, {useReducer} from 'react'
import {useNavigate} from 'react-router-dom'
import { Card, Form, FloatingLabel, Button } from 'react-bootstrap'

import axios from 'axios'

const initialLoginInputState = {
    first_name : '',
    last_name : '',
    username : '',
    email : '',
    password : '',
    confirm_password : ''
}

const loginInputReducer = (state, action) =>{
    if (action.type === "FIRST_NAME"){
        return {
        ...state,
        first_name : action.payload
        }
    }
    if (action.type === "LAST_NAME"){
        return {
        ...state,
        last_name : action.payload
        }
    }
    if (action.type === "USER_NAME"){
        return {
        ...state,
        username : action.payload
        }
    }
    if (action.type === "EMAIL"){
        return {
        ...state,
        email : action.payload
        }
    }
    if (action.type === "PASSWORD"){
        return {
        ...state,
        password : action.payload
        }
    }
    if (action.type === "CONFIRMED_PASSWORD"){
        return {
        ...state,
        confirm_password : action.payload
        }
    }
}


const Register = () => {

    const [loginInputState, dispatchLoginActions] = useReducer(loginInputReducer, initialLoginInputState)

    const navigate = useNavigate()

    const onSubmitHandler = async(event)=>{
        event.preventDefault()

        console.log(loginInputState)

        try{
            const config = {
                headers : {
                    'Content-Type' : 'application/json'
                }
            }

            const response = await axios.post('/api/users/registration/', {...loginInputState}, config)
            console.log(response)
        }
        catch (error){
            console.log(error.message)
        }

        navigate('/')

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
            style={{marginTop:'3rem', marginBottom:'5rem', padding:'2rem', width:"35rem"}}
            >
                <Form onSubmit={onSubmitHandler}>
                    
                    <FloatingLabel
                        label="First Name"
                        style={{width:"20rem"}}
                    >
                        <Form.Control 
                        type="text" 
                        placeholder="John"
                        value={loginInputState.first_name} 
                        onChange={(e)=> {dispatchLoginActions({type: "FIRST_NAME", payload: e.target.value})}}
                        />
                    </FloatingLabel>

                    <FloatingLabel
                        label="Last Name"
                        style={{marginTop:"2rem", width:"20rem"}}
                    >
                        <Form.Control 
                        type="text" 
                        placeholder="Doe" 
                        value={loginInputState.last_name}
                        onChange={(e)=> {dispatchLoginActions({type: "LAST_NAME", payload: e.target.value})}}
                        />
                    </FloatingLabel>

                    <FloatingLabel
                        label="User Name"
                        style={{marginTop:"2rem", width:"20rem"}}
                    >
                        <Form.Control 
                        type="text" 
                        placeholder="Doe" 
                        value={loginInputState.username}
                        onChange={(e)=> {dispatchLoginActions({type: "USER_NAME", payload: e.target.value})}}
                        />
                    </FloatingLabel>

                    <FloatingLabel
                        label="Email Address"
                        style={{marginTop:"2rem", width:"25rem"}}
                    >
                        <Form.Control 
                        type="email" 
                        placeholder="johnDoe@email.com" 
                        value={loginInputState.email}
                        onChange={(e)=> {dispatchLoginActions({type: "EMAIL", payload: e.target.value})}}
                        />
                    </FloatingLabel>

                    <FloatingLabel
                        label="Password"
                        style={{marginTop:"2rem", width:"20rem"}}
                    >
                        <Form.Control 
                        type="password" 
                        placeholder='324kwewj34@' 
                        value={loginInputState.password}
                        onChange={(e)=> {dispatchLoginActions({type: "PASSWORD", payload: e.target.value})}}
                        />
                    </FloatingLabel>

                    <FloatingLabel
                        label="Confirm Password"
                        style={{marginTop:"2rem", width:"20rem"}}
                    >
                        <Form.Control 
                        type="password" 
                        placeholder='324kwewj34@' 
                        value={loginInputState.confirm_password}
                        onChange={(e)=> {dispatchLoginActions({type: "CONFIRMED_PASSWORD", payload: e.target.value})}}
                        />
                    </FloatingLabel>

                    <Button
                    type="submit"
                    variant="dark" 
                    style={{marginTop:"2rem", marginLeft:'11.5rem', width:'8rem'}}
                    >Submit</Button>

                </Form>
            </Card>

        </section>
    </div>
  )
}

export default Register