import React from "react";
import { useContext } from "react";
import { AppContext } from "../../App";
import {
  Collections,
  Hotlists,
  Heart,
  Playlist,
  Albums,
  Artists,
} from "../../helper/svg";

function Sidebar() {
  const { setshowHome } = useContext(AppContext);
  return (
    <aside className="sidebar">
      <div className="logo-container">
        <div
          className="logo"
          onClick={() => {
            setshowHome(true);
          }}
        >
          Playit
        </div>
      </div>
      <section className="discover-section">
        <h1>Discover</h1>

        <div className="side-menu">
          <Hotlists />
          <span>Hotlist</span>
        </div>
        <div className="side-menu active">
          <Collections />
          <span>Collections</span>
        </div>
      </section>
      <section className="library-section">
        <h1>Library</h1>

        <div className="side-menu">
          <Heart />
          <span>Favourites</span>
        </div>
        <div className="side-menu">
          <Playlist />
          <span>Playlist</span>
        </div>
        <div className="side-menu">
          <Albums />
          <span>Albums</span>
        </div>
        <div className="side-menu">
          <Artists />
          <span>Artists</span>
        </div>
      </section>
      <input type="button" className="btn subs-btn" value="Subscribe" />
    </aside>
  );
}

export default Sidebar;
