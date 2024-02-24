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
import { Editor } from "@tiptap/react";
import { removePTagsAndMoveNextLine } from "./lib/helpers/removePTagsAndMoveNextLine";
import { EditingBar } from "./components/editing-bar";
import { nToBr } from "./lib/helpers/nToBr";
import { brToN } from "./lib/helpers/BrToN";

function App() {
  const postId = useUrlParam("postId");
  const botId = useUrlParam("botId");
  // const postId = "252";
  // const botId = "6562756875";
  const { data: currentMessage, isLoading: isMessageLoading } = useGetMessage(
    botId,
    postId
  );
  const { data: variables, isLoading: areVariablesLoading } =
    useGetVariables(botId);
  const { trigger: updateMessage, isMutating } = usePutMessage();

  const messageText =
    currentMessage?.message.caption ??
    currentMessage?.message.text ??
    undefined;

  // const messageText = "Hello\n my name is danil";

  const [messageEditor, setMessageEditor] = useState<Editor | null>(null);
  const [messageFieldState, setMessageFieldState] = useState("");

  useEffect(() => {
    if (messageText && variables) {
      Telegram.WebApp.ready();
    }
  }, [messageText, variables]);

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

  const insertVariable = (variable: string) => {
    if (messageEditor) {
      messageEditor?.commands.insertContent(variable);
    }
  };

  const onMessageChangeHandler = (props: { editor: unknown }) => {
    const editor = props.editor as Editor;
    setMessageFieldState(brToN(removePTagsAndMoveNextLine(editor.getHTML())));
    console.log({
      pure: editor.getHTML(),
      removePTagsAndMoveNextLine: removePTagsAndMoveNextLine(editor.getHTML()),
      brToN: brToN(removePTagsAndMoveNextLine(editor.getHTML())),
    });
    editor.commands.focus();
  };

  if (isMessageLoading && areVariablesLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spin size={"large"} />
      </div>
    );
  }

  return (
    <div className={styles.base}>
      <h1 className={styles.title}>{currentMessage?.name}</h1>
      <p className={styles.subtitle}>Подстановки</p>
      <section className={styles.variableSection}>
        {variables?.map((variable) => (
          <VariableButton
            key={variable.key}
            onClick={() => insertVariable(variable.key)}
          >
            {variable.value}
          </VariableButton>
        ))}
      </section>
      <section>
        <EditingBar editor={messageEditor} />
        <p className={styles.subtitle}>Текст поста</p>
        <MessageField
          value={nToBr(messageText ?? "")}
          setEditor={setMessageEditor}
          editor={messageEditor}
          onUpdate={onMessageChangeHandler}
          // onFocus={onMessageFieldFocusHandler}
        />
      </section>
      {/*<div style={{ flexGrow: 1, margin: 0 }} />*/}
    </div>
  );
}
export default App;
