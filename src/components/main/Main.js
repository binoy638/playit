import Home from "./Home";
import SearchResult from "./SearchResult";

function Main({
  setCurrentTrack,
  newtracks,
  toptracks,
  searchResult,
  showHome,
}) {
  return (
    <main className="main">
      {showHome ? (
        <Home
          setCurrentTrack={setCurrentTrack}
          newtracks={newtracks}
          toptracks={toptracks}
        />
      ) : (
        <SearchResult
          setCurrentTrack={setCurrentTrack}
          searchResult={searchResult}
        />
      )}
    </main>
  );
}

export default Main;
