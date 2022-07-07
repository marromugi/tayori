import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useCallback, useEffect } from 'react'
import { initFirebase } from 'components/firebase/utils/init'
import { TayoriBox } from 'components/tayori/elements/tayori-box'
import { useRouter } from 'next/router'

const MyApp = ({ Component, pageProps }: AppProps) => {
  if (typeof window === 'undefined') {
    return <></>
  }

  const router = useRouter()
  const soyoStart = useCallback(async () => {
    await initFirebase()
  }, [])

  useEffect(() => {
    soyoStart()
  }, [])

  return (
    <TayoriBox>
      <Component {...pageProps} key={router.asPath} />
    </TayoriBox>
  )
}

export default MyApp
