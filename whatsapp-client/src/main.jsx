import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./state/store.js";
import { Provider } from "react-redux";
import { SocketProvider } from "./state/socketContext";
import React from "react";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <App />
      </SocketProvider>
    </Provider>
  </React.StrictMode>,
);
