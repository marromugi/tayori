import { Notification } from 'components/notification/types/notification'

export const errorList = {
  update_failed: <Notification>{
    emoji: '😵',
    code: 'category_update_failed',
    message:
      'カテゴリーの保存中に予期せぬエラーが発生しました。時間を置いて再度お試しください。',
    type: 'failed'
  }
}
