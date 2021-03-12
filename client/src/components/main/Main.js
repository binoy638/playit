import { useState } from "react";
import Track from "./Track";
import Search from "./Search";
import thumbnail from "../../assets/thumbnail.jpg";

function Main({ setvideoid }) {
  const [tracks, setTracks] = useState([
    {
      artist: "Eminem",
      title: "Godzilla (feat. Juice WRLD)",
      image: "https://i.scdn.co/image/ab67616d00001e022f44aec83b20e40f3baef73c",
      search_query: "Eminem Godzilla (feat. Juice WRLD)",
    },
    {
      artist: "Eminem",
      title: "'Till I Collapse",
      image: "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
      search_query: "Eminem 'Till I Collapse",
    },
    {
      artist: "Eminem",
      title: "Love The Way You Lie",
      image: "https://i.scdn.co/image/ab67616d00001e02c08d5fa5c0f1a834acef5100",
      search_query: "Eminem Love The Way You Lie",
    },
    {
      artist: "Logic",
      title: "Homicide (feat. Eminem)",
      image: "https://i.scdn.co/image/ab67616d00001e0241c0ad3e39388ab332ffb023",
      search_query: "Logic Homicide (feat. Eminem)",
    },
    {
      artist: "Eminem",
      title: "Without Me",
      image: "https://i.scdn.co/image/ab67616d00001e026ca5c90113b30c3c43ffb8f4",
      search_query: "Eminem Without Me",
    },
    {
      artist: "Eminem",
      title: "The Real Slim Shady",
      image: "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42",
      search_query: "Eminem The Real Slim Shady",
    },
  ]);

  return (
    // <div className="main">
    //   <Search setTracks={setTracks} />
    //   <div className="tracks-list">
    //     {tracks.map((track) => (
    //       <Track
    //         key={track.title}
    //         title={track.title}
    //         image={track.image}
    //         artist={track.artist}
    //         search_query={track.search_query}
    //         setvideoid={setvideoid}
    //       />
    //     ))}
    //   </div>
    // </div>
    <main className="main">
      <section className="new-releases">
        <h1>New Releases</h1>
        <div className="song-list card-list">
          {tracks.map((track) => (
            <Track
              key={track.title}
              title={track.title}
              image={track.image}
              artist={track.artist}
              search_query={track.search_query}
              setvideoid={setvideoid}
            />
          ))}
        </div>
      </section>
      <section className="most-popular">
        <h1>Most Popular</h1>
        <div className="song-list card-list">
          <div className="song-info card">
            <div className="thumbnail-container">
              <img src={thumbnail} alt="" />
            </div>
            <p className="song-name">Shape of You</p>
            <p className="song-artist">Ed Sheeran</p>
          </div>

          <div className="song-info card">
            <div className="thumbnail-container">
              <img src={thumbnail} alt="" />
            </div>
            <p className="song-name">Hey Boy</p>
            <p className="song-artist">SiA (feat. Burna Boy)</p>
          </div>

          <div className="song-info card">
            <div className="thumbnail-container">
              <img src={thumbnail} alt="" />
            </div>
            <p className="song-name">Hey Boy</p>
            <p className="song-artist">SiA (feat. Burna Boy)</p>
          </div>

          <div className="song-info card">
            <div className="thumbnail-container">
              <img src={thumbnail} alt="" />
            </div>
            <p className="song-name">Hey Boy</p>
            <p className="song-artist">SiA (feat. Burna Boy)</p>
          </div>

          <div className="song-info card">
            <div className="thumbnail-container">
              <img src={thumbnail} alt="" />
            </div>
            <p className="song-name">Hey Boy</p>
            <p className="song-artist">SiA (feat. Burna Boy)</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Main;
