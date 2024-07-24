import { StyleSheet, View, TextInput } from 'react-native'
import React from 'react'
import { Font } from '../constants'

export default function CustomInput({ customStyle = {}, placeholderText = "E-Mail", onChangeText = null, isSecurity = false, keyboardType = "default", icon = null }) {
    return (
        <View style={styles.container}>
            {
                icon
            }
            <TextInput
                placeholder={placeholderText}
                style={[styles.inputContainer, customStyle]}
                onChangeText={onChangeText}
                secureTextEntry={isSecurity}
                autoCorrect={false}
                keyboardType={keyboardType}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        width: '85%',
        height: 58,
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#F6F7FB',
    },
    inputContainer: {
        width: '85%',
        marginVertical: 8,
        fontFamily: Font.regular,
        color: '#000000',
        fontSize: 18
    }
})