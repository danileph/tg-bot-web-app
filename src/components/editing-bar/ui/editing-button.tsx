import { FC } from "react";
import styles from "../styles.module.css";
import clsx from "clsx";

interface IEditingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export const EditingButton: FC<IEditingButtonProps> = ({
  isActive,
  ...props
}) => {
  return (
    <button
      className={clsx(styles.button, isActive && styles.buttonActive)}
      {...props}
    />
  );
};
