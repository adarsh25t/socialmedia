

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable, Alert } from 'react-native'
import { Image } from 'expo-image';
import React, { useRef, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { Video, ResizeMode } from 'expo-av';
import ScreenWrapper from '../../components/ScreenWrapper'
import Header from '../../components/Header'
import { hp, wp } from '../../helpers/common'
import { useAuth } from '../../context/AuthContext'
import Avatar from '../../components/Avatar'
import { theme } from '../../constants/theme'
import RichTextEditor from '../../components/RichTextEditor'
import { useRouter } from 'expo-router'
import Icon from '../../assets/icons'
import Button from '../../components/Button'
import { getSupabaseFileUrl } from '../../services/imageService';
import { createPostOrUpdatePost } from '../../services/postSwervice';

const NewPost = () => {

  const { user } = useAuth()
  const bodyRef = useRef();
  const editorRef = useRef(null);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const onPick = async (isImage) => {

    let mediaConfig = {
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    }

    if (!isImage) {
      mediaConfig = {
        mediaTypes: ['videos'],
        allowsEditing: true
      }
    }
    let result = await ImagePicker.launchImageLibraryAsync(mediaConfig);

    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  }

  const isLocalFile = file => {
    if (!file) return null;
    if (typeof file == 'object') return true;
    return false;
  }
  const getFilePath = (file) => {
    if (!file) return null;
    if (isLocalFile(file)) {
      return file.type;
    }

    //* check image or video for remote file
    if (file.includes('postImages')) {
      return 'image';
    }
    return 'video';
  }

  const getFileUri = (file) => {
    if (!file) return null;
    if (isLocalFile(file)) {
      return file.uri;
    }

    return getSupabaseFileUrl(file)?.uri;
  }

  const onSubmit = async () => {
    if (!bodyRef || !file) {
      Alert.alert("Create Post", "Please choose an image or add post body");
      return;
    }

    let data = {
      file,
      body: bodyRef.current,
      userId: user?.id,
    }

    setLoading(true);
    let res = await createPostOrUpdatePost(data);
    setLoading(false);
    if (res.success) {
      setFile(null);
      bodyRef.current = '';
      editorRef.current?.setContentHTML('');
      router.back();
    }
    else {
      Alert.alert("Create Post", res.message);
    }

  }

  return (
    <ScreenWrapper bg={'white'}>
      <View style={styles.container}>
        <Header title={"Create Post"} showBackButton={true} />
        <ScrollView contentContainerStyle={{ gap: 20 }}>
          {/* header */}
          <View style={styles.header}>
            <Avatar
              uri={user.image}
              size={hp(6.5)}
              rounded={theme.radius.xl}
            />
            <View style={{ gap: 2 }}>
              {
                user && user.name && (<Text style={styles.username}>{user.name}</Text>)
              }
              <Text style={styles.publicText}>Public</Text>
            </View>
          </View>

          {/* text editor */}
          <View style={styles.textEditor}>
            <RichTextEditor
              editorRef={editorRef}
              onChange={body => bodyRef.current = body}
            />
          </View>

          {file && (<View style={styles.file}>
            {
              getFilePath(file) == "video" ? (
                <>
                  <Video
                    style={{ flex: 1 }}
                    source={{ uri: getFileUri(file) }}
                    useNativeControls
                    resizeMode={ResizeMode.COVER}
                    isLooping
                  />
                </>) :
                (<>
                  <Image
                    source={{ uri: getFileUri(file) }}
                    contentFit="cover"
                    style={{ flex: 1 }}
                  />
                </>)
            }
            <Pressable style={styles.closeIcon} onPress={() => setFile(null)}>
              <Icon name={'delete'} size={20} color={'#fff'} />
            </Pressable>
          </View>)}

          <View style={styles.media}>
            <Text>Add to your post</Text>
            <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
              <TouchableOpacity onPress={() => onPick(true)}>
                <Icon name={'image'} size={30} color={theme.colors.dark} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPick(false)}>
                <Icon name={'video'} size={30} color={theme.colors.dark} />
              </TouchableOpacity>
            </View>
          </View>


        </ScrollView>
        <Button
          title={"Post"}
          buttonStyle={{ height: hp(6.2) }}
          onPress={onSubmit}
          loading={loading}
          hasShadow={false}
        />
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    paddingHorizontal: wp(4),
    gap: 15
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  username: {
    fontSize: hp(2.2),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text
  },
  publicText: {
    fontSize: hp(1.7),
    fontWeight: theme.fonts.medium,
    color: theme.colors.textLight
  },
  media: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    padding: 12,
    paddingHorizontal: 18,
    borderRadius: theme.radius.xl,
    borderColor: theme.colors.gray,
    borderCurve: "continuous"
  },
  file: {
    height: hp(30),
    width: "100%",
    borderRadius: theme.radius.xl,
    overflow: "hidden",
    borderCurve: 'continuous'
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(225,0,0,0.6)',
    padding: 5,
    borderRadius: 50
  }
})

export default NewPost