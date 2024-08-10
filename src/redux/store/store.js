import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../slices/authSlice'
import chatTheme  from '../slices/chatTheme'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    chatTheme: chatTheme
  },
})
