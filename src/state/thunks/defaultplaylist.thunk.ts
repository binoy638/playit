import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getNewReleasesRequest,
  getTopTracksRequest,
} from "../../api/publicRequests";
import { shuffle } from "../../helper/shuffle";
import { ITrack } from "../types";

export const fetchDefaultPlaylist = createAsyncThunk(
  "defaultPlaylist/fetchDefaultPlaylist",
  async (_, thunkAPI) => {
    try {
      const [{ data: newRelease }, { data: hotTracks }] = await Promise.all([
        getNewReleasesRequest(),
        getTopTracksRequest(),
      ]);

      const payload = {
        newRelease: shuffle(newRelease),
        hotTracks: shuffle(hotTracks),
      } as {
        newRelease: ITrack[];
        hotTracks: ITrack[];
      };

      return payload;
    } catch (error) {
      console.error(error);
      //TODO: Reject with error
    }
  }
);
