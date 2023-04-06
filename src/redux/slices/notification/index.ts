import { createSlice } from '@reduxjs/toolkit';
import { NOTIFICATION_STATUS } from 'types/notification';
import type { NotificationState } from 'types/notification';

const initialState: NotificationState = {
  show: false,
  status: NOTIFICATION_STATUS.NONE,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      state.show = action.payload.show;
      state.status = action.payload.status || NOTIFICATION_STATUS.NONE;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
