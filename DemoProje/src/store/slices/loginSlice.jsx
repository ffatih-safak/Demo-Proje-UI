import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'form',
  initialState: {
    token: '',
    loginStatus: 0
  },
  reducers: {

    getToken(state, action) {
      state.token = action.payload;
    },

    getLoginStatus(state, action) {
      state.loginStatus = action.payload;
    }
  },
});

export const { getToken, getLoginStatus } =
  dataSlice.actions;
export const loginReducer = dataSlice.reducer;
