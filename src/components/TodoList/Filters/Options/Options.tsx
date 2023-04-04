import React from "react";
import { URL_FILTER_OPTIONS } from "types/url.search.params";
import { useCustomParams } from "hooks/useCustomParams";
import styles from "./Options.module.scss";

export const Options = () => {
  const [{ option }, setCustomParams] = useCustomParams();

  return (
    <div className={styles.options}>
      {Object.values(URL_FILTER_OPTIONS).map((filterOption) => (
        <button
          key={filterOption}
          className={option === filterOption ? styles.selected : ""}
          onClick={() => {
            setCustomParams({ option: filterOption });
          }}
        >
          {filterOption}
        </button>
      ))}
    </div>
  );
};