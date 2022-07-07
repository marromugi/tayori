import { firestore } from 'components/firebase/utils/firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import { collections } from '../types/collection'

export const remove = async (col: collections, uid: string) => {
  try {
    await deleteDoc(doc(firestore, col, uid))
    return true
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.log(err)
    }
    return false
  }
}
