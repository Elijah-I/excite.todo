import React from "react";
import { CreateTodo } from "../CreateTodo/CreateTodo";
import styles from "./Header.module.scss";

export const Header = () => {
  const onSave = (content: string) => {
    console.log(content);
  };

  return (
    <div className={styles.header}>
      <h1 className={styles.label}>TODO List</h1>
      <CreateTodo onSave={onSave} />
    </div>
  );
};
