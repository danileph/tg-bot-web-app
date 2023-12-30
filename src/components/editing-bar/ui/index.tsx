import React, {
  FC,
  forwardRef,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from "react";
import styles from "../styles.module.css";
import { EditingButton } from "./editing-button";
import { Editor } from "@tiptap/react";
import { Bold, Code, Italic, Strikethrough, Underline } from "lucide-react";

interface IEditingBarProps extends React.HTMLAttributes<HTMLElement> {
  editor: Editor | null;
}

export const EditingBar = forwardRef<Editor, IEditingBarProps>(
  ({ editor }, ref) => {
    const [incrementalKey, setIncrementalKey] = useState(0);

    const incrementKey = useCallback(() => {
      setIncrementalKey((prevState) => prevState + 1);
    }, [incrementalKey]);

    useEffect(() => {
      if (editor) {
        editor.on("selectionUpdate", incrementKey);
        editor.on("focus", incrementKey);

        return () => {
          editor.off("selectionUpdate", incrementKey);
          editor.off("focus", incrementKey);
        };
      }
    }, [editor]);

    if (!editor) return null;

    return (
      <div className={styles.base} key={incrementalKey}>
        <EditingButton
          onClick={() => editor?.chain().focus().toggleBold().run()}
          isActive={editor?.isActive("bold")}
        >
          <Bold width={14} />
        </EditingButton>
        <EditingButton
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          isActive={editor?.isActive("italic")}
        >
          <Italic width={14} />
        </EditingButton>
        <EditingButton
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          isActive={editor?.isActive("underline")}
        >
          <Underline width={14} />
        </EditingButton>
        <EditingButton
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          isActive={editor?.isActive("strike")}
        >
          <Strikethrough width={14} />
        </EditingButton>
        <EditingButton
          onClick={() => editor?.chain().focus().toggleCode().run()}
          isActive={editor?.isActive("code")}
        >
          <Code width={14} />
        </EditingButton>
      </div>
    );
  }
);
