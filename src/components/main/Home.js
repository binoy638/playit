import Track from "./Track";

function Home({ setCurrentTrack, newtracks, toptracks }) {
  return (
    <>
      <section className="new-releases">
        <h1>New Releases</h1>
        <div className="song-list card-list">
          {newtracks.map((track) => (
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
      <section className="most-popular">
        <h1>Most Popular</h1>
        <div className="song-list card-list">
          {toptracks.map((track) => (
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

export default Home;
