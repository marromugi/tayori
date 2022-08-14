export const initFirebase = async () => {
  try {
    // init user ( create owner user )
    const initUserRes = await fetch('/api/admin/user/start', { method: 'GET' })
    if (initUserRes.status !== 204) {
      throw new Error('User initialize is failed')
    }

    const initCore = await fetch('/api/admin/init', { method: 'GET' })
    if (initCore.status === 200) {
      throw new Error('Core data initialize is failed')
    }

    return { result: true, message: '' }
  } catch (err: any) {
    if (process.env.NODE_ENV === 'development') console.log(err)
    return { result: false, message: err.message }
  }
}
