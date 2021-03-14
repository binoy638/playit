import { useState } from "react";
import Main from "./components/main/Main";
import Player from "./components/player/Player";
import Sidebar from "./components/sidebar/Sidebar";
import Search from "./components/main/Search";

import "./style/app.scss";
import "./style/utilities.css";

function App() {
  const [currentTrack, setCurrentTrack] = useState({
    artist: "Blue Wednesday",
    title: "Runaway",
    image: "https://i.scdn.co/image/ab67616d00001e027402154d67c35a0140ebdc82",
    search_query: "Blue Wednesday Runaway",
  });
  const [videoid, setvideoid] = useState();
  return (
    <div className="App">
      <div className="upper-section">
        <Sidebar />
        <Search />
        <Main setCurrentTrack={setCurrentTrack} />
      </div>
      <Player
        setvideoid={setvideoid}
        videoid={videoid}
        currentTrack={currentTrack}
      />
    </div>
  );
}

export default App;
