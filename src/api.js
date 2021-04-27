// const BASE_URL =  "http://localhost:5000"
// const BASE_URL = "https://playit.sytes.net";

const BASE_URL = "https://playit-server.herokuapp.com";

export const newReleaseURL = `${BASE_URL}/search/new-release`;

export const hotTracksURL = `${BASE_URL}/search/top-tracks`;

export const fetchVideoURL = (query) =>
  `${BASE_URL}/search/videoid?query=${query} (lyrics)`;

export const fetchVideoURL2 = (query) =>
  `${BASE_URL}/search/videoid?query=${query}`;

//URL to search Tracks
export const searchTracksURL = (query) =>
  `${BASE_URL}/search/track?query=${query}`;

//URL to get artist info
export const ArtistInfoURL = (id) => `${BASE_URL}/artist/${id}`;

//URL to get artist albums
export const ArtistAlbumsURL = (id, limit, offset, include_groups) =>
  `${BASE_URL}/artist-albums?id=${id}&limit=${limit}&offset=${offset}&include_groups=${include_groups}`;

//URL to get artist top tracks
export const ArtistTopTracksURL = (id) => `${BASE_URL}/artist-toptracks/${id}`;

//URL to get album details
export const AlbumURL = (id) => `${BASE_URL}/album/${id}`;
