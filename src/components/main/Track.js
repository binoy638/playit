import React from "react";
import { useContext } from "react";
import { AppContext } from "../../App";
import { motion } from "framer-motion";

function Track({ artist, title, image, search_query }) {
  const { setCurrentTrack } = useContext(AppContext);
  const setTrack = async () => {
    setCurrentTrack({ artist, title, image, search_query });
  };
  return (
    <div className="song-info card">
      <div className="thumbnail-container">
        <motion.img
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
          src={image}
          alt={title}
          onClick={() => setTrack()}
        />
      </div>
      <p className="song-name">{title.substring(0, 30)}</p>
      <p className="song-artist">{artist}</p>
    </div>
  );
}

export default Track;
