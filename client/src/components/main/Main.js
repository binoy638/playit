import { useState, useEffect } from "react";
import Track from "./Track";
import Search from "./Search";
import axios from "axios";

function Main({ setvideoid, setCurrentTrack, currentTrack }) {
  const [newtracks, setnewTracks] = useState([]);
  const [toptracks, settopTracks] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/new-release`).then((response) => {
      const newTracks = response.data;
      setnewTracks(newTracks);
      setCurrentTrack(newTracks[0]);
    });
    axios.get(`http://localhost:5000/top-tracks`).then((response) => {
      settopTracks(response.data);
    });
  }, []);
  return (
    // <div className="main">
    //   <Search setTracks={setTracks} />
    //   <div className="tracks-list">
    //     {tracks.map((track) => (
    //       <Track
    //         key={track.title}
    //         title={track.title}
    //         image={track.image}
    //         artist={track.artist}
    //         search_query={track.search_query}
    //         setvideoid={setvideoid}
    //       />
    //     ))}
    //   </div>
    // </div>
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
              setvideoid={setvideoid}
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
              setvideoid={setvideoid}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
