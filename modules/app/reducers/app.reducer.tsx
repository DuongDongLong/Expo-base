import {TOAST_TYPE} from '@modules/common'
import {createSlice} from '@reduxjs/toolkit'

interface AppProps {
    messageError?: {
        message?: string

        type?: string
    }
}

const initialState: AppProps = {
    messageError: {message: undefined, type: TOAST_TYPE.FAILURE},
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        actionPushMessageError(state, action) {
            return {
                ...state,
                messageError: action.payload,
            }
        },
    },
})

export const {actionPushMessageError} = appSlice.actions
export default appSlice.reducer
