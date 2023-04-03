import React from "react";
import styles from "./TodoList.module.scss";

export const TodoList = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>TODO List</h1>
      </div>
    </div>
  );
};
