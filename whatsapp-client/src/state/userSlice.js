import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    uid: undefined,
    userName: undefined,
    profileUrl: undefined,
    isChatting: false,
    contacts: [],
    isSearching: false,
    searchInput: "",
    calling: { isCalling: false, callType: undefined, callingTo: undefined },
    incomingCall: {
      isIncomingCall: false,
      callType: undefined,
      callerName: undefined,
    },
  },
  reducers: {
    setUser: (state, action) => {
      const { userName, profileUrl, uid } = action.payload;
      state.uid = uid;
      state.userName = userName;
      state.profileUrl = profileUrl;
    },
    setIsChatting: (state, action) => {
      state.isChatting = action.payload;
    },
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    setIsSearching: (state, action) => {
      state.isSearching = action.payload;
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    setCalling: (state, action) => {
      state.calling = action.payload;
    },
    setIncomingCall: (state, action) => {
      state.incomingCall = action.payload;
    },
  },
});

export const {
  setUser,
  setIsChatting,
  setContacts,
  setIsSearching,
  setSearchInput,
  setCalling,
  setIncomingCall,
} = userSlice.actions;
export default userSlice.reducer;
