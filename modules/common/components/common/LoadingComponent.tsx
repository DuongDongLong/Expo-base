import { Colors } from '@modules/core/utils'
import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

const LoadingComponent = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="small" color={Colors.hFCFCFD} />
        </View>
    )
}

export default LoadingComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
