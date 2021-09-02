import { useEffect, useRef } from "react";
import { parse, ParsedQuery } from "query-string";
import Track from "../components/main/Track";
import { TrackLoading } from "../components/extra/loading";
import { Location } from "history";
import Error from "../components/extra/Error";
import axios, { CancelTokenSource } from "axios";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { fetchSearchResults } from "../state/thunks/search.thunk";

type SearchResultProps = {
  location: Location;
};

function SearchResult({ location }: SearchResultProps) {
  const dispatch = useTypedDispatch();

  const { query } = parse(location.search);

  const { searchResult, resultFound, loading } = useTypedSelector(
    (state) => state.search
  );

  const cancelToken = useRef<CancelTokenSource>();

  useEffect(() => {
    let timer = setTimeout(() => {
      if (cancelToken.current !== undefined) {
        cancelToken.current.cancel("Canceling the previous req");
      }
      cancelToken.current = axios.CancelToken.source();

      if (typeof query !== "string") return;

      dispatch(
        fetchSearchResults({
          query,
          cancelToken: cancelToken.current,
        })
      );
    }, 300);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, dispatch]);

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
