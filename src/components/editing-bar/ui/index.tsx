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
import {
  Bold,
  Code,
  Italic,
  Strikethrough,
  Underline,
  Link as LinkIcon,
  Unlink,
} from "lucide-react";
import { Link } from "@tiptap/extension-link";

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

    const setLink = useCallback(() => {
      if (!editor) return;
      const previousUrl = editor.getAttributes("link").href;
      const url = window.prompt("URL", previousUrl);
      console.log(typeof url);

      // cancelled
      if (url === null) {
        return;
      }

      // empty
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();

        return;
      }

      // update link
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
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
        <div className={styles.linkButtons}>
          <EditingButton onClick={setLink} isActive={editor?.isActive("link")}>
            <LinkIcon width={14} />
          </EditingButton>
          <EditingButton
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive("link")}
          >
            <Unlink width={14} />
          </EditingButton>
        </div>
      </div>
    );
  }
);
