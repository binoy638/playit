import { useEffect } from "react";
import Main from "./components/main/Main";
import Player from "./components/player/Player";
import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/main/Header";
import { Loading } from "./components/extra/loading";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/app.scss";
import { useWindowSize } from "./hooks/useWindowSize";
import Modal from "./components/extra/Modal";
import useSocket from "./hooks/useSocket";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { useTypedDispatch } from "./hooks/useTypedDispatch";
import { setShowSidebar } from "./state/slices/sidebar.slice";
import { fetchDefaultPlaylist } from "./state/thunks/defaultplaylist.thunk";
import {
  createSocketConnection,
  destroySocketConnection,
  setUser,
} from "./state/slices/user.slice";
import { fetchFriendList } from "./state/thunks/user.thunk";
import { setLoading } from "./state/slices/player.slice";

function App() {
  const dispatch = useTypedDispatch();

  const { showAuthType, authenticated, user } = useTypedSelector(
    (state) => state.user
  );
  useSocket();

  const [windowWidth] = useWindowSize();

  useEffect(() => {
    dispatch(fetchDefaultPlaylist());

    const userObj = localStorage.getItem("user");
    if (userObj) {
      const usr = JSON.parse(userObj);
      dispatch(setUser(usr));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //empty dependeny array so that the hook run only when the app loads for the first time

  useEffect(() => {
    if (authenticated && user) {
      dispatch(createSocketConnection(user._id));
      dispatch(fetchFriendList());
    } else {
      dispatch(destroySocketConnection());
    }
  }, [authenticated, user, dispatch]);

  useEffect(() => {
    if (windowWidth < 500) {
      dispatch(setShowSidebar(false));
    } else {
      dispatch(setShowSidebar(true));
    }
  }, [windowWidth, dispatch]);

  const { loading } = useTypedSelector((state) => state.defaultPlaylist);

  const { show } = useTypedSelector((state) => state.sidebar);

  const { loading: PlayerLoading } = useTypedSelector((state) => state.player);

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
            {show && <Sidebar />}
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
