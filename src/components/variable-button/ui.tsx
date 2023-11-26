import { FC } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

interface IVariableButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const VariableButton: FC<IVariableButtonProps> = ({
  className,
  ...props
}) => {
  return <button className={clsx(styles.base)} {...props} />;
};
