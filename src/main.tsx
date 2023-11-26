import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SWRConfig } from "swr";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <App />
    </SWRConfig>
  </React.StrictMode>
);
