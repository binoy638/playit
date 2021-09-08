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

import logo from "../../assets/logo_1.png";
import { FriendCardSmall } from "../extra/cards";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { setQuery } from "../../state/slices/search.slice";

function Sidebar() {
  const location = useLocation();

  const dispatch = useTypedDispatch();

  const { authenticated, friends, socket } = useTypedSelector(
    (state) => state.user
  );

  const addClass = (defaultClass: string, path: string) => {
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
      </section>
      {authenticated && friends.length !== 0 && (
        <section className="friend-list">
          <Link to="/friends">
            <h1>Friends</h1>
          </Link>
          <div className="friends">
            {friends.map((friend) => (
              <FriendCardSmall
                {...friend.user}
                isOnline={friend.online}
                socket={socket}
              />
            ))}
          </div>
        </section>
      )}
    </aside>
  );
}

export default Sidebar;
