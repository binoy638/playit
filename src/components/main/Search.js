import { useState, useContext } from "react";
import axios from "axios";
import person from "../../assets/person.jpg";
import { SearchIcon, Notifications, Settings } from "../../helper/svg";
import { AppContext } from "../../App";

// const BASE_URL =  "http://localhost:5000/"
const BASE_URL = "https://playit-server.herokuapp.com/";

function Search() {
  const { setsearchResult, setshowHome } = useContext(AppContext);

  const [query, setQuery] = useState("");

  const searchHandler = async () => {
    const response = await axios.get(`${BASE_URL}search?query=${query}`);
    setsearchResult(response.data);
    setshowHome(false);
  };

  return (
    <header>
      <div className="search-container">
        <div className="search-btn">
          <SearchIcon />
        </div>
        <div className="search-input">
          <input
            type="text"
            className="search-input"
            placeholder="Search for songs, artists etc."
            onChange={(event) => setQuery(event.target.value)}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                searchHandler();
                event.target.value = "";
              }
            }}
          />
        </div>
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
