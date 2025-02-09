import { Alert, Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { supabase } from '../../lib/superbase'
import { useAuth } from '../../context/AuthContext'
import { hp, wp } from '../../helpers/common'
import { theme } from '../../constants/theme'
import Icon from '../../assets/icons'
import { useRouter } from 'expo-router'
import Avatar from '../../components/Avatar'

const home = () => {

    const { user } = useAuth()
    const router = useRouter()

    return (
        <ScreenWrapper>
            <View style={styles.container}>
                {/* header */}
                <View style={styles.header}>
                    <Text style={styles.title}>ConnectUp!</Text>
                    <View style={styles.icons}>
                        <Pressable onPress={() => router.push('notifications')}>
                            <Icon
                                name={'heart'}
                                size={hp(3.2)}
                                color={theme.colors.text}
                                strokeWidth={2}
                            />
                        </Pressable>
                        <Pressable onPress={() => router.push('newPost')}>
                            <Icon
                                name={'plus'}
                                size={hp(3.2)}
                                color={theme.colors.text}
                                strokeWidth={2}
                            />
                        </Pressable>
                        <Pressable onPress={() => router.push('profile')}>
                            <Avatar 
                                uri={user?.image}
                                size={hp(4.3)}
                                rounded={theme.radius.sm}
                                style={{borderWidth:2}}
                            />
                        </Pressable>
                    </View>
                </View>
            </View>
        </ScreenWrapper>
    )
}

export default home

const styles = StyleSheet.create({
    container: {

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: wp(4)
    },
    title: {
        color: theme.colors.text,
        fontSize: hp(3.2),
        fontWeight: theme.fonts.bold
    },
    icons:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        gap:18
    }
})