import React from "react";
import axios from "axios";
function Track({ artist, title, image, search_query, setvideoid }) {
  const setTrack = async () => {
    axios
      .get(`http://localhost:5000/videoid?query=${search_query}`)
      .then((response) => {
        // console.log(response);
        setvideoid(response.data.id);
      });
  };
  return (
    <div className="track-item">
      <img src={image} alt={title} onClick={() => setTrack()} />

      <h3>{title}</h3>
      <h4>{artist}</h4>
    </div>
  );
}

export default Track;
