import { useState } from "react";
import axios from "axios";
import person from "../../assets/person.jpg";
import { SearchIcon, Notifications, Settings } from "../../helper/svg";

// const BASE_URL =  "http://localhost:5000/"
const BASE_URL = "https://playit-server.herokuapp.com/";

function Search({ setTracks }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const searchHandler = () => {
    // console.log(query);
    axios.get(`${BASE_URL}search?q=${query}`).then((response) => {
      //   console.log(response);
      setTracks(response.data);
    });
    // axios
    //   .get(`http://localhost:5000/test?key=${query}&data=testdata`)
    //   .then((response) => {
    //     console.log(response);
    //   });
  };
  const suggestHandler = () => {
    if (query.length > 2) {
      axios.get(`${BASE_URL}autosearch?query=${query}`).then((response) => {
        try {
          const artist = response.data[0].artist;
          if (artist) {
            setSuggestions(artist);
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
          {/* <img src={search} alt="" /> */}
          <SearchIcon />
        </div>
        <input
          type="text"
          className="search-input"
          placeholder="Search for songs, artists etc."
        />
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
