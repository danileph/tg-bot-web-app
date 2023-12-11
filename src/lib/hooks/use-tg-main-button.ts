import { useEffect, useState } from "react";

export const useTgMainButton = () => {
  useEffect(() => {
    if (!!Telegram.WebApp) {
      const tg = Telegram.WebApp;
      tg.MainButton.setParams({
        is_active: true,
        is_visible: true,
        text: "Сохранить",
      });
    }
    return () => {
      if (!!Telegram.WebApp) {
        const tg = Telegram.WebApp;
      }
    };
  }, []);
};
