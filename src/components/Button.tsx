import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  active: boolean;
  children: React.ReactNode;
};

export const Button = (props: ButtonProps) => {
  if (props.active) {
    return <button className={styles.default}>{props.children}</button>;
  } else {
    return <button className={styles.disabled}>{props.children}</button>;
  }
};
