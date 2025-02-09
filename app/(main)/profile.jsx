
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import BackButton from '../../components/BackButton'
import { hp, wp } from '../../helpers/common'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'expo-router'
import Header from '../../components/Header'
import Icon from '../../assets/icons'
import { theme } from '../../constants/theme'
import { supabase } from '../../lib/superbase'
import Avatar from '../../components/Avatar'

const Profile = () => {

  const { user } = useAuth()
  const router = useRouter();


  const onLogout = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
    
    if (error) {
      Alert.error("Logout", "Error signing out!")
    }
  }
  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Logout',
        onPress: () => onLogout(),
        style: 'destructive'
      }
    ])
  }

  const UserHeader = ({ user, router, handleLogout }) => {
    return (
      <View style={styles.header}>
        <View>
          {/* profile header */}
          <Header title={"Profile"} showBackButton={true} mb={30} />

          {/* Logout */}
          <Pressable onPress={handleLogout} style={styles.logout}>
            <Icon name={'logout'} color={theme.colors.rose} />
          </Pressable>
        </View>

        {/* user info */}
        <View style={styles.container}>
          <View style={{ gap: 15 }}>
            <View style={styles.avatarContainer}>
              <Avatar
                uri={user?.image}
                size={hp(12)}
                rounded={theme.radius.xxl * 1.4}
              />
              <Pressable style={styles.editIcon} onPress={() => router.push('editProfile')}>
                <Icon name={'edit'} strokeWidth={2.5} size={20} />
              </Pressable>
            </View>

            {/* user name & address */}
            <View style={{ alignItems: 'center', gap: 4 }}>
              <Text style={styles.userName}>{user && user.name}</Text>
              <Text style={styles.infotext}>{user?.address && user.address }</Text>
            </View>

            {/* email,phone and bio */}
            <View style={{ gap: 10 }}>
              <View style={styles.info}>
                <Icon name={'mail'} size={hp(2)} sixe={20} color={theme.colors.textLight} />
                <Text style={styles.infotext}>{user && user.email}</Text>
              </View>
              {
                user && user.phoneNumber && (
                  <View style={styles.info}>
                    <Icon name={'call'} size={hp(2)} sixe={20} color={theme.colors.textLight} />
                    <Text style={styles.infotext}>{user && user.phoneNumber}</Text>
                  </View>
                )
              }

              {
                user && user.bio && (
                  <Text style={styles.infotext}>{user.bio}</Text>
                )
              }

            </View>


          </View>
        </View>
      </View>
    )
  }

  return (
    <ScreenWrapper bg={'white'}>
      {/* header */}
      <UserHeader user={user} router={router} handleLogout={handleLogout} />
    </ScreenWrapper>
  )
}

export default Profile

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: wp(4),
  },
  logout: {
    position: 'absolute',
    right: 0,
    padding: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: '#fee2e2',
  },
  avatarContainer: {
    height: hp(12),
    width: hp(12),
    alignSelf: 'center',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: -12,
    padding: 7,
    borderRadius: 50,
    backgroundColor: 'white',
    shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  userName: {
    fontSize: hp(3),
    fontWeight: '500',
    color: theme.colors.textDark,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  infotext: {
    fontSize: hp(1.6),
    fontWeight: '500',
    color: theme.colors.textLight,
  }
})