import { useState, useEffect } from "react";
import Track from "./Track";
import axios from "axios";

// const BASE_URL =  "http://localhost:5000/"
const BASE_URL = "https://playit-server.herokuapp.com/";

function Main({ setCurrentTrack }) {
  const [newtracks, setnewTracks] = useState([]);
  const [toptracks, settopTracks] = useState([]);
  useEffect(() => {
    const fetchMainScreenTracks = () => {
      axios.get(`${BASE_URL}new-release`).then((response) => {
        const newTracks = response.data;
        setnewTracks(newTracks);
        setCurrentTrack(newTracks[0]);
      });
      axios.get(`${BASE_URL}top-tracks`).then((response) => {
        settopTracks(response.data);
      });
    };
    fetchMainScreenTracks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="main">
      <section className="new-releases">
        <h1>New Releases</h1>
        <div className="song-list card-list">
          {newtracks.map((track) => (
            <Track
              key={track.title}
              title={track.title}
              image={track.image}
              artist={track.artist}
              setCurrentTrack={setCurrentTrack}
              search_query={track.search_query}
            />
          ))}
        </div>
      </section>
      <section className="most-popular">
        <h1>Most Popular</h1>
        <div className="song-list card-list">
          {toptracks.map((track) => (
            <Track
              key={track.title}
              title={track.title}
              image={track.image}
              artist={track.artist}
              setCurrentTrack={setCurrentTrack}
              search_query={track.search_query}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;