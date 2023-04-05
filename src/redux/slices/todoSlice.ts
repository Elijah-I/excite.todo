import { createSlice } from "@reduxjs/toolkit";
import type { TodoState } from "types/todo.state";
import { todoAPI } from "./todoAPI";

const initialState: TodoState = {
  todos: [],
  isLoading: true,
  isUpdating: {}
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: {
    [`${todoAPI.getTodos.pending}`]: (state) => {
      state.isLoading = true;
    },
    [`${todoAPI.getTodos.fulfilled}`]: (state, action) => {
      state.todos = action.payload;
      state.isLoading = false;
    },

    [`${todoAPI.createTodo.pending}`]: (state, action) => {
      state.isUpdating[action.meta.arg.id] = true;
    },
    [`${todoAPI.createTodo.fulfilled}`]: (state, action) => {
      state.todos = action.payload.todos;
      delete state.isUpdating[action.payload.currentTodo];
    }
  }
});

export default todoSlice.reducer;
