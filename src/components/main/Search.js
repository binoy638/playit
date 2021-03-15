import { useState, useContext } from "react";
import axios from "axios";
import person from "../../assets/person.jpg";
import Suggestion from "./Suggestion";
import {
  SearchIcon,
  Notifications,
  Settings,
  Previous,
} from "../../helper/svg";
import { AppContext } from "../../App";

// const BASE_URL =  "http://localhost:5000/"
const BASE_URL = "https://playit-server.herokuapp.com/";

function Search() {
  const { setsearchResult, setshowHome, searchResult } = useContext(AppContext);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const searchHandler = async () => {
    const response = await axios.get(`${BASE_URL}search?query=${query}`);
    setsearchResult(response.data);
    console.log(searchResult);

    setshowHome(false);
  };
  const suggestHandler = () => {
    if (query.length > 2) {
      axios.get(`${BASE_URL}autosearch/artist/${query}`).then((response) => {
        try {
          const tracks = response.data;

          if (tracks.length > 0) {
            setSuggestions(tracks);
            console.log(suggestions);
          }
        } catch (e) {
          console.log(e);
        }

        // tracks.map((tracks) => {
        //   // setSuggestions(suggestions(tracks.artist));
        //   console.log(tracks.artist);
        // });
      });
      // console.log(suggestions);
    }
  };
  return (
    // <div className="search-bar">
    //   <input
    //     type="text"
    //     onChange={(event) => setQuery(event.target.value)}
    //     onKeyUp={() => suggestHandler()}
    //   />
    //   <button onClick={() => searchHandler()}>Search</button>
    //   <div className="search-suggestions">{suggestions}</div>
    // </div>
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
            onKeyUp={() => suggestHandler()}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                searchHandler();
                event.target.value = "";
              }
            }}
          />
          {suggestions ? <Suggestion suggestions={suggestions} /> : ""}
        </div>
      </div>

      <div className="header-account-settings">
        <Notifications />
        <Settings />
        {/* <img src={notifications} alt="" />
        <img src={settings} alt="" /> */}
        <div className="profile-pic-container">
          <img className="profile-pic" src={person} alt="" />
        </div>
      </div>
    </header>
  );
}

export default Search;
