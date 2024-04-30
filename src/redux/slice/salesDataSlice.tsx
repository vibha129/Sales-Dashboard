import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Papa from "papaparse";


interface DataState {
    data: any[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: DataState = {
    data: [],
    loading: false,
    error: null,
  };
  export const fetchData = createAsyncThunk(
    'salesData/fetchData',
    async (_, { rejectWithValue }) => { // Unused 'args' parameter replaced with '_'
      try {
        const response = await axios.get('./data/sales_data.csv');
        const parsedData: any = Papa.parse(response.data, { header: true }).data;
        return parsedData;
      } catch (error) {
        // @ts-ignore
        return rejectWithValue(error.message as string); // Properly handling the error message
      }
    }
  );

  const salesDataSlice = createSlice({
    name: 'Sales Data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchData.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(fetchData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  
  export default salesDataSlice.reducer;
  