import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Font } from '../constants'

export default function CustomButton({ customStyle = {}, title = "", onPressed = null }) {
    return (
        <TouchableOpacity style={[styles.container, customStyle]} onPress={onPressed}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {    
        width: "85%",
        height: 58,
        backgroundColor: "#FF9134",
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 18,
        fontFamily: Font.medium,
        color: '#FFFFFF'
    }
})