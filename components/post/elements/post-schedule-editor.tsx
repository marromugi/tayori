import { useNotification } from 'components/notification/hooks/useNotification'
import { useEffect, useRef, useState } from 'react'
import { BorderBox } from 'shared/elements/box/border'
import { ColorBox } from 'shared/elements/box/color'
import { FlexBox } from 'shared/elements/box/flex'
import { Input } from 'shared/elements/field/input'
import { Image } from 'shared/elements/image/common'
import { Sentence } from 'shared/elements/text/common'
import { useTheme } from 'shared/hooks/useTheme'
import { moduler } from 'shared/utils/styles'
import { Category } from 'category/types/category'
import {
  PostScheduleEndpoint,
  TayoriSettings
} from 'components/settings/types/settings'
import { useSetRecoilState } from 'recoil'
import { settingsState } from 'components/settings/utils/atoms'
import { copyObj } from 'shared/utils/object'
import { saveSettings } from 'components/settings/utils/save'
import { KeyedMutator } from 'swr'
import { messageList } from 'components/settings/utils/message'

export const PostScheduleEditor = (props: {
  settings: TayoriSettings
  categories: Category[]
  mutate: KeyedMutator<TayoriSettings[]>
}) => {
  console.log(props.settings)
  const { theme } = useTheme()
  // const [settings, setSettings] = useRecoilState(settingsState)
  const [categories, setCategories] = useState(props.categories)
  // const [schedules, setSchedules] = useState(
  //   props.settings ? props.settings.schedules : []
  // )
  // const notifier = useNotification()

  useEffect(() => {
    setCategories(props.categories)
    props.categories.forEach((c) => {
      const isCategoryExist =
        props.settings.schedules.filter((s) => s.categoryId === c.id).length > 0
      if (!isCategoryExist) {
        // add new schedule model if not exist
        props.settings.schedules.push({ categoryId: c.id, endpoints: [] })
      }
    })
  }, [props.categories])

  if (props.settings === null) {
    return (
      <ColorBox
        background={theme.color.base}
        radius={'12px'}
        overflow={'hidden'}
      ></ColorBox>
    )
  } else {
    return (
      <ColorBox
        background={theme.color.base}
        radius={'12px'}
        overflow={'hidden'}
      >
        {categories.map((c, i) => (
          <PostScheduleItem
            key={i}
            settings={props.settings}
            schedule={
              props.settings.schedules.filter(
                (s) => s.categoryId === c.id
              )[0] as PostScheduleEndpoint
            }
            category={c}
            mutate={props.mutate}
          />
        ))}
      </ColorBox>
    )
  }
}

const PostScheduleItem = (props: {
  settings: TayoriSettings
  schedule: PostScheduleEndpoint
  category: Category
  mutate: KeyedMutator<TayoriSettings[]>
}) => {
  const { theme } = useTheme()
  const notifier = useNotification()
  const setSettings = useSetRecoilState(settingsState)
  const onSave = async (endpoint: string, isNew: boolean) => {
    const copy = copyObj(props.settings)
    if (isNew) {
      copy.schedules.forEach((schedule) => {
        if (schedule.categoryId === props.category.id) {
          schedule.endpoints.push(endpoint)
        }
      })
    }
    // show notification
    notifier.loading()
    setSettings(copy)
    saveSettings(copy).then(() =>
      notifier.show(messageList.success_save_schedule_endpoint)
    )
    props.mutate([copy])
  }
  const onDelete = (endpoint: string) => {
    // notifier.loading()
    // await deleteCategory(c)
    // notifier.show(messageList.success_delete)
    // setCategories(categories.filter((target) => target.id !== c.id))
  }

  return (
    <BorderBox
      borderColor={theme.color.gray04}
      borderWidth={'1px'}
      borderStyle={'solid'}
      borderPosition={'bottom'}
      padding={'1em'}
    >
      <FlexBox way={'column'} gap={'1em'}>
        <Sentence weight={'600'} size={moduler(-3)}>
          {props.category.name}
        </Sentence>
        {props.schedule && (
          <FlexBox way={'column'} width={'100%'} gap={'10px'}>
            {props.schedule.endpoints.map((endpoint, i) => (
              <PostScheduleEditorField
                key={i}
                schedule={props.schedule}
                endpoint={endpoint}
                onSave={onSave}
                onDelete={onDelete}
                isNew={false}
              />
            ))}

            <PostScheduleEditorField
              schedule={props.schedule}
              endpoint={''}
              onSave={onSave}
              onDelete={onDelete}
              isNew={true}
            />
          </FlexBox>
        )}
      </FlexBox>
    </BorderBox>
  )
}

export const PostScheduleEditorField = (props: {
  schedule: PostScheduleEndpoint
  endpoint: string
  onSave: (endpoint: string, isNew: boolean) => Promise<void>
  onDelete: (endpoint: string) => void
  isNew: boolean
}) => {
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>
  const editRef = useRef(props.endpoint)
  const checkRef = useRef(props.endpoint)
  const { theme } = useTheme()
  const [isEdit, setEditState] = useState(false)

  useEffect(() => {
    if (isEdit) ref.current.focus()
  }, [isEdit])

  useEffect(() => {}, [props.isNew])

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
          let isFound = false
          props.schedule.endpoints.forEach((endpoint, i) => {
            if (endpoint === editRef.current && !isFound) {
              props.schedule.endpoints.splice(i, 1)
              isFound = true
            }
          })
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
              if (checkRef.current !== editRef.current) {
                await props.onSave(editRef.current, props.isNew)
                // 登録用の場合、入力内容をリセットする
                if (props.isNew) {
                  checkRef.current = ''
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
            onClick={() => props.onDelete(props.endpoint)}
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
