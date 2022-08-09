import { postImageUploadState, postPreviewState } from 'post/utils/atoms'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { upload } from 'components/storage/utils/upload'
import { useNotification } from 'components/notification/hooks/useNotification'
import { errorList } from 'components/storage/utils/error'
import { messageList } from 'components/storage/utils/message'

export const usePostEditor = () => {
  const [uploadInfo, setUploadInfo] = useRecoilState(postImageUploadState)
  const [isPreview, setPreviewMode] = useRecoilState(postPreviewState)
  const [isUploading, setUploading] = useState(false)
  const notifier = useNotification()

  const onUploadImage = async (file: File) => {
    try {
      // show loading indicator
      notifier.loading()

      // upload start
      setUploading(true)

      const info = await upload('article', file)

      // set upload image
      // eslint-disable-next-line no-throw-literal
      if (!info) return null

      // show success notifier
      notifier.show(messageList.success_upload)

      setUploadInfo(info)
      return info
    } catch (err) {
      if (process.env.NODE_ENV === 'development') console.log(err)
      notifier.show(errorList.upload_failed)
    }
  }

  const onTogglePreview = () => {
    setPreviewMode(!isPreview)
  }

  const onInsertImgMarkdown = (
    markdown: string,
    area: HTMLTextAreaElement,
    areaLeavePos: number
  ) => {
    if (uploadInfo.url === '') return markdown

    let insertPos = areaLeavePos - 1
    let newMarkdown = markdown
    // insert image markdown text
    const isLF = (charCode: number) => charCode === 10
    const onFocusArea = (newImgMdLength: number) => {
      insertPos += newImgMdLength
      area.selectionEnd = insertPos
      area.focus()
    }

    while (insertPos <= markdown.length) {
      if (insertPos === markdown.length) {
        const newImgLine = `\n![${uploadInfo.name}](${uploadInfo.url})`
        newMarkdown = `${markdown}${newImgLine}`
        area.value = newMarkdown
        onFocusArea(newImgLine.length)
      }
      if (isLF(markdown.charCodeAt(insertPos))) {
        const newImgLine = `![${uploadInfo.name}](${uploadInfo.url})\n`
        const beforeImgLine = area.value.slice(0, insertPos + 1)
        const afterImgLine = area.value.slice(insertPos + 1)
        newMarkdown = `${beforeImgLine}${newImgLine}${afterImgLine}`
        area.value = newMarkdown
        onFocusArea(newImgLine.length)
        break
      } else {
        insertPos++
      }
    }

    return newMarkdown
  }

  useEffect(() => {
    if (uploadInfo.url !== '') setUploading(false)
  }, [uploadInfo])

  return {
    uploadInfo,
    isPreview,
    isUploading,
    onUploadImage,
    onTogglePreview,
    onInsertImgMarkdown
  }
}
