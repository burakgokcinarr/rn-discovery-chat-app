import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, router, Redirect } from 'expo-router'

export default function index() {
    return <Redirect href="(auth)/signin"/>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
})