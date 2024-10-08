import { StyleSheet, Text, View, ImageBackground, Dimensions, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { Font } from '../../constants'
import { CustomInput, CustomButton } from '../../components'
import { Mail, LockKeyhole, User, TriangleAlert } from 'lucide-react-native'
import { router } from 'expo-router'
import { Formik } from 'formik'
import { SignupSchema } from '../../utility/ValidateSchema'
import { signUpNewUser, insertData } from '../../api/Api'
import { CustomAlert } from '../../utility/CustomAlert'
import { useTranslation } from 'react-i18next'

const BG_IMAGE   = require('../../../assets/bg.webp');

const { height } = Dimensions.get('window');

export default function signup() {
    
    const { t }        = useTranslation();
    const initialValue = {
        username: '',
        email: '',
        password: ''
    }

    const signUpClicked = async(value) => {
        
        const { session, error } = await signUpNewUser(value.email, value.password)
        
        if (error) return CustomAlert(false, "DANGER", "Error", `${error.code} - ${error.message}`, "Close", 2500)
        
        if (session) {
            const userInfo  = { username: value.username, password: value.password, email: value.email, useruuid: session.user.id }
            const { error: insertError } = await insertData('tbl_User', userInfo)

            if (!insertError) return CustomAlert(false, "SUCCESS", "Success", "User registration successful. You can log in to the application.", "Ok", 2000, () => router.canGoBack() && router.back())
        } 

        return CustomAlert(false, "DANGER", "Error", "An error has occurred. Please try again later.", "Ok", 2500)
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container} >
            <View style={styles.container}>
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}/>
                <Formik 
                    initialValues={initialValue}
                    validationSchema={SignupSchema}
                    onSubmit={signUpClicked}    
                >
                    {({ handleChange, handleSubmit, errors, touched, isValid, values }) => (
                        <View style={styles.inputContainer}>
                            <Text style={styles.title}>{t("signUp.signup")}</Text>
                            <CustomInput
                                placeholderText={t("signUp.nickname")}
                                value={values.username}
                                onChangeText={handleChange('username')}
                                icon={<User color={"#FFFFFF"} fill="#C5C5C7" strokeWidth={1}/>}
                            />
                            { errors.username && touched.username && <Text style={styles.formErrorText}><TriangleAlert color="red" size={9}/> {errors.username}</Text> }
                            <CustomInput
                                placeholderText={t("signUp.email")}
                                value={values.email}
                                onChangeText={handleChange('email')}
                                icon={<Mail color={"#FFFFFF"} fill="#C5C5C7" strokeWidth={1}/>}
                            />
                            { errors.email && touched.email && <Text style={styles.formErrorText}><TriangleAlert color="red" size={9}/> {errors.email}</Text> }
                            <CustomInput
                                placeholderText={t("signUp.password")}
                                value={values.password}
                                onChangeText={handleChange('password')}
                                icon={<LockKeyhole color={"#FFFFFF"} fill="#C5C5C7" strokeWidth={1}/>}
                                isSecurity={true}
                            />
                            { errors.password && touched.password && <Text style={styles.formErrorText}><TriangleAlert color="red" size={9}/> {errors.password}</Text> }
                            <CustomButton
                                title={t("signUp.signup")}
                                customStyle={{marginTop: 15}}
                                onPressed={handleSubmit}
                            />
                            <Text style={styles.subText}>
                                {t("signUp.account")}{' '}
                                <TouchableOpacity onPress={() => router.back()}>
                                    <Text style={styles.signupText}>{t("signUp.signin")}</Text>
                                </TouchableOpacity>
                            </Text>
                        </View>
                    )}
                </Formik>
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
    },
    formErrorText: {
        fontSize: 10,
        fontFamily: Font.regular,
        alignItems: 'flex-start',
        color: 'red',
        width: '80%'
    }
})