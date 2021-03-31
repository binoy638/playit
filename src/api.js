// const BASE_URL =  "http://localhost:5000"
const BASE_URL = "https://www.api.playit.codewithbb.com";

export const newReleaseURL = `${BASE_URL}/search/new-release`;
export const hotTracksURL = `${BASE_URL}/search/top-tracks`;
export const fetchVideoURL = (query) =>
  `${BASE_URL}/search/videoid?query=${query} (lyrics)`;
export const searchTracksURL = (query) =>
  `${BASE_URL}/search/track?query=${query}`;
