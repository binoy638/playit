import { FETCH_VIDEO_ID, SET_CURRENT_TRACK } from "../actions/types";

const initialStore = {
  id: "",
  title: "",
  artist: "",
  image: "",
  search_query: "",
  videoid: null,
};

const CurrentTrackReducer = (state = initialStore, action) => {
  if (action.type === SET_CURRENT_TRACK) {
    const { id, title, artist, image, search_query, videoid } = action.payload;
    return { ...state, id, title, artist, image, search_query, videoid };
  }
  if (action.type === FETCH_VIDEO_ID) {
    return { ...state, videoid: action.payload };
  }
  return { ...state };
};

export default CurrentTrackReducer;
