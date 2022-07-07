import { collections } from '../types/collection'
import {
  collection,
  getDocs,
  getDoc,
  doc,
  DocumentData
} from 'firebase/firestore'
import { firestore } from 'components/firebase/utils/firebase'

export const take = async <T>(
  cl: collections,
  uid: string = '',
  isAll: boolean = false
) => {
  try {
    if (isAll) {
      const dataList: DocumentData[] = []
      const ref = collection(firestore, cl)
      const docSnaps = await getDocs(ref)
      docSnaps.forEach((snap) => {
        if (snap.exists()) dataList.push({ ...snap.data(), id: snap.id })
      })
      return dataList as T[]
    } else {
      const ref = doc(firestore, cl, uid)
      const docSnap = await getDoc(ref)
      return docSnap.exists()
        ? ({ ...docSnap.data(), id: docSnap.id } as unknown as T)
        : null
    }
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.log(err)
    }
    return null
  }
}
