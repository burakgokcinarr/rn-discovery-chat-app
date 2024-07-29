import { Tabs } from 'expo-router';
import { User, MessageCircle } from 'lucide-react-native';
import { Font } from '../../constants'

export default function TabLayout() {

    const tabBarConstantsStyle = {
        tabBarActiveTintColor: '#FF7841',
        tabBarInactiveTintColor: '#000000',
        tabBarLabelStyle: {fontFamily: Font.regular, fontSize: 12},
        tabBarHideOnKeyboard: true,
        headerShadowVisible: false,
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
