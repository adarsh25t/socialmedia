

import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
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

const NewPost = () => {

  const { user } = useAuth()
  const bodyRef = useRef();
  const editorRef = useRef(null);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const onPick = (isImage) => {

  }

  const onSubmit = async () => {

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

          <View style={styles.media}>
            <Text>Add to your post</Text>
            <View style={{ flexDirection: 'row', gap: 15, alignItems: 'center' }}>
              <TouchableOpacity onPress={() => onPick(true)}>
                  <Icon name={'image'} size={30} color={theme.colors.dark}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPick(false)}>
                  <Icon name={'video'} size={30} color={theme.colors.dark}/>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Button 
            title={"Post"}
            buttonStyle={{height:hp(6.2)}}
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
  }
})

export default NewPost