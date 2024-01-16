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

function App() {
  // const postId = useUrlParam("postId");
  // const botId = useUrlParam("botId");
  const postId = "163";
  const botId = "6336144138";
  const { data: currentMessage, isLoading: isMessageLoading } = useGetMessage(
    botId,
    postId
  );
  const { data: variables, isLoading: areVariablesLoading } =
    useGetVariables(botId);
  const { trigger: updateMessage, isMutating } = usePutMessage();

  // const messageText =
  //   currentMessage?.message.caption ??
  //   currentMessage?.message.text ??
  //   undefined;

  const messageText =
    "Esse nulla aute aliquip adipisicing est sunt sunt consectetur deserunt dolor nisi veniam. Exercitation velit et voluptate pariatur. Ipsum pariatur ut culpa quis consectetur adipisicing deserunt dolore consectetur proident. Labore officia esse duis reprehenderit eu tempor ullamco est tempor. Laboris consectetur laborum eiusmod exercitation ad deserunt elit deserunt. Pariatur irure fugiat elit est ipsum tempor ea do. Ea consectetur ad Lorem culpa nostrud excepteur duis aliqua ipsum sunt. Ullamco non nulla aliqua do sunt nisi.\n" +
    "\n" +
    "Eiusmod dolore veniam consequat eiusmod cillum eiusmod exercitation nulla consequat aute. Do aliqua consectetur ipsum reprehenderit tempor do non consequat eiusmod duis occaecat sit eu Lorem anim. Voluptate labore est minim deserunt enim. Cupidatat cillum deserunt anim duis aliqua irure ullamco fugiat. Fugiat nostrud quis occaecat. Ex non velit reprehenderit sint dolor mollit officia ullamco. Pariatur irure fugiat consequat pariatur ea in est consequat laborum dolor. Occaecat in laboris Lorem sint eu Lorem aute occaecat culpa consectetur in.\n" +
    "\n" +
    "Pariatur dolore et proident velit Lorem excepteur occaecat amet incididunt incididunt Lorem. Ea minim incididunt reprehenderit laborum elit. Eiusmod voluptate reprehenderit irure ullamco mollit labore cupidatat magna. Esse reprehenderit laborum quis eiusmod. Reprehenderit consequat labore id nulla sunt duis esse.\n" +
    "\n" +
    "Cupidatat voluptate dolore cillum deserunt. Nulla ipsum reprehenderit velit irure do esse non quis. Lorem Lorem officia id ad dolore occaecat. Commodo do ex consequat dolor. Ex sit non velit consectetur sint ad esse irure. Consequat ad aliquip eiusmod ipsum amet officia. Lorem quis mollit aliqua voluptate dolore tempor reprehenderit ipsum proident ullamco.\n" +
    "\n" +
    "Minim eu sit consectetur minim minim. Enim commodo et eu minim consequat magna esse eiusmod consequat id est quis sunt deserunt. Occaecat consequat do adipisicing duis laboris tempor elit. Anim qui in minim officia non proident labore reprehenderit eu sunt do mollit. Minim et irure sit eu pariatur consectetur mollit mollit qui dolor dolore consequat nisi.\n" +
    "\n" +
    "Consequat magna nisi veniam esse do Lorem et minim quis. Do mollit eiusmod duis esse dolore do cupidatat deserunt nulla officia ea cillum. Eu id enim veniam anim ipsum commodo amet ullamco fugiat officia est proident. Labore sunt cupidatat deserunt esse amet Lorem ex id deserunt consequat officia sint officia. Do incididunt fugiat adipisicing. Qui exercitation fugiat tempor et mollit dolor dolore fugiat culpa duis velit laboris culpa et.\n" +
    "\n" +
    "Ad quis incididunt pariatur ipsum nulla irure aliquip ut commodo anim labore velit. Aute proident esse minim irure velit deserunt mollit magna id velit culpa. Occaecat laboris cupidatat consequat ipsum esse ipsum. Amet exercitation dolore ea officia cillum aliquip duis in aliqua fugiat laborum officia.\n" +
    "\n" +
    "Magna culpa non ipsum amet velit amet adipisicing officia dolor. Eu aute dolore officia. Occaecat deserunt dolore occaecat magna mollit culpa sit exercitation tempor laborum adipisicing anim sit aliquip. Culpa minim ea laborum tempor. Consequat dolor anim ullamco ad mollit aute cupidatat duis ex do esse. Adipisicing incididunt ut proident voluptate ullamco ex quis eiusmod.\n" +
    "\n" +
    "Aliqua officia pariatur est duis qui duis consectetur in elit anim. Lorem id laboris cupidatat et irure labore magna. Aliquip amet ullamco minim proident occaecat tempor do quis in nisi culpa qui ullamco et excepteur. Occaecat excepteur aute et laborum et non nulla culpa aliquip officia ea occaecat. Anim veniam eu qui consequat ad tempor esse labore. Est eiusmod anim tempor occaecat anim excepteur occaecat occaecat nulla amet voluptate enim do.\n" +
    "\n" +
    "Reprehenderit pariatur nisi ea veniam laboris voluptate et. Culpa officia ullamco labore. Ex exercitation proident sunt mollit est commodo et incididunt sunt laborum anim Lorem qui cillum commodo. Culpa eiusmod quis elit fugiat proident nulla reprehenderit nostrud et.\n" +
    "\n" +
    "Deserunt cillum sit fugiat aliqua adipisicing consequat velit reprehenderit. Duis reprehenderit minim exercitation non consequat deserunt officia ea. Occaecat nisi velit do ut ex aliqua voluptate ipsum consectetur amet eu dolore nostrud. Lorem aliquip nostrud consequat ut minim. Eiusmod sint culpa veniam esse aute consectetur mollit. Labore excepteur officia adipisicing occaecat ipsum exercitation enim nulla labore culpa cupidatat aliquip ullamco.\n" +
    "\n" +
    "Labore esse excepteur nulla et et ad magna esse. Sit laborum enim qui in sunt mollit. Irure pariatur consequat id consectetur ut elit mollit enim irure fugiat est ea ipsum magna. Adipisicing consectetur Lorem veniam dolor commodo laboris. Velit deserunt pariatur nisi ut non pariatur nulla cupidatat labore consectetur velit in.\n" +
    "\n" +
    "Reprehenderit commodo deserunt ut ex Lorem adipisicing ea velit fugiat ut eu laborum reprehenderit. Excepteur ex cillum nisi nulla enim. Magna occaecat nulla nulla cupidatat eu. Laboris voluptate mollit commodo magna eiusmod incididunt elit commodo proident. In voluptate aute nostrud proident mollit aliqua duis do eu ex reprehenderit qui. Excepteur laborum nulla dolor Lorem exercitation.\n" +
    "\n" +
    "Do et velit magna deserunt laborum irure tempor mollit aliquip. Duis fugiat enim ipsum consectetur exercitation ullamco do. Eu magna pariatur enim. Dolore deserunt aute ex dolor nisi minim aliquip et. Ullamco exercitation nostrud officia esse labore ipsum duis anim officia nostrud aliqua occaecat quis amet. Aliquip cillum minim dolore sint labore nisi.\n" +
    "\n" +
    "Nostrud eiusmod do tempor do. Ipsum ullamco sunt non commodo minim ut. Adipisicing amet in sint nostrud ullamco. Adipisicing do ea excepteur anim pariatur ipsum do duis. Nulla consectetur commodo officia enim reprehenderit ullamco culpa aute mollit ipsum fugiat reprehenderit officia excepteur. Ad veniam sit velit amet. Eiusmod amet ea qui ad labore aliquip Lorem. Aliqua nostrud aute proident dolore ad elit amet aliquip nostrud culpa labore.\n" +
    "\n" +
    "Deserunt do voluptate ad reprehenderit culpa id anim ad mollit. Consectetur do nisi consectetur laboris tempor ea ipsum minim non pariatur. Sunt irure exercitation aliquip. Est commodo minim irure id culpa qui ipsum ipsum eu occaecat consectetur. Deserunt est aliquip incididunt ad. Voluptate ut ex minim in occaecat et Lorem dolore. Irure minim incididunt ut et.\n" +
    "\n" +
    "Pariatur aute nulla laborum consequat cupidatat nostrud est occaecat nulla culpa cillum. Excepteur do consectetur quis commodo cillum tempor cupidatat cillum ut aute. Id consequat sunt deserunt esse quis duis. Mollit minim aute nostrud duis exercitation anim labore eu consequat. Ea tempor ut id laborum magna dolor amet eiusmod dolore ipsum ipsum qui commodo. Anim et deserunt excepteur irure ut veniam consectetur aliqua occaecat ea fugiat reprehenderit ea reprehenderit.\n" +
    "\n" +
    "Ex consequat ea velit officia. Culpa incididunt cupidatat velit in amet adipisicing pariatur occaecat nulla aliqua eu voluptate tempor. Incididunt nisi aute aute aliqua sint sint excepteur occaecat labore non enim ipsum tempor laboris tempor. Consequat non aliquip anim. Quis quis deserunt nisi voluptate proident ea ex adipisicing occaecat dolore.\n" +
    "\n" +
    "Culpa ad non dolore elit veniam ipsum excepteur id pariatur qui enim aliquip aliqua ut. Culpa dolor sint voluptate dolore. Consectetur irure esse nulla minim pariatur commodo fugiat. Elit culpa duis dolore duis eiusmod cillum ipsum. Velit laboris in esse pariatur ad voluptate sunt ex occaecat dolore Lorem do reprehenderit. Sit cillum officia sunt sunt veniam officia irure est laboris voluptate ex do. Irure anim exercitation qui pariatur mollit. Ut enim exercitation excepteur adipisicing aliqua pariatur dolor ad sint do anim exercitation.\n" +
    "\n" +
    "Irure amet ut ad. Sunt Lorem enim laborum nisi cillum. Cupidatat sit ipsum officia nisi id eiusmod. Eu minim in incididunt fugiat nisi. Fugiat sit elit excepteur duis ipsum incididunt magna elit dolore enim.\n" +
    "\n" +
    "Consectetur ullamco reprehenderit amet labore consequat duis ex Lorem eu commodo dolore amet aliqua eu. Officia consectetur dolor sit. Duis ut est aute anim labore irure aliqua. Culpa nostrud culpa nostrud. Nisi reprehenderit anim deserunt. Sunt esse ullamco adipisicing culpa dolor mollit magna pariatur sint qui.\n" +
    "\n" +
    "Veniam cillum cupidatat reprehenderit labore nisi excepteur fugiat sunt do. Mollit duis est incididunt velit ad ipsum ut minim duis nulla aliquip esse incididunt veniam. Anim anim nisi non anim eu. Commodo eiusmod voluptate culpa duis elit deserunt do ex elit aliqua excepteur mollit. Voluptate esse do enim velit dolore enim ipsum adipisicing esse magna quis.\n" +
    "\n" +
    "Irure esse nisi nulla aliquip consectetur ea pariatur occaecat Lorem sunt eiusmod pariatur eiusmod magna. Excepteur nisi anim Lorem quis consectetur exercitation sit exercitation. Sunt anim esse excepteur deserunt et aliqua. Ipsum veniam minim excepteur eu ea. Occaecat ipsum enim veniam duis voluptate et sit aute aute id. Magna fugiat adipisicing incididunt.\n" +
    "\n" +
    "Magna ipsum commodo non reprehenderit nostrud veniam dolor exercitation veniam in ad qui adipisicing qui. Exercitation fugiat voluptate aute velit voluptate irure proident. Amet nisi fugiat mollit deserunt excepteur cillum occaecat ea sit minim cillum qui aliquip laboris. Do laboris minim consectetur. Deserunt mollit enim qui occaecat dolore. Incididunt do ex ipsum nisi qui nisi magna ullamco excepteur laboris id adipisicing qui sit minim. Aute proident nulla dolore deserunt tempor nulla laborum est adipisicing dolor aliquip.\n" +
    "\n" +
    "Sint non aliquip enim. Non irure cillum anim nisi sint ut ut pariatur consequat ea pariatur dolore ex in esse. Cupidatat ea esse incididunt excepteur ad sint. Esse adipisicing irure sit ad cupidatat sunt sit minim dolore. Amet ea anim veniam labore anim irure ad nisi sit sunt ex id ipsum incididunt sint. Dolore velit Lorem Lorem eiusmod deserunt magna officia commodo elit. Cupidatat occaecat amet veniam aute reprehenderit amet commodo proident id est sunt.\n" +
    "\n" +
    "Culpa commodo aliquip aute velit excepteur mollit ad do minim quis laboris Lorem elit cillum. Laborum ea nulla dolor id. Quis velit est ipsum Lorem eu pariatur consectetur velit adipisicing do incididunt. Ullamco reprehenderit Lorem culpa eu voluptate ex sit minim adipisicing et fugiat. Veniam consectetur ipsum minim nisi mollit est ullamco do consectetur elit dolore ea consequat. Eu Lorem commodo fugiat quis incididunt exercitation duis consequat eu reprehenderit do. Reprehenderit nisi anim duis non. Qui laborum excepteur aute amet velit sit qui voluptate velit ex cupidatat sint nisi pariatur cupidatat.\n" +
    "\n" +
    "Est aliquip nulla qui in qui est duis laboris laboris pariatur commodo magna. Voluptate nostrud nulla esse labore qui et proident est consequat voluptate officia sint. Ullamco esse consequat cillum aute voluptate veniam ex exercitation eu sit sunt. Deserunt ut non quis est ullamco in. Ipsum esse elit do anim anim sunt ipsum tempor occaecat.\n" +
    "\n" +
    "Aliquip ullamco aliquip sunt aute amet proident sit excepteur dolore Lorem deserunt do deserunt. Dolore ut Lorem eiusmod aliquip. Enim anim minim laborum laboris. Exercitation enim esse minim tempor reprehenderit tempor laboris.\n" +
    "\n" +
    "Exercitation minim et velit esse non amet duis Lorem ipsum deserunt. Velit officia sunt aliquip pariatur enim officia veniam non. Occaecat qui eu duis sunt eiusmod dolore ullamco. Et exercitation nisi mollit ullamco commodo ad aliquip. Reprehenderit ea magna minim officia pariatur cillum amet. Officia occaecat amet eiusmod Lorem mollit nostrud. Irure nulla aute dolor adipisicing enim ullamco nulla ad dolor dolor culpa dolor est non.\n" +
    "\n" +
    "Sit tempor esse ex officia. Adipisicing consequat non labore esse aliquip est aliquip incididunt aliquip proident consectetur sit irure. Commodo est consequat officia ullamco ut veniam incididunt eu adipisicing qui exercitation nostrud voluptate. Occaecat proident dolor velit proident nulla veniam velit deserunt voluptate est nostrud. Minim cillum aliquip labore. Sit dolore cillum ex consequat aute aliqua ut consequat irure nulla Lorem laborum enim officia culpa. Tempor qui culpa esse pariatur. Exercitation pariatur laborum anim.";

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
    setMessageFieldState(removePTagsAndMoveNextLine(editor.getHTML()));
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
          value={messageText}
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
