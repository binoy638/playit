import { createAsyncThunk } from "@reduxjs/toolkit";
import { CancelTokenSource } from "axios";
import { searchTracksRequest } from "../../api/publicRequests";

interface ISearchArgs {
  query: string;
  cancelToken: CancelTokenSource;
}

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (args: ISearchArgs, thunkAPI) => {
    try {
      const { data } = await searchTracksRequest(args.query, args.cancelToken);
      if (data.length === 0) {
        return thunkAPI.rejectWithValue("no results found");
      }
      return data;
    } catch (error) {
      console.error(error);
      //TODO: Reject with error
    }
  }
);
