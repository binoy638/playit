import { useEffect } from "react";
import React from "react";
import Main from "./components/main/Main";
import Player from "./components/player/Player";
import Sidebar from "./components/sidebar/Sidebar";
import Search from "./components/main/Search";
import { Loading } from "./components/extra/loading";
import { fetchDefaultPlaylists } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./style/app.scss";
import "./style/utilities.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDefaultPlaylists());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //empty dependeny array so that the hook run only when the app loads for the first time

  const { loading } = useSelector((state) => state.defaultPlaylists);

  if (loading) {
    return (
      <div className="App">
        <Loading />
      </div>
    );
  } else {
    return (
      //wrap the app inside context api
      <div className="App">
        <Router>
          <div className="upper-section">
            <Sidebar />
            <Search />
            <Main />
          </div>
          <Player />
        </Router>
      </div>
    );
  }
}

export default App;
