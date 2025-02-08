import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { supabase } from '../../lib/superbase'
import { useAuth } from '../../context/AuthContext'

const home = () => {

    const onLogout = async () => {
        console.log('====================================');
        console.log("err");
        console.log('====================================');
        const { error } = await supabase.auth.signOut();
        console.log("err",error);
        if (error) {
            Alert.error("Logout", "Error signing out!")
        }
    }

    return (
        <ScreenWrapper>
            <Text>home</Text>
            <Button title='logout' onPress={onLogout} />
        </ScreenWrapper>
    )
}

export default home

const styles = StyleSheet.create({})