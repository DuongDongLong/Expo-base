import { UILabel } from '@modules/core/components'
import { Colors, fontSize, horizontalScale, verticalScale, IconBackWhite } from '@modules/core/utils'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'

interface HeaderProps {
    title?: string

    styleLinear?: any

    style?: any

    styleTitle?: any

    styleButton?: any

    isShowIconRight?: any

    iconRight?: any

    onClickRight?: () => void

    onClickLeft?: () => void
}

const HeaderComponent = (props: HeaderProps) => {
    const { title, style, styleTitle, isShowIconRight, iconRight, onClickRight, onClickLeft } = props

    const navigation = useNavigation()

    const onPressButtonLeft = () => {
        if (onClickLeft) {
            onClickLeft()
        } else {
            navigation.goBack()
        }
    }

    const renderViewRight = () => {
        return (
            <TouchableOpacity activeOpacity={0.7} style={styles.buttonRight} onPress={onClickRight}>
                {iconRight}
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <SafeAreaView>
                <View style={[styles.container, style]}>
                    <TouchableOpacity onPress={onPressButtonLeft}>
                        <IconBackWhite />
                    </TouchableOpacity>
                    <UILabel numberOfLines={1} value={title} style={[styles.title, styleTitle]} />
                    <View style={styles.viewRight}>
                        {isShowIconRight ? renderViewRight() : <View />}
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default HeaderComponent

const styles = StyleSheet.create({
    gradient: {
        height: verticalScale(92),
    },
    container: {
        height: verticalScale(56),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: horizontalScale(14),
        justifyContent: 'space-between',
    },
    buttonLeft: {
        paddingVertical: horizontalScale(5),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        width: horizontalScale(40),
        height: horizontalScale(40),
        borderRadius: horizontalScale(20),
    },
    title: {
        flex: 1,
        color: Colors.hFFFFFF,
        fontSize: fontSize(16),
        fontWeight: '700',
        textAlign: 'center',
        paddingHorizontal: horizontalScale(10),
    },
    viewRight: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonRight: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: horizontalScale(10),
    },
})
