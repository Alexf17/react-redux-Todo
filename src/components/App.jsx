import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoList from './TodoList';
import InputField from './InputField';
import { addNewTodo, fetchTodos } from './redux/todoSlice';

export const App = () => {
  // const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const { isLoading, error } = useSelector(state => state.todos);
  const dispatch = useDispatch();
  const addTask = () => {
    if (text.trim().length) {
      dispatch(addNewTodo(text));
      setText('');
    }
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // const addTodo = () => {
  //   if (text.trim().length) {
  //     setTodos([
  //       ...todos,
  //       { id: new Date().toISOString(), text, completed: false },
  //     ]);
  //     setText('');
  //     console.log(todos);
  //   }
  // };

  // const removeTodo = todoId => {
  //   setTodos(todos.filter(todo => todo.id !== todoId));
  // };

  // const toggleTodo = todoId => {
  // setTodos(
  //   todos.map(todo => {
  //     if (todo.id !== todoId) return todo;
  //     return { ...todo, completed: !todo.completed };
  //   })
  // );
  // };

  return (
    <div>
      <InputField addTask={addTask} setText={setText} text={text} />
      {isLoading === 'loading' && <h2>Loading</h2>}
      {error && <h2>Error {error}</h2>}
      <TodoList />
    </div>
  );
};
