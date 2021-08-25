import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchArtistInfo } from "../redux/actions";
import { AlbumCard, PlaylistContainer } from "../components/extra/cards";
import { TrackLoading } from "../components/extra/loading";

function Artist() {
  const dispatch = useDispatch();
  const { ArtistLoading } = useSelector((state) => state.loading);
  const { artist, albums, tracks } = useSelector((state) => state.artist);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchArtistInfo(id));
  }, [dispatch, id]);

  if (ArtistLoading) {
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
