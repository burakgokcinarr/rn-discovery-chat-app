import {  Redirect, router } from 'expo-router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userCheckSessionControl } from '../api/Api'
import { setSession } from '../redux/slices/authSlice'
import { ActivityIndicator, View } from 'react-native'
import { CustomAlert } from '../utility/CustomAlert'
import "../localization/_i18n";

export default function index() {

    const dispatch              = useDispatch();
    const authUser              = useSelector((state) => state.auth.user);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async() => {
            try { 
                const { user, error } = await userCheckSessionControl();
                if (error) return CustomAlert(true, "DANGER", error.code, error.message)
                else dispatch(setSession(user));
            } catch (error) {
                //
            } finally {
                setLoading(false)
            }
        }

        checkSession()
    }, [])

    if (loading) {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size="large" color="#000000"/>
            </View>
        )
    }
    
    if (authUser) {
        return <Redirect href="(tabs)/contacts"/>
    }

    return <Redirect href="(auth)/signin"/>
} 