import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

//actions
import { setCurrentTrack } from "../../actions";

function Track({ id, artist, title, image, search_query }) {
  const dispatch = useDispatch();

  const { id: currentTrackID } = useSelector((state) => state.currentTrack);

  const setTrack = async () => {
    if (currentTrackID !== id) {
      dispatch(setCurrentTrack({ id, artist, title, image, search_query }));
    }
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
      <p className="song-name">{title}</p>
      <p className="song-artist">{artist}</p>
    </div>
  );
}

export default Track;
