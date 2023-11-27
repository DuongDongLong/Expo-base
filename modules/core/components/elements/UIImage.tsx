import { Colors, IMAGES } from "@modules/core/utils"
import * as React from "react"
import { ActivityIndicator, ImageSourcePropType, StyleProp, View, ViewStyle } from "react-native"
import FastImage, { FastImageProps, ImageStyle, Source } from "react-native-fast-image"

export interface FastImagePropType extends Partial<FastImageProps> {
    /**
     * An optional style for container
     */
    containerStyle?: StyleProp<ViewStyle>
    /**
     * An optional style override useful for padding & margin.
     */
    style?: StyleProp<ImageStyle>
    /**
     * An optional style override useful for backgroundColor loading.
     */
    styleLoading?: StyleProp<ViewStyle>
    /**
     * Source url
     */
    uri: string | Source
    /**
     * Error image placeholder
     */
    placeholder?: ImageSourcePropType
  }
  

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export const UIImage =(props: FastImagePropType) => {
  // grab the props
  const { containerStyle, style, styleLoading, uri, placeholder, ...args } = props

  const [loading, setLoading] = React.useState(true)
  const [placeHolderImage, setPlaceHolderImage] = React.useState(
    uri ? null : placeholder || IMAGES.PLACEHOLDER_156x130,
  )
  
  React.useEffect(() => {
    setPlaceHolderImage(uri ? null : placeholder || IMAGES.PLACEHOLDER_156x130)
  }, [uri])

  const onImageLoad = () => {
    setLoading(false)
  }
  const onErrorLoad = () => {
    setPlaceHolderImage(placeholder || IMAGES.PLACEHOLDER_156x130)
    setLoading(false)
  }

  return (
    <View style={[ROOT, containerStyle]}>
      <FastImage
        style={[IMAGE, style]}
        {...args}
        source={!placeHolderImage ? (typeof uri === "string" ? { uri } : uri) : placeHolderImage}
        onLoad={onImageLoad}
        onError={onErrorLoad}
      />
      {loading && (
        <View style={[VIEW_LOADING, styleLoading]}>
          <ActivityIndicator size={"small"} color={Colors.turquoise} />
        </View>
      )}
    </View>
  )
}

UIImage.displayName = "UIImage"

const ROOT: ViewStyle = {
  width: 100,
  height: 100,
  overflow: "hidden",
}

const IMAGE: ImageStyle = {
  width: "100%",
  height: "100%",
}

const VIEW_LOADING: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  justifyContent: "center",
  alignItems: "center",
}
