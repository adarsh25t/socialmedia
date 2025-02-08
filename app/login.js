import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import Home from '../assets/icons/Home'
import Icon from '../assets/icons'
import { theme } from '../constants/theme'
import { StatusBar } from 'expo-status-bar'
import BackButton from '../components/BackButton'
import { useRouter } from 'expo-router'
import { hp, wp } from '../helpers/common'
import Input from '../components/TextInput'
import Button from '../components/Button'
import { supabase } from '../lib/superbase'

const Login = () => {

    const router = useRouter();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [loading, setloading] = useState(false);

    const onSubmit = async () => {
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert("Login", "Please fill all the fields")
            return;
        }
        const email = emailRef.current.trim();
        const password = passwordRef.current.trim();
        setloading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        setloading(false);
        console.log(error);
        if (error) {
            Alert.alert('Login', error.message)
        }
        else {
           // router.push('home')
        }

    }

    return (
        <ScreenWrapper bg={'white'}>
            <StatusBar style="dark" />

            <View style={styles.container}>
                {/* Back Button  */}
                <BackButton router={router} />

                {/* Welcome Text */}
                <View>
                    <Text style={styles.welcomeText}>Hey,</Text>
                    <Text style={styles.welcomeText}>Welcome Back</Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    {/* Login Text */}
                    <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
                        Please login to continue
                    </Text>

                    {/* Email Input */}
                    <Input
                        icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
                        placeholder="Enter your email"
                        onChangeText={value => emailRef.current = value}
                    />

                    {/* Password Input */}
                    <Input
                        icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
                        placeholder="Enter your password"
                        secureTextEntry
                        onChangeText={value => passwordRef.current = value}
                    />

                    {/* Forgot Password */}
                    <Text style={styles.forgotpassword}>Forgot Password?</Text>

                    {/* Login Button */}
                    <Button
                        title="Login"
                        onPress={onSubmit}
                        loading={loading}
                    />
                </View>

                {/* footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Don't have an account?
                    </Text>
                    <Pressable onPress={() => router.push('/signUp')}>
                        <Text style={[
                            styles.footerText, {
                                color: theme.colors.primaryDark,
                                fontWeight: theme.fonts.semibold
                            }]}>Sign Up</Text>
                    </Pressable>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        paddingHorizontal: wp(5)
    },
    welcomeText: {
        color: theme.colors.text,
        fontSize: hp(3.5),
        fontWeight: theme.fonts.bold
    },
    form: {
        gap: 25
    },
    forgotpassword: {
        textAlign: 'right',
        fontWeight: theme.fonts.semibold,
        color: theme.colors.text
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    footerText: {
        fontWeight: theme.fonts.semibold,
        color: theme.colors.text
    },
    footerText: {
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: hp(1.6)
    }
})