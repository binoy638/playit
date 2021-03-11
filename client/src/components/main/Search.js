import { useState } from "react";
import axios from "axios";
import search from "../../assets/search.svg";
import notifications from "../../assets/notifications.svg";
import settings from "../../assets/settings.svg";
import person from "../../assets/person.jpg";

function Search({ setTracks }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const searchHandler = () => {
    // console.log(query);
    axios.get(`http://localhost:5000/search?q=${query}`).then((response) => {
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
      axios
        .get(`http://localhost:5000/test?query=${query}`)
        .then((response) => {
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
          <img src={search} alt="" />
        </div>
        <input
          type="text"
          className="search-input"
          placeholder="Search for songs, artists etc."
        />
      </div>
      <div className="header-account-settings">
        <img src={notifications} alt="" />
        <img src={settings} alt="" />
        <div className="profile-pic-container">
          <img className="profile-pic" src={person} alt="" />
        </div>
      </div>
    </header>
  );
}

export default Search;
