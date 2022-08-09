import { atom } from 'recoil'
import { TayoriSettings } from '../types/settings'

// state
export const settingsState = atom<TayoriSettings>({
  key: 'settings',
  default: {
    schedules: []
  }
})
