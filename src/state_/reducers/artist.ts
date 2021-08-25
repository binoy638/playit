import { FETCH_ARTIST_INFO } from "../actions/types";
import { ArtistState } from "./types";

const initialStore: ArtistState = {
  artist: {
    id: "",
    name: "",
    type: "",
    images: [{}],
    popularity: "",
    genres: [],
  },
  albums: [],
  tracks: [],
};

const artistInfo = (state = initialStore, action: any) => {
  switch (action.type) {
    case FETCH_ARTIST_INFO:
      const { info, albums, tracks } = action.payload;
      return { ...state, artist: info, albums, tracks };
    default:
      return { ...state };
  }
};

export default artistInfo;
