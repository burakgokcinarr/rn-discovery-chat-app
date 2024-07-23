import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native'
import React from 'react'

const BG_IMAGE = require('../../../assets/bg.webp');

const { height } = Dimensions.get('window');

export default function signin() {
    return (
        <View style={styles.container}>
            <ImageBackground source={BG_IMAGE} style={styles.bgImage}/>
            <View style={styles.inputContainer}>
                <Text>burak</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    bgImage: {
        flex: 1,
    },
    inputContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 50,
        backgroundColor: 'white',
        height: height/2,
    }
})