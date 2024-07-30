import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { userLogOut } from '../../api/Api'
import { logout } from '../../redux/slices/authSlice'
import { useDispatch } from 'react-redux'

export default function contacts() {

  const dispatch = useDispatch();

  const logout = async() => {
    const error = await userLogOut()
    if (!error) dispatch(logout());
  }

  return (
    <View style={styles.container}>
      <Text>contacts</Text>
      <Button
        title='Log Out'
        onPress={logout}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  }
})