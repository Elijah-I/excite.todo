import React from "react";
import styles from "./Options.module.scss";

export const Options = () => {
  return (
    <div className={styles.options}>
      <button className={styles.selected}>all</button>
      <button>new</button>
      <button>done</button>
    </div>
  );
};
