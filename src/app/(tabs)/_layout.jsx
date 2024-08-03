import { router, Tabs } from 'expo-router';
import { User, MessageCircle, Plus } from 'lucide-react-native';
import { Font } from '../../constants'
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';

export default function TabLayout() {

    const tabBarConstantsStyle = {
        tabBarActiveTintColor: '#FF7841',
        tabBarInactiveTintColor: '#000000',
        tabBarLabelStyle: {fontFamily: Font.regular, fontSize: 12},
        tabBarHideOnKeyboard: true,
        headerShadowVisible: false,
        headerLeft: () => (
            <View style={styles.headerLeftView}>
                <Plus size="30" color="#A3A3A3" />
            </View>
        ),
        headerRight: () => (
            <TouchableOpacity onPress={() => router.push("profile")}>
                <Image
                    style={styles.image}
                    source="https://randomuser.me/api/portraits/men/10.jpg"
                    contentFit="cover"
                    transition={750}
                />
            </TouchableOpacity>
        ),
        tabBarStyle: { borderTopWidth: 0, elevation: 0, shadowOpacity: 0, shadowOffset: { height: 0 } },
    }

    return (
        <Tabs screenOptions={tabBarConstantsStyle}>
            <Tabs.Screen
                name="contacts"
                options={{
                    title: 'Contacts',
                    tabBarIcon: ({ color, focused }) => <User color={focused ? "#FF7841" : "#000000"} size={28} fill={focused ? "#FF7841" : "#000000"}/>
                }}
            />
            <Tabs.Screen
                name="chats"
                options={{
                    title: 'Chats',
                    tabBarIcon: ({ color, focused }) => <MessageCircle color={focused ? "#FF7841" : "#000000"} size={28} fill={focused ? "#FF7841" : "#000000"}/>,
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    image: {
        width:38,
        height:38,
        marginRight: 8,
        borderRadius: 19
    },
    headerLeftView: {
        marginLeft: 8,
        backgroundColor: "#FAFAFA",
        borderRadius: 5,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
