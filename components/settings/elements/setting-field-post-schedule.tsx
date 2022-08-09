import { Category } from 'components/category/types/category'
import { Box } from 'shared/elements/box/common'
import { SettingField } from './setting-field'
import { PostScheduleEditor } from 'post/elements/post-schedule-editor'
import { TayoriSettings } from '../types/settings'
import { KeyedMutator } from 'swr'

export const SettingFieldPostSchedule = (props: {
  emoji: string
  title: string
  description?: string
  categories: Category[]
  settings: TayoriSettings | null
  mutate: KeyedMutator<TayoriSettings[]>
}) => {
  if (props.settings) {
    return (
      <SettingField
        emoji={props.emoji}
        title={props.title}
        description={props.description}
      >
        <Box grow={'9999'}>
          <PostScheduleEditor
            categories={props.categories}
            settings={props.settings}
            mutate={props.mutate}
          />
        </Box>
      </SettingField>
    )
  } else {
    return <></>
  }
}
