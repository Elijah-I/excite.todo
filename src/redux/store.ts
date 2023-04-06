import { configureStore } from '@reduxjs/toolkit';
import notificationSlice from './slices/notification/';
import todoSlice from './slices/todo/';

const store = configureStore({
  reducer: {
    todo: todoSlice,
    notification: notificationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
