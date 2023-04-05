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
  extraReducers: (builder) => {
    builder
      .addCase(todoAPI.get.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(todoAPI.get.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.isLoading = false;
      })

      .addCase(todoAPI.create.pending, (state, action) => {
        state.isUpdating[action.meta.arg.id] = true;
      })
      .addCase(todoAPI.create.fulfilled, (state, action) => {
        state.todos = action.payload.todos;
        delete state.isUpdating[action.payload.currentTodo];
      })

      .addCase(todoAPI.update.pending, (state, action) => {
        state.isUpdating[action.meta.arg.id] = true;
      })
      .addCase(todoAPI.update.fulfilled, (state, action) => {
        state.todos = action.payload.todos;
        delete state.isUpdating[action.payload.currentTodo];
      });
  },
});

export default todoSlice.reducer;
