import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.user = action.payload
    },
    logout: (state, action) => {
        state.user   = null;
    },
  },
})

export const { setSession, logout } = authSlice.actions

export default authSlice.reducer