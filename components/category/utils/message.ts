import { Notification } from 'components/notification/types/notification'

export const messageList = {
  success_save: <Notification>{
    emoji: '👍',
    message: 'カテゴリーが保存されました。',
    detail: '投稿に設定されているカテゴリーにも変更内容が反映されます。',
    type: 'success'
  },
  success_create: <Notification>{
    emoji: '👍',
    message: 'カテゴリーが作成されました。',
    type: 'success'
  },
  success_delete: <Notification>{
    emoji: '🗑',
    message: 'カテゴリーが削除されました。',
    detail: 'このカテゴリーに属していた投稿のカテゴリーも全て削除されました。',
    type: 'success'
  }
}
