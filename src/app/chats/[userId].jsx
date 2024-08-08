import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { ChevronLeft, Video, Phone, Send as SendIcon  } from 'lucide-react-native'
import { Image } from 'expo-image'
import { Font } from '../../constants'
import { useSelector } from 'react-redux'
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import { insertData, readData } from '../../api/Api'
import { CustomAlert } from '../../utility/CustomAlert'
import { supabase } from '../../lib/supabase'

export default function ChatScreen() {

    const navigation        = useNavigation()
    const router            = useRouter()
    const { userId, user }  = useLocalSearchParams()
    const userDetail        = JSON.parse(user)
    const userInfo          = useSelector((state) => state.auth.user)
    const [messages, setMessages] = useState([])
    
    useEffect(() => {
        navigation.setOptions({
            headerTitle: (props) => <HeaderTitle {...props} />,
            headerLeft: () => (
                <TouchableOpacity style={styles.headerLeftView} onPress={() => router.canGoBack() && router.back()}>
                    <ChevronLeft size="30" color="#A3A3A3" />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={styles.headerRightView}>
                    <View style={styles.headerLeftView}>
                        <Video size="28" color="#A3A3A3" />
                    </View>
                    <View style={styles.headerLeftView}>
                        <Phone size="24" color="#A3A3A3" />
                    </View>
                </View>
            ),
        })
    }, [])

    useEffect(() => {
        getAllMessage();
        messageSubscribe();
    }, [])

    const HeaderTitle = () => {
        return (
            <View style={styles.headerTitleView}>
                <Image
                    style={styles.image}
                    source={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 30) + 1}.jpg`}
                    contentFit="cover"
                />
                <View>
                    <Text style={styles.userNameTitle}>{userDetail.username}</Text>
                    <Text style={styles.onlineText}>Online now</Text>
                </View>
            </View>
        )
    }

    const messageSubscribe = () => {
        const chatsWatcher = supabase.channel('sender_id')
        .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: 'tbl_Messages' },
            async (payload) => {
                //console.log('chats changed', payload.new);
                
                const messages = payload.new;

                if (messages.sender_id === userId) {
                    const newMessage = {
                        _id: messages.id,
                        text: messages.message_text,
                        createdAt: new Date(messages.created_at),
                        user: { 
                                _id: messages.sender_id 
                            }
                    }
                    setMessages((prev) => [newMessage, ...prev]);
                }
            }
        )
        .subscribe()

        return () => {
            supabase.removeChannel(chatsWatcher);
        }
    }

    const getAllMessage = async() => {

        const filter = [
                        { type: 'or', value: `sender_id.eq.${userInfo.id},receiver_id.eq.${userInfo.id}`}
                        ,{ type: 'or', value: `sender_id.eq.${userId},receiver_id.eq.${userId}`}
                    ]
        const { data, error } = await readData("tbl_Messages", "*", filter)

        if (error) return CustomAlert(false, "DANGER", "Error", error.code + " - " + error.message, "Ok", 2000)

        if(data) {
            //console.log(data)
            const giffed_message = Array();
            data.map((mess) => {
                const mes = {
                    _id: mess.id,
                    text: mess.message_text,
                    createdAt: new Date(mess.created_at),
                    user: { _id: mess.sender_id }
                }
                giffed_message.push(mes);
            })

            setMessages(giffed_message.reverse());
        }
    }

    const onSend = useCallback(async(messages = []) => {
        console.log(messages)
        const { error } = await insertData('tbl_Messages', {
            sender_id: userInfo.id,
            receiver_id: userId,
            message_text: messages[0].text,
            is_read: false
        })

        if (error) return CustomAlert(false, "DANGER", "Error", error.code + " - " + error.message, "Ok", 2000)
        else setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])
    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
            <GiftedChat
                messages={messages}
                renderBubble={props => {
                    return (
                        <Bubble
                            {...props}
                            textStyle={{
                                right: styles.messageRigthText,
                                left: styles.messageLeftText,
                            }}
                            wrapperStyle={{
                                left: {
                                    backgroundColor: '#F5F5F5',
                                },
                                right: {
                                    backgroundColor: "#FF9134",
                                },
                            }}
                        />
                    );
                }}             
                onSend={messages => onSend(messages)}
                user={{
                    _id: userInfo.id,
                    name: userInfo.username
                }}
                messagesContainerStyle={{backgroundColor: '#FFFFFF'}}
                showUserAvatar={false}
                alwaysShowSend
                placeholder='Type something...'
                isTyping={false}
                renderSend={(props)=>{
                    return (
                        <Send {...props} containerStyle={styles.sendButton}>
                            <View style={{backgroundColor: '#F5F5F5', padding: 8, borderRadius: 10}}>
                                <SendIcon size={30} color="#FF9134"/>
                            </View>
                        </Send>
                    )
                }
                } 
        />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    headerLeftView: {
        backgroundColor: "#FAFAFA",
        borderRadius: 5,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width:30,
        height:30,
        marginRight: 8,
        borderRadius: 18
    },
    headerTitleView: {
        flexDirection: 'row',
    },
    userNameTitle: {
        fontSize: 14,
        fontFamily: Font.medium,
        color: '#262626'
    },
    onlineText: {
        fontSize: 10,
        fontFamily: Font.medium,
        color: '#FF9134'
    },
    headerRightView: {
        flexDirection: 'row',
        gap: 5
    },
    messageRigthText: {
        color: '#FFFFFF',
        fontFamily: Font.medium
    },
    messageLeftText: {
        color: '#000000',
        fontFamily: Font.medium
    },
    sendButton: {
        justifyContent: 'center', 
        alignItems: 'center'
    }
})