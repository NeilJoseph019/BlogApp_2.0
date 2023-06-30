import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'

import { accessToken } from '../../slices/userToken/userTokenSlice'


const LogoutBtn = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onLogoutHandler = ()=>{
        dispatch(accessToken(''))
        navigate('/')
    
    }


  return (
    <div>
        <Button 
        style={{ marginRight: '2rem'}}
        onClick={onLogoutHandler}
        > Logout </Button>
    </div>
  )
}

export default LogoutBtn