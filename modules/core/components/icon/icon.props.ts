import { ImageTypes } from "@modules/core"
import { ImageStyle, StyleProp, ViewStyle } from "react-native"

export interface IconProps {
  /**
   * Style overrides for the icon image
   */
  style?: StyleProp<ImageStyle>

  /**
   * Style overrides for the icon container
   */

  containerStyle?: StyleProp<ViewStyle>

  /**
   * The name of the icon
   */

  icon: ImageTypes


  color?:string


  size?:number
}
