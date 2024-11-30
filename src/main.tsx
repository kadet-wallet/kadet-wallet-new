import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "@/src/App";
import { store } from "@/src/redux/Store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
