import { useEffect, useState } from "react";
import React from "react";
import Main from "./components/main/Main";
import Player from "./components/player/Player";
import Sidebar from "./components/sidebar/Sidebar";
import Search from "./components/main/Search";
import { Loading } from "./components/extra/loading";
import { fetchDefaultPlaylists } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/app.scss";
import { HIDE_SIDEBAR, SHOW_SIDEBAR } from "./actions/types";

function App() {
  const dispatch = useDispatch();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth < 500) {
      dispatch({ type: HIDE_SIDEBAR });
    } else {
      dispatch({ type: SHOW_SIDEBAR });
    }
  }, [windowWidth]);

  useEffect(() => {
    dispatch(fetchDefaultPlaylists());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //empty dependeny array so that the hook run only when the app loads for the first time

  const { AppLoading: loading, PlayerLoading } = useSelector(
    (state) => state.loading
  );

  const { showSidebar } = useSelector((state) => state.sidebar);

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
            {showSidebar && <Sidebar />}
            <Search />
            <Main />
          </div>
          {!PlayerLoading && <Player />}
        </Router>
      </div>
    );
  }
}

export default App;
