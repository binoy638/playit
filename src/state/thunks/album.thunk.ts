import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAlbumRequest } from "../../api/publicRequests";
import { IAlbumInfo } from "../types";

export const fetchAlbumById = createAsyncThunk(
  "album/fetchAlbumById",
  async (albumId: string, thunkAPI) => {
    try {
      const { data } = await getAlbumRequest(albumId);
      return data as IAlbumInfo;
    } catch (error) {
      console.error(error);
      //TODO: Reject with error
    }
  }
);
