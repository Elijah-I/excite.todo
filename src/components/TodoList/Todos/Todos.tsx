import React from "react";
import styles from "./Todos.module.scss";
import { useAppSelector } from "hooks/useRedux";
import { WithLoader } from "HOC/WithLoader";
import { Todo } from "./Todo/Todo";

export const Todos = () => {
  const { items, isLoading } = useAppSelector((state) => state.todo);
  // prettier-ignore
  const content = items.length
    ? items.map((item) => <Todo key={item.id} data={item} />)
    : <div className={styles.empty}>no todo found</div>;

  return (
    <WithLoader isLoading={isLoading}>
      <div className={styles.todos}>{content}</div>
    </WithLoader>
  );
};
