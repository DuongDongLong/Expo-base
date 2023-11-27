import React from 'react'
import {StyleProp, StyleSheet, TextInput, TextInputProps, ViewStyle} from 'react-native'
import {Colors, horizontalScale, verticalScale, fontSize} from '../../utils'

type Props = TextInputProps & {
    style?: StyleProp<ViewStyle>

    viewInputStyle?: StyleProp<ViewStyle>

    onChangeText?: (text: string) => void
}

const HFSearchInput = (props: Props) => {
    const {viewInputStyle, style, onChangeText, ...rest} = props

    return (
        <TextInput
            {...rest}
            style={[styles.container, style]}
            onChangeText={onChangeText}
            placeholderTextColor={Colors.h8F8F8F}
        />
    )
}

HFSearchInput.displayName = 'Form.SearchInput'

HFSearchInput.defaultProps = {
    style: {},
    viewInputStyle: {},
    onChangeText: null,
}

export default HFSearchInput

export {HFSearchInput}

const styles = StyleSheet.create({
    container: {
        borderRadius: horizontalScale(8),
        backgroundColor: Colors.F4F5F6,
        height: verticalScale(56),
        paddingLeft: horizontalScale(15),
        fontSize: fontSize(16),
        color: Colors.h8F8F8F,
    },
})
