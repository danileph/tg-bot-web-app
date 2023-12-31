import { useEffect } from "react";

export const useTgShowPopup = () => {
  useEffect(() => {
    if (!!Telegram.WebApp) {
      const tg = Telegram.WebApp;
    }
  }, []);
};
