import { createSlice } from "@reduxjs/toolkit";

const onlineUserSlice = createSlice({
  name: "onlineUsers",
  initialState: {
    onlineUsers: [],
  },
  reducers: {
    addOnlineUser: (state, action) => {
      if (!state.onlineUsers.includes(action.payload)) {
        state.onlineUsers = [...state.onlineUsers, action.payload];
      }
    },
    removeOnlineUser: (state, action) => {
      state.onlineUsers = state.onlineUsers.filter(
        (uid) => uid !== action.payload,
      );
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});
export const { addOnlineUser, removeOnlineUser, setOnlineUsers } =
  onlineUserSlice.actions;

export default onlineUserSlice.reducer;
