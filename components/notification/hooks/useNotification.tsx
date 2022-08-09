import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { notificationState } from '../utils/atoms'
import { Notification } from '../types/notification'

export const useNotification = () => {
  const [notification, setNotification] = useRecoilState(notificationState)
  const [isShow, setShowState] = useState(false)
  const [isLoading, setLoadingState] = useState(false)
  const show = (n: Notification) => {
    setNotification({
      emoji: n.emoji,
      message: n.message,
      detail: n.detail,
      type: n.type,
      isLoading: false
    })
  }

  const hide = () => {
    setShowState(false)
    setLoadingState(false)
  }

  const loading = () => {
    setNotification(
      notification ? { ...notification, isLoading: true } : { isLoading: true }
    )
    setShowState(true)
  }

  useEffect(() => {
    if (notification.message) setShowState(true)
    if (!notification.isLoading) setTimeout(() => setShowState(false), 3000)
  }, [notification])

  return {
    notification,
    isShow,
    isLoading,
    show,
    hide,
    loading
  }
}
