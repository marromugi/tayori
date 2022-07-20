import { insert } from "firestore/utils/insert"
import { take } from "firestore/utils/take"

export const initFirebase = async () => {
  try {
    // init user ( create owner user )
    const initUserRes = await fetch('/api/admin/user/start', { method: 'GET' })
    if (initUserRes.status !== 204) {
      throw new Error('User initialize is failed')
    }

    // init post slug list
    const slugs = await take('slug', 'post') as any
    if (!slugs) {
      insert('slug', {value: []}, 'post')
    }

    return { result: true, message: '' }
  } catch (err: any) {
    if (process.env.NODE_ENV === 'development') console.log(err)
    return { result: false, message: err.message }
  }
}
