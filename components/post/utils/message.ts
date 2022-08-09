import { Notification } from 'components/notification/types/notification'

export const messageList = {
  success_save_reserve: <Notification>{
    emoji: '👍',
    message: '投稿が保存されました。',
    detail: '予約公開時間に記事が公開されます。',
    type: 'success'
  },
  success_save_update: <Notification>{
    emoji: '👍',
    message: '投稿が保存されました。',
    detail: '編集内容がWebサイト上に反映されました。',
    type: 'success'
  },
  success_save_draft: <Notification>{
    emoji: '🕰',
    message: '投稿の下書きが保存されました。',
    detail: '公開を設定することで、Webサイト上で公開できます。',
    type: 'success'
  }
}
