import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const setError = (state, action) => {
  state.isLoading = 'rejected';
  state.error = action.payload;
};

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_limit=17'
      );
      if (!response.ok) {
        throw new Error('Something with server! PLease Wait');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        { method: 'DELETE' }
      );
      if (!response.ok) {
        throw new Error('Something wrong, Server error , cant delete');
      }
      dispatch(removeTodo({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleStatus = createAsyncThunk(
  'todos/toggleStatus',
  async function (id, { rejectWithValue, dispatch, getState }) {
    const todo = getState().todos.todos.find(todo => todo.id === id);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ completed: !todo.completed }),
        }
      );
      if (!response.ok) {
        throw new Error('Something wrong, cant toggle todo');
      }
      // const data = await response.json();
      // console.log(data);
      dispatch(toggleTodo(id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async function (text, { rejectWithValue, dispatch }) {
    try {
      const todo = {
        title: text,
        userId: 1,
        completed: false,
      };
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(todo),
        }
      );
      if (!response.ok) {
        throw new Error('Something wrong, cant add todo');
      }
      const data = await response.json();
      // console.log(data);
      dispatch(addTodo(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
    isLoading: null,
    error: null,
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
    },
    toggleTodo(state, action) {
      const toggled = state.todos.find(todo => todo.id === action.payload);
      toggled.completed = !toggled.completed;
    },
  },
  extraReducers: {
    [fetchTodos.pending]: (state, action) => {
      state.isLoading = 'loading';
      state.error = null;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.isLoading = 'resolved';
      state.todos = action.payload;
    },
    [fetchTodos.rejected]: setError,
    [deleteTodo.rejected]: setError,
    [toggleStatus.rejected]: setError,
  },
});

export const { addTodo, removeTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;
