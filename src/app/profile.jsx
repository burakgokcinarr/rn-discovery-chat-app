import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { userLogOut } from '../api/Api'
import { router } from 'expo-router'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/slices/authSlice'

export default function profile() {

  const dispatch = useDispatch();

  const logoutUser = async() => {
    const error = await userLogOut()
    if (!error) {
      dispatch(logout());
      router.replace("(auth)/signin")
    }
  }

  return (
    <View>
      <Button
        title='Log Out'
        onPress={logoutUser}
      />
    </View>
  )
}

const styles = StyleSheet.create({})