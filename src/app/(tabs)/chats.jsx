import { Button, StyleSheet, FlatList, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from 'expo-router'
import { readData } from '../../api/Api'
import { UserCard } from '../../components'
import { CustomAlert } from '../../utility/CustomAlert'

export default function chats() {

  const navigation = useNavigation();
  const dispatch   = useDispatch();
  const userInfo   = useSelector((state) => state.auth.user)
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    allChatsData(); 
  }, [])

  const allChatsData = async() => {
    const filter = [ { type: 'or', value: `sender_id.eq.${userInfo.id},receiver_id.eq.${userInfo.id}`} ]

    const { data, error } = await readData("tbl_Messages", "*", filter)
    
    if (error) return CustomAlert(false, "DANGER", "Error", error.code + " - " + error.message, "Ok", 2000)

    if (data) {
      const filter = [ { type: 'or', value: `useruuid.eq.${data[0].sender_id},useruuid.eq.${data[0].receiver_id}`} ]

      const { data, error } = await readData("tbl_User", "*", filter)
      console.log(data)
      if (data) {
        setChatList(data)
      }
  
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={chatList}
        renderItem={({item}) => <UserCard componentType={2} userInfo={item} />}
        keyExtractor={item => item.id}
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