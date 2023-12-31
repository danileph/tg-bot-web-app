import React, {
  FC,
  forwardRef,
  RefObject,
  useCallback,
  useEffect,
  useRef,
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
import { Input, InputRef, Modal } from "antd";

interface IEditingBarProps extends React.HTMLAttributes<HTMLElement> {
  editor: Editor | null;
}

export const EditingBar = forwardRef<Editor, IEditingBarProps>(
  ({ editor }, ref) => {
    const [incrementalKey, setIncrementalKey] = useState(0);
    const [isLinkModalOpened, setIsLinkModalOpened] = useState(false);
    const [link, setLink] = useState("");
    const linkInputRef = useRef<InputRef>(null);

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

    const onSetLinkModalOkHandler = useCallback(() => {
      setIsLinkModalOpened(false);
      if (!editor) return;

      // empty
      if (link === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();

        return;
      }

      // update link
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: link })
        .run();
    }, [editor, link]);

    const onSetLinkModalCancelHandler = useCallback(() => {
      setIsLinkModalOpened(false);
      setLink("");
      if (!editor) return;
    }, [editor, link]);

    const onSetLinkModalOpenHandler = useCallback(() => {
      setIsLinkModalOpened(true);
      setTimeout(() => {
        if (!!linkInputRef.current) {
          linkInputRef.current.focus();
          linkInputRef.current.setSelectionRange(0, 999);
        }
      }, 0);
      if (!editor) return;
      const previousUrl = editor.getAttributes("link").href;
      setLink(previousUrl);
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
          <EditingButton
            onClick={onSetLinkModalOpenHandler}
            isActive={editor?.isActive("link")}
          >
            <LinkIcon width={14} />
          </EditingButton>
          <EditingButton
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive("link")}
          >
            <Unlink width={14} />
          </EditingButton>
          <Modal
            open={isLinkModalOpened}
            onOk={onSetLinkModalOkHandler}
            onCancel={onSetLinkModalCancelHandler}
            title={"Адрес ссылки"}
            okText={"Ок"}
            cancelText={"Отмена"}
          >
            <Input
              placeholder={"https://www.example.com"}
              value={link}
              onChange={(e) => setLink(e.target.value)}
              ref={linkInputRef}
            />
          </Modal>
        </div>
      </div>
    );
  }
);
