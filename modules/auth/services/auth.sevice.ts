import { ApiService } from '@modules/core'

export const signUp = (data: any) => {
    return ApiService.post({ url: 'driver/register', data })
}

export const signInUser = (data: any) => {
    return ApiService.post({ url: 'driver/sign-in', data })
}
