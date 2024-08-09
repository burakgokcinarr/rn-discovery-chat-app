import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    chatBubble: '#FF9134',
}

export const chatTheme = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setChatBubble: (state, action) => {
            state.chatBubble = action.payload
        }
    }
})

export const { setChatBubble } = chatTheme.actions

export default chatTheme.reducer