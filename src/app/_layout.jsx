import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { FontLoader } from "../config/FontConfig";
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { Provider } from "react-redux";
import { store } from "../redux/store/store";

export default function Layout() {

    const [loaded, error] = useFonts(FontLoader);

    if (!loaded && !error) return null;

    return (
        <Provider store={store}>
            <AlertNotificationRoot>
                <Stack screenOptions={{ headerShown: false, gestureEnabled: false, headerShadowVisible: false }} >
                    <Stack.Screen name="(auth)/signin" options={{}} />
                    <Stack.Screen name="(auth)/signup" options={{}} />
                    <Stack.Screen name="(auth)/forgot" options={{headerShown: true, title: '', headerBackTitleVisible: false}} />
                    <Stack.Screen name="profile" options={{ headerShown: true, headerBackTitleVisible: false, title: '', presentation: 'modal' }} />
                    <Stack.Screen name="chats/[userId]" options={{ headerShown: true, headerBackTitleVisible: false, title: '' }} />
                </Stack>
            </AlertNotificationRoot>
        </Provider>
    )
}