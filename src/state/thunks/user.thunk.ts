import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginRequest, registerRequest } from "../../api/publicRequests";
import { ILogin, ISignup } from "../../types";

export const login = createAsyncThunk(
  "user/login",
  async (credentials: ILogin, thunkAPI) => {
    try {
      const { data } = await loginRequest(credentials);

      const { _id, token, username, email, image } = data;

      return { user: { _id, token, username, email, image } };
    } catch (error) {
      if (!error.response) {
        return thunkAPI.rejectWithValue("something went wrong");
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "user/signup",
  async (credentials: ISignup, thunkAPI) => {
    try {
      const { data } = await registerRequest(credentials);

      const { _id, token, username, email, image } = data;

      return { user: { _id, token, username, email, image } };
    } catch (error) {
      if (!error.response) {
        return thunkAPI.rejectWithValue("something went wrong");
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
