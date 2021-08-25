import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_USER,
  LOGOUT,
  SHOW_AUTH,
  AUTH_LOADING,
  CLEAR_ERROR,
  UPDATE_PROFILE_IMAGE,
  SET_FIND_USER_RESULT,
  SET_FRIEND_LIST,
  SET_ADD_FRIEND_ERROR,
  SET_SOCKET_CONNECTION,
  SET_FRIEND_STATUS,
} from "../actions/types";

const initialStore = {
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

const user = (state = initialStore, action: any) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const { user } = action.payload;
      localStorage.setItem("user", JSON.stringify(user));
      return {
        ...state,
        user,
        error: null,
        authenticated: true,
        loading: false,
      };
    case LOGIN_FAILURE:
      const error = action.payload;
      return {
        ...state,
        error,
        user: null,
        authenticated: false,
        loading: false,
      };
    case LOGOUT:
      localStorage.clear();
      return { ...state, error: null, user: null, authenticated: false };
    case SET_USER:
      return {
        ...state,
        error: null,
        user: action.payload,
        authenticated: true,
      };
    case SHOW_AUTH:
      return { ...state, showAuthType: action.payload };
    case AUTH_LOADING:
      return { ...state, loading: action.payload };
    case CLEAR_ERROR:
      return { ...state, error: null };
    case UPDATE_PROFILE_IMAGE:
      const newImage = action.payload;
      const _user = JSON.parse(localStorage.getItem("user"));
      if (!_user) return { ...state };
      _user.image = newImage;
      localStorage.setItem("user", JSON.stringify(_user));
      return { ...state, user: _user };
    case SET_FIND_USER_RESULT:
      return { ...state, findUserResult: action.payload };
    case SET_FRIEND_LIST:
      const { friends, friendsReq, friendsPen } = action.payload;
      return { ...state, friends, friendsPen, friendsReq };
    case SET_ADD_FRIEND_ERROR:
      return { ...state, addFriendError: action.payload };
    case SET_SOCKET_CONNECTION:
      return { ...state, socket: action.payload };
    case SET_FRIEND_STATUS:
      const { friendUserID, status } = action.payload;
      const friendList = state.friends;
      if (!friendList.length) return { ...state };
      const newList = friendList.map((friend) => {
        if (friend.user._id === friendUserID) {
          friend.online = status === 0 ? false : true;
        }
        return friend;
      });
      return { ...state, friends: newList };
    default:
      return { ...state };
  }
};

export default user;
