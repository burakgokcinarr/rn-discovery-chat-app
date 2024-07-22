import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native";

export default function Layout() {

    useEffect(() => {
        //User Authotentication control
    }, [])

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <Stack initialRouteName="index" >
                <Stack.Screen name="index" options={{ headerShown: false }}/>
                <Stack.Screen name="(auth)/signin" options={{title: "burak"}}/>
                <Stack.Screen name="(auth)/signup" options={{ presentation: 'modal' }} />
            </Stack>
        </SafeAreaView>
    )
}