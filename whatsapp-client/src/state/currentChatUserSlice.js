import { createSlice } from "@reduxjs/toolkit";

const currentChatUserSlice = createSlice({
  name: "currentChatUser",
  initialState: {
    uid: null,
    currentChatUserName: null,
    currentChatUserProfileUrl: null,
    messages: [],
  },
  reducers: {
    setCurrentChatUser: (state, action) => {
      const { currentChatUserName, currentChatUserProfileUrl, uid } =
        action.payload;

      state.uid = uid;
      state.currentChatUserName = currentChatUserName;
      state.profileUrUrl = currentChatUserProfileUrl || "/default_avatar.png";
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    pushMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { setCurrentChatUser, setMessages, pushMessage } =
  currentChatUserSlice.actions;
export default currentChatUserSlice.reducer;
