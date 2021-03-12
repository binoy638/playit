import { useState } from "react";
import Main from "./components/main/Main";
import Player from "./components/player/Player";
import Sidebar from "./components/sidebar/Sidebar";
import Search from "./components/main/Search";

import "./style/app.scss";
import "./style/utilities.css";

function App() {
  const [currentTrack, setCurrentTrack] = useState({
    artist: "na",
    title: "NA",
    image: "https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg",
    search_query: "na",
  });
  const [videoid, setvideoid] = useState();
  return (
    <div className="App">
      <div className="upper-section">
        <Sidebar />
        <Search />
        <Main
          setvideoid={setvideoid}
          setCurrentTrack={setCurrentTrack}
          currentTrack={currentTrack}
        />
      </div>

      <Player
        setvideoid={setvideoid}
        videoid={videoid}
        setCurrentTrack={setCurrentTrack}
        currentTrack={currentTrack}
      />
    </div>
  );
}

export default App;
