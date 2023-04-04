import React from "react";
import styles from "./TodoList.module.scss";

interface TodoList {
  id: number;
  name: string;
  done: boolean;
  children: TodoList[];
}

export const TodoList = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.label}>TODO List</h1>
        <button className={styles.add}>+</button>
      </div>

      <div className={styles.filters}>
        <div className={styles.filters__search}>
          <input type="search" />
          <button>find</button>
        </div>
        <div className={styles.filters__options}>
          <button className={styles.selected}>all</button>
          <button>new</button>
          <button>done</button>
        </div>
      </div>
    </div>
  );
};
