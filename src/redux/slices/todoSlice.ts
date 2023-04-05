import { createSlice } from '@reduxjs/toolkit';
import type { TodoState } from 'types/todo.state';
import { todoAPI } from './todoAPI';

const initialState: TodoState = {
  todos: [],
  isLoading: true,
  isUpdating: {},
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: {
    [`${todoAPI.get.pending}`]: (state) => {
      state.isLoading = true;
    },
    [`${todoAPI.get.fulfilled}`]: (state, action) => {
      state.todos = action.payload;
      state.isLoading = false;
    },

    [`${todoAPI.create.pending}`]: (state, action) => {
      state.isUpdating[action.meta.arg.id] = true;
    },
    [`${todoAPI.create.fulfilled}`]: (state, action) => {
      state.todos = action.payload.todos;
      delete state.isUpdating[action.payload.currentTodo];
    },
    [`${todoAPI.create.rejected}`]: (_, action) => {
      throw new Error(action.error.stack);
    },

    [`${todoAPI.update.pending}`]: (state, action) => {
      state.isUpdating[action.meta.arg.id] = true;
    },
    [`${todoAPI.update.fulfilled}`]: (state, action) => {
      state.todos = action.payload.todos;
      delete state.isUpdating[action.payload.currentTodo];
    },
    [`${todoAPI.update.rejected}`]: (_, action) => {
      throw new Error(action.error.stack);
    },
  },
});

export default todoSlice.reducer;
