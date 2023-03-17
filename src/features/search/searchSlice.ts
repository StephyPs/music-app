import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from "axios";

export interface SearchState {
  resData: any,
  renderCount:number,
  status: 'initial'|'loaded' | 'loading' | 'failed';
}

const initialState: SearchState = {
  resData: {},
  renderCount:0,
  status: 'initial',
};

export const fetchAsync = createAsyncThunk(
  'counter/fetchAsync',
  async (searchTerm: string) => {
    const response = await axios.get(`https://itunes.apple.com/search?term=${searchTerm}`);
    return response.data;
  }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchNext: (state) => {
      state.renderCount += 10;
    },
   
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = 'loaded';
        state.renderCount=10;
        state.resData = action.payload;
      })
      .addCase(fetchAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { searchNext } = searchSlice.actions;

export const selectData = (state: RootState) => state.search.resData.results;
export const selectCurrentData = (state: RootState) => state.search.resData.results.slice(0,state.search.renderCount-1);
export const selectLoadedStatus=(state:RootState)=> state.search.status==='loaded';
export const selectFailureStatus=(state:RootState)=> state.search.status==='failed';
export const selectLoadingStatus=(state:RootState)=> state.search.status==='loading';
export const selectInitialStatus=(state:RootState)=> state.search.status==='initial';

export default searchSlice.reducer;
