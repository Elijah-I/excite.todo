import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { URL_FILTER_OPTIONS, UrlSearchParams } from "types/url.search.params";
import type { TodoState } from "types/todo.state";

const initialState: TodoState = {
  todos: [],
  isLoading: true
};

const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });

// simulate API request
export const getTodos = createAsyncThunk(
  "todo/getTodos",
  async (payload: UrlSearchParams) => {
    await delay(1000);

    let todos: TodoState["todos"] = JSON.parse(
      localStorage.getItem("todos") || "[]"
    );

    if (payload.search || payload.option) {
      todos = todos.filter((todo) => {
        let passed = true;

        if (payload.search) {
          passed = todo.content
            .toLowerCase()
            .includes(payload.search.toLowerCase());
        }
        if (payload.option) {
          passed = todo.done === payload.option;
        }

        return passed;
      });
    }

    return todos;
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: {
    [`${getTodos.pending}`]: (state) => {
      state.isLoading = true;
    },
    [`${getTodos.fulfilled}`]: (state, action) => {
      state.todos = action.payload;
      state.isLoading = false;
    }
  }
});

export default todoSlice.reducer;
