import { FC } from "react";
import styles from "../styles.module.css";

interface IEditingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const EditingButton: FC<IEditingButtonProps> = ({ ...props }) => {
  return <button className={styles.button} {...props} />;
};
