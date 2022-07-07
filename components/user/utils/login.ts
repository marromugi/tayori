import { getApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  UserCredential
} from 'firebase/auth'
import { firebaseApp } from '../../firebase/utils/firebase'
import { setSoyoClaim } from './claim'

export const soyoLogin = (
  email: string,
  password: string,
  onSuccess?: (cred: UserCredential) => void,
  onError?: (err: any) => void
) => {
  const auth = getAuth(firebaseApp)
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      if (onSuccess) {
        console.log(getAuth(getApp()).currentUser)
        setSoyoClaim(cred.user.uid, {
          owner: false,
          manager: false,
          writer: true
        })
        onSuccess(cred)
      }
    })
    .catch((err) => {
      if (onError) onError(err)
    })
}
