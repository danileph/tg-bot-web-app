import {
  ComponentProps,
  FC,
  forwardRef,
  TextareaHTMLAttributes,
  useImperativeHandle,
  useRef,
} from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import TextareaAutosize from "react-textarea-autosize";

export type TextareaAutosizeProps = ComponentProps<typeof TextareaAutosize>;

interface IMessageFiledProps extends TextareaAutosizeProps {}

export const MessageField = forwardRef<HTMLTextAreaElement, IMessageFiledProps>(
  ({ className, ...props }, ref) => {
    return (
      <TextareaAutosize
        ref={ref}
        className={clsx(styles.base, className)}
        minRows={1}
        {...props}
      />
    );
  }
);
