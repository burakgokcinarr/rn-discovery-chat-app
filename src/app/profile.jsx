import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { userLogOut } from '../api/Api'
import { router, useNavigation } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/slices/authSlice'
import { CustomButton } from '../components'
import { X } from 'lucide-react-native'
import { Font } from '../constants'
import { setChatBubble } from '../redux/slices/chatTheme'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { width } = Dimensions.get('window');

export default function profile() {

  const dispatch    = useDispatch()
  const navigation  = useNavigation()
  const userInfo    = useSelector((state) => state.auth.user)
  const [selectedColor, setSelectedColor] = useState("#FF9134");
  
  const colors = [
    '#FF9134', '#33FF57', '#3357FF', '#FF33A1', '#33FFA1', '#A133FF', 
    '#FFAA33', '#33AAFF', '#fcba03', '#d7fc03', '#5afc03', '#33FF33', 
    '#FF5733', '#3333FF', '#33FFA1', '#FF33FF', '#5733FF', '#AA33FF',
    '#FF33AA', '#33FFAA'
  ];
  
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
          <TouchableOpacity style={styles.headerLeftView} onPress={() => router.canGoBack() && router.back()}>
              <X size="30" color="#A3A3A3" />
          </TouchableOpacity>
      ),
    })

    getChatBubbleColor();
  }, [])

  const getChatBubbleColor = async() => {
    try {
      const value = await AsyncStorage.getItem('bubble');
      if (value !== null) {
        setSelectedColor(value)
      }
    } catch (e) {
      // error reading value
    }
  }

  const logoutUser = async() => {
    const error = await userLogOut()
    if (!error) {
      dispatch(logout());
      router.replace("(auth)/signin")
    }
  }

  const chatBubbleThemeSelect = async(color) => {
    setSelectedColor(color)
    try {
      await AsyncStorage.setItem('bubble', color)
      dispatch(setChatBubble(color))
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.emailText}>Message Bubble Color Theme</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {colors.map((color, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.colorBox,
              { backgroundColor: color },
              selectedColor === color && styles.selectedColorBox
            ]}
            onPress={() => chatBubbleThemeSelect(color)}
          />
        ))}
      </ScrollView>
      <Text style={styles.emailText}>{userInfo?.email}</Text>
      <CustomButton
        title={`Logout`}
        onPressed={logoutUser}
        customStyle={{backgroundColor: 'red', marginBottom: 50}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 10,
    gap: 10
  },
  headerLeftView: {
    backgroundColor: "#FAFAFA",
    borderRadius: 5,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emailText: {
    fontFamily: Font.medium,
    fontSize: 16,
    color: '#000000'
  },
  colorBox: {
    width: width/4,
    height: width/4,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 5,
    borderColor: 'transparent',
    margin: 10
  },
  selectedColorBox: {
    borderColor: 'black', // Highlight the selected color with a border
  },
})