import { VariableButton } from "./components/variable-button";
import { useGetMessage, usePutMessage } from "./api/messages";
import { useGetVariables, Variable } from "./api/variables";
import { MessageField } from "./components/message-field";
import React, {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useInsertStringInTextarea } from "./lib/hooks";
import styles from "./App.module.css";
import { Button, message, Spin } from "antd";
import { useUrlParam } from "./lib/hooks/use-url-param";
import { useTgMainButton } from "./lib/hooks/use-tg-main-button";
import { useTgEventListener } from "./lib/hooks/use-tg-event-listener";
import { TelegramOnlyGuard } from "./components/telegram-only-guard/ui";

function App() {
  const postId = useUrlParam("postId");
  const botId = useUrlParam("botId");
  const { data: currentMessage, isLoading: isMessageLoading } = useGetMessage(
    botId,
    postId
  );
  const { data: variables, isLoading: areVariablesLoading } =
    useGetVariables(botId);
  const { trigger: updateMessage, isMutating } = usePutMessage();

  const messageText =
    currentMessage?.message.caption ?? currentMessage?.message.text;

  const messageFieldRef = useRef<HTMLTextAreaElement>(null);
  const [messageFieldState, setMessageFieldState] = useState(messageText || "");
  const isFirstGetMessageCall = useRef(true);
  const [insertVariable, { text, selectionRange }] = useInsertStringInTextarea(
    messageFieldRef,
    messageFieldState
  );

  useEffect(() => {
    console.log(Telegram.WebApp);
    if (messageText && variables) {
      Telegram.WebApp.ready();
      if (isFirstGetMessageCall.current) {
        setMessageFieldState(messageText);
        isFirstGetMessageCall.current = false;
      }
    }
  }, [messageText, variables]);

  useLayoutEffect(() => {
    const { start, end } = selectionRange.current;

    if (messageFieldRef?.current) {
      messageFieldRef.current.setSelectionRange(start, end);
    }
  }, [messageFieldState]);

  useEffect(() => {
    setMessageFieldState(text);
  }, [text]);

  useTgMainButton();
  useTgEventListener(
    "mainButtonClicked",
    async () => {
      if (!currentMessage) return undefined;
      console.log({
        messageFieldState,
        currentMessage,
      });

      try {
        await updateMessage({
          ...currentMessage,
          message: {
            ...currentMessage.message,
            caption: !!currentMessage.message.medias ? messageFieldState : null,
            text: !currentMessage.message.medias ? messageFieldState : null,
          },
        });
        message.success("Сообщение успешно сохранено!");
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message);
          message.error("Возникла ошибка при сохранении...");
        }
      }
    },
    [currentMessage, messageFieldState]
  );

  const onMessageChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    selectionRange.current = {
      start: e.target.selectionStart,
      end: e.target.selectionEnd,
    };
    setMessageFieldState(e.target.value);
  };

  const onMessageFieldFocusHandler = (
    e: React.FocusEvent<HTMLTextAreaElement, Element>
  ) => {
    // e.currentTarget.setSelectionRange(selectionStart, selectionEnd);
  };

  return (
    <>
      {isMessageLoading && areVariablesLoading ? (
        <div className={styles.spinnerContainer}>
          <Spin size={"large"} />
        </div>
      ) : (
        <div className={styles.base}>
          <h1 className={styles.title}>{currentMessage?.name}</h1>
          <section className={styles.variableSection}>
            <p className={styles.subtitle}>Подстановки</p>
            {variables?.map((variable) => (
              <VariableButton
                key={variable.key}
                onClick={() => insertVariable(variable.key)}
              >
                {variable.value}
              </VariableButton>
            ))}
          </section>
          <section className={styles.variableSection}>
            <p className={styles.subtitle}>Текст поста</p>
            <MessageField
              ref={messageFieldRef}
              value={messageFieldState}
              onChange={onMessageChangeHandler}
              onFocus={onMessageFieldFocusHandler}
            />
          </section>
          <div style={{ flexGrow: 1, margin: 0 }} />
        </div>
      )}
    </>
  );
}
export default App;
