import { firebaseApp } from 'components/firebase/utils/firebase'
import { getAuth, signOut } from 'firebase/auth'

export const soyoLogout = () => {
  return new Promise<void>((resolve, reject) => {
    const auth = getAuth(firebaseApp)
    signOut(auth)
      .then(() => resolve())
      .catch((error) => reject(error))
  })
}
