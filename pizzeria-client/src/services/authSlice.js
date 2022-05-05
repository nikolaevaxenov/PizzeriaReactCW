import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authState: false,
    userID: "",
    userFirstName: "",
    userLastName: "",
    userMiddleName: "",
    userPhoneNumber: "",
    userEmail: "",
  },
  reducers: {
    userID: (state, payload) => {
      state.userID = payload;
    },
    userFirstName: (state, payload) => {
      state.userFirstName = payload;
    },
    userLastName: (state, payload) => {
      state.userLastName = payload;
    },
    userMiddleName: (state, payload) => {
      state.userMiddleName = payload;
    },
    userPhoneNumber: (state, payload) => {
      state.userPhoneNumber = payload;
    },
    userEmail: (state, payload) => {
      state.userEmail = payload;
    },
    login: (state) => {
      state.authState = true;
    },
    logout: (state) => {
      state.authState = false;
    },
  },
});

export const {
  login,
  logout,
  userID,
  userFirstName,
  userLastName,
  userMiddleName,
  userPhoneNumber,
  userEmail,
} = authSlice.actions;

export const selectAuth = (state) => state.auth.authState;
export const selectUserID = (state) => state.auth.userID;
export const selectUserFirstName = (state) => state.auth.userFirstName;
export const selectUserLastName = (state) => state.auth.userLastName;
export const selectUserMiddleName = (state) => state.auth.userMiddleName;
export const selectUserPhoneNumber = (state) => state.auth.userPhoneNumber;
export const selectUserEmail = (state) => state.auth.userEmail;

export default authSlice.reducer;
