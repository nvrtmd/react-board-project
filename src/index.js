import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import App from "./App";
import GlobalStyle from "./styles/globalStyle";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
