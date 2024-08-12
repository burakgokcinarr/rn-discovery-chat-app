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

    const { data, error } = await readData("tbl_Messages", "sender_id, receiver_id", filter)
  
    if (error) return CustomAlert(false, "DANGER", "Error", error.code + " - " + error.message, "Ok", 2000)
    
    if (data) {
      const uniqueUserIds = [...new Set(data.flatMap(message => message.sender_id === userInfo.id ? message.receiver_id : message.sender_id ))];
      //console.log(uniqueUserIds)
      const filter = [ { type: 'in', column: 'useruuid', value: uniqueUserIds} ]

      const { data:users, erro:userError } = await readData("tbl_User", "*", filter)
      //console.log(users)
      if (userError) return CustomAlert(false, "DANGER", "Error", userError.code + " - " + userError.message, "Ok", 2000)

      if (users) setChatList(users)
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