import { useEffect } from "react";

export const useTelegramMainButton = (
  callback: (...params: any[]) => any,
  depth?: React.DependencyList | undefined
) => {
  useEffect(() => {
    if (!!Telegram.WebApp) {
      const tg = Telegram.WebApp;
      tg.MainButton.setParams({
        is_active: true,
        is_visible: true,
        text: "Сохранить",
      });
      tg.MainButton.onClick(callback);
    }
    return () => {
      if (!!Telegram.WebApp) {
        const tg = Telegram.WebApp;
        tg.MainButton.hide();
      }
    };
  }, [...[depth ?? []]]);
};
