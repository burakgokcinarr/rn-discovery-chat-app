import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from 'expo-router'
import { readData } from '../../api/Api'

export default function contacts() {

  const navigation = useNavigation();
  const dispatch   = useDispatch();
  const userInfo   = useSelector((state) => state.auth.user)

  useEffect(() => {
    allUserData(); 
  }, [])

  const allUserData = async() => {
    const data = await readData("tbl_User", "*", userInfo.id)

    console.log(data)
  }

  return (
    <View style={styles.container}>
      <Text>contacts</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  }
})