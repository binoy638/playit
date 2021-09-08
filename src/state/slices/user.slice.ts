import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import io from "socket.io-client";
import { baseURL } from "../../api/config";
import {
  fetchFriendList,
  login,
  searchFriend,
  signup,
} from "../thunks/user.thunk";
import { IUserProfile, IAuthUser } from "../types";

const initialState: IUserProfile = {
  authenticated: false,
  user: null,
  showAuthType: null,
  loading: false,
  error: null,
  friends: [],
  friendsReq: [],
  friendsPen: [],
  addFriendError: null,
  findUserResult: null,
  socket: null,
};

const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuthUser>) => {
      state.user = action.payload;
    },
    setShowAuthType: (
      state,
      action: PayloadAction<"login" | "signup" | null>
    ) => {
      state.showAuthType = action.payload;
    },
    logout: (state) => {
      localStorage.clear();
      state = initialState;
    },
    createSocketConnection: (state, action: PayloadAction<string>) => {
      const username = action.payload;
      const socket = io(baseURL, { autoConnect: false });
      socket.auth = { username };
      socket.connect();

      state.socket = socket;
    },
    destroySocketConnection: (state) => {
      if (state.socket) {
        state.socket.disconnect();
        state.socket = null;
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      if (action.payload) {
        state.error = action.payload;
      }
    },
    setFriendStatus: (
      state,
      action: PayloadAction<{ friendUserID: string; status: number }>
    ) => {
      if (action.payload) {
        const { friendUserID, status } = action.payload;
        const friendList = state.friends;
        if (!friendList) return;
        const newList = friendList.map((friend) => {
          if (friend.user._id === friendUserID) {
            friend.online = status === 0 ? false : true;
          }
          return friend;
        });
        state.friends = newList;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
          state.error = null;
          state.authenticated = true;
          state.loading = false;
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.loading = false;
          state.error = action.payload;
        }
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload.user;
          state.error = null;
          state.authenticated = true;
          state.loading = false;
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.loading = false;
          state.error = action.payload;
        }
      })
      .addCase(fetchFriendList.fulfilled, (state, action) => {
        if (action.payload) {
          state.friends = action.payload.friends;
          state.friendsReq = action.payload.friendsReq;
          state.friendsPen = action.payload.friendsPen;
        }
      })
      .addCase(searchFriend.fulfilled, (state, action) => {
        if (action.payload) {
          state.findUserResult = action.payload;
        }
      });
  },
});

export const {
  setShowAuthType,
  setUser,
  logout,
  createSocketConnection,
  destroySocketConnection,
  setError,
  setFriendStatus,
} = userSlice.actions;

export default userSlice.reducer;
