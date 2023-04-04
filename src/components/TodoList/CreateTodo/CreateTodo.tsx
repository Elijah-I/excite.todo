import React from "react";
import styles from "./CreateTodo.module.scss";
import { CSSTransition } from "react-transition-group";

interface Props {
  initialValue?: string;
  onSave: (content: string) => void;
}

export const CreateTodo = ({ onSave, initialValue = "" }: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [showAdd, setShowAdd] = React.useState(false);
  const [value, setValue] = React.useState(initialValue);

  const save = () => {
    onSave(value);
    setValue("");
    setShowAdd(false);
  };

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
          enter: styles.enter,
          enterActive: styles.enter_active,
          enterDone: styles.enter_done,
          exit: styles.exit,
          exitActive: styles.exit_active,
          exitDone: styles.exit_done
        }}
      >
        <div className={styles.creation}>
          <input
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyUp={(event) => event.key === "Enter" && save()}
            ref={inputRef}
          />
          <button onClick={save}>save</button>
          <button onClick={() => setShowAdd(false)} className={styles.cancel}>
            ×
          </button>
        </div>
      </CSSTransition>
    </>
  );
};
