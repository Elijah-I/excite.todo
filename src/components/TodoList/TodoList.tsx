import React from "react";
import styles from "./TodoList.module.scss";
import { Header } from "./Header/Header";
import { Filters } from "./Filters/Filters";
import { Todos } from "./Todos/Todos";

export const TodoList = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Filters />
      <Todos />
    </div>
  );
};
