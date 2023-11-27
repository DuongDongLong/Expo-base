import {combineReducers} from '@reduxjs/toolkit'
import appSlice from './app.reducer'

export * from './app.reducer'
import loadingSlice from './loading.reducer'
import { authReducers } from '@modules/auth/reducers'

const appReducer = combineReducers({
    app: appSlice,
    loading: loadingSlice,
    ...authReducers
})

const rootReducer = (state: any, action: any) => {
    const {type} = action || {}

    if (type === 'signOut/actionSignOut') {
        return appReducer(undefined, {type: undefined})
    }

    return appReducer(state, action)
}

export default rootReducer
