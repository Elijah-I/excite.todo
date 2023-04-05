import React from "react";
import { CreateTodo } from "../CreateTodo/CreateTodo";
import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.label}>TODO List</h1>
      <CreateTodo id="root" />
    </div>
  );
};
