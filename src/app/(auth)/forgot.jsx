import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useNavigation } from 'expo-router'
import { ChevronLeft, TriangleAlert } from 'lucide-react-native'
import { resetPasswordWithEmail } from '../../api/Api'
import { CustomInput, CustomButton } from '../../components'
import { CustomAlert } from '../../utility/CustomAlert'
import { Formik } from 'formik'
import { ForgotPasswordSchema } from '../../utility/ValidateSchema'
import { Font } from '../../constants'
import { useTranslation } from 'react-i18next'

const BG_IMAGE   = require('../../../assets/bg.webp');

export default function forgot() {

    const { t }      = useTranslation();
    const navigation = useNavigation()

    const initialValue = {
        email: ''
    }

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity style={styles.headerLeftView} onPress={() => router.canGoBack() && router.back()}>
                    <ChevronLeft size="30" color="#A3A3A3" />
                </TouchableOpacity>
            )
        })
    }, [])

    const reset = async(value) => {
        const { data, error } = await resetPasswordWithEmail(value.email)

        if (error) return CustomAlert(false, "DANGER", "Error", `${error.code} - ${error.message}`, "Close", 2500)
        
        return CustomAlert(false, "SUCCESS", "Success", "Password reset email sent! Check your inbox.", "Ok", 2000)
    }

    return (
        <ImageBackground source={BG_IMAGE} style={styles.container}>
            <Formik 
                initialValues={initialValue}
                validationSchema={ForgotPasswordSchema}
                onSubmit={reset}    
            >
                {({ handleChange, handleSubmit, errors, touched, isValid, values }) => (
                    <>
                        <CustomInput
                            placeholderText={t("forgot.email")}
                            value={values.email}
                            onChangeText={handleChange('email')}
                        />
                        { errors.email && touched.email && <View style={{padding: 5, backgroundColor: '#FFFFFF'}}><Text style={styles.formErrorText}><TriangleAlert color="red" size={9}/> {errors.email}</Text></View> }
                        <CustomButton
                            title={t("forgot.reset_password")}
                            customStyle={{marginTop: 15}}
                            onPressed={handleSubmit}
                        />
                    </>
                )}
            </Formik>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255,0,0,.6)',
        alignItems: 'center',
        gap: 10,
        paddingTop: 10
    },
    headerLeftView: {
        backgroundColor: "#FAFAFA",
        borderRadius: 5,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bgImage: {
        flex: 1,
    },
    formErrorText: {
        fontSize: 15,
        fontFamily: Font.regular,
        alignItems: 'flex-start',
        color: 'red',
        width: '80%'
    }
})