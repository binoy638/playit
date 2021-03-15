import React from "react";
import { useContext } from "react";
import { AppContext } from "../../App";
function Track({ artist, title, image, search_query }) {
  const { setCurrentTrack } = useContext(AppContext);
  const setTrack = async () => {
    setCurrentTrack({ artist, title, image, search_query });
  };
  return (
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
