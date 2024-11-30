import React from "react";
import styles from "@/src/styles/Button.module.scss";

type ButtonProps = {
  active: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

const Button = (props: ButtonProps) => {
  if (props.active) {
    return (
      <button className={styles.default} onClick={props.onClick}>
        {props.children}
      </button>
    );
  } else {
    return <button className={styles.disabled} onClick={()=>{}}>{props.children}</button>;
  }
};

export default Button;
