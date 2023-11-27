import { horizontalScale } from '@modules/core/utils'
import * as React from 'react'
import { FlexAlignType, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
// import { flatten } from 'ramda'

const CONTAINER: ViewStyle = {
    height: horizontalScale(8),
}

export interface SpaceProps {
    /**
     * An optional style override useful for padding & margin.
     */
    style?: StyleProp<ViewStyle>
    height?: number | string
    width?: number | string
    color?: string
    align?: FlexAlignType
}

/**
 * Describe your component here
 */
const Space = (props: SpaceProps) => {
    const { style, height, width = '100%', color } = props
    const styles = StyleSheet.flatten([CONTAINER, { height, width, backgroundColor: color }, style])
    return <View style={styles} />
}

export default Space