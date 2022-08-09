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
import { createCategory } from 'category/utils/create'
import { messageList } from 'category/utils/message'
import { saveCategory } from 'category/utils/save'
import { deleteCategory } from 'category/utils/delete'
import { Timestamp } from 'firebase/firestore'
import { KeyedMutator } from 'swr'
import { copyObj } from 'shared/utils/object'

export const CategoryEditor = (props: {
  categories: Category[]
  mutate: KeyedMutator<Category[]>
}) => {
  const { theme } = useTheme()
  // const [categories, setCategories] = useState(props.categories)
  const notifier = useNotification()

  useEffect(() => {
    // setCategories(props.categories)
  }, [props.categories])

  return (
    <ColorBox background={theme.color.base} radius={'12px'} overflow={'hidden'}>
      {props.categories.map((category, i) => (
        <CategoryItem
          key={i}
          category={category}
          onSave={async (category) => {
            // show notification
            notifier.loading()
            await saveCategory(category)
            props.mutate(copyObj(props.categories))
            notifier.show(messageList.success_save)
          }}
          onDelete={async (category) => {
            notifier.loading()
            await deleteCategory(category)
            const copy = copyObj(props.categories)
            props.mutate(copy.filter((c) => c.id !== category.id))
            notifier.show(messageList.success_delete)
            // setCategories(categories.filter((target) => target.id !== c.id))
          }}
        />
      ))}
      <ColorBox
        padding={'1.5em'}
        background={theme.color.base}
        hover={{ background: theme.color.gray04 }}
        onClick={async () => {
          // show notification
          notifier.loading()
          const newCategory = await createCategory()
          if (newCategory) {
            // setCategories([...categories, newCategory])
            const copy = copyObj(props.categories)
            copy.push(newCategory)
            props.mutate(copy)
            notifier.show(messageList.success_create)
          }
        }}
      >
        <FlexBox
          way={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={'10px'}
        >
          <Image
            width={'30px'}
            height={'30px'}
            fit={'cover'}
            src={'/add.svg'}
          />
          <Sentence size={moduler(-2)} weight={'600'}>
            カテゴリーを作成する
          </Sentence>
        </FlexBox>
      </ColorBox>
    </ColorBox>
  )
}

const CategoryItem = (props: {
  category: Category
  onSave: (c: Category) => void
  onDelete: (c: Category) => void
}) => {
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>
  const checkRef = useRef(props.category.name)
  const { theme } = useTheme()
  const [isEdit, setEditState] = useState(false)

  useEffect(() => {
    if (isEdit) ref.current.focus()
  }, [isEdit])

  return (
    <BorderBox
      borderColor={theme.color.gray04}
      borderWidth={'1px'}
      borderStyle={'solid'}
      borderPosition={'bottom'}
      padding={'1em'}
    >
      <FlexBox
        way={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Input
          width="80%"
          padding={'1em 0.5em'}
          background={isEdit ? theme.color.gray06 : theme.color.base}
          defaultValue={props.category.name}
          placeholder={'カテゴリー名'}
          border={{ radius: '6px' }}
          readOnly={!isEdit}
          isEllipsis={!isEdit}
          onChange={(e) => {
            props.category.name = e.currentTarget.value
          }}
          ref={ref}
        />
        <FlexBox way={'row'} alignItems={'center'} gap={'1em'}>
          <ColorBox
            opacity={0.2}
            hover={{ opacity: 1 }}
            onClick={() => {
              if (isEdit) {
                // カテゴリー名が変更された時のみ保存する
                if (checkRef.current !== props.category.name) {
                  props.category.updated = Timestamp.now()
                  props.onSave(props.category)
                  checkRef.current = props.category.name
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
          <ColorBox
            opacity={0.2}
            hover={{ opacity: 1 }}
            onClick={() => props.onDelete(props.category)}
          >
            <Image
              width={'30px'}
              height={'30px'}
              fit={'cover'}
              src={'/delete-red.svg'}
            />
          </ColorBox>
        </FlexBox>
      </FlexBox>
    </BorderBox>
  )
}
