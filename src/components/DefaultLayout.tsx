import React from "react";
import styles from "@/src/components/DefaultLayout.module.scss";

type DefaultLayoutProps = {
  children: React.ReactNode;
};

const DefaultLayout = (props: DefaultLayoutProps) => {
  return <div className={styles.parent}>{props.children}</div>;
};

export default DefaultLayout;
