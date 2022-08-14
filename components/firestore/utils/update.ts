import { firestore } from 'components/firebase/utils/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { collections } from '../types/collection'

export const update = async <T>(col: collections, id: string, data: T) => {
  try {
    const docRef = doc(firestore, col, id)
    await setDoc(docRef, data)
    return true
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.log(err)
    }
    return false
  }
}
