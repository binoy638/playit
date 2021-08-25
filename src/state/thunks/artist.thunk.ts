import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getArtistAlbumsRequest,
  getArtistRequest,
  getArtistTopTracksRequest,
} from "../../api/publicRequests";
import { IArtist } from "../types";

export const fetchArtistById = createAsyncThunk(
  "artist/fetchArtistById",
  async (artistId, thunkAPI) => {
    try {
      const [{ data: artist }, { data: albums }, { data: tracks }] =
        await Promise.all([
          getArtistRequest(artistId),
          getArtistAlbumsRequest(artistId, 10, 0, "album"),
          getArtistTopTracksRequest(artistId),
        ]);

      const payload = { artist, albums, tracks } as IArtist;

      return payload;
    } catch (error) {
      console.error(error);
      //TODO: Reject with error
    }
  }
);
