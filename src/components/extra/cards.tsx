import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineSync } from "react-icons/ai";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { setCurrentTrack } from "../../state/thunks/currrentTrack.thunk";
import { setPlaylist } from "../../state/slices/player.slice";
import {
  acceptFriendRequest,
  declineFriendRequest,
  removePendingFriendRequest,
  sendFriendRequest,
} from "../../state/thunks/user.thunk";
import { IUser, ITrack } from "../../state/types";

interface ITrackCardSmallProps extends ITrack {
  index: number;
  playlist: ITrack[];
}

export const TrackCardSmall = ({
  id,
  image,
  title,
  index,
  artist,
  artists,
  type,
  duration,
  search_query,
  playlist,
}: ITrackCardSmallProps) => {
  const dispatch = useTypedDispatch();

  const { id: currentTrackID } = useTypedSelector(
    (state) => state.currentTrack
  );

  const { loading } = useTypedSelector((state) => state.player);

  const getTime = (time: number) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

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
    <div className="track-card-small" onClick={() => setTrack()}>
      <img src={image} alt={id} />

      <p className="track-title">{title}</p>
      <p>{getTime(Number(duration))}</p>
    </div>
  );
};

interface AlbumCardProps {
  id: string;
  name: string;
  image: string;
}

export const AlbumCard = ({ id, name, image }: AlbumCardProps) => {
  return (
    <div className="album-card">
      <Link to={`/album/${id}`}>
        <img src={image} alt={id} />
      </Link>
      <p>{name}</p>
    </div>
  );
};

export const PlaylistContainer = ({ playlist }: { playlist: ITrack[] }) => {
  return (
    <div className="playlist-container">
      {playlist.length &&
        playlist.map((track: ITrack, index: number) => (
          <TrackCardSmall
            key={track.id}
            index={index}
            {...track}
            playlist={playlist}
          />
        ))}
    </div>
  );
};

export const AddFriendCard = ({ username, image, _id }: IUser) => {
  const dispatch = useDispatch();
  return (
    <div className="add-friend-card">
      <img src={image ? image.url : ""} alt={username} />
      <p>{username}</p>
      <button onClick={() => dispatch(sendFriendRequest(_id))}>Add</button>
    </div>
  );
};

interface FriendCardProps extends IUser {
  type: "friends" | "requests" | "pendings";
  isOnline?: boolean;
}

export const FriendCard = ({
  username,
  image,
  _id,
  type,
  isOnline,
}: FriendCardProps) => {
  const dispatch = useDispatch();
  const renderCards = (type: string) => {
    if (type === "requests") {
      return (
        <div className="actions">
          <button
            className="accept-btn"
            onClick={() => dispatch(acceptFriendRequest(_id))}
          >
            Accept
          </button>
          <button
            className="decline-btn"
            onClick={() => dispatch(declineFriendRequest(_id))}
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
            onClick={() => dispatch(removePendingFriendRequest(_id))}
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

interface FriendCardSmallProps extends IUser {
  isOnline?: boolean;
  socket: any;
}

export const FriendCardSmall = ({
  _id,
  username,
  image,
  isOnline,
  socket,
}: FriendCardSmallProps) => {
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
