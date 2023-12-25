import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SWRConfig } from "swr";
import { TelegramOnlyGuard } from "./components/telegram-only-guard/ui";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      {/*<TelegramOnlyGuard>*/}
      <App />
      {/*</TelegramOnlyGuard>*/}
    </SWRConfig>
  </React.StrictMode>
);
