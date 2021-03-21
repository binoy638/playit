import { useState, useEffect } from "react";
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
import "./style/utilities.css";

//context api to pass states to all other components
export const AppContext = React.createContext();

function App() {
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  const [searchResult, setsearchResult] = useState([]);

  useEffect(() => {
    dispatch(fetchDefaultPlaylists());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //empty dependeny array so that the hook run only when the app loads for the first time
  const { loading } = useSelector((state) => state.defaultPlaylists);

  console.log(loading);
  return (
    //wrap the app inside context api
    <AppContext.Provider
      value={{
        searchResult,
        setsearchResult,
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
