export const setSoyoClaim = (
  uid: string,
  authority: {
    owner: boolean
    manager: boolean
    writer: boolean
  }
) => {
  try {
    fetch('/api/admin/user/claim', {
      method: 'POST',
      body: JSON.stringify({ ...authority, uid }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return true
  } catch (err) {
    if (process.env.NODE_ENV === 'development') console.log(err)
    return false
  }
}
