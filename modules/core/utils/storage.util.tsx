import AsyncStorage from '@react-native-async-storage/async-storage'

enum STORRAGE_KEY {
    TOKEN = 'Token',
    FCM_TOKEN = 'FCM_Token',
    USER = 'User',
    LANGUARE = 'LANGUARE',
}

export const setOAuthToken = async (value: string) => {
    try {
        await AsyncStorage.setItem(STORRAGE_KEY.TOKEN, JSON.stringify(value))
    } catch (e) {}
}

export const getOAuthToken = async () => {
    try {
        const data: any = await AsyncStorage.getItem(STORRAGE_KEY.TOKEN)
        return JSON.parse(data)
    } catch (e) {
        return null
    }
}

export const removeOAuthToken = async () => {
    try {
        await AsyncStorage.removeItem(STORRAGE_KEY.TOKEN)
    } catch (e) {}
}

export const setUserInfo = async (value: object) => {
    try {
        await AsyncStorage.setItem(STORRAGE_KEY.USER, JSON.stringify(value))
    } catch (e) {}
}

export const getUserInfo = async () => {
    try {
        const data: any = await AsyncStorage.getItem(STORRAGE_KEY.USER)
        return JSON.parse(data)
    } catch (e) {
        return null
    }
}

export const removeUserInfo = async () => {
    try {
        await AsyncStorage.removeItem(STORRAGE_KEY.USER)
    } catch (e) {}
}

export const setFCMToken = async (value: string) => {
    try {
        await AsyncStorage.setItem(STORRAGE_KEY.FCM_TOKEN, JSON.stringify(value))
    } catch (e) {}
}

export const getFCMToken = async () => {
    try {
        const data: any = await AsyncStorage.getItem(STORRAGE_KEY.FCM_TOKEN)
        return JSON.parse(data)
    } catch (e) {
        return null
    }
}

export const removeFCMToken = async () => {
    try {
        await AsyncStorage.removeItem(STORRAGE_KEY.FCM_TOKEN)
    } catch (e) {}
}

export const setLanguare = async (value: string) => {
    try {
        await AsyncStorage.setItem(STORRAGE_KEY.LANGUARE, JSON.stringify(value))
    } catch (e) {}
}

export const getLanguare = async () => {
    try {
        const data: any = await AsyncStorage.getItem(STORRAGE_KEY.LANGUARE)
        return JSON.parse(data)
    } catch (e) {
        return null
    }
}