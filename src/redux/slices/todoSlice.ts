import { createSlice } from "@reduxjs/toolkit";
import { TodoState } from "types/todo.state";

const initialState: TodoState = {
  items: [],
  isLoading: true
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    requestTodos(state, action) {}
  }
});

export const { requestTodos } = todoSlice.actions;

export default todoSlice.reducer;
