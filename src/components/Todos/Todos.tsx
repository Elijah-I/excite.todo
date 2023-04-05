import React from 'react';
import { Header } from './Header/Header';
import { Filters } from './Filters/Filters';
import { TodoList } from './TodoList/TodoList';
import styles from './Todos.module.scss';

export const Todos = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Filters />
      <TodoList />
    </div>
  );
};
