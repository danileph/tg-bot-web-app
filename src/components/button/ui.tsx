import { FC } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<IButtonProps> = ({ className, ...props }) => {
  return <button className={clsx(styles.base, className)} {...props} />;
};
