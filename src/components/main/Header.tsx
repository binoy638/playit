import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { SearchIcon, Notifications, Settings, Menu } from "../../helper/svg";
import UserDropDown from "../extra/UserDropDown";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { setQuery, setSearchBarFocus } from "../../state/slices/search.slice";

function Search() {
  const history = useHistory();

  const dispatch = useTypedDispatch();

  const [dropDown, setDropDown] = useState(false);

  const { query, isSearchFocused } = useTypedSelector((state) => state.search);

  const { user } = useTypedSelector((state) => state.user);

  useEffect(() => {
    if (isSearchFocused) {
      if (query) {
        history.replace(`/search?query=${query}`);
      } else {
        history.replace("/");
      }
    }
  }, [query, history, isSearchFocused]);

  return (
    <header>
      <div className="search-container">
        <div className="search-btn">
          <SearchIcon />
        </div>
        <div className="search-input">
          <input
            onFocus={() => dispatch(setSearchBarFocus(true))}
            onBlur={() => dispatch(setSearchBarFocus(false))}
            type="text"
            className="search-input"
            placeholder="Search for songs, artists etc."
            value={query}
            onChange={(event) => {
              dispatch(setQuery(event.target.value));
            }}
          />
        </div>
      </div>
      <div className="logo-container">
        <div className="logo">Playit</div>
      </div>
      <div className="header-account-settings">
        <Notifications />
        <Settings />
        <div className="profile-pic-container">
          {user ? (
            <div
              onMouseEnter={() => setDropDown(true)}
              onMouseLeave={() => setDropDown(false)}
            >
              <img src={user.image.url} className="profile-pic" alt="profile" />

              {dropDown && (
                <UserDropDown status="loggedIn" setDropDown={setDropDown} />
              )}
            </div>
          ) : (
            <div
              onMouseEnter={() => setDropDown(true)}
              onMouseLeave={() => setDropDown(false)}
            >
              <FaUserCircle className="defaultIcon" />
              {dropDown && (
                <UserDropDown status="loggedOut" setDropDown={setDropDown} />
              )}
            </div>
          )}
        </div>
      </div>
      <div
        className="menu-btn-mobile-tab click-effect"
        id="menu-btn-mobile-tab"
        // onClick={() => dispatch(sets)}
      >
        <Menu />
      </div>
    </header>
  );
}

export default Search;
