import React, { useEffect } from "react";
import queryString from "query-string";
import Track from "./Track";
import { AppContext } from "../../App";
import { useContext } from "react";
import axios from "axios";

const BASE_URL = "https://playit-server.herokuapp.com/";

function SearchResult({ location }) {
  const { setCurrentTrack, searchResult, setsearchResult } = useContext(
    AppContext
  );
  const { query } = queryString.parse(location.search);
  useEffect(() => {
    if (query) {
      fetchTracks();
    }
    return () => {
      setsearchResult([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const fetchTracks = async () => {
    const response = await axios.get(`${BASE_URL}search?query=${query}`);
    if (response) {
      setsearchResult(response.data);
    }
  };

  if (searchResult.length) {
  }

  return (
    <>
      {searchResult && searchResult.length > 0 && (
        <section className="new-releases">
          <h1>Top Result</h1>
          <div className="song-list card-list">
            <Track
              key={searchResult[0].title}
              setCurrentTrack={setCurrentTrack}
              {...searchResult[0]}
            />
          </div>
        </section>
      )}
      {searchResult && searchResult.length > 0 && (
        <section className="most-popular">
          <h1>Other Results</h1>
          <div className="song-list card-list">
            {searchResult &&
              searchResult
                .slice(1)
                .map((track) => (
                  <Track
                    key={track.title}
                    setCurrentTrack={setCurrentTrack}
                    {...track}
                  />
                ))}
          </div>
        </section>
      )}
    </>
  );
}

export default SearchResult;
