import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { ChevronLeft, Video, Phone, Send as SendIcon  } from 'lucide-react-native'
import { Image } from 'expo-image'
import { Font } from '../../constants'
import { useSelector } from 'react-redux'
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import { deleteData, insertData, readData } from '../../api/Api'
import { CustomAlert } from '../../utility/CustomAlert'
import { supabase } from '../../lib/supabase'
import { useTranslation } from 'react-i18next'
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as Clipboard from 'expo-clipboard';

export default function ChatScreen() {

    const { t }             = useTranslation();
    const navigation        = useNavigation()
    const router            = useRouter()
    const { userId, user }  = useLocalSearchParams()
    const userDetail        = JSON.parse(user)
    const userInfo          = useSelector((state) => state.auth.user)
    const chatThemeColor    = useSelector((state) => state.chatTheme.chatBubble)
    const [messages, setMessages]   = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const { showActionSheetWithOptions } = useActionSheet();

    const options = [t("chatScreen.delete"), t("chatScreen.copy"), t("chatScreen.cancel")];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex      = 2;
    
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
                    <Text style={styles.onlineText}>{t("chatScreen.online")}</Text>
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
        try {
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
                        user: { _id: mess.sender_id,name: userDetail.username }
                    }
                    giffed_message.push(mes);
                })

                setMessages(giffed_message.reverse());
            }
        } catch (error) {
            return CustomAlert(false, "DANGER", "Error", error.code + " - " + error.message, "Ok", 2000)
        } finally {
            setIsLoading(false)
        }
    }

    const onSend = useCallback(async(messages = []) => {
        //console.log(messages)
        const { error } = await insertData('tbl_Messages', {
            sender_id: userInfo.id,
            receiver_id: userId,
            message_text: messages[0].text,
            is_read: false
        })

        if (error) return CustomAlert(false, "DANGER", "Error", error.code + " - " + error.message, "Ok", 2000)
        else setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    const onLogPressMessage = (context, message) => {
        //console.log(message)
        if (userInfo.id === message.user._id) {
            showActionSheetWithOptions({
                options,
                cancelButtonIndex,
                destructiveButtonIndex
            }, async(selectedIndex) => {
                switch (selectedIndex) {
                    case destructiveButtonIndex:
                        const { error } = await deleteData("tbl_Messages", "id", message._id)
                        if (error) return CustomAlert(false, "DANGER", "Error", error.code + " - " + error.message, "Ok", 2000)
                        else getAllMessage()
                    break;
                    case 1:
                        await Clipboard.setStringAsync(message.text);
                    case cancelButtonIndex:
                    // Canceled
                }}
            );
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
                                    backgroundColor: chatThemeColor,
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
                placeholder={t("chatScreen.placeholder")}
                isTyping={false}
                onLongPress={onLogPressMessage}
                renderSend={(props)=>{
                    return (
                        <Send {...props} containerStyle={styles.sendButton}>
                            <SendIcon size={30} color={chatThemeColor}/>
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
        alignItems: 'center',
        marginRight: 10
    }
})