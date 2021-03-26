import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

//actions
import { setCurrentTrack, setPlaylist } from "../../actions";

function Track({ index, id, artist, title, image, search_query, playlist }) {
  const dispatch = useDispatch();

  const { id: currentTrackID } = useSelector((state) => state.currentTrack);

  const setTrack = () => {
    if (currentTrackID !== id) {
      dispatch(setCurrentTrack({ id, artist, title, image, search_query }));

      dispatch(setPlaylist({ playlist, index }));

      // dispatch(currentTrack());
      // dispatch(nextTrack());
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
