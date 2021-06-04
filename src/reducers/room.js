import { SET_IS_CONNECTED, SET_ROOMID, SET_SOCKET } from "../actions/types";

const initialStore = {
  isConnected: false,
  roomID: null,
  socket: null,
};

const room = (state = initialStore, action) => {
  switch (action.type) {
    case SET_IS_CONNECTED:
      return { ...state, isConnected: action.payload };
    case SET_ROOMID:
      return { ...state, roomID: action.payload };
    case SET_SOCKET:
      const socket = action.payload;
      return { ...state, socket };
    default:
      return { ...state };
  }
};

export default room;
