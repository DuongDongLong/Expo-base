import {
    CameraOptions,
    ImageLibraryOptions,
    ImagePickerResponse,
    launchCamera,
    launchImageLibrary,
} from 'react-native-image-picker'

export class ImagePicker {
    private static optionsDefault: CameraOptions | ImageLibraryOptions = {
        mediaType: 'photo',
        quality: 0.8,
        maxHeight: 800,
        maxWidth: 800,
    }

    public static async lauchCamera(options?: CameraOptions): Promise<ImagePickerResponse> {
        const result = await launchCamera({...this.optionsDefault, ...options})

        return result
    }

    public static async launchImageLibrary(
        options?: ImageLibraryOptions,
    ): Promise<ImagePickerResponse> {
        const result = await launchImageLibrary({...this.optionsDefault, ...options})

        return result
    }
}
