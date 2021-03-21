import React, { useEffect } from "react";
import queryString from "query-string";
import Track from "./Track";
import { TrackLoading } from "../extra/loading";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../../actions";
import Error from "../extra/Error";

function SearchResult({ location }) {
  const dispatch = useDispatch();

  const { query } = queryString.parse(location.search);

  const { searchResult, loading, resultFound } = useSelector(
    (state) => state.search
  );

  useEffect(() => {
    console.log("inside searchresult useeffect");
    dispatch(search(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  if (loading) {
    return (
      <>
        <TrackLoading />
      </>
    );
  } else {
    if (resultFound) {
      return (
        <>
          <section className="new-releases">
            <h1>Top Result</h1>
            <div className="song-list card-list">
              <Track key={searchResult[0].title} {...searchResult[0]} />
            </div>
          </section>

          <section className="most-popular">
            <h1>Other Results</h1>
            <div className="song-list card-list">
              {searchResult &&
                searchResult
                  .slice(1)
                  .map((track) => <Track key={track.title} {...track} />)}
            </div>
          </section>
        </>
      );
    }
  }
  return (
    <>
      <Error message={"No results Found"} />
    </>
  );
}

export default SearchResult;
