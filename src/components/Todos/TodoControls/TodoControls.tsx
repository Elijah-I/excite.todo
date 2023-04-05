import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { useCustomParams } from 'hooks/useCustomParams';
import type { TodoItem } from 'types/todo.state';
import { todoAPI } from 'redux/slices/todoAPI';
import { WithLoader } from 'HOC/WithLoader';
import styles from './TodoControls.module.scss';

interface Props {
  id: TodoItem['id'];
}

export const TodoControls = ({ id }: Props) => {
  const dispatch = useAppDispatch();
  const [{ search, option }] = useCustomParams();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { todos, isUpdating } = useAppSelector((state) => state.todo);
  const currentIsUpdatind = todoAPI.getCurrentIsUpdatind(isUpdating, id);
  const currentTodo = todoAPI.getById(todos, id);

  const [showAdd, setShowAdd] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [content, setContent] = React.useState('');

  const save = () => {
    if (!content) return;

    cancel();

    const payload = {
      id,
      content,
      search,
      option,
    };

    isEdit && dispatch(todoAPI.update(payload));
    !isEdit && dispatch(todoAPI.create(payload));
  };

  const remove = (id: TodoItem['id']) => {
    dispatch(todoAPI.remove({ id, search, option }));
  };

  const check = (id: TodoItem['id']) => {
    dispatch(todoAPI.check({ id, search, option }));
  };

  const cancel = () => {
    setContent('');
    setIsEdit(false);
    setShowAdd(false);
  };

  let settings = [
    <button
      key={0}
      onClick={() => check(id)}
      className={`${styles.button} ${styles[currentTodo.done]}`}
    >
      ✓
    </button>,
    <button
      key={1}
      onClick={() => {
        setShowAdd(true);
        setTimeout(() => inputRef.current!.focus(), 100);
      }}
      className={styles.button}
    >
      +
    </button>,
    <button
      key={2}
      onClick={() => {
        setIsEdit(true);
        setShowAdd(true);
        setContent(currentTodo?.content || '');
        setTimeout(() => inputRef.current!.select(), 100);
      }}
      className={styles.button}
    >
      ✎
    </button>,
    <button key={3} onClick={() => remove(id)} className={`${styles.button} ${styles.delete}`}>
      ×
    </button>,
  ];

  if (id === 'root') {
    settings = settings.slice(1, 2);
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
          exitDone: styles.exit_done,
        }}
      >
        <span className={styles.creation}>
          <input
            type="text"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            onKeyUp={(event) => event.key === 'Enter' && save()}
            ref={inputRef}
          />
          <button onClick={save}>save</button>
          <button onClick={cancel} className={styles.button}>
            ×
          </button>
        </span>
      </CSSTransition>
    </WithLoader>
  );
};
