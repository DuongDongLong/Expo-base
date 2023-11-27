import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import _ from 'lodash'
import { React$Node } from '@modules/common'
import AppNavigation from './AppNavigation'

const App: () => React$Node = () => {
    return (
        <View style={styles.container}>
            <StatusBar translucent={true} barStyle="dark-content" backgroundColor="transparent" />

            <AppNavigation />
        </View>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
