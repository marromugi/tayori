export type MessageType = 'success' | 'failed' | 'warning'

export type Notification = {
  emoji?: string
  message?: string
  detail?: string
  type?: MessageType
  code?: string
  isLoading?: boolean
}
