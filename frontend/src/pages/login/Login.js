import axios from 'axios'
import React, { useState } from 'react'
import { Card, Form, FloatingLabel, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'

import { useDispatch } from 'react-redux'
import { accessToken, refreshToken } from '../../slices/userToken/userTokenSlice'

const Login = () => {

    const [loginDetails, setLoginDetails] = useState({username: '', password: ''})

 
    const dispatch = useDispatch()
    
    const navigate = useNavigate()

    const  onSubmitHandler = async(event)=>{
        event.preventDefault()

        try{

            const config = {
                headers :{
                    'Content-Type' : 'application/json'
                }
            }

            const response = await axios.post('api/users/token/', loginDetails, config)
            if (response.status === 200){
                dispatch(accessToken(response.data.access))
                dispatch(refreshToken(response.data.refresh))
                navigate('/home')
            }
        }
        catch(error){
            console.log(error.message)
            navigate('/')
        }
        
    }
    

  return (
    <div>
        <section style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
            <h3> Welcome to the login page</h3>
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
                        <Form.Control 
                        type="text" 
                        placeholder="John"
                        value={loginDetails.username} 
                        onChange={(e)=>setLoginDetails({...loginDetails, username: e.target.value})}
                        />
                    </FloatingLabel>

                    <FloatingLabel
                        label="Password"
                        style={{marginTop:"2rem", width:"30rem"}}
                    >
                        <Form.Control 
                        type="password" 
                        placeholder='324kwewj34@' 
                        value={loginDetails.password}
                        onChange={(e)=>setLoginDetails({...loginDetails, password: e.target.value})}
                        />
                    </FloatingLabel>

                   

                    <Button 
                    type="submit"
                    variant="dark" 
                    style={{marginTop:"2rem", marginLeft:'11.5rem', width:'8rem'}}
                    >
                    Submit</Button>

                </Form>
            </Card>

        </section>
    </div>
  )
}

export default Login