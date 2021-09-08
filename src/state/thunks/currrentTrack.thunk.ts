import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  searchVideoIdRequest,
  searchVideoIdRequest_,
} from "../../api/publicRequests";
import { ITrack } from "../types";

export const setCurrentTrack = createAsyncThunk(
  "currentTrack/setCurrentTrack",
  async (track: ITrack, thunkAPI) => {
    try {
      const { data } = await searchVideoIdRequest(track.search_query);

      return { track, videoid: data.id };
    } catch (error) {
      console.error(error);
      //TODO: Reject with error
    }
  }
);

export const changeVideoId = createAsyncThunk(
  "currentTrack/changeVideoId",
  async (track: string, thunkAPI) => {
    try {
      const { data } = await searchVideoIdRequest_(track);

      return data.id as string;
    } catch (error) {
      console.error(error);
      //TODO: Reject with error
    }
  }
);
