import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import ScreenWrapper from '../components/ScreenWrapper'
import Loading from '../components/Loading'
export default function index() {

  return (
    <ScreenWrapper>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loading />
      </View>
    </ScreenWrapper>
  )
}