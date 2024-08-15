import { StyleSheet, Text, View, ImageBackground, Dimensions, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { Font } from '../../constants'
import { CustomInput, CustomButton } from '../../components'
import { Mail, LockKeyhole } from 'lucide-react-native'
import { router } from 'expo-router'
import { CustomAlert } from '../../utility/CustomAlert'
import { signInUser } from '../../api/Api'
import { useDispatch } from 'react-redux'
import { setSession } from '../../redux/slices/authSlice'
import { useTranslation } from 'react-i18next'

const BG_IMAGE   = require('../../../assets/bg.webp');

const { height } = Dimensions.get('window');

export default function signin() {

    const { t }           = useTranslation();
    const dispatch        = useDispatch();
    const [form, setForm] = useState({email: "", password: ""})

    const handleChange = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    const signInClicked = async() => { 
        const { data, error } = await signInUser(form.email, form.password)
        
        if (error) return CustomAlert(false, "DANGER", "Error", `${error.code} - ${error.message}`, "Close", 2500)
        
        if (data.session.user) {
            dispatch(setSession(data.session.user))
            return router.replace("(tabs)/contacts")
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container} >
            <View style={styles.container}>
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}/>
                <View style={styles.inputContainer}>
                    <Text style={styles.title}>{t("signIn.loginTitle")}</Text>
                    <CustomInput
                        placeholderText={t("signIn.email")}
                        value={form.email}
                        onChangeText={(text) => handleChange('email', text)}
                        icon={<Mail color={"#FFFFFF"} fill="#C5C5C7" strokeWidth={1}/>}
                    />
                    <CustomInput
                        placeholderText={t("signIn.password")}
                        value={form.password}
                        onChangeText={(text) => handleChange('password', text)}
                        icon={<LockKeyhole color={"#FFFFFF"} fill="#C5C5C7" strokeWidth={1}/>}
                        isSecurity={true}
                    />
                    <TouchableOpacity style={{alignSelf: 'flex-end', marginHorizontal: 30}} onPress={() => router.push("(auth)/forgot")}>
                        <Text style={styles.forgetPassword}>{t("signIn.forgotpass")}</Text>
                    </TouchableOpacity>
                    <CustomButton
                        title={t("signIn.loginTitle")}
                        customStyle={{marginTop: 15}}
                        onPressed={signInClicked}
                    />
                <Text style={styles.subText}>
                    {t("signIn.account")}{' '}
                    <TouchableOpacity onPress={() => router.push("(auth)/signup")}>
                        <Text style={styles.signupText}>{t("signIn.signup")}</Text>
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
        borderTopLeftRadius: 50,
        backgroundColor: 'white',
        height: height/1.6
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