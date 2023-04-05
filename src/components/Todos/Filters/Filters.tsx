import React from 'react';
import styles from './Filters.module.scss';
import { Search } from '../../Search/Search';
import { Options } from './Options/Options';

export const Filters = () => {
  return (
    <div className={styles.filters}>
      <Search />
      <Options />
    </div>
  );
};
