import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, signup } from "../thunks/user.thunk";
import { IUserProfile } from "../types";

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
      });
  },
});

export default userSlice.reducer;
