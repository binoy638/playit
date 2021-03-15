import Track from "./Track";
import { useContext } from "react";
import { AppContext } from "../../App";

function Home() {
  const { newtracks, toptracks } = useContext(AppContext);

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
