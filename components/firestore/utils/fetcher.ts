import { firestore } from 'components/firebase/utils/firebase'
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs
} from 'firebase/firestore'

export const firestoreFetcher = async (url: string): Promise<any> => {
  const [col, uid] = url.split('/')
  const isAllFetch = uid === 'undefined'

  try {
    if (isAllFetch) {
      const dataList: DocumentData[] = []
      const ref = collection(firestore, col)
      const docSnaps = await getDocs(ref)
      docSnaps.forEach((snap) => {
        if (snap.exists()) dataList.push({ ...snap.data(), id: snap.id })
      })
      return dataList
    } else {
      const ref = doc(firestore, col, uid)
      const docSnap = await getDoc(ref)
      return docSnap.exists() ? { ...docSnap.data(), id: docSnap.id } : null
    }
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.log(err)
    }
    return null
  }
}
