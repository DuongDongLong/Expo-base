import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {horizontalScale} from '../../utils'

interface HeaderRightProps {
    Icon?: any

    styleButton?: any

    onPressButton?: () => void
}

const HeaderRigth = (props: HeaderRightProps) => {
    const {Icon, styleButton, onPressButton} = props

    const onPressButtonBack = () => {
        if (onPressButton) {
            onPressButton()
        }
    }

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.button, styleButton]}
            onPress={onPressButtonBack}>
            <Icon />
        </TouchableOpacity>
    )
}

HeaderRigth.defaultProps = {
    Icon: null,
    styleButton: {},
    onPressButton: undefined,
}

export default HeaderRigth

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: horizontalScale(10),
    },
})
