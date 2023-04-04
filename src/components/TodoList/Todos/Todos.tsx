import React from "react";
import styles from "./Todos.module.scss";

export const Todos = () => {
  return (
    <div className={styles.todos}>
      <div className={styles.empty}>no todo found</div>
    </div>
  );
};
