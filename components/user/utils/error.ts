import { Notification } from 'components/notification/types/notification'

export const errorList = {
  invalid_email_or_password: <Notification>{
    emoji: '😲',
    code: 'user_invalid_email_or_password',
    message: 'メールアドレスもしくはパスワードが一致しません。',
    detail: 'メールアドレス・パスワードをご確認の上、再度お試しください。',
    type: 'failed'
  },
  empty_email: <Notification>{
    emoji: '😲',
    code: 'user_empty_email',
    message: 'メールアドレスを入力してください。',
    detail: 'メールアドレスをご確認の上、再度ログインボタンを押してください。',
    type: 'failed'
  },
  empty_password: <Notification>{
    emoji: '😲',
    code: 'user_empty_password',
    message: 'パスワードを入力してください。',
    detail: 'パスワードをご確認の上、再度ログインボタンを押してください。',
    type: 'failed'
  },
  empty_email_and_password: <Notification>{
    emoji: '😲',
    code: 'user_empty_email_or_password',
    message: 'メールアドレスとパスワードを入力してください',
    detail:
      'メールアドレス・パスワードをご確認の上、再度ログインボタンを押してください。',
    type: 'failed'
  },
  not_email: <Notification>{
    emoji: '😲',
    code: 'user_empty_email',
    message: 'メールアドレスが不正な文字です。',
    detail: 'メールアドレス入力欄には、アドレスの末尾まで入力してください。',
    type: 'failed'
  }
}
