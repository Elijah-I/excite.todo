import React from 'react';
import styles from './Loader.module.scss';
import type { Size } from 'types/loader';

interface Props {
  size: Size;
}

export const Loader = ({ size }: Props) => {
  return (
    <u className={`${styles.container} ${styles[size]}`}>
      <div className={styles.loader}></div>
      <b>...</b>
    </u>
  );
};
