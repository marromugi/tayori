import { useNotification } from 'components/notification/hooks/useNotification'
import { useEffect, useState } from 'react'
import { BorderBox } from 'shared/elements/box/border'
import { FlexBox } from 'shared/elements/box/flex'
import { Sentence } from 'shared/elements/text/common'
import { useTheme } from 'shared/hooks/useTheme'
import { moduler } from 'shared/utils/styles'
import { Category } from 'category/types/category'
import {
  PostScheduleEndpoint,
  TayoriSettings
} from 'components/settings/types/settings'
import { copyObj } from 'shared/utils/object'
import { saveSettings } from 'components/settings/utils/save'
import { KeyedMutator } from 'swr'
import { messageList } from 'components/settings/utils/message'
import { PostScheduleEndpointField } from './post-schedule-field'

export const PostScheduleItem = (props: {
  settings: TayoriSettings
  category: Category
  mutate: KeyedMutator<TayoriSettings[]>
  isLast: boolean
}) => {
  const { theme } = useTheme()
  const [schedule, setSchedule] = useState<PostScheduleEndpoint | null>(null)
  const notifier = useNotification()

  useEffect(() => {
    const isTargetScheduleExist =
      props.settings.schedules.filter((s) => s.categoryId === props.category.id)
        .length > 0
    const target = isTargetScheduleExist
      ? props.settings.schedules.filter(
          (s) => s.categoryId === props.category.id
        )[0]
      : null
    setSchedule(target)
  }, [props.settings])

  const onSave = async (endpoint: string, isNew: boolean) => {
    const copy = copyObj(props.settings)

    // show notification
    notifier.loading()

    // save setting
    saveSettings(copy).then(() => {
      notifier.show(messageList.success_save_schedule_endpoint)
      props.mutate([copy])
    })
  }

  const onDelete = (index: number) => {
    const copy = copyObj(props.settings)

    // 削除するエンドポイントを配列から除外
    copy.schedules.some((schedule) => {
      if (schedule.categoryId === props.category.id) {
        schedule.endpoints.splice(index, 1)
      }
      return schedule.categoryId === props.category.id
    })

    // show notification
    notifier.loading()

    // save setting
    saveSettings(copy).then(() => {
      notifier.show(messageList.success_delete_schedule_endpoint)
      props.mutate([copy])
    })
  }

  return (
    <BorderBox
      borderColor={theme.color.gray04}
      borderWidth={props.isLast ? '0px' : '1px'}
      borderStyle={'solid'}
      borderPosition={'bottom'}
      padding={'1em'}
    >
      <FlexBox way={'column'} gap={'1em'}>
        <Sentence weight={'600'} size={moduler(-3)}>
          {props.category.name}
        </Sentence>
        {schedule && (
          <FlexBox way={'column'} width={'100%'} gap={'10px'}>
            {schedule.endpoints.map((endpoint, i) => (
              <PostScheduleEndpointField
                key={i}
                index={i}
                schedule={schedule}
                endpoint={endpoint}
                onSave={onSave}
                onDelete={onDelete}
                isNew={false}
              />
            ))}

            <PostScheduleEndpointField
              schedule={schedule}
              endpoint={''}
              onSave={onSave}
              onDelete={onDelete}
              index={schedule.endpoints.length}
              isNew={true}
            />
          </FlexBox>
        )}
      </FlexBox>
    </BorderBox>
  )
}
