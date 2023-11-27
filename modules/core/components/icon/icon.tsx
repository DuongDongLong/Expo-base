import * as React from 'react'
import {View, ImageStyle, Image} from 'react-native'
import {IconProps} from './icon.props'
import {IMAGES, horizontalScale} from '@modules/core/utils'

const ICON_SIZE = horizontalScale(20)

const ROOT: ImageStyle = {
    width: horizontalScale(ICON_SIZE),
    height: horizontalScale(ICON_SIZE),
}

export function Icon(props: IconProps) {
    const {style: styleOverride, icon, containerStyle, color, size} = props

    const iconStyle = size
        ? {
              width: size,
              height: size,
          }
        : ROOT
    return (
        <View style={containerStyle}>
            <Image
                style={[iconStyle, styleOverride, {tintColor: color}]}
                source={IMAGES[icon]}
                resizeMode="contain"
            />
        </View>
    )
}
