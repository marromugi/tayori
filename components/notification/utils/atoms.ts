import { atom } from 'recoil'
import { Notification } from '../types/notification'

// state
export const notificationState = atom<Notification>({
  key: 'notification',
  default: { isLoading: false }
})
