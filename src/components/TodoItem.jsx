import React from 'react';
import { deleteTodo, toggleStatus } from './redux/todoSlice';
import { useDispatch } from 'react-redux';

const TodoItem = ({ completed, id, title }) => {
  const dispatch = useDispatch();

  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(toggleStatus(id))}
      />
      <span>{title}</span>
      <span className="delete" onClick={() => dispatch(deleteTodo(id))}>
        X
      </span>
    </li>
  );
};

export default TodoItem;
