import {
  ComponentProps,
  Dispatch,
  FC,
  forwardRef,
  SetStateAction,
  TextareaHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import TextareaAutosize from "react-textarea-autosize";
import { Content, Editor, EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Transaction } from "@tiptap/pm/state";
import { Text } from "@tiptap/extension-text";
import { Link } from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";

export type EditorContentProps = ComponentProps<typeof EditorContent>;

interface IMessageFiledProps
  extends Omit<EditorContentProps, "editor" | "onChange"> {
  onUpdate?: (props: { editor: unknown; transaction: Transaction }) => void;
  editor: Editor | null;
  setEditor: Dispatch<SetStateAction<Editor | null>>;
}

export const MessageField = forwardRef<Editor, IMessageFiledProps>(
  (
    {
      setEditor,
      editor,
      className,
      value,
      onUpdate = (prop) => {},
      onFocus,
      ...props
    },
    ref
  ) => {
    const tiptapEditor = useEditor(
      {
        extensions: [StarterKit, Link, Underline],
        content: (value as string) ?? "",
        onUpdate: onUpdate,
        editorProps: {
          attributes: {
            class: styles.base,
          },
        },
      },
      [value]
    );

    useEffect(() => {
      if (tiptapEditor) {
        setEditor(tiptapEditor);
      }
    }, [tiptapEditor]);

    return (
      <div>
        <EditorContent editor={tiptapEditor} {...props} />
      </div>
    );
  }
);
