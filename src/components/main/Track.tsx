import React from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

//actions
import { setCurrentTrack, setPlaylist } from "../../redux/actions";
import { Link } from "react-router-dom";

function Track({
  index,
  id,
  artist,
  artists,
  title,
  image,
  search_query,
  playlist,
}) {
  const dispatch = useDispatch();

  const { id: currentTrackID } = useSelector((state) => state.currentTrack);

  const { PlayerLoading } = useSelector((state) => state.loading);

  const setTrack = () => {
    if (currentTrackID !== id) {
      if (PlayerLoading) {
        dispatch(setCurrentTrack({ id, artist, title, image, search_query }));
      }
      dispatch(setPlaylist({ playlist, index }));
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
      <Link to={`/artist/${artists[0].id}`}>
        <p className="song-artist">{artist}</p>
      </Link>
    </div>
  );
}

export default Track;
