import { useEffect } from "react";
import { useParams } from "react-router";
import { PlaylistContainer } from "../components/extra/cards";
import { TrackLoading } from "../components/extra/loading";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { fetchAlbumById } from "../state/thunks/album.thunk";

function Album() {
  const dispatch = useTypedDispatch();
  const { name, image, tracks, loading } = useTypedSelector(
    (state) => state.album
  );
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(fetchAlbumById(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div>
        <TrackLoading />
      </div>
    );
  } else {
    return (
      <div className="album">
        <div className="album-info">
          <img src={image} alt={name} />
          <h1>{name}</h1>
        </div>
        <div className="album-tracks">
          <PlaylistContainer playlist={tracks} />
        </div>
      </div>
    );
  }
}

export default Album;
