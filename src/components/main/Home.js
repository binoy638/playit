import Track from "./Track";
import { useSelector } from "react-redux";

function Home() {
  // const { newtracks, toptracks } = useContext(AppContext);
  const { newRelease: newtracks, hotTracks: toptracks } = useSelector(
    (state) => state.defaultPlaylists
  );
  return (
    <>
      <section className="new-releases">
        <h1>New Releases</h1>
        <div className="song-list card-list">
          {newtracks.map((track) => (
            <Track key={track.title} {...track} />
          ))}
        </div>
      </section>
      <section className="most-popular">
        <h1>Most Popular</h1>
        <div className="song-list card-list">
          {toptracks.map((track) => (
            <Track key={track.title} {...track} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
