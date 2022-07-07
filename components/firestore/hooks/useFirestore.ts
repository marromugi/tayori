import { firestoreFetcher } from 'firestore/utils/fetcher'
import useSWR from 'swr'

export const useFireStore = <T>(
  collection: string,
  uid?: string
): T[] | null => {
  const { data, error } = useSWR(`${collection}/${uid}`, firestoreFetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 360000,
    focusThrottleInterval: 360000,
    errorRetryCount: 1
  })

  if (error) {
    return null
  }
  if (!data) {
    return []
  }

  if (process.env.NODE_ENV === 'development') console.log(data)

  return Array.isArray(data) ? data : [data]
}
