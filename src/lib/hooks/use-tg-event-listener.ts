import { useEffect } from "react";
import { TelegramWebApps } from "telegram-webapps-types";

export const useTgEventListener = (
  event: TelegramWebApps.EventType,
  callback: (...args: any) => any,
  deps?: React.DependencyList
) => {
  useEffect(() => {
    if (!!Telegram.WebApp) {
      const tg = Telegram.WebApp;
      tg.onEvent(event, callback);
    }

    return () => {
      if (!!Telegram.WebApp) {
        const tg = Telegram.WebApp;
        tg.offEvent(event, callback);
      }
    };
  }, [...(deps ?? [])]);
};
