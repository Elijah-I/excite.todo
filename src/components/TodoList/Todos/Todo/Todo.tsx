import React from "react";
import { TodoItem } from "types/todo.state";
import styles from "./Todo.module.scss";

interface Props {
  data: TodoItem;
  asChild?: boolean;
}

export const Todo = ({ data, asChild }: Props) => {
  const containerClass = [styles.todo];
  if (asChild) containerClass.push(styles.todo_child);

  return (
    <div className={containerClass.join(" ")}>
      <div>{data.content}</div>
      {data.children.length &&
        data.children.map((child) => (
          <Todo key={child.id} asChild={true} data={child} />
        ))}
    </div>
  );
};
