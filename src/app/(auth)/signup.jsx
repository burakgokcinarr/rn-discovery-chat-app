import { StyleSheet, Text, View, ImageBackground, Dimensions, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { Font } from '../../constants'
import { CustomInput, CustomButton } from '../../components'
import { Mail, LockKeyhole, User } from 'lucide-react-native'
import { supabase } from '../../lib/supabase'
import { router } from 'expo-router'

const BG_IMAGE   = require('../../../assets/bg.webp');

const { height } = Dimensions.get('window');

export default function signup() {

    const [form, setForm] = useState({username: "", email: "", password: ""})

    const handleChange = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    const signUpClicked = () => {
        alert("signup")
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container} >
            <View style={styles.container}>
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}/>
                <View style={styles.inputContainer}>
                    <Text style={styles.title}>Sign Up</Text>
                    <CustomInput
                        placeholderText='Nick Name'
                        onChangeText={(text) => handleChange('username', text)}
                        icon={<User color={"#FFFFFF"} fill="#C5C5C7" strokeWidth={1}/>}
                    />
                    <CustomInput
                        placeholderText='E-Mail'
                        onChangeText={(text) => handleChange('email', text)}
                        icon={<Mail color={"#FFFFFF"} fill="#C5C5C7" strokeWidth={1}/>}
                    />
                    <CustomInput
                        placeholderText='Password'
                        onChangeText={(text) => handleChange('password', text)}
                        icon={<LockKeyhole color={"#FFFFFF"} fill="#C5C5C7" strokeWidth={1}/>}
                        isSecurity={true}
                    />
                    <CustomButton
                        title='Sign Up'
                        customStyle={{marginTop: 15}}
                        onPressed={signUpClicked}
                    />
                <Text style={styles.subText}>
                    Do you have an account?{' '}
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={styles.signupText}>Login here</Text>
                    </TouchableOpacity>
                </Text>
                </View>
            </View>
        </KeyboardAvoidingView>
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
        gap: 10,
        borderTopRightRadius: 50,
        backgroundColor: 'white',
        height: height/2
    },
    title: {
        fontSize: 36,
        fontFamily: Font.bold,
        color: '#FF9134',
        marginTop: 10
    },
    forgetPassword: {
        fontSize: 13,
        fontFamily: Font.regular,
        color: '#FF9134'
    },
    subText: {
        fontSize: 13,
        fontFamily: Font.medium,
        marginTop: 10
    },
    signupText: {
        fontSize: 16,
        color: '#FF9134',
        textDecorationLine: 'underline'
    }
})