import { useEffect } from "react";
import React from "react";
import Main from "./components/main/Main";
import Player from "./components/player/Player";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/main/Header";
import { Loading } from "./components/extra/loading";
import {
  createSocketConnection,
  destroySocketConnection,
  fetchDefaultPlaylists,
  fetchFriendList,
  setUser,
} from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/app.scss";
import { HIDE_SIDEBAR, SHOW_SIDEBAR } from "./actions/types";
import { useWindowSize } from "./hooks/useWindowSize";
import Modal from "./components/extra/Modal";
import useSocket from "./hooks/useSocket";

function App() {
  const dispatch = useDispatch();

  const { showAuthType, authenticated, user } = useSelector(
    (state) => state.user
  );
  useSocket();

  const [windowWidth] = useWindowSize();

  useEffect(() => {
    dispatch(fetchDefaultPlaylists());

    const user1 = JSON.parse(localStorage.getItem("user"));
    if (user1) {
      dispatch(setUser(user1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //empty dependeny array so that the hook run only when the app loads for the first time

  useEffect(() => {
    if (authenticated) {
      dispatch(createSocketConnection(user._id));
      dispatch(fetchFriendList());
    } else {
      dispatch(destroySocketConnection());
    }
  }, [authenticated, user, dispatch]);

  useEffect(() => {
    if (windowWidth < 500) {
      dispatch({ type: HIDE_SIDEBAR });
    } else {
      dispatch({ type: SHOW_SIDEBAR });
    }
  }, [windowWidth, dispatch]);

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
            <Header />
            <Main />
            {showAuthType ? <Modal type={showAuthType} /> : ""}
          </div>
          {!PlayerLoading && <Player />}
        </Router>
      </div>
    );
  }
}

export default App;
