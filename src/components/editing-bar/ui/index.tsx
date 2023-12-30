import React, { FC, forwardRef } from "react";
import styles from "../styles.module.css";
import { EditingButton } from "./editing-button";
import { Editor } from "@tiptap/react";
import { Bold, Code, Italic, Strikethrough, Underline } from "lucide-react";

interface IEditingBarProps extends React.HTMLAttributes<HTMLElement> {}

export const EditingBar = forwardRef<Editor, IEditingBarProps>(({}, ref) => {
  // if (!ref || !("current" in ref) || !ref.current) return null;
  const editor = ref && "current" in ref && ref.current ? ref.current : null;

  return (
    <div className={styles.base}>
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
});
