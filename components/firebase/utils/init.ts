import { TayoriSettings } from 'components/settings/types/settings'
import { collections } from 'firestore/types/collection'
import { insert } from 'firestore/utils/insert'
import { take } from 'firestore/utils/take'

export const initFirebase = async () => {
  try {
    // init user ( create owner user )
    const initUserRes = await fetch('/api/admin/user/start', { method: 'GET' })
    console.log(initUserRes.status)
    if (initUserRes.status !== 204) {
      throw new Error('User initialize is failed')
    }

    // init post slug list
    await initDocument('slug', 'post', { value: [] })

    // init tayori settings
    await initDocument('settings', 'tayori', {
      schedules: []
    } as TayoriSettings)

    return { result: true, message: '' }
  } catch (err: any) {
    if (process.env.NODE_ENV === 'development') console.log(err)
    return { result: false, message: err.message }
  }
}

// create document and collection if target is not exist
const initDocument = async (
  collection: collections,
  document: string,
  data: any
) => {
  const target = (await take(collection, document)) as any
  if (!target) {
    insert(collection, data, document)
  }
}
