import React, {FC} from 'react'
import {
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    TouchableOpacityProps,
    ActivityIndicator,
    Keyboard,
    ViewProps,
    View,
} from 'react-native'
import {SvgProps} from 'react-native-svg'
import {Colors, fontSize, horizontalScale, verticalScale} from '../../utils'
import {UISpace} from '../elements'

type Props = TouchableOpacityProps & {
    labelStyle?: StyleProp<TextStyle>

    label: string

    uppercase?: boolean

    disabled?: boolean

    loading?: boolean

    primary?: boolean

    onPress?: () => void

    Icon?: FC<SvgProps> | FC<ViewProps>

    dismissKeyboard?: boolean
}

const ButtonPrimary = (props: Props) => {
    const {
        style,
        dismissKeyboard,
        labelStyle,
        label,
        uppercase,
        disabled,
        loading,
        primary,
        onPress,
        Icon,
        ...rest
    } = props
    const backgroundColor = !primary ? Colors.white : disabled ? Colors.gray200 : Colors.pink
    const indicatorColor = !primary ? Colors.pink : Colors.white

    const shadow = primary ? styles.shadow : {}
    const borderWidth = primary ? 0 : 1
    const color = disabled ? Colors.gray400 : primary ? Colors.white : Colors.pink
    const onPressButton = () => {
        dismissKeyboard && Keyboard.dismiss()
        onPress && onPress()
    }
    return (
        <TouchableOpacity
            {...rest}
            disabled={loading ? true : disabled}
            onPress={onPressButton}
            activeOpacity={0.7}
            style={[styles.button, shadow, {backgroundColor, borderWidth}, style]}>
            {!loading ? (
                <View style={styles.row}>
                    {Icon && (
                        <>
                            <Icon />
                            <UISpace width={verticalScale(14)} />
                        </>
                    )}
                    <Text
                        style={[styles.label, {color}, uppercase && styles.uppercase, labelStyle]}>
                        {label}
                    </Text>
                </View>
            ) : (
                <ActivityIndicator size="small" color={indicatorColor} />
            )}
        </TouchableOpacity>
    )
}

ButtonPrimary.defaultProps = {
    labelStyle: {},

    uppercase: true,

    disabled: false,

    loading: false,

    dismissKeyboard: true,
}

export default ButtonPrimary

const styles = StyleSheet.create({
    button: {
        height: verticalScale(52),
        backgroundColor: Colors.pink,
        borderRadius: horizontalScale(8),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.pink,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        color: 'white',
        fontSize: fontSize(16),
        fontWeight: '700',
    },
    uppercase: {
        textTransform: 'uppercase',
    },
    shadow: {
        shadowColor: 'rgba(16, 24, 40, 0.05)',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 4,
        elevation: 2,
    },
})
