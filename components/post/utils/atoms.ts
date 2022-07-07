import { atom } from 'recoil'

// state
export const postImageUploadState = atom<{
  name: string
  url: string
}>({
  key: 'postImageUpload',
  default: {
    name: '',
    url: ''
  }
})

export const postPreviewState = atom<boolean>({
  key: 'postPreview',
  default: false
})
