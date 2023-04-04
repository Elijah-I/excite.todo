import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { getTodos } from "redux/slices/todoSlice";
import { WithLoader } from "HOC/WithLoader";
import { Todo } from "./Todo/Todo";
import styles from "./Todos.module.scss";
import { useCustomParams } from "hooks/useCustomParams";

export const Todos = () => {
  const dispatch = useAppDispatch();
  const [{ search, option }] = useCustomParams();
  const { todos, isLoading } = useAppSelector((state) => state.todo);

  useEffect(() => {
    const requestTodos = async () => {
      dispatch(getTodos({ search, option }));
    };

    requestTodos();
  }, [search, option]);

  // prettier-ignore
  const content = todos.length
    ? todos.map((todo) => <Todo key={todo.id} data={todo} />)
    : <div className={styles.empty}>no todo found</div>;

  return (
    <WithLoader isLoading={isLoading}>
      <div className={styles.todos}>{content}</div>
    </WithLoader>
  );
};
