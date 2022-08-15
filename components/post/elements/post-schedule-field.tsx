import { useEffect, useRef, useState } from 'react'
import { ColorBox } from 'shared/elements/box/color'
import { FlexBox } from 'shared/elements/box/flex'
import { Input } from 'shared/elements/field/input'
import { Image } from 'shared/elements/image/common'
import { useTheme } from 'shared/hooks/useTheme'
import { PostScheduleEndpoint } from 'components/settings/types/settings'

export const PostScheduleEndpointField = (props: {
  schedule: PostScheduleEndpoint
  endpoint: string
  index: number
  onSave: (endpoint: string, isNew: boolean) => Promise<void>
  onDelete: (index: number) => void
  isNew: boolean
}) => {
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>
  const editRef = useRef(props.endpoint)
  const initRef = useRef(props.endpoint)
  const { theme } = useTheme()
  const [isEdit, setEditState] = useState(false)

  useEffect(() => {
    if (isEdit) ref.current.focus()
  }, [isEdit])

  useEffect(() => {
    // input の value は同期されないため、props 変更時にフィールドの値をマニュアルで合わせる
    ref.current.value = props.endpoint
  }, [props.endpoint])

  return (
    <FlexBox
      width={'100%'}
      way={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Input
        ref={ref}
        width="80%"
        padding={'1em 0.5em'}
        background={isEdit ? theme.color.gray06 : theme.color.base}
        defaultValue={props.endpoint}
        placeholder={
          props.isNew ? '新しいエンドポイントを追加する' : 'カテゴリー名'
        }
        border={{ radius: '6px' }}
        readOnly={!isEdit}
        isEllipsis={!isEdit}
        onChange={(e) => {
          // update endpoint list
          props.schedule.endpoints.splice(props.index, 1, e.currentTarget.value)
          console.log(props.schedule.endpoints)

          // update recent value
          editRef.current = e.currentTarget.value
        }}
      />
      <FlexBox way={'row'} alignItems={'center'} gap={'1em'}>
        <ColorBox
          opacity={0.2}
          hover={{ opacity: 1 }}
          onClick={async () => {
            if (isEdit) {
              // カテゴリー名が変更された時のみ保存する
              if (initRef.current !== editRef.current) {
                await props.onSave(editRef.current, props.isNew)
                // 登録用の場合、入力内容をリセットする
                if (props.isNew) {
                  initRef.current = ''
                  editRef.current = ''
                  ref.current.value = ''
                }
              }
            }
            setEditState(!isEdit)
          }}
        >
          <Image
            width={'30px'}
            height={'30px'}
            fit={'cover'}
            src={isEdit ? '/check.svg' : '/edit.svg'}
          />
        </ColorBox>
        {!props.isNew && (
          <ColorBox
            opacity={0.2}
            hover={{ opacity: 1 }}
            onClick={() => props.onDelete(props.index)}
          >
            <Image
              width={'30px'}
              height={'30px'}
              fit={'cover'}
              src={'/delete-red.svg'}
            />
          </ColorBox>
        )}
      </FlexBox>
    </FlexBox>
  )
}
