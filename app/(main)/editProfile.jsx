import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer';
import ScreenWrapper from '../../components/ScreenWrapper'
import Header from '../../components/Header'
import { hp, wp } from '../../helpers/common'
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import { getUserImageSrc, uploadFile } from '../../services/imageService';
import Icon from '../../assets/icons';
import { theme } from '../../constants/theme';
import Input from '../../components/TextInput';
import Button from '../../components/Button';
import { updateUserData } from '../../services/userService';

const EditProfile = () => {

    const { user: currentUser, setUserData } = useAuth()
    const router = useRouter();

    const [user, setUser] = useState({
        name: '',
        image: null,
        bio: '',
        address: '',
        phoneNumber: ''
    });
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (currentUser) {
            setUser({
                name: currentUser?.name,
                image: currentUser?.image,
                bio: currentUser?.bio,
                address: currentUser?.address,
                phoneNumber: currentUser?.phoneNumber
            })
        }
    }, [currentUser])

    const onPickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
        });
        if (!result.canceled) {
            setUser({ ...user, image: result.assets[0] });
        }

    }

    const onSubmit = async () => {
        const userData = { ...user };
        setLoading(true);
        console.log("userData.image", userData.image);
        
        if(typeof userData.image === 'object') {
            console.log('upload'); 
            
            // upload image
            let imageRes = await uploadFile('profiles',userData.image.uri,true)
            if(imageRes.success) {
                userData.image = imageRes.data
            }
            else {
                userData.image = null
            }
        }

        //* update user
        const res = await updateUserData(currentUser?.id, userData);
        setLoading(false);
        if (res.success) {
            setUserData({ ...currentUser, ...userData });
            router.back();
        }
        else {
            Alert.alert("Profile Update", res.message);
        }
    }

    const imageSource = user.image && typeof user.image === 'object' ? user.image.uri : getUserImageSrc(user?.image);

    return (
        <ScreenWrapper bg={'white'}>
            <View style={styles.container}>
                <ScrollView>
                    <Header title={"Edit Profile"} showBackButton mb={20} />

                    {/* form */}
                    <View style={styles.form}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={imageSource}
                                transition={100}
                                style={styles.avatar}
                            />
                            <Pressable style={styles.cameraIcon} onPress={onPickImage}>
                                <Icon name={'camera'} strokeWidth={2.5} size={20} />
                            </Pressable>
                        </View>

                        <Text style={{ fontSize: hp(1.5), color: theme.colors.text }}>
                            Please fill your profile details
                        </Text>

                        <Input
                            icon={<Icon name={'user'} />}
                            placeholder={"Enter your name"}
                            value={user?.name}
                            onChangeText={value => setUser({ ...user, name: value })}
                        />

                        <Input
                            icon={<Icon name={'call'} />}
                            placeholder={"Enter your phone number"}
                            value={user?.phoneNumber}
                            onChangeText={value => setUser({ ...user, phoneNumber: value })}
                        />

                        <Input
                            icon={<Icon name={'location'} />}
                            placeholder={"Enter your address"}
                            value={user?.address}
                            onChangeText={value => setUser({ ...user, address: value })}
                        />

                        <Input
                            placeholder={"Enter your phone bio"}
                            value={user?.bio}
                            multiline={true}
                            containerStyle={styles.bio}
                            onChangeText={value => setUser({ ...user, bio: value })}
                        />

                        <Button
                            title={'Update'}
                            loading={loading}
                            onPress={onSubmit} />
                    </View>
                </ScrollView>
            </View>
        </ScreenWrapper>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp(4)
    },
    form: {
        gap: 25
    },
    avatarContainer: {
        height: hp(12),
        width: hp(12),
        alignSelf: 'center',
    },
    avatar: {
        height: hp(12),
        width: hp(12),
        borderRadius: theme.radius.xxl * 1.4,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        overflow: 'hidden'
    },
    cameraIcon: {
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
    bio: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        height: hp(15),
        paddingVertical: 15
    }
})