import { useContext } from "react";
import { useHistory } from "react-router-dom";
import person from "../../assets/person.jpg";
import { SearchIcon, Notifications, Settings } from "../../helper/svg";
import { AppContext } from "../../App";

function Search() {
  const history = useHistory();
  const handleOnClick = () => history.push(`/search?query=${query}`);
  const { query, setQuery } = useContext(AppContext);
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
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </form>
      </div>

      <div className="header-account-settings">
        <Notifications />
        <Settings />
        <div className="profile-pic-container">
          <img className="profile-pic" src={person} alt="" />
        </div>
      </div>
    </header>
  );
}

export default Search;
