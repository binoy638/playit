import { createAsyncThunk } from "@reduxjs/toolkit";
import { CancelTokenSource } from "axios";
import {
  fetchFriends,
  addFriend,
  acceptFriendReq,
  declineFriendReq,
  removeFriendReq,
  findUser,
} from "../../api/privateRequests";
import { loginRequest, registerRequest } from "../../api/publicRequests";
import { ILogin, ISignup } from "../../types";
import { IFriendUser } from "../types";

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

export const fetchFriendList = createAsyncThunk(
  "user/fetchFriendList",
  async (_, thunkAPI) => {
    try {
      const { data } = await fetchFriends();
      if (!data) thunkAPI.rejectWithValue("no friends found");
      const friends: IFriendUser[] = [];
      const friendsReq: IFriendUser[] = [];
      const friendsPen: IFriendUser[] = [];

      data.friends.forEach((friend: IFriendUser) => {
        if (friend.status === 4) {
          friend.online = false;
          friends.push(friend);
        } else if (friend.status === 2) friendsReq.push(friend);
        else if (friend.status === 3) friendsPen.push(friend);
      });

      return { friends, friendsReq, friendsPen };
    } catch (error) {
      if (!error.response) {
        return thunkAPI.rejectWithValue("something went wrong");
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const sendFriendRequest = createAsyncThunk(
  "user/sendFriendRequest",
  async (userID: string, thunkAPI) => {
    try {
      await addFriend(userID);
      thunkAPI.dispatch(fetchFriendList());
    } catch (error) {
      //TODO : add errors
      if (!error.response) {
        return thunkAPI.rejectWithValue("something went wrong");
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const acceptFriendRequest = createAsyncThunk(
  "user/acceptFriendRequest",
  async (userID: string, thunkAPI) => {
    try {
      await acceptFriendReq(userID);
      thunkAPI.dispatch(fetchFriendList());
    } catch (error) {
      console.log(error);
    }
  }
);

export const declineFriendRequest = createAsyncThunk(
  "user/declineFriendRequest",
  async (userID: string, thunkAPI) => {
    try {
      await declineFriendReq(userID);
      thunkAPI.dispatch(fetchFriendList());
    } catch (error) {
      console.log(error);
    }
  }
);

export const removePendingFriendRequest = createAsyncThunk(
  "user/removePendingFriendRequest",
  async (userID: string, thunkAPI) => {
    try {
      await removeFriendReq(userID);
      thunkAPI.dispatch(fetchFriendList());
    } catch (error) {
      console.log(error);
    }
  }
);

export const searchFriend = createAsyncThunk(
  "user/searchFriend",
  async (
    args: {
      query: string;
      cancelToken: CancelTokenSource;
    },
    thunkAPI
  ) => {
    try {
      const { data } = await findUser(args.query, args.cancelToken);
      return data;
    } catch (error) {
      return null;
    }
  }
);
