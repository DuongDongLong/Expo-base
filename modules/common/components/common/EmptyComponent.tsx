import { UILabel } from '@modules/core/components'
import { Colors, fontSize, horizontalScale, verticalScale } from '@modules/core/utils'
import React from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'

type EmptyViewProps = ViewProps & {
    title?: string
    content?: string
}

const EmptyView = (props: EmptyViewProps) => {
    const { style, title, content, ...rest } = props

    return (
        <View {...rest} style={[styles.container, style]}>
            {title && <UILabel style={styles.textTitle} value={title} />}
            <UILabel style={styles.textContent} value={content} />
        </View>
    )
}

EmptyView.defaultProps = {
    title: null,
    content: null,
}

export default EmptyView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: horizontalScale(30),
    },
    textTitle: {
        fontSize: fontSize(24),
        color: Colors.hD2232A,
    },
    textContent: {
        marginTop: verticalScale(5),
        marginBottom: verticalScale(20),
        fontSize: fontSize(18),
        lineHeight: fontSize(30),
        textAlign: 'center',
    },
})
