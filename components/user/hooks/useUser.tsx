import { SoyoUser } from 'components/user/types/user'
import { firebaseApp } from 'components/firebase/utils/firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { atom, useRecoilState, useRecoilValue } from 'recoil'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export const userState = atom<SoyoUser | null>({
  key: 'user',
  default: null
})

export const UserProvider = (props: { children: React.ReactNode }) => {
  const [user, setUser] = useRecoilState(userState)
  const [isInited, setInitState] = useState(false)
  const router = useRouter()
  const auth = getAuth(firebaseApp)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const soyoUser: SoyoUser | null = user
        ? {
            id: user?.uid,
            name: user?.displayName,
            email: user?.email
          }
        : null

      setUser(soyoUser)
      setInitState(true)
    })
  }, [])

  useEffect(() => {
    // レンダリング直後は onAuthStateChanged を通過していないので、
    // isInited が true の時のみ、ログイン判定をする
    if (user === null && isInited) {
      router.push('/login')
    }

    // ログインしている場合は、ログイン画面を表示しない
    if (user !== null && router.pathname === '/login') {
      router.replace('/post')
    }
  }, [user, isInited, router.pathname])

  if (!isInited) return <></>

  return <>{props.children}</>
}

export const useUser = () => {
  const user = useRecoilValue(userState)
  return user
}
