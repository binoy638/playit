import Main from "./components/main/Main";
import Player from "./components/player/Player";
import Sidebar from "./components/sidebar/Sidebar";
import "./style/app.css";

function App() {
  return (
    <div className="App">
      <div className="upper-section">
        <Sidebar />
        <Main />
      </div>

      <Player />
    </div>
  );
}

export default App;
