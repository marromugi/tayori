import { firestore } from 'components/firebase/utils/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { getRandomStr } from 'shared/utils/string'
import { collections } from '../types/collection'

export const insert = <T>(col: collections, data: T, id?: string) => {
  try {
    const uid = id ?? getRandomStr(16)
    const docRef = doc(firestore, col, uid)
    setDoc(docRef, data)
    return true
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.log(err)
    }
    return false
  }
}
