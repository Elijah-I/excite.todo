import React from "react";
import styles from "./Add.module.scss";
import { CSSTransition } from "react-transition-group";

export const Add = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [showAdd, setShowAdd] = React.useState(false);

  return (
    <>
      <button
        onClick={() => {
          setShowAdd(true);
          inputRef.current!.focus();
        }}
        className={styles.add}
      >
        +
      </button>

      <CSSTransition
        in={showAdd}
        timeout={300}
        classNames={{
          enter: styles.adding_enter,
          enterActive: styles.adding_enter_active,
          enterDone: styles.adding_enter_done,
          exit: styles.adding_exit,
          exitActive: styles.adding_exit_active,
          exitDone: styles.adding_exit_done
        }}
      >
        <div className={styles.adding}>
          <input type="text" ref={inputRef} />
          <button>save</button>
          <button onClick={() => setShowAdd(false)} className={styles.cancel}>
            ×
          </button>
        </div>
      </CSSTransition>
    </>
  );
};
