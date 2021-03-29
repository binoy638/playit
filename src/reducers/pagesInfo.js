import { FETCH_ARTIST_INFO } from "../actions/types";

const initialStore = {
  artist: {
    id: "",
    name: "",
    type: "",
    images: [{}],
    popularity: "",
    genres: [],
  },
  album: {},
  track: {},
};

const pagesInfo = (state = initialStore, action) => {
  switch (action.type) {
    case FETCH_ARTIST_INFO:
      return { ...state, artist: action.payload };
    default:
      return { ...state };
  }
};

export default pagesInfo;
