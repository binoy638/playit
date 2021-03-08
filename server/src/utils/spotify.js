const axios = require("axios");
const qs = require("qs");
const cache = require("./cache");
const SpotifyWebApi = require("spotify-web-api-node");
const spotifyApi = new SpotifyWebApi();

const token = async () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    auth: {
      username: clientId,
      password: clientSecret,
    },
  };
  const data = {
    grant_type: "client_credentials",
  };

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      qs.stringify(data),
      headers
    );
    // console.log(response.data);
    const token = response.data.access_token;
    const expires_in = response.data.expires_in;
    return { token, expires_in };
  } catch (error) {
    console.log(error);
  }
};

async function setToken() {
  let accessToken = cache.get("spotify-access-token");
  if (!accessToken) {
    const result = await token();

    if (!result) {
      return null;
    }
    accessToken = result.token;
    const ttl = result.expires_in;
    cache.set("spotify-access-token", accessToken, ttl);
    // console.log(cache.data);
  }

  spotifyApi.setAccessToken(accessToken);
}

const searchTracks = async (query) => {
  await setToken();
  const response = await spotifyApi.searchTracks(query, {
    limit: 6,
    offset: 0,
  });

  if (response.statusCode === 200) {
    if (response.body.tracks.items.length === 0) {
      return undefined;
    }
    const tracks = response.body.tracks.items;
    let tracklist = [];

    tracks.map((track) => {
      const artist = track.artists[0].name;
      const title = track.name;
      const image = track.album.images[1].url;
      const search_query = `${artist} ${title}`;
      tracklist.push({
        artist,
        title,
        image,
        search_query,
      });
    });

    return tracklist;
  }
  return undefined;
};

module.exports = { searchTracks };
