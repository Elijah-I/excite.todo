import React from "react";
import { Add } from "./Add/Add";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.label}>TODO List</h1>
      <Add />
    </div>
  );
};
