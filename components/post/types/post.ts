import { StorageObject } from 'components/storage/types/obj'
import { Timestamp } from 'firebase/firestore'

export type Post = {
  id: string
  title?: string
  slug?: string
  category?: string
  publish: boolean
  release: Timestamp
  markdown?: string
  thumbnail?: StorageObject
  custom?: any
}
