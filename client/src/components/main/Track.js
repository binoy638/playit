import React from "react";
import axios from "axios";
function Track({
  artist,
  title,
  image,
  search_query,
  setvideoid,
  setCurrentTrack,
}) {
  const setTrack = async () => {
    setCurrentTrack({ artist, title, image, search_query });
  };
  return (
    // <div className="track-item">
    //   <img src={image} alt={title} onClick={() => setTrack()} />

    //   <h3>{title}</h3>
    //   <h4>{artist}</h4>
    // </div>
    <div className="song-info card">
      <div className="thumbnail-container">
        <img src={image} alt={title} onClick={() => setTrack()} />
      </div>
      <p className="song-name">{title.substring(0, 30)}</p>
      <p className="song-artist">{artist}</p>
    </div>
  );
}

export default Track;
