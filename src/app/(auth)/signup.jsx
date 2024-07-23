import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function signup() {

    const [session, setSession] = useState(null)
    /*
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })
    
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])
    */

    const signUp = async() => {
        const { data: { session }, error } = await supabase.auth.signUp({
            email: 'example@email.com',
            password: '123456',
        })

        if (error) return alert(error)

        if (session) console.log(session)
        
        const { error: insertError } = await supabase
        .from('tbl_User')
        .insert({
            username: "burak",
            surname:"Gökçınar",
            email: "example@email.com",
            useruuid: session.user.id
        })

        if (insertError) return alert(insertError.message)

        alert("Kayıt Başarılı")
    }

    return (
        <View>
            { session && <Text>{session.user.id}</Text> }
            <Button
                title='Sign Up'
                onPress={signUp}
            />
        </View>
    )
}

const styles = StyleSheet.create({})