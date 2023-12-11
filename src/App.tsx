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
import { useTelegramMainButton } from "./lib/hooks/useTelegramMainButton";
// import { Button } from "./components/button";

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

  const onSaveHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!currentMessage) return undefined;

    try {
      await updateMessage({
        ...currentMessage,
        message: {
          ...currentMessage.message,
          caption: messageFieldState,
          text: messageFieldState,
        },
      });
      message.success("Сообщение успешно сохранено!");
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        message.error("Возникла ошибка при сохранении...");
      }
    }
  };

  useTelegramMainButton(onSaveHandler);

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
          {/*<Button*/}
          {/*  onClick={onSaveHandler}*/}
          {/*  type={"primary"}*/}
          {/*  size={"large"}*/}
          {/*  loading={isMutating}*/}
          {/*  className={styles.button}*/}
          {/*>*/}
          {/*  Сохранить*/}
          {/*</Button>*/}
        </div>
      )}
    </>
  );
}
export default App;
