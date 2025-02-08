import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import { hp, wp } from '../helpers/common'
import { theme } from '../constants/theme'
import Button from '../components/Button'
import { useRouter } from 'expo-router'

const Welcome = () => {

    const router = useRouter()

    return (
        <ScreenWrapper bg={'white'}>
            <StatusBar style="dark" />
            <View style={styles.container}>
                {/* welcome image */}
                <Image
                    source={require('../assets/images/welcome.png')}
                    style={styles.welcomeImage}
                    resizeMode='contain'
                />

                {/* welcome text */}
                <View style={{ gap: 20 }}>
                    <Text style={styles.title}>ConnectUp!</Text>
                    <Text style={styles.punchline}>
                        "Connecting people, creating possibilities." is a great choice!
                    </Text>
                </View>

                {/* footer */}
                <View style={styles.footer}>
                    <Button
                        title={"Getting Started"}
                        buttonStyle={{
                            marginHorizontal: wp(3)
                        }}
                        onPress={() => router.push('signUp')}
                        hasShadow={true}
                    />

                    <View style={styles.bottmTextContaner} >
                        <Text style={styles.loginText}>
                            Already have an account?
                        </Text>
                        <Pressable onPress={() => router.push('login')}>
                            <Text
                                style={[
                                    styles.loginText,
                                    {
                                        color: theme.colors.primaryDark,
                                        fontWeight: theme.fonts.semibold
                                    }]}>
                                Login
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: wp(3)
    },
    welcomeImage: {
        width: wp(100),
        height: hp(30),
        alignSelf: 'center',
    },
    title: {
        color: theme.colors.text,
        fontSize: hp(4),
        fontWeight: theme.fonts.extraBold,
        textAlign: 'center'
    },
    punchline: {
        color: theme.colors.text,
        fontSize: hp(1.9),
        fontWeight: theme.fonts.regular,
        textAlign: 'center',
        paddingHorizontal: wp(2),
    },
    footer: {
        gap: 20,
        width: wp(100)
    },
    bottmTextContaner: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    },
    loginText: {
        color: theme.colors.text,
        fontSize: hp(1.6),
        textAlign: 'center',
    }
}) 