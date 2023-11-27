import {ErrorMessage} from '@hookform/error-message'
import React, {forwardRef, useMemo, useState} from 'react'
import {useController, useFormContext, useFormState} from 'react-hook-form'
import {
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native'
import {Colors, horizontalScale, verticalScale, fontSize, TimeHelper} from '../../utils'
import {LocaleNamespace, useTranslation} from '@modules/common'
import {UILabel} from '../elements'
import {Icon} from '../icon'

type Props = TextInputProps & {
    fieldRef?: any

    containerStyle?: StyleProp<ViewStyle>

    contentStyle?: StyleProp<ViewStyle>

    styleValueCode?: StyleProp<TextStyle>

    name: string

    label?: string

    valueCode?: any

    formatter?: (value: string) => string

    onChangeText?: (value: string) => void

    isDate?: boolean

    isRequired?: boolean

    editable?: boolean

    isPasswordFeild?: boolean

    rightTitle?: any
}

const HFTextInput = forwardRef((props: Props, ref: any) => {
    const {
        isRequired,
        fieldRef,
        containerStyle,
        contentStyle,
        style,
        styleValueCode,
        name,
        label,
        isDate,
        editable = true,
        valueCode,
        isPasswordFeild,
        rightTitle,
        onChangeText,
        formatter,
        ...rest
    } = props

    const [focused, setFocused] = useState(false)

    const [isSecure, setSecure] = useState(true)

    const formContext = useFormContext()

    const t = useTranslation(LocaleNamespace.DEFAULT)

    const {field} = useController({
        name,
        control: formContext.control,
        defaultValue: '',
    })

    const {errors} = useFormState({
        control: formContext.control,
    })

    const onSubmitEditing = () => {
        if (fieldRef) {
            fieldRef.current.focus()
        }
    }

    const handlePress = () => {
        setSecure((prev: boolean) => {
            return !prev
        })
    }

    const handleFocus = () => {
        setFocused(true)
    }

    const handleBlur = () => {
        setFocused(false)
    }

    const value = useMemo(() => {
        if (isDate && field.value) return TimeHelper.format(field.value, 'DD/MM/YYYY')
        return String(field.value)
    }, [field.value, isDate])

    const backgroundColor = editable ? Colors.white : Colors.gray100
    const color = editable ? Colors.gray900 : Colors.gray600

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.row}>
                {label ? (
                    <UILabel value={label} style={styles.label}>
                        {isRequired && <UILabel value="*" color={Colors.hE9665F} />}
                    </UILabel>
                ) : (
                    <View />
                )}
                {rightTitle ? rightTitle() : <View />}
            </View>

            <View style={[styles.content, {backgroundColor}, contentStyle]}>
                {!!valueCode && <Text style={styles.textValueCode}>{valueCode}</Text>}

                <TextInput
                    {...rest}
                    ref={ref}
                    style={[styles.input, {color}, style]}
                    value={value}
                    editable={editable}
                    onChangeText={(value: string) => {
                        const formatted = formatter ? formatter(value) : value
                        field.onChange(formatted)
                        if (onChangeText) onChangeText(value)
                    }}
                    secureTextEntry={isPasswordFeild && isSecure}
                    onSubmitEditing={onSubmitEditing}
                    placeholderTextColor={Colors.gray400}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {isPasswordFeild && (
                    <Pressable style={styles.icon} onPress={handlePress}>
                        <Icon
                            icon={isSecure ? 'IC_EYE_CLOSE' : 'IC_EYE'}
                            size={horizontalScale(22)}
                        />
                    </Pressable>
                )}
            </View>

            <ErrorMessage
                errors={errors}
                name={name}
                render={({message}) => {
                    return message ? (
                        <UILabel value={' ' + t(message) || message} style={styles.error} />
                    ) : null
                }}
            />
        </View>
    )
})

HFTextInput.displayName = 'Form.TextInput'

HFTextInput.defaultProps = {
    fieldRef: null,
    containerStyle: {},
    contentStyle: {},
    styleValueCode: {},
    label: '',
    valueCode: null,
    formatter: undefined,
    onChangeText: undefined,
    isDate: false,
}

export default HFTextInput

const styles = StyleSheet.create({
    container: {
        marginBottom: verticalScale(16),
    },
    label: {
        color: Colors.gray700,
        fontSize: fontSize(14),
        marginBottom: verticalScale(7),
    },
    content: {
        alignItems: 'center',
        backgroundColor: 'white',
        height: verticalScale(54),
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: Colors.gray300,
        borderRadius: horizontalScale(10),
    },
    input: {
        flex: 1,
        fontSize: fontSize(16),
        color: Colors.gray900,
        padding: 0,
        paddingHorizontal: horizontalScale(15),
        height: '100%',
    },
    error: {
        fontSize: fontSize(12),
        lineHeight: 14,
        color: Colors.hE9665F,
        marginTop: verticalScale(8),
    },
    textValueCode: {
        fontSize: fontSize(16),
        color: Colors.pink,
        marginRight: horizontalScale(5),
    },
    icon: {
        marginRight: horizontalScale(15),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})
