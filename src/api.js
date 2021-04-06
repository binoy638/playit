const BASE_URL = "http://localhost:5000";
// const BASE_URL = "http://144.202.14.194";

export const newReleaseURL = `${BASE_URL}/search/new-release`;

export const hotTracksURL = `${BASE_URL}/search/top-tracks`;

export const fetchVideoURL = (query) =>
  `${BASE_URL}/search/videoid?query=${query} (lyrics)`;

export const searchTracksURL = (query) =>
  `${BASE_URL}/search/track?query=${query}`;

export const ArtistInfoURL = (id) => `${BASE_URL}/artist/${id}`;

export const ArtistAlbumsURL = (id, limit, offset, include_groups) =>
  `${BASE_URL}/artist-albums?id=${id}&limit=${limit}&offset=${offset}&include_groups=${include_groups}`;

export const ArtistTopTracksURL = (id) => `${BASE_URL}/artist-toptracks/${id}`;

export const AlbumURL = (id) => `${BASE_URL}/album/${id}`;
