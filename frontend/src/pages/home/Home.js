import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Home = () => {

  const {access} = useSelector(state => state.tokens)
  const [user, setUser] = useState({})

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
  
  return (
    <div>
      <h3>Hi, {user.first_name}</h3>
      <h5>Email: {user.email}</h5>
    </div>
  )
}

export default Home