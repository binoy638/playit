import { FETCH_ALBUM } from "../actions/types";
import { AlbumState } from "./types";

const inititalStore: AlbumState = {
  id: "",
  name: "",
  total_tracks: "",
  release_date: "",
  image: "",
  type: "",
  tracks: [],
};

const albumInfo = (state = inititalStore, action: any) => {
  if (action.type === FETCH_ALBUM) {
    const { id, name, total_tracks, release_date, image, type, tracks } =
      action.payload;
    return {
      ...state,
      id,
      name,
      total_tracks,
      release_date,
      image,
      type,
      tracks,
    };
  }
  return { ...state };
};

export default albumInfo;
