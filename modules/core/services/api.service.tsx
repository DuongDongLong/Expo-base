import axios from 'axios'
import qs from 'qs'
import {
    getOAuthToken,
    setOAuthToken,
    NavigationUtil,
    removeOAuthToken,
    removeUserInfo,
    getFCMToken,
} from '../utils'
import {BASE_URL} from './url.service'

enum ERROR_CODE {
    EXPRIED_ACCESS_TOKEN = 401,

    EXPRIED_REFRESH_TOKEN = 403,

    SIGNED_IN_ANOTHER_DEVICE = 52,
}

const instance = axios.create({timeout: 50000, baseURL: BASE_URL})

instance.interceptors.response.use(
    config => {
        return Promise.resolve(config)
    },
    async error => {
        return new Promise((resolve, reject) => {
            const {status} = error.response || {}
            if (status) {
                switch (status) {
                    case ERROR_CODE.EXPRIED_ACCESS_TOKEN:
                        resolve(refreshToken(error))
                        break

                    case ERROR_CODE.EXPRIED_REFRESH_TOKEN:
                    case ERROR_CODE.SIGNED_IN_ANOTHER_DEVICE:
                        cleanStorage()
                        break

                    default:
                        break
                }
            }
            reject(error)
        })
    },
)

const handleError = (error: any, url?: any) => {
    if (error.response) {
        const {data, status} = error.response || {}
        const {message} = data || {}
        console.log(`Error data ${url} with ${JSON.stringify(data)}`)
        return {message, status}
    }
    return error
}

const preprocessResponse = (result: any) => {
    const {success} = result || {}

    if (success) {
        return result
    }
    return result
}

const refreshToken = async (error: any) => {
    const oAuth = await getOAuthToken()
    const token_device = await getFCMToken()
    const {refresh_token}: any = oAuth || {}
    const originalRequest = error.config
    const result = await ApiService.post('/auth/refresh-token', {refresh_token, token_device})
        .then((result: any) => {
            const {refresh_token, token} = result || {}
            if (token) {
                originalRequest.headers.Authorization = `Bearer ${token}`

                setOAuthToken({...oAuth, token, refresh_token})
                return instance(originalRequest)
            }
            return result
        })
        .catch(error => {
            return error
        })

    return result
}

const cleanStorage = () => {
    removeOAuthToken()
    removeUserInfo()
    NavigationUtil.reset()
}

export class ApiService {
    static async getHeader() {
        const oAuth = await getOAuthToken()
        const {token}: any = oAuth || {}

        return {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }

    static async getHeaderFormData() {
        return {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        }
    }

    static async get(url: string, params?: any) {
        console.log(`Get call api ${url} with data ${JSON.stringify(params)}`)
        const header = await this.getHeader()

        return instance
            .get(url, {
                headers: header,
                params,
                paramsSerializer: params => {
                    return qs.stringify(params, {arrayFormat: 'repeat'})
                },
            })
            .then(result => {
                console.log(`Response api ${url} with`, result.data)
                return result.data
            })
            .then(result => {
                return preprocessResponse(result)
            })
            .catch(e => {
                throw handleError(e, url)
            })
    }

    static async post(url: string, data?: any) {
        console.log(`Post call api ${url} with data ${JSON.stringify(data)}`)
        const header = await this.getHeader()

        return instance({
            method: 'post',
            url,
            headers: header,
            data,
        })
            .then(result => {
                console.log(`Response api ${url} with`, result.data)
                return result.data
            })
            .then(result => {
                return preprocessResponse(result)
            })
            .catch(e => {
                throw handleError(e, url)
            })
    }

    static async put(url: string, data?: any) {
        console.log(`Put call api ${url} with data ${JSON.stringify(data)}`)
        return instance({
            method: 'put',
            url,
            headers: await this.getHeader(),
            data,
        })
            .then(result => {
                console.log(`Response api ${url} with`, result.data)
                return result.data
            })
            .then(result => {
                return preprocessResponse(result)
            })
            .catch(e => {
                throw handleError(e, url)
            })
    }

    static async delete(url: string, data?: any) {
        console.log(`Delete call api ${url} with data ${JSON.stringify(data)}`)
        return instance({
            method: 'delete',
            url,
            headers: await this.getHeader(),
            data,
        })
            .then(result => {
                console.log(`Response api ${url} with`, result.data)
                return result.data
            })
            .then(result => {
                return preprocessResponse(result)
            })
            .catch(e => {
                throw handleError(e, url)
            })
    }

    static async downloadRib(url: string, params?: any) {
        console.log(`Get call api ${url} with data ${JSON.stringify(params)}`)
        const header = await this.getHeader()

        return instance
            .get(url, {
                headers: {...header, 'Content-Type': 'application/octet-stream'},
                params,
                responseType: 'blob',
                paramsSerializer: params => {
                    return qs.stringify(params, {arrayFormat: 'repeat'})
                },
            })
            .then(result => {
                console.log(`Response api ${url} with`, result.data)
                return result.data
            })
            .then(result => {
                return preprocessResponse(result)
            })
            .catch(e => {
                throw handleError(e, url)
            })
    }

    static async uploadFile(body?: {uri: string; name: string; type: string}) {
        var photo = {
            uri: body?.uri,
            type: body?.type,
            name: 'photo.jpg',
        }

        var form = new FormData()
        form.append('file', photo)
        const header = await this.getHeader()
        return instance({
            method: 'post',
            url: '/files',
            headers: {...header, 'Content-Type': 'multipart/form-data'},
            data: form,
        })
            .then(async result => {
                return result?.data?.url
            })
            .catch(e => {
                throw handleError(e)
            })
    }
}
