import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCurrentTrack, setPlaylist } from "../../actions";

export const TrackCardSmall = ({
  id,
  image,
  title,
  index,
  artist,
  artists,
  duration,
  search_query,
  playlist,
  showImage,
}) => {
  const dispatch = useDispatch();

  const { id: currentTrackID } = useSelector((state) => state.currentTrack);

  const { PlayerLoading } = useSelector((state) => state.loading);

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const setTrack = () => {
    if (currentTrackID !== id) {
      if (PlayerLoading) {
        dispatch(setCurrentTrack({ id, artist, title, image, search_query }));
      }
      dispatch(setPlaylist({ playlist, index }));
    }
  };

  return (
    <div className="track-card-small" onClick={() => setTrack()}>
      <img src={image} alt={id} />

      <p className="track-title">{title}</p>
      <p>{getTime(duration)}</p>
    </div>
  );
};

export const AlbumCard = ({ id, name, image }) => {
  return (
    <div className="album-card">
      <Link to={`/album/${id}`}>
        <img src={image} alt={id} />
      </Link>
      <p>{name}</p>
    </div>
  );
};

export const PlaylistContainer = ({ playlist, showImage }) => {
  return (
    <div className="playlist-container">
      {playlist.length &&
        playlist.map((track, index) => (
          <TrackCardSmall
            key={track.id}
            index={index}
            {...track}
            playlist={playlist}
            showImage={showImage}
          />
        ))}
    </div>
  );
};
