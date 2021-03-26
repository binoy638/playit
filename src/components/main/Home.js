import Track from "./Track";
import { useSelector } from "react-redux";
// import { v4 as uuidv4 } from "uuid";

function Home() {
  const { newRelease: newtracks, hotTracks: toptracks } = useSelector(
    (state) => state.defaultPlaylists
  );
  return (
    <>
      <section className="new-releases">
        <h1>New Releases</h1>
        <div className="song-list card-list">
          {newtracks.map((track, index) => (
            <Track
              key={track.id}
              index={index}
              playlist={newtracks}
              {...track}
            />
          ))}
        </div>
      </section>
      <section className="most-popular">
        <h1>Most Popular</h1>
        <div className="song-list card-list">
          {toptracks.map((track, index) => (
            <Track
              key={track.id}
              index={index}
              playlist={toptracks}
              {...track}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
