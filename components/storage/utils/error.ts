import { Notification } from 'components/notification/types/notification'

export const errorList = {
  upload_failed: <Notification>{
    emoji: '😵',
    code: 'storage_upload_failed',
    message: '画像のアップロードに失敗しました。',
    detail: 'ストレージの状態を確認し、再度お試しください。',
    type: 'failed'
  }
}

export default errorList
