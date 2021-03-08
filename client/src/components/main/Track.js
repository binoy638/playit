import React from "react";

function Track({ artist, title, image }) {
  return (
    <div className="track-item">
      <img src={image} alt={title} />

      <h3>{title}</h3>
      <h4>{artist}</h4>
    </div>
  );
}

export default Track;
