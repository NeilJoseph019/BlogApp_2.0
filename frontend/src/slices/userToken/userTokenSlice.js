import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  access : '',
  refresh : ''
}

export const userTokenSlice = createSlice({
    name: 'userTokens',
    initialState,
    reducers: {
      accessToken : (state, action)=>{
        state.access = action.payload
      },
      refreshToken : (state, action)=>{
        state.refresh = action.payload
      }

    },
  })
  

export const { accessToken, refreshToken } = userTokenSlice.actions
  
export default userTokenSlice.reducer