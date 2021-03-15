import React from "react";
import Track from "./Track";

function SearchResult({ setCurrentTrack, searchResult }) {
  return (
    <>
      <section className="new-releases">
        <h1>Top Result</h1>
        <div className="song-list card-list">
          <Track
            key={searchResult[0].title}
            title={searchResult[0].title}
            image={searchResult[0].image}
            artist={searchResult[0].artist}
            setCurrentTrack={setCurrentTrack}
            search_query={searchResult[0].search_query}
          />
        </div>
      </section>

      <section className="most-popular">
        <h1>Other Results</h1>
        <div className="song-list card-list">
          {searchResult.slice(1).map((track) => (
            <Track
              key={track.title}
              title={track.title}
              image={track.image}
              artist={track.artist}
              setCurrentTrack={setCurrentTrack}
              search_query={track.search_query}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default SearchResult;
