import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useNavigation } from 'expo-router'
import { ChevronLeft } from 'lucide-react-native'
import { resetPasswordWithEmail } from '../../api/Api'

export default function forgot() {

    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity style={styles.headerLeftView} onPress={() => router.canGoBack() && router.back()}>
                    <ChevronLeft size="30" color="#A3A3A3" />
                </TouchableOpacity>
            )
        })
    }, [])


    const reset = async() => {
        const { data, error } = await resetPasswordWithEmail("burakgokcinar@gmail.com")

        if (error) {
            return alert(error)
        }

        console.log(data)
    }

    return (
        <View style={styles.container}>
            <Button
                title='Password Reset'
                onPress={reset}
            />
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
})