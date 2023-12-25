import React, { FC, forwardRef } from "react";
import styles from "../styles.module.css";
import { EditingButton } from "./editing-button";
import { Editor } from "@tiptap/react";
import { Bold, Code, Italic, Strikethrough, Underline } from "lucide-react";

interface IEditingBarProps extends React.HTMLAttributes<HTMLElement> {}

export const EditingBar = forwardRef<Editor, IEditingBarProps>(({}, ref) => {
  return (
    <div className={styles.base}>
      <EditingButton>
        <Bold width={14} />
      </EditingButton>
      <EditingButton>
        <Italic width={14} />
      </EditingButton>
      <EditingButton>
        <Underline width={14} />
      </EditingButton>
      <EditingButton>
        <Strikethrough width={14} />
      </EditingButton>
      <EditingButton>
        <Code width={14} />
      </EditingButton>
    </div>
  );
});
