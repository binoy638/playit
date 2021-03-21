import { combineReducers } from "redux";
import DefaultPlaylistReducer from "./DefaultPlaylistReducer";
import CurrentTrackReducer from "./CurrentTrack";
import SearchReducer from "./search";

const rootReducer = combineReducers({
  defaultPlaylists: DefaultPlaylistReducer,
  currentTrack: CurrentTrackReducer,
  search: SearchReducer,
});

export default rootReducer;
