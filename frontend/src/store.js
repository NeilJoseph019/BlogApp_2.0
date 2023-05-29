import { configureStore } from '@reduxjs/toolkit'
import userTokenReducer from './slices/userToken/userTokenSlice'

const store = configureStore({
  reducer: {
    tokens : userTokenReducer,
  },
})

export default store