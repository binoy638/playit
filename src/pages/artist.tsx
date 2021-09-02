import { useEffect } from "react";
import { useParams } from "react-router";
import { AlbumCard, PlaylistContainer } from "../components/extra/cards";
import { TrackLoading } from "../components/extra/loading";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { fetchArtistById } from "../state/thunks/artist.thunk";

function Artist() {
  const dispatch = useTypedDispatch();
  const { artist, albums, tracks, loading } = useTypedSelector(
    (state) => state.artist
  );
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(fetchArtistById(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div>
        <TrackLoading />
      </div>
    );
  } else {
    return (
      <div className="artist">
        <div className="artist-info">
          <img src={artist.images && artist.images[0].url} alt={artist.name} />
          <h1>{artist.name}</h1>
        </div>
        <div className="artist-works">
          <div className="artist-popular-tracks-section">
            <div className="header">
              <h3>Popular</h3>
            </div>
            <PlaylistContainer playlist={tracks} showImage={true} />
          </div>

          <div className="artist-albums-section">
            <div className="header">
              <h3>Albums</h3>
            </div>
            <div className="albums">
              {albums.length &&
                albums.map((album) => <AlbumCard key={album.id} {...album} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Artist;
