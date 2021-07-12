import React, { useEffect, useRef } from "react";
import queryString from "query-string";
import Track from "../components/main/Track";
import { TrackLoading } from "../components/extra/loading";
import { useDispatch, useSelector } from "react-redux";
import { search } from "../actions";
import Error from "../components/extra/Error";
import axios from "axios";

function SearchResult({ location }) {
  const dispatch = useDispatch();

  const { query } = queryString.parse(location.search);

  const { searchResult, resultFound } = useSelector((state) => state.search);

  const { SearchLoading: loading } = useSelector((state) => state.loading);

  const cancelToken = useRef();

  useEffect(() => {
    if (typeof cancelToken.current != typeof undefined) {
      cancelToken.current.cancel("Canceling the previous req");
    }
    cancelToken.current = axios.CancelToken.source();

    dispatch(search(query, cancelToken.current));

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
              <Track
                key={searchResult[0].id}
                index={0}
                playlist={searchResult}
                {...searchResult[0]}
              />
            </div>
          </section>

          <section className="most-popular">
            <h1>Other Results</h1>
            <div className="song-list card-list">
              {searchResult &&
                searchResult
                  .slice(1)
                  .map((track, index) => (
                    <Track
                      key={track.id}
                      index={index + 1}
                      playlist={searchResult}
                      {...track}
                    />
                  ))}
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
