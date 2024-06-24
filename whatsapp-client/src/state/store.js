import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import currentChatUserReducer from "./currentChatUserSlice";
import onlineUsers from "./onlineUserSlice"
const store = configureStore({
  reducer: {
    user: userReducer,
    currentChatUser: currentChatUserReducer,
    onlineUsers:onlineUsers
  },
});

export default store;
