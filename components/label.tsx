import { FunctionComponent } from "react";
import styles from "../styles/label.module.css"

type Props = {
  children: string;
};

const Label: FunctionComponent<Props> = ({ children }) => {
  return <label className={styles.label}>{children}</label>;
};

export default Label;
