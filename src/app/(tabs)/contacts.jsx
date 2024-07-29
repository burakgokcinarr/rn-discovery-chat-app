import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { userLogOut } from '../../api/Api'

export default function contacts() {

  const logout = async() => {
    const data = await userLogOut()

    console.log(data)
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