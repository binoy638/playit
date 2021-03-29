import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchArtistInfo } from "../actions";

function Artist({ location }) {
  const dispatch = useDispatch();
  const { ArtistLoading } = useSelector((state) => state.loading);
  const { artist } = useSelector((state) => state.pagesInfo);
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchArtistInfo(id));
    console.log(artist);
  }, [location]);

  if (ArtistLoading) {
    return (
      <div>
        <div>Loading</div>
      </div>
    );
  } else {
    return (
      <div className="artist-info">
        <img src={artist.images[0].url} alt={artist.name} />
        <h1>{artist.name}</h1>
      </div>
    );
  }
}

export default Artist;
