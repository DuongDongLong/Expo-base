import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {horizontalScale, IconBackWhite} from '../../utils'

interface ButtonBackProps {
    Icon?: any

    style?: any

    styleButton?: any

    onPressButton?: () => void
}

const ButtonBack = (props: ButtonBackProps) => {
    const navigation = useNavigation()

    const {style, styleButton, Icon, onPressButton} = props

    const onPressButtonBack = () => {
        if (onPressButton) {
            onPressButton()
        } else {
            navigation.goBack()
        }
    }

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.button, style]}
            onPress={onPressButtonBack}>
            {Icon ? <Icon /> : <IconBackWhite style={styleButton} />}
        </TouchableOpacity>
    )
}

ButtonBack.defaultProps = {
    Icon: null,
    style: {},
    styleButton: {},
    onPressButton: undefined,
}

export default ButtonBack

const styles = StyleSheet.create({
    button: {
        padding: horizontalScale(10),
    },
})
