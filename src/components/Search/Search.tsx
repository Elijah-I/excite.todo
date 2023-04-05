import React from 'react';
import { useCustomParams } from 'hooks/useCustomParams';
import searchIconScr from 'icons/search.svg';
import crossIconScr from 'icons/cross.svg';
import styles from './Search.module.scss';

export const Search = () => {
  const [{ search }, setCustomParams] = useCustomParams();
  const [localSearch, setLocalSearch] = React.useState(search);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const applySearch = (search: string) => {
    setCustomParams({ search });
  };

  return (
    <div className={styles.search}>
      <img
        src={searchIconScr}
        className={styles.icon_search}
        alt="search icon"
        onClick={() => inputRef.current!.focus()}
      />
      <input
        type="search"
        value={localSearch}
        onChange={(event) => setLocalSearch(event.currentTarget.value)}
        onKeyUp={(event) => event.key === 'Enter' && applySearch(localSearch)}
        ref={inputRef}
      />
      {localSearch && (
        <img
          src={crossIconScr}
          className={styles.icon_drop}
          alt="drop search"
          onClick={() => {
            setLocalSearch('');
            applySearch('');
          }}
        />
      )}
      <button onClick={() => applySearch(localSearch)}>find</button>
    </div>
  );
};
