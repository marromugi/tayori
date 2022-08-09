import { CategoryEditor } from 'components/category/elements/category-editor'
import { Category } from 'components/category/types/category'
import { Box } from 'shared/elements/box/common'
import { KeyedMutator } from 'swr'
import { SettingField } from './setting-field'

export const SettingFieldCategory = (props: {
  emoji: string
  title: string
  description?: string
  categories?: Category[]
  mutate: KeyedMutator<Category[]>
}) => {
  return (
    <SettingField
      emoji={props.emoji}
      title={props.title}
      description={props.description}
    >
      <Box grow={'9999'}>
        <CategoryEditor
          categories={props.categories ?? []}
          mutate={props.mutate}
        />
      </Box>
    </SettingField>
  )
}
