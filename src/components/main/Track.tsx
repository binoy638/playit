import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { setCurrentTrack } from "../../state/thunks/currrentTrack.thunk";
import { setPlaylist } from "../../state/slices/player.slice";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { ITrack } from "../../state/types";

interface ITrackProps extends ITrack {
  index: number;
  playlist: ITrack[];
}

function Track({
  index,
  id,
  artist,
  artists,
  title,
  image,
  type,
  search_query,
  playlist,
}: ITrackProps) {
  const dispatch = useTypedDispatch();

  const { id: currentTrackID } = useTypedSelector(
    (state) => state.currentTrack
  );

  const { loading } = useTypedSelector((state) => state.player);

  const setTrack = () => {
    if (currentTrackID !== id) {
      if (loading) {
        dispatch(
          setCurrentTrack({
            id,
            artist,
            title,
            image,
            search_query,
            type,
            artists,
          })
        );
      }
      dispatch(setPlaylist({ tracks: playlist, index }));
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
