import { createSlice } from "@reduxjs/toolkit";
import { actionSignIn } from "../actions";

interface SignInState {
    signInLoading: boolean

    signInSuccess?: any

    signInFailure: any,

    switchBoolean?: boolean
}

const initialState = {
    signInLoading: false,

    signInSuccess: undefined,

    signInFailure: undefined,

    switchBoolean: false
} as SignInState

const signinSlice = createSlice({
    name: "signin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actionSignIn.pending, (state, _action) => {
            state.signInLoading = false
        })

        builder.addCase(actionSignIn.fulfilled, (state, action) => {
            const { payload } = action

            state.signInLoading = false
            state.signInSuccess = payload
        })

        builder.addCase(actionSignIn.rejected, (state, action) => {
            const { payload } = action

            state.signInLoading = false
            state.signInFailure = payload
        })

    }
})

export default signinSlice.reducer