import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { fetchPlaylistsRequest } from "../api/privateRequests";

function Playlists() {
  const [playlists, setPlaylists] = useState([]);

  // const { user } = useSelector((state) => state.user);

  useEffect(() => {
    fetchPlaylistsRequest().then((res) => setPlaylists(res.data.playlist));
  }, []);
  return (
    <div>{playlists.length && playlists.map((item) => <h1>{item}</h1>)}</div>
  );
}

export default Playlists;
