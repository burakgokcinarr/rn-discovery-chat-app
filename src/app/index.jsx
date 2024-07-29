import {  Redirect } from 'expo-router'
import { userCheckSessionControl } from '../api/Api'
import { useEffect } from 'react'

export default function index() {

    if (userCheckSessionControl) {
        return <Redirect href="(tabs)/contacts"/>
    }

    return <Redirect href="(auth)/signin"/>
} 