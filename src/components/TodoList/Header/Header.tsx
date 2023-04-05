import React from 'react';
import { TodoControls } from 'components/TodoList/TodoControls/TodoControls';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.label}>TODO List</h1>
      <TodoControls id="root" />
    </div>
  );
};
