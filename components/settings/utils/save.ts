import { TayoriSettings } from '../types/settings'
import { update } from 'firestore/utils/update'

export const saveSettings = async (settings: TayoriSettings) => {
  const result = await update('settings', 'main', settings)
  if (result) {
    return true
  } else {
    return false
  }
}
