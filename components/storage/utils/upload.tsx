import { firebaseApp } from 'components/firebase/utils/firebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getRandomStr } from 'shared/utils/string'

export const upload = async (folder: string, file: File) => {
  try {
    // connect to firebase storage
    const storage = getStorage(firebaseApp)
    const [name, mineType] = file.name.split('.')
    const id = getRandomStr(16)
    const storageRef = ref(storage, `${folder}/${id}.${mineType}`)

    // upload image...
    await uploadBytes(storageRef, file)

    // get uploaded image's url
    const urlWithToken = await getDownloadURL(storageRef)
    const url = urlWithToken.split('&token')[0]

    return { name, url }
  } catch (err) {
    if (process.env.NODE_ENV === 'development') console.log(err)
    return null
  }
}
