import { MutableRefObject, Ref, RefObject, useRef, useState } from "react";

export type InsertStringInTextareaConfig = {
  state: string;
  setState: (newValue: string) => void;
};

export type SelectionRange = {
  start: number;
  end: number;
};

export const useInsertStringInTextarea: (
  ref: React.RefObject<HTMLTextAreaElement>,
  initialText: string
) => [
  (str: string) => void,
  {
    selectionRange: MutableRefObject<SelectionRange>;
    text: string;
  }
] = (ref: RefObject<HTMLTextAreaElement>, initialText) => {
  const [text, setText] = useState(initialText);
  const selectionRange = useRef<SelectionRange>({ start: 0, end: 0 });

  const trigger = (str: string): void => {
    const textarea = ref.current;
    if (!textarea) return undefined;

    const selectionStart = textarea.selectionStart;
    const selectionEnd = textarea.selectionEnd;

    const text = textarea.value;

    const newText = `${text.substring(0, selectionStart)}${str}${text.substring(
      selectionEnd
    )}`;

    const newSelectionStart = selectionStart;
    const newSelectionEnd = selectionStart + str.length;

    selectionRange.current = {
      start: newSelectionStart,
      end: newSelectionEnd,
    };
    setText(newText);

    textarea.focus();
    // textarea.setSelectionRange(newSelectionStart, newSelectionEnd);

    // setTimeout(() => {
    //   setSelection({ start: newSelectionStart, end: newSelectionEnd });
    //
    //   // Update the selection range in the textarea
    //   textarea.setSelectionRange(newSelectionStart, newSelectionEnd);
    //   textarea.focus();
    // }, 0);
  };

  return [
    trigger,
    {
      text: text,
      selectionRange,
    },
  ];
};
