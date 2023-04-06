import React, { useEffect } from 'react';
import { Reorder } from 'framer-motion';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { todoAPI } from 'redux/slices/todo/api';
import { WithLoader } from 'HOC/WithLoader';
import { Todo } from 'components/Todos/Todo/Todo';
import { useCustomParams } from 'hooks/useCustomParams';
import { TodoItem } from 'types/todo';
import styles from './TodoList.module.scss';

export const TodoList = () => {
  const dispatch = useAppDispatch();
  const [{ search, option }] = useCustomParams();
  const { todos, isLoading } = useAppSelector((state) => state.todo);

  useEffect(() => {
    const request = async () => {
      dispatch(todoAPI.get({ search, option }));
    };

    request();
  }, [search, option, dispatch]);

  const reorder = (todos: TodoItem[]) => {
    console.log(todos);

    dispatch(todoAPI.set({ todos }));
  };

  // prettier-ignore
  const content = todos.length
    ? <Reorder.Group as="span" axis='y' values={todos} onReorder={reorder}>{todos.map((todo) => <Todo key={todo.id} data={todo} />)}</Reorder.Group>
    : <div className={styles.empty}>no todo found</div>;

  return (
    <WithLoader size="large" isLoading={isLoading}>
      <div className={styles.todos}>{content}</div>
    </WithLoader>
  );
};
