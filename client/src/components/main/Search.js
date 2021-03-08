import { useState } from "react";
import axios from "axios";

function Search({ setTracks }) {
  const [query, setQuery] = useState("");
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
  return (
    <div className="search-bar">
      <input type="text" onChange={(event) => setQuery(event.target.value)} />
      <button onClick={() => searchHandler()}>Search</button>
    </div>
  );
}

export default Search;
