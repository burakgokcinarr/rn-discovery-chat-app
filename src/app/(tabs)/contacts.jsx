import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { userLogOut } from '../../api/Api'
import { logout } from '../../redux/slices/authSlice'
import { useDispatch } from 'react-redux'
import { router, useNavigation } from 'expo-router'

export default function contacts() {

  const navigation = useNavigation();
  const dispatch   = useDispatch();

  const logoutUser = async() => {
    const error = await userLogOut()
    if (!error) {
      dispatch(logout());
      router.replace("(auth)/signin")
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => alert('This is a button!')}
          title="Info"
          color="red"
        />
      ),
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text>contacts</Text>
      <Button
        title='Log Out'
        onPress={logoutUser}
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