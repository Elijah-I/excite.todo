import React from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './Notification.module.scss';

interface Props {
  show: boolean;
  message: string;
}

export const Notification = ({ show, message }: Props) => {
  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames={{
        enter: styles.enter,
        enterActive: styles.enter_active,
        enterDone: styles.enter_done,
        exit: styles.exit,
        exitActive: styles.exit_active,
        exitDone: styles.exit_done,
      }}
      mountOnEnter
      unmountOnExit
    >
      <div className={styles.notification}>{message}</div>
    </CSSTransition>
  );
};
