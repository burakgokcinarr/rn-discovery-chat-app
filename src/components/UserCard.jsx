import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { Font } from '../constants'
import { router } from 'expo-router'

// componentType ===> 1 : Contacts, 2: Chats

export default function UserCard({ componentType = 1, userInfo = null, lastSeenDateTime = null, lastMessage = "", lastMessageCount = 0 }) {
    
    return (
        <TouchableOpacity onPress={() => router.push({pathname: `chats/${userInfo.useruuid}`, params: {user: JSON.stringify(userInfo)}})}>
            <View style={styles.container}>
                <View style={styles.userInfo}>
                    <Image
                        style={styles.photo}
                        source={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 30) + 1}.jpg`}
                        contentFit="cover"
                    />
                    <View>
                        <Text style={styles.title}>{userInfo.username}</Text>
                        {
                            componentType === 1 
                            ? (
                                <Text style={styles.lastSeenText}>last seen recently</Text>
                            )
                            : (
                                <Text style={styles.lastSeenText}>{lastMessage}</Text>
                            )
                        }
                    </View>
                </View>
                <View style={styles.timeView}>
                    {
                        componentType === 1 
                        ? (
                            <Text style={styles.timeMessage}>Message</Text>
                        ) 
                        : (
                            <Text style={styles.time}>2 min ago</Text>
                        )
                    }
                    {
                        componentType === 2 && (
                            <View style={styles.notification}>
                                <Text style={styles.notificationText}>{lastMessageCount}</Text>
                            </View>
                        )
                    }
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.7,
        borderBottomColor: '#BDBDBD',
        padding: 10
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    photo: {
        width:42,
        height:42,
        borderRadius: 21
    },
    title: {
        fontSize: 14,
        fontFamily: Font.bold,
        color: '#262626'
    },
    lastSeenText: {
        fontSize: 10,
        fontFamily: Font.regular,
        color: '#BDBDBD'
    },
    timeView: {
        alignItems: 'center'
    },
    timeMessage: {
        fontSize: 10,
        fontFamily: Font.medium,
        color: '#FF9134'
    },
    time: {
        fontSize: 10,
        fontFamily: Font.medium,
        color: '#D4D4D4'
    },
    notification: {
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF7841',
        width: 20,
        height: 20,
        borderRadius: 10
    },
    notificationText: {
        fontSize: 8,
        fontFamily: Font.medium,
        color: '#FFFFFF'
    }
})