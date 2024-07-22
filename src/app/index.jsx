import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'

export default function index() {
    return (
        <View style={styles.container}>
            <Text>index</Text>
            <Link href={"(auth)/signin"} >Sign In</Link>
            <Button
                title='Sign Up'
                onPress={() => router.push("(auth)/signup")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
})