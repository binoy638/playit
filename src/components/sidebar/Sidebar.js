import React from "react";

// import collection from "../../assets/collections.svg";
// import Hotlists from "../../helper/svg";
// import filledheart from "../../assets/filled-heart.svg";
// import playlist from "../../assets/playlist.svg";
// import albums from "../../assets/albums.svg";
// import artists from "../../assets/artists.svg";
import {
  Collections,
  Hotlists,
  Heart,
  Playlist,
  Albums,
  Artists,
} from "../../helper/svg";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo-container">
        <a className="logo" href="index.html">
          Playit
        </a>
      </div>
      <section className="discover-section">
        <h1>Discover</h1>

        <div className="side-menu">
          {/* <img
            className="icon-clickable"
            src={hotlists}
            alt=""
            // onload="SVGInject(this)"
          /> */}
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
