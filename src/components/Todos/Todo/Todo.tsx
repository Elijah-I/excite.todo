import React from 'react';
import { Reorder } from 'framer-motion';
import { TodoControls } from 'components/Todos/TodoControls/TodoControls';
import { URL_FILTER_OPTIONS } from 'types/url.search.params';
import type { TodoItem } from 'types/todo';
import styles from './Todo.module.scss';

interface Props {
  data: TodoItem;
  asChild?: boolean;
}

export const Todo = ({ data, asChild }: Props) => {
  const containerClass = [styles.todo];
  if (asChild) containerClass.push(styles.todo_child);
  if (data.done === URL_FILTER_OPTIONS.DONE) containerClass.push(styles.todo_done);

  const content = (
    <>
      <i></i>
      <div className={styles.label}>
        <div>{data.content}</div>
      </div>
      <TodoControls id={data.id} />
      {!!data.children.length &&
        data.children.map((child) => <Todo key={child.id} asChild={true} data={child} />)}
    </>
  );

  if (asChild) {
    return <div className={containerClass.join(' ')}>{content}</div>;
  }

  return (
    <Reorder.Item as="div" value={data} className={containerClass.join(' ')}>
      {content}
    </Reorder.Item>
  );
};
