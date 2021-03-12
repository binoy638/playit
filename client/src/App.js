import { useState } from "react";
import Main from "./components/main/Main";
import Player from "./components/player/Player";
import Sidebar from "./components/sidebar/Sidebar";
import Search from "./components/main/Search";

import "./style/app.scss";
import "./style/utilities.css";

function App() {
  const [videoid, setvideoid] = useState("mdkWFPrrZVQ");
  return (
    <div className="App">
      <div className="upper-section">
        <Sidebar />
        <Search />
        <Main setvideoid={setvideoid} />
      </div>

      <Player videoid={videoid} />
    </div>
  );
}

export default App;
