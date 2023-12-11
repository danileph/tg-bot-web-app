import React, { FC, useEffect } from "react";
import appStyles from "../../App.module.css";
import styles from "./styles.module.css";

interface ITelegramOnlyGuardProps extends React.HTMLAttributes<HTMLElement> {}

export const TelegramOnlyGuard: FC<ITelegramOnlyGuardProps> = ({
  children,
}) => {
  return (
    <>
      {Telegram.WebApp.initData ? (
        children
      ) : (
        <div className={appStyles.spinnerContainer}>
          <h1 className={styles.title}>Нет доступа :(</h1>
          <p className={styles.subtitle}>
            Данное приложение работает только как mini app в телеграме
          </p>
        </div>
      )}
    </>
  );
};
