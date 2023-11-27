import {ErrorMessage} from '@hookform/error-message'
import React, {forwardRef, useMemo} from 'react'
import {useController, useFormContext, useFormState} from 'react-hook-form'
import {StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from 'react-native'
import {Colors, horizontalScale, verticalScale, fontSize, TimeHelper} from '../../utils'
import {UILabel} from '../elements'

interface Props {
    isRequired?: boolean

    isButtonDocument?: boolean

    containerStyle?: StyleProp<ViewStyle>

    contentStyle?: StyleProp<ViewStyle>

    name?: any

    label?: any

    Icon?: any

    renderButton?: JSX.Element | undefined

    onPressButton: () => void

    isDate?: boolean
}

const ButtonPicker = forwardRef((props: Props, ref: any) => {
    const {
        isRequired,
        isButtonDocument,
        containerStyle,
        contentStyle,
        name,
        label,
        Icon,
        isDate,
        onPressButton,
        ...rest
    } = props

    const formContext = useFormContext()

    const {field} = useController({
        name,
        control: formContext.control,
        defaultValue: '',
    })

    const {errors} = useFormState({
        control: formContext.control,
    })

    const value = useMemo(() => {
        if (isDate && field.value) return TimeHelper.format(field.value, 'DD/MM/YYYY')
        return String(field.value)
    }, [field.value, isDate])

    return (
        <View style={containerStyle}>
            {label && <Text style={styles.label}>{`${label}${isRequired ? '*' : ''}`}</Text>}

            <TouchableOpacity
                ref={ref}
                activeOpacity={0.7}
                onPress={onPressButton}
                style={[styles.content, contentStyle]}>
                <UILabel numberOfLines={1} value={value} style={styles.input} {...rest} />

                <View style={isButtonDocument ? styles.viewButtonDocument : styles.viewButton}>
                    <Icon />
                </View>
            </TouchableOpacity>

            <ErrorMessage
                errors={errors}
                name={name}
                render={({message}) => {
                    return <Text style={styles.error}>{message}</Text>
                }}
            />
        </View>
    )
})

ButtonPicker.defaultProps = {
    isRequired: false,
    isButtonDocument: false,
    containerStyle: {},
    contentStyle: {},
    name: null,
    label: null,
    Icon: null,
    renderButton: undefined,
    isDate: false,
}

export default ButtonPicker

const styles = StyleSheet.create({
    label: {
        color: Colors.F4F5F6,
        fontSize: fontSize(13),
        marginBottom: verticalScale(7),
    },
    content: {
        alignItems: 'center',
        borderRadius: horizontalScale(8),
        backgroundColor: Colors.h000000,
        height: horizontalScale(44),
        paddingLeft: horizontalScale(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        flex: 1,
        fontSize: fontSize(14),
        color: Colors.F4F5F6,
        padding: 0,
        marginRight: horizontalScale(15),
    },
    error: {
        fontSize: fontSize(12),
        lineHeight: 14,
        color: 'red',
        marginTop: verticalScale(8),
    },
    textValueCode: {
        fontSize: fontSize(16),
        color: Colors.F4F5F6,
        marginRight: horizontalScale(5),
    },
    viewButtonDocument: {
        width: horizontalScale(34),
        height: horizontalScale(34),
        backgroundColor: '#32BA7C',
        borderRadius: horizontalScale(5),
        marginRight: horizontalScale(5),
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewButton: {
        padding: horizontalScale(7),
        marginRight: horizontalScale(5),
        alignItems: 'center',
        justifyContent: 'center',
    },
})
