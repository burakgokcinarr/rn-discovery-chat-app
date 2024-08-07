import {  Redirect, router } from 'expo-router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userCheckSessionControl } from '../api/Api'
import { setSession } from '../redux/slices/authSlice'
import { ActivityIndicator, View } from 'react-native'

export default function index() {

    const dispatch              = useDispatch();
    const authUser              = useSelector((state) => state.auth.user);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async() => {
            const data = await userCheckSessionControl();
            dispatch(setSession(data.user));
            setLoading(false)
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