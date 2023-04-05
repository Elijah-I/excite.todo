import React from 'react';
import { TodoControls } from 'components/Todos/TodoControls/TodoControls';
import { URL_FILTER_OPTIONS } from 'types/url.search.params';
import type { TodoItem } from 'types/todo.state';
import styles from './Todo.module.scss';

interface Props {
  data: TodoItem;
  asChild?: boolean;
}

export const Todo = ({ data, asChild }: Props) => {
  const containerClass = [styles.todo];
  if (asChild) containerClass.push(styles.todo_child);
  if (data.done === URL_FILTER_OPTIONS.DONE) containerClass.push(styles.todo_done);

  return (
    <div className={containerClass.join(' ')}>
      <i></i>
      <div className={styles.label}>{data.content}</div>
      <TodoControls id={data.id} />
      {!!data.children.length &&
        data.children.map((child) => <Todo key={child.id} asChild={true} data={child} />)}
    </div>
  );
};
