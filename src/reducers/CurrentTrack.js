import { SET_CURRENT_TRACK } from "../actions/types";

const initialStore = {
  title: "",
  artist: "",
  image: "",
  search_query: "",
  videoid: "",
};

const CurrentTrackReducer = (state = initialStore, action) => {
  if (action.type === SET_CURRENT_TRACK) {
    const { title, artist, image, search_query, videoid } = action.payload;
    return { ...state, title, artist, image, search_query, videoid };
  }
  return { ...state };
};

export default CurrentTrackReducer;
