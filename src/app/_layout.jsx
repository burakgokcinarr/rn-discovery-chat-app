import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { FontLoader } from "../config/FontConfig";
import { AlertNotificationRoot } from 'react-native-alert-notification';

export default function Layout() {

    const [loaded, error] = useFonts(FontLoader);

    if (!loaded && !error) return null;

    return (
        <AlertNotificationRoot>
            <Stack screenOptions={{ headerShown: false, gestureEnabled: false, headerShadowVisible: false }} >
                <Stack.Screen name="(auth)/signin" options={{}} />
                <Stack.Screen name="(auth)/signup" options={{}} />
            </Stack>
        </AlertNotificationRoot>
    )
}