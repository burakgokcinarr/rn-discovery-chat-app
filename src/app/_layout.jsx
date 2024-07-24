import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { FontLoader } from "../config/FontConfig";

export default function Layout() {

    const [loaded, error] = useFonts(FontLoader);

    if (!loaded && !error) return null;

    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="(auth)/signin" options={{}} />
            <Stack.Screen name="(auth)/signup" options={{}} />
        </Stack>
    )
}