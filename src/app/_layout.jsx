import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native";

export default function Layout() {

    useEffect(() => {
        //User Authotentication control
    }, [])

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <Stack>
                <Stack.Screen name="(auth)/signin" options={{title: "burak"}}/>
                <Stack.Screen name="(auth)/signup" options={{ presentation: 'modal' }} />
            </Stack>
        </SafeAreaView>
    )
}