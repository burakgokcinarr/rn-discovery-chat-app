import { Stack } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

export default function Layout() {

    useEffect(() => {
        //User Authotentication control
    }, [])

    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="(auth)/signin" options={{}} />
            <Stack.Screen name="(auth)/signup" options={{}} />
        </Stack>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})