import { combineReducers } from "redux";
import DefaultPlaylistReducer from "./DefaultPlaylistReducer";
import CurrentTrackReducer from "./CurrentTrack";
import SearchReducer from "./search";
import LoadingReducer from "./loading";
import playerReducer from "./player";
import artist from "./artist";
import album from "./album";

const rootReducer = combineReducers({
  defaultPlaylists: DefaultPlaylistReducer,
  currentTrack: CurrentTrackReducer,
  search: SearchReducer,
  player: playerReducer,
  loading: LoadingReducer,
  artist: artist,
  album: album,
});

export default rootReducer;
