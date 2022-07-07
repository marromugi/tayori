import { postImageUploadState, postPreviewState } from 'post/utils/atoms'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { upload } from 'components/storage/utils/upload'

export const usePostEditor = () => {
  const [uploadInfo, setUploadInfo] = useRecoilState(postImageUploadState)
  const [isPreview, setPreviewMode] = useRecoilState(postPreviewState)
  const [isUploading, setUploading] = useState(false)

  const onUploadImage = async (file: File) => {
    try {
      // upload start
      setUploading(true)

      const info = await upload('article', file)

      // set upload image
      // eslint-disable-next-line no-throw-literal
      if (!info) return null

      setUploadInfo(info)
      return info
    } catch (err) {
      if (process.env.NODE_ENV === 'development') console.log(err)
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

    let _areaLeavePos = areaLeavePos
    let newMarkdown = markdown
    // insert image markdown text
    const isLF = (charCode: number) => charCode === 10

    while (_areaLeavePos < markdown.length - 1) {
      if (isLF(markdown.charCodeAt(_areaLeavePos))) {
        const newImgLine = `![${uploadInfo.name}](${uploadInfo.url})\n`
        const beforeImgLine = area.value.slice(0, _areaLeavePos + 1)
        const afterImgLine = area.value.slice(_areaLeavePos + 1)
        newMarkdown = `${beforeImgLine}${newImgLine}${afterImgLine}`
        area.value = `${beforeImgLine}${newImgLine}${afterImgLine}`

        _areaLeavePos += newImgLine.length
        area.focus()
        area.selectionEnd = _areaLeavePos
        break
      } else {
        _areaLeavePos++
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
