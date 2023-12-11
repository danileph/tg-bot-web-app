import { useEffect, useState } from "react";

export const useTelegramMainButton = () => {
  const [_callback, setCallback] = useState<(...args: any) => any>();

  const onClick = (callback: (...args: any) => any) => {
    setCallback(callback);
  };

  useEffect(() => {
    if (!!Telegram.WebApp && !!_callback) {
      const tg = Telegram.WebApp;
      tg.MainButton.setParams({
        is_active: true,
        is_visible: true,
        text: "Сохранить",
      });
      tg.MainButton.onClick(_callback);
    }
    return () => {
      if (!!Telegram.WebApp && !!_callback) {
        const tg = Telegram.WebApp;
        /* @ts-ignore */
        tg.MainButton.offClick(_callback);
      }
    };
  }, [_callback]);

  return { onClick };
};
