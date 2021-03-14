import { useState, useEffect } from "react";
import Main from "./components/main/Main";
import Player from "./components/player/Player";
import Sidebar from "./components/sidebar/Sidebar";
import Search from "./components/main/Search";
import Loading from "./components/loading/loading";
import axios from "axios";

import "./style/app.scss";
import "./style/utilities.css";

// const BASE_URL =  "http://localhost:5000/"
const BASE_URL = "https://playit-server.herokuapp.com/";

function App() {
  const [loading, setLoading] = useState(true);

  const [newtracks, setnewTracks] = useState([]);

  const [toptracks, settopTracks] = useState([]);

  const [videoid, setvideoid] = useState();

  const [currentTrack, setCurrentTrack] = useState({
    artist: "Blue Wednesday",
    title: "Runaway",
    image: "https://i.scdn.co/image/ab67616d00001e027402154d67c35a0140ebdc82",
    search_query: "Blue Wednesday Runaway",
  });

  useEffect(() => {
    const fetchMainScreenTracks = () => {
      axios.get(`${BASE_URL}new-release`).then((response) => {
        const newTracks = response.data;
        setnewTracks(newTracks);
        setCurrentTrack(newTracks[0]);
        setTimeout(() => {
          setLoading(!loading);
        }, 3000);

        // console.log(`loading: ${loading}`);
      });
      axios.get(`${BASE_URL}top-tracks`).then((response) => {
        settopTracks(response.data);
      });
    };
    fetchMainScreenTracks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      {loading ? (
        <Loading />
      ) : (
        <div className="upper-section">
          <Sidebar />
          <Search />
          <Main
            setCurrentTrack={setCurrentTrack}
            newtracks={newtracks}
            toptracks={toptracks}
          />
        </div>
      )}
      {loading ? (
        ""
      ) : (
        <Player
          setvideoid={setvideoid}
          videoid={videoid}
          currentTrack={currentTrack}
        />
      )}
    </div>
  );
}

export default App;
