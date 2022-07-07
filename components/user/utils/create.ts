import { firebaseApp } from 'components/firebase/utils/firebase'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

export const createUser = async (email: string, password: string) => {
  try {
    const auth = getAuth(firebaseApp)
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    return cred
  } catch (err) {
    if (process.env.NODE_ENV === 'development') console.log(err)
  }
}
