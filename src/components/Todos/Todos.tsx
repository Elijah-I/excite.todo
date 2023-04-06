import React from 'react';
import { Header } from './Header/Header';
import { Filters } from './Filters/Filters';
import { TodoList } from './TodoList/TodoList';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { Notification } from 'components/Notification/Notification';
import styles from './Todos.module.scss';
import { NOTIFICATION_STATUS } from 'types/notification';
import { setNotification } from 'redux/slices/notification';

export const Todos = () => {
  const dispatch = useAppDispatch();
  const { show, status } = useAppSelector((state) => state.notification);
  const message =
    status === NOTIFICATION_STATUS.CREATED ? 'Todo has been created' : 'Todo has been updated';

  React.useEffect(() => {
    if (show) {
      setTimeout(() => {
        dispatch(setNotification({ show: false }));
      }, 3000);
    }
  }, [show]);

  return (
    <div className={styles.container}>
      <Header />
      <Filters />
      <TodoList />
      <Notification show={show} message={message} />
    </div>
  );
};
