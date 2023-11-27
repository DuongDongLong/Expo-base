import React from 'react'
import {StyleSheet} from 'react-native'
import {Colors, fontSize} from '../../utils'
import {UILabel} from '../elements'

interface HeaderTitleProps {
    title?: string

    style?: any
}

const HeaderTitle = ({title, style}: HeaderTitleProps) => {
    return <UILabel value={title} style={[styles.title, style]} />
}

HeaderTitle.defaultProps = {
    title: null,
    style: {},
}

export default HeaderTitle

const styles = StyleSheet.create({
    title: {
        fontSize: fontSize(16),
        color: 'white',
    },
})
