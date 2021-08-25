import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchAlbumInfo } from "../redux/actions";
import { PlaylistContainer } from "../components/extra/cards";
import { TrackLoading } from "../components/extra/loading";

function Album() {
  const dispatch = useDispatch();
  const { AlbumLoading } = useSelector((state) => state.loading);
  const { name, image, tracks } = useSelector((state) => state.album);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchAlbumInfo(id));
  }, [dispatch, id]);

  if (AlbumLoading) {
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
          <PlaylistContainer playlist={tracks} showImage={false} />
        </div>
      </div>
    );
  }
}

export default Album;
