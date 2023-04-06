export enum NOTIFICATION_STATUS {
  'NONE',
  'UPDATED',
  'CREATED',
}

export interface NotificationState {
  show: boolean;
  status?: NOTIFICATION_STATUS;
}
