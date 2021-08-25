export interface AlbumState {
  id: string;
  name: string;
  total_tracks: string;
  release_date: string;
  image: string;
  type: string;
  tracks: string[];
}

export interface Track {
  id: string;
  artist: string;
  artists: string[];
  type: string;
  title: string;
  image: string;
  search_query: string;
}

export interface ArtistState {
  artist: {
    id: string;
    name: string;
    type: string;
    images: any[];
    popularity: string;
    genres: string[];
  };
  albums: Track[];
  tracks: Track[];
}
