import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setQuery } from "../../actions";
import person from "../../assets/person.jpg";
import { SearchIcon, Notifications, Settings, Menu } from "../../helper/svg";

function Search() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { query } = useSelector((state) => state.search);
  const handleOnClick = () => history.push(`/search?query=${query}`);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleOnClick();
  };
  return (
    <header>
      <div className="search-container">
        <div className="search-btn">
          <SearchIcon />
        </div>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="search-input">
            <input
              type="text"
              className="search-input"
              placeholder="Search for songs, artists etc."
              value={query}
              onChange={(event) => dispatch(setQuery(event.target.value))}
            />
          </div>
        </form>
      </div>
      <div class="logo-container">
        <a class="logo" href="index.html">
          Playit
        </a>
      </div>
      <div className="header-account-settings">
        <Notifications />
        <Settings />
        <div className="profile-pic-container">
          <img className="profile-pic" src={person} alt="" />
        </div>
      </div>
      <div class="menu-btn-mobile-tab click-effect" id="menu-btn-mobile-tab">
        <Menu />
      </div>
    </header>
  );
}

export default Search;
