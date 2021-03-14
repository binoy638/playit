import React from "react";
function Track({ artist, title, image, search_query, setCurrentTrack }) {
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
