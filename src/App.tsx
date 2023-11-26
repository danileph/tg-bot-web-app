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
// import { Button } from "./components/button";

function App() {
  const { data: messageText, isLoading: isMessageLoading } = useGetMessage("1");
  const { data: variables, isLoading: areVariablesLoading } = useGetVariables();
  const { trigger: updateMessage, isMutating } = usePutMessage("1");

  const messageFieldRef = useRef<HTMLTextAreaElement>(null);
  const [messageFieldState, setMessageFieldState] = useState(
    messageText?.content || ""
  );
  const isFirstGetMessageCall = useRef(true);
  const [insertVariable, { text, selectionRange }] = useInsertStringInTextarea(
    messageFieldRef,
    messageFieldState
  );

  useEffect(() => {
    if (messageText && variables) {
      Telegram.WebApp.ready();
      if (isFirstGetMessageCall.current) {
        setMessageFieldState(messageText.content);
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
    try {
      await updateMessage({
        content: messageFieldState,
      });
      message.success("Сообщение успешно сохранено!");
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        message.error("Возникла ошибка при сохранении...");
      }
    }
  };

  return (
    <>
      {isMessageLoading && areVariablesLoading ? (
        <div className={styles.spinnerContainer}>
          <Spin size={"large"} />
        </div>
      ) : (
        <div className={styles.base}>
          <section className={styles.variableSection}>
            <p>Переменные:</p>
            {variables?.map((variable) => (
              <VariableButton
                key={variable.id}
                onClick={() => insertVariable(variable.code)}
              >
                {variable.name}
              </VariableButton>
            ))}
          </section>
          <section className={styles.variableSection}>
            <p>Текст сообщения:</p>
            <MessageField
              ref={messageFieldRef}
              value={messageFieldState}
              onChange={onMessageChangeHandler}
              onFocus={onMessageFieldFocusHandler}
            />
          </section>
          <div style={{ flexGrow: 1, margin: 0 }} />
          <Button
            onClick={onSaveHandler}
            type={"primary"}
            size={"large"}
            loading={isMutating}
          >
            Сохранить
          </Button>
        </div>
      )}
    </>
  );
}
export default App;
