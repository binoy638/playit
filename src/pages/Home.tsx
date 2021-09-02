import Track from "../components/main/Track";
import { useTypedSelector } from "../hooks/useTypedSelector";

function Home() {
  const { newRelease, hotTracks } = useTypedSelector(
    (state) => state.defaultPlaylist
  );
  return (
    <>
      <section className="new-releases">
        <h1>New Releases</h1>
        <div className="song-list card-list">
          {newRelease.map((track, index) => (
            <Track
              key={track.id}
              index={index}
              playlist={newRelease}
              {...track}
            />
          ))}
        </div>
      </section>
      <section className="most-popular">
        <h1>Most Popular</h1>
        <div className="song-list card-list">
          {hotTracks.map((track, index) => (
            <Track
              key={track.id}
              index={index}
              playlist={hotTracks}
              {...track}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
