import { StyleSheet, FlatList, View, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from 'expo-router'
import { readData } from '../../api/Api'
import { UserCard } from '../../components'

export default function contacts() {

  const navigation = useNavigation();
  const dispatch   = useDispatch();
  const userInfo   = useSelector((state) => state.auth.user)
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    allUserData(); 
  }, [])

  const allUserData = async() => {
    try {
      const filter = [{ type: 'neq', column: 'useruuid', value: userInfo.id }]
      const {data} = await readData("tbl_User", "*", filter)
      setUserList(data);
    } catch (error) {
      console.log("error = ", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#FF9134"/>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={userList}
        renderItem={({item}) => <UserCard componentType={1} userInfo={item} />}
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