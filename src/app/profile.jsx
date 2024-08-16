import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { userLogOut } from '../api/Api'
import { router, useNavigation } from 'expo-router'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/slices/authSlice'
import { CustomButton } from '../components'
import { X } from 'lucide-react-native'
import { Font } from '../constants'
import { setChatBubble } from '../redux/slices/chatTheme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTranslation } from 'react-i18next'

const { width } = Dimensions.get('window');

const flags = [
  { component: "Turkey", lang: "tr", name: "Turkey" },
  { component: "USA", lang: "en", name: "English" },
  { component: "German", lang: "de", name: "German" },
  { component: "Brasil", lang: "pt", name: "Brasil" },
  { component: "China", lang: "zh", name: "China" }
  
];

export default function profile() {

  const scrollViewRef   = useRef(null);
  const { t, i18n }     = useTranslation()
  const currentLanguage = i18n.language
  const dispatch        = useDispatch()
  const navigation      = useNavigation()
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

  useEffect(() => {
    if (selectedColor !== null) {
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: colors.indexOf(selectedColor) * (width/5), // Adjust according to item width
          animated: true,
        });
      }, 0);
    }
  }, [selectedColor]);

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

  const chatBubbleThemeSelect = async(color, index) => {
    setSelectedColor(color);
    scrollViewRef.current?.scrollTo({
      x: index * (width/5),
      animated: true,
    });
    try {
      await AsyncStorage.setItem('bubble', color)
      dispatch(setChatBubble(color))
    } catch (e) {
      console.log(e)
    }
  }

  const changeLanguage = async (lang) => {
    await AsyncStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
  };

  return (
    <View style={styles.container}>
      <View style={{gap: 5}}>
        <Text style={styles.emailText}>{t("profile.theme")}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled ref={scrollViewRef}>
          {colors.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.colorBox,
                { backgroundColor: color },
                selectedColor === color && styles.selectedColorBox
              ]}
              onPress={() => chatBubbleThemeSelect(color, index)}
            />
          ))}
        </ScrollView>
      </View>
      <View style={{gap: 5, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.text}>{t('language')}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled>
          {flags.map(({ lang, name }) => (
            <TouchableOpacity
              key={name}
              onPress={() => changeLanguage(lang)}
              style={[
                styles.flag,
                currentLanguage === lang && styles.activeFlag,
                currentLanguage !== lang && styles.inactiveFlag,
              ]}
            >
              <Text style={styles.text}>{t(`profile.${lang}`)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <CustomButton
        title={t("logout.logout")}
        onPressed={logoutUser}
        customStyle={{backgroundColor: 'red', marginBottom: 50, alignSelf: 'center', marginTop: 15}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: '#000000',
    textAlign: 'center'
  },
  colorBox: {
    width: width/5,
    height: width/5,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 5,
    borderColor: 'transparent',
    margin: 10
  },
  selectedColorBox: {
    borderColor: 'black',
  },
  flagsContainer: {
    flexDirection: "row"
  },
  flag: {
    paddingHorizontal: 10,
  },
  activeFlag: {
    opacity: 1,
    borderWidth: 1,
    padding: 3,
    borderRadius: 8
  },
  inactiveFlag: {
    opacity: 0.5,
  },
  text: {
    fontFamily: Font.medium,
    fontSize: 16,
    color: '#000000',
    textAlign: 'center'
  },
})