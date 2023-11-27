import {Colors} from '@modules/core/utils'
import React from 'react'
import {StyleProp, Text, TextStyle} from 'react-native'

interface TextProps {
    value?: string
    style?: StyleProp<TextStyle> | undefined
    numberOfLines?: number
    fontSize?: number
    color?: string
    tagColor?: string
    lineHeight?: number
    children?: React.ReactNode
    fontWeight?:
        | 'normal'
        | 'bold'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900'
}
const UILabel = (props: TextProps) => {
    const {
        value,
        style,
        numberOfLines,
        fontSize,
        fontWeight,
        color = Colors.gray700,
        lineHeight,
        tagColor,
        children,
    } = props
    const container: TextStyle = {
        fontSize: fontSize || 16,
        fontWeight: fontWeight,
        color: color,
        lineHeight,
    }
    const isTagText = typeof value === 'string' ? (value || '')?.includes('<span>') : false
    const indexOfFirst = typeof value === 'string' ? (value || '')?.indexOf('<span>') : 0
    const indexOfSecond = typeof value === 'string' ? (value || '')?.indexOf('</span>') : 0

    const renderTagText = () => {
        return value ? (
            <Text>
                {value.slice(0, indexOfFirst)}
                <Text style={{color: tagColor}}>
                    {value.slice((indexOfFirst || 0) + 6, indexOfSecond)}
                </Text>
                {value.slice((indexOfSecond || 0) + 7)}
            </Text>
        ) : null
    }

    return (
        <Text style={[container, style]} numberOfLines={numberOfLines}>
            {isTagText ? renderTagText() : value}
            {children}
        </Text>
    )
}

UILabel.defaultProps = {
    fontWeight: '400',
}

export default UILabel
