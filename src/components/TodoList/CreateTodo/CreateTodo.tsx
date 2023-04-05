import React from "react";
import { CSSTransition } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { todoAPI } from "redux/slices/todoAPI";
import { WithLoader } from "HOC/WithLoader";
import styles from "./CreateTodo.module.scss";

interface Props {
  id: string;
}

export const CreateTodo = ({ id }: Props) => {
  const dispatch = useAppDispatch();

  const { todos, isUpdating } = useAppSelector((state) => state.todo);
  const currentTodo = todoAPI.getTodoById(todos, id);
  const currentIsUpdatind = todoAPI.getCurrentIsUpdatind(isUpdating, id);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [showAdd, setShowAdd] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [content, setContent] = React.useState(
    isEdit && currentTodo ? currentTodo.content : ""
  );

  const save = () => {
    setContent("");
    setIsEdit(false);
    setShowAdd(false);

    !isEdit &&
      dispatch(
        todoAPI.createTodo({
          id,
          content
        })
      );
  };

  let settings = [
    <button
      key={0}
      onClick={() => {
        setShowAdd(true);
        inputRef.current!.focus();
      }}
      className={styles.add}
    >
      +
    </button>,
    <button
      key={1}
      onClick={() => {
        setIsEdit(true);
        setShowAdd(true);
        inputRef.current!.focus();
      }}
      className={styles.add}
    >
      ✎
    </button>,
    <button
      key={2}
      onClick={() => {
        console.log("delete: " + id);
      }}
      className={styles.add}
    >
      ×
    </button>
  ];

  if (id === "root") {
    settings = settings.slice(0, 1);
  }

  return (
    <WithLoader size="small" isLoading={currentIsUpdatind}>
      {settings}

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
            value={content}
            onChange={(event) => setContent(event.target.value)}
            onKeyUp={(event) => event.key === "Enter" && save()}
            ref={inputRef}
          />
          <button onClick={save}>save</button>
          <button onClick={() => setShowAdd(false)} className={styles.cancel}>
            ×
          </button>
        </div>
      </CSSTransition>
    </WithLoader>
  );
};
