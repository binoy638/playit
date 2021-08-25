import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineSync } from "react-icons/ai";

import {
  acceptFriendRequest,
  addFriend,
  declineFriendRequest,
  removePendingFriendRequest,
  setCurrentTrack,
  setPlaylist,
} from "../../redux/actions";

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

export const AddFriendCard = ({ username, image, _id }) => {
  const dispatch = useDispatch();
  return (
    <div className="add-friend-card">
      <img src={image ? image.url : ""} alt={username} />
      <p>{username}</p>
      <button onClick={() => dispatch(addFriend({ userID: _id }))}>Add</button>
    </div>
  );
};

export const FriendCard = ({ username, image, _id, type, isOnline }) => {
  const dispatch = useDispatch();
  const renderCards = (type) => {
    if (type === "requests") {
      return (
        <div className="actions">
          <button
            className="accept-btn"
            onClick={() => dispatch(acceptFriendRequest({ userID: _id }))}
          >
            Accept
          </button>
          <button
            className="decline-btn"
            onClick={() => dispatch(declineFriendRequest({ userID: _id }))}
          >
            Decline
          </button>
        </div>
      );
    } else if (type === "pendings") {
      return (
        <div className="actions">
          <button
            className="remove-btn"
            onClick={() =>
              dispatch(removePendingFriendRequest({ userID: _id }))
            }
          >
            Remove
          </button>
        </div>
      );
    }
  };

  return (
    <div className="friend-card">
      <div
        className="status"
        style={{ backgroundColor: `${isOnline ? "green" : "red"}` }}
      ></div>
      <img src={image ? image.url : ""} alt={username} />
      <p>{username}</p>
      {renderCards(type)}
    </div>
  );
};

export const FriendCardSmall = ({ _id, username, image, isOnline, socket }) => {
  const handleClick = () => {
    if (!socket) return;
    socket.emit("Sync:request", _id, username);
  };

  return (
    <div className="friend-card-small">
      <div className="image">
        <img src={image ? image.url : ""} alt={username} />
        <div
          className="status-indicator"
          style={{ backgroundColor: `${isOnline ? "green" : "grey"}` }}
        ></div>
      </div>
      <small>{username}</small>
      <AiOutlineSync style={{ cursor: "pointer" }} onClick={handleClick} />
    </div>
  );
};
