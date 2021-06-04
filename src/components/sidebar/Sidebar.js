import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setQuery } from "../../actions";
import {
  Collections,
  Hotlists,
  Heart,
  Playlist,
  Albums,
  Artists,
  MenuExit,
} from "../../helper/svg";

function Sidebar() {
  const dispatch = useDispatch();
  return (
    <aside className="sidebar">
      <MenuExit />
      <div className="logo-container">
        <Link to="/" onClick={() => dispatch(setQuery(""))}>
          <div className="logo">Playit</div>
        </Link>
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
        <Link to="/library/playlists">
          <div className="side-menu">
            <Playlist />
            <span>Playlists</span>
          </div>
        </Link>

        <div className="side-menu">
          <Albums />
          <span>Albums</span>
        </div>
        <div className="side-menu">
          <Artists />
          <span>Artists</span>
        </div>
        <Link to="/rooms">
          <div className="side-menu">
            <Albums />
            <span>Rooms</span>
          </div>
        </Link>
      </section>
      <input type="button" className="btn subs-btn" value="Subscribe" />
    </aside>
  );
}

export default Sidebar;
