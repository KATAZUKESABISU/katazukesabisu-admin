import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetCommonBlockResponse, getCommonBlock } from '../api/home-admin/getCommonBlock';

const initialState: GetCommonBlockResponse = {
  statusCode: 0,
  data: {
    content: [],
    createDate: '',
    title: '',
  },
  message: '',
  seoHelmet: [],
};

export const getDataContactUs = createAsyncThunk('contactUs/getData', async (args, _thunkAPI) => {
  try {
    const response = await getCommonBlock();
    if (!response) {
      return;
    }
    return response.data;
  } catch (error) {
    return _thunkAPI.rejectWithValue(error);
  }
});

const contactUsSlice = createSlice({
  name: 'contactUs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDataContactUs.pending, (state) => {
      state.statusCode = 0;
      state.message = 'Loading';
    });
    builder.addCase(getDataContactUs.fulfilled, (state, { payload }) => {
      if (payload) {
        state.statusCode = 200;
        state.data = payload;
      }
    });
    builder.addCase(getDataContactUs.rejected, (state) => {
      state.message = 'Have error';
    });
  },
});

export const contactUs = contactUsSlice.reducer;
