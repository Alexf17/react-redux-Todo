import React from 'react';

const InputField = ({ text, addTask, setText }) => {
  return (
    <label>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={addTask}>Add Todo</button>
    </label>
  );
};

export default InputField;
