import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { router, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { ChevronLeft, Video, Phone } from 'lucide-react-native'
import { Image } from 'expo-image'
import { Font } from '../../constants'

export default function ChatScreen() {

    const navigation = useNavigation()
    const router     = useRouter()
    const { userId, user } = useLocalSearchParams()
    const userDetail = JSON.parse(user)
    
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
    
    return (
    <View style={styles.container}>
        <Text>{userId}</Text>
    </View>
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
    }
})