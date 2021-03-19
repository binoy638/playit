import { useState, useEffect } from "react";
import React from "react";
import Main from "./components/main/Main";
import Player from "./components/player/Player";
import Sidebar from "./components/sidebar/Sidebar";
import Search from "./components/main/Search";
import { Loading } from "./components/extra/loading";
import axios from "axios";

import { BrowserRouter as Router } from "react-router-dom";
import "./style/app.scss";
import "./style/utilities.css";
import { shuffle } from "./helper/shuffle";

// const BASE_URL =  "http://localhost:5000/"
const BASE_URL = "https://playit-server.herokuapp.com/";

//context api to pass states to all other components
export const AppContext = React.createContext();

function App() {
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");

  const [newtracks, setnewTracks] = useState([]);

  const [toptracks, settopTracks] = useState([]);

  const [videoid, setvideoid] = useState();

  const [searchResult, setsearchResult] = useState([]);

  const [currentTrack, setCurrentTrack] = useState();

  useEffect(() => {
    const fetchMainScreenTracks = () => {
      //fetch new release tracks to show on homepage while loading
      axios.get(`${BASE_URL}new-release`).then((response) => {
        let newTracks = response.data;
        newTracks = shuffle(newTracks, 7);
        setnewTracks(newTracks);
        setCurrentTrack(newTracks[0]);

        setLoading(false);
      });
      //fetch new top tracks to show on homepage while loading
      axios.get(`${BASE_URL}top-tracks`).then((response) => {
        let topTracks = response.data;
        topTracks = shuffle(topTracks, 7);
        settopTracks(topTracks);
      });
    };
    fetchMainScreenTracks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //empty dependeny array so that the hook run only when the app loads for the first time

  return (
    //wrap the app inside context api
    <AppContext.Provider
      value={{
        newtracks,
        toptracks,
        setnewTracks,
        settopTracks,
        setCurrentTrack,
        searchResult,
        setsearchResult,
        currentTrack,
        setvideoid,
        videoid,
        query,
        setQuery,
      }}
      className="App"
    >
      <Router>
        {loading ? (
          <Loading />
        ) : (
          <div className="upper-section">
            <Sidebar />
            <Search />
            <Main />
          </div>
        )}
        {loading ? "" : <Player />}
      </Router>
    </AppContext.Provider>
  );
}

export default App;
