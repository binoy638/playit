import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  Collections,
  Hotlists,
  Heart,
  Playlist,
  Albums,
  Artists,
  MenuExit,
} from "../../helper/svg";

import { setQuery } from "../../actions";

import logo from "../../assets/logo_1.png";

function Sidebar() {
  const location = useLocation();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const addClass = (defaultClass, path) => {
    if (location.pathname === path) return `${defaultClass} active`;
    else return defaultClass;
  };

  return (
    <aside className="sidebar">
      <MenuExit />
      <div className="logo-container">
        <Link to="/" onClick={() => dispatch(setQuery(""))}>
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <section className="discover-section">
        <h1>Discover</h1>

        <div className="side-menu">
          <Hotlists />
          <span>Hotlist</span>
        </div>
        <div className="side-menu ">
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
          <div className={addClass("side-menu", "/library/playlists")}>
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
      {user && (
        <section className="friend-list">
          <h1>Friends</h1>
        </section>
      )}
    </aside>
  );
}

export default Sidebar;
