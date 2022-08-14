import { Notification } from 'components/notification/types/notification'

export const messageList = {
  success_save_schedule_endpoint: <Notification>{
    emoji: '👍',
    message: 'スケジュール用のエンドポイントが登録されました。',
    detail: '記事の公開・更新時に登録したエンドポイントへリクエストされます。',
    type: 'success'
  },
  success_delete_schedule_endpoint: <Notification>{
    emoji: '🗑',
    message: 'スケジュール用のエンドポイントが削除されました。',
    detail:
      '既に予約済みの投稿についても、削除されたエンドポイントへのリクエストは行われません。',
    type: 'success'
  }
}
