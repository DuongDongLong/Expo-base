import { createAsyncThunk } from "@reduxjs/toolkit";
import { PLogin } from "../types";
import { actionPushMessageError } from "@modules/app";
import { Alert } from "react-native";

export const actionSignIn = createAsyncThunk(
  "auth/signin",
  async (body: PLogin, { rejectWithValue, dispatch }) => {
    try {
      Alert.alert(`Login with emai: ${body.email}, password:${body.password} `);
      return true;
    } catch (error: any) {
      const { message } = error;
      dispatch(actionPushMessageError({ message }));
      return rejectWithValue(message);
    }
  }
);
