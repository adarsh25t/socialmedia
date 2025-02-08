
import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function ScreenWrapper({ children, bg }) {

    //* Get the top inset value from the safe area insets, and calculate the padding top value
    //* If the top inset is greater than 0, add 5 to it, otherwise use a default value of 30
    const { top } = useSafeAreaInsets();
    console.log('====================================');
    console.log(top);
    console.log('====================================');
    const paddingTop = top > 0 ? top + 5 : 10;

    return (
        <View style={{ flex: 1, backgroundColor: bg, paddingTop }}>
            {children}
        </View>
    )
}