import Playlist from "../helper/playlist";

export interface ITrack {
  id: string;
  artist: string;
  title: string;
  type: string;
  image: string;
  artists: any[]; //TODO
  search_query: string;
  duration?: string;
  album?: string;
}

export interface IAlbum {
  id: string;
  name: string;
  total_tracks: string;
  release_date: string;
  image: string;
  type: string;
}

export interface IAlbumInfo extends IAlbum {
  tracks: ITrack[];
  loading: boolean;
  error: boolean;
}

export interface IArtist {
  artist: {
    id: string;
    name: string;
    type: string;
    images: any[]; //TODO:Typecheck it
    popularity: string;
    genres: string[];
  };
  albums: IAlbum[];
  tracks: ITrack[];
}

export interface IArtistInfo extends IArtist {
  loading: boolean;
  error: boolean;
}

export interface ICurrentTrack extends ITrack {
  videoid: null | string;
  loading: boolean;
  error: boolean;
}

export interface IDefaultPlaylist {
  newRelease: ITrack[];
  hotTracks: ITrack[];
  loading: boolean;
  error: boolean;
}

export interface IPlayer {
  playlist: Playlist;
  current: null | ITrack;
  loop: boolean;
  currentTime: number;
  isPlaying: boolean;
  duration: number;
  syncedWith: null | string;
  syncedTo: boolean;
  seekTime: null | number;
  loading: boolean;
}

export interface ISearch {
  query: string;
  searchResult: ITrack[];
  resultFound: boolean;
  isSearchFocused: boolean;
  loading: boolean;
}

export interface ISidebar {
  show: boolean;
}

export interface IUser {
  _id: string;
  username: string;
  image: { id: string; url: string };
}

export interface IAuthUser extends IUser {
  token: string;
  email: string;
}

export interface IFriendUser {
  _id: string;
  status: number;
  online?: boolean;
  user: IUser;
}

export interface IUserProfile {
  authenticated: boolean;
  showAuthType: null | "login" | "signup";
  loading: boolean;
  error: unknown;
  user: null | IAuthUser;
  friends: IFriendUser[];
  friendsReq: IFriendUser[];
  friendsPen: IFriendUser[];
  addFriendError: null | string;
  findUserResult: null | IUser;
  socket: any;
}
