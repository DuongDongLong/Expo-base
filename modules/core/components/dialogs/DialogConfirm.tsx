import { LocaleNamespace } from '@modules/common/constants'
import { useTranslation } from '@modules/common/hooks'
import React from 'react'
import { GestureResponderEvent, Modal, StyleSheet, View, ViewProps } from 'react-native'
import { Colors, fontSize, horizontalScale, verticalScale } from '../../utils'
import { Button } from '../buttons'
import { UILabel } from '../elements'

type DialogConfirmProps = ViewProps & {
    title?: string

    content?: string

    isShowing?: boolean

    onPressCancel?: (event: GestureResponderEvent) => void

    onPressContinue?: (event: GestureResponderEvent) => void
}

const DialogConfirm = (props: DialogConfirmProps) => {
    const translate = useTranslation(LocaleNamespace.DEFAULT)

    const { style, title, content, isShowing, onPressCancel, onPressContinue, ...rest } = props

    return (
        <Modal animationType="fade" transparent={true} visible={isShowing}>
            <View style={styles.viewModal}>
                <View {...rest} style={[styles.container, style]}>
                    {title && <UILabel style={styles.textTitle} value={title} />}
                    <UILabel style={styles.textContent} value={content} />
                    <View style={styles.viewBottom}>
                        <Button.Primary
                            style={styles.viewBtn}
                            label={translate('CANCEL')}
                            labelStyle={styles.textBtn}
                            onPress={onPressCancel}
                        />

                        <Button.Primary
                            style={styles.viewBtn}
                            label={translate('CONTINUE')}
                            labelStyle={styles.textBtn}
                            onPress={onPressContinue}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

DialogConfirm.defaultProps = {
    title: null,
    content: null,
    onPressDelete: null,
    onPressCancel: null,
    isShowing: false,
}

export default DialogConfirm

const styles = StyleSheet.create({
    viewModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.h2F3237,
    },
    container: {
        alignItems: 'center',
        backgroundColor: Colors.hFCFCFD,
        borderRadius: horizontalScale(14),
        paddingVertical: verticalScale(15),
        paddingHorizontal: horizontalScale(20),
        margin: verticalScale(20),
        shadowColor: Colors.h000000,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textTitle: {
        fontSize: fontSize(24),
        color: Colors.hD2232A,
    },
    textContent: {
        marginBottom: verticalScale(28),
        lineHeight: fontSize(22),
        textAlign: 'center',
    },
    viewBottom: {
        flexDirection: 'row',
    },
    viewBtn: {
        flex: 1,
        height: verticalScale(44),
        borderRadius: horizontalScale(10),
    },
    viewIconLeftStyle: {
        marginRight: horizontalScale(5),
    },
    textBtn: {
        fontSize: fontSize(16),
    },
})
