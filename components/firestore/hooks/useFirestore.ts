import { collections } from 'firestore/types/collection'
import { firestoreFetcher } from 'firestore/utils/fetcher'
import useSWR, { KeyedMutator } from 'swr'

export const useFireStore = <T>(
  collection: collections,
  uid?: string
): { data: T[]; mutate: KeyedMutator<T[]>; isError?: boolean } => {
  const { data, error, mutate } = useSWR(
    `${collection}/${uid}`,
    firestoreFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 360000,
      focusThrottleInterval: 360000,
      errorRetryCount: 1
    }
  )

  if (error) {
    return { data: [], mutate, isError: true }
  }
  if (!data) {
    return { data: [], mutate }
  }

  // if (process.env.NODE_ENV === 'development') console.log(data)

  return { data: Array.isArray(data) ? data : [data], mutate }
}
