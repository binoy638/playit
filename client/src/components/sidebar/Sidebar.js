import React from "react";

import collection from "../../assets/collections.svg";
import hotlists from "../../assets/hotlists.svg";
import filledheart from "../../assets/filled-heart.svg";
import playlist from "../../assets/playlist.svg";
import albums from "../../assets/albums.svg";
import artists from "../../assets/artists.svg";

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
          <img
            className="icon-clickable"
            src={hotlists}
            alt=""
            // onload="SVGInject(this)"
          />
          <span>Hotlist</span>
        </div>
        <div className="side-menu active">
          <img
            className="icon-clickable"
            src={collection}
            alt=""
            // onload="SVGInject(this)"
          />
          <span>Collections</span>
        </div>
      </section>
      <section className="library-section">
        <h1>Library</h1>

        <div className="side-menu">
          <img
            className="icon-click"
            src={filledheart}
            alt=""
            // onload="SVGInject(this)"
          />
          <span>Favourites</span>
        </div>
        <div className="side-menu">
          <img
            className="icon-click"
            src={playlist}
            alt=""
            // onload="SVGInject(this)"
          />
          <span>Playlist</span>
        </div>
        <div className="side-menu">
          <img src={albums} alt="" />
          <span>Albums</span>
        </div>
        <div className="side-menu">
          <img src={artists} alt="" />
          <span>Artists</span>
        </div>
      </section>
      <input type="button" className="btn subs-btn" value="Subscribe" />
    </aside>
  );
}

export default Sidebar;
