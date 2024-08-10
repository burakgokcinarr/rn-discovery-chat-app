import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../slices/authSlice'
import chatTheme, { setChatBubble }  from '../slices/chatTheme'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    chatTheme: chatTheme
  },
})


const getAsyncStorage = () => {
  return (dispatch) => {
    AsyncStorage.getItem("bubble")
    .then((result) => {dispatch(setChatBubble(result || "#FF9134"))})
    .catch((er) => console.log("AsyncStorage Error ", er));
  };
};
// Assign the AsyncStorage dataset default slice initiale
store.dispatch(getAsyncStorage());
