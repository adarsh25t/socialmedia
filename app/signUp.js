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

const SignUp = () => {

    const router = useRouter();
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [loading, setloading] = useState(false);

    const onSubmit = async () => {
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert("Sign Up", "Please fill all the fields")
            return;
        }
        const name = nameRef.current.trim();
        const email = emailRef.current.trim();
        const password = passwordRef.current.trim();
        setloading(true);

        const { data:{session}, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name
                }
            }
        })
        setloading(false);
        if (error){
            Alert.alert("Sign Up",error.message)
        }
        else {
            nameRef.current = "";
            emailRef.current = "";
            passwordRef.current = "";
            router.push('/login')
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
                    <Text style={styles.welcomeText}>Let's</Text>
                    <Text style={styles.welcomeText}>Get Started</Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    {/* Login Text */}
                    <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
                        Please fill the details to create an account
                    </Text>

                    {/* Name Input */}
                    <Input
                        icon={<Icon name="user" size={26} strokeWidth={1.6} />}
                        placeholder="Enter your name"
                        onChangeText={value => nameRef.current = value}
                    />

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

                    {/* Login Button */}
                    <Button
                        title="Sign Up"
                        onPress={onSubmit}
                        loading={loading}
                    />
                </View>

                {/* footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Already have an account?
                    </Text>
                    <Pressable onPress={() => router.push('/login')}>
                        <Text style={[
                            styles.footerText, {
                                color: theme.colors.primaryDark,
                                fontWeight: theme.fonts.semibold
                            }]}>Login</Text>
                    </Pressable>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default SignUp

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