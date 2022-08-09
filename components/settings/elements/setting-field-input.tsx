import { Box } from 'shared/elements/box/common'
import { Input } from 'shared/elements/field/input'
import { useTheme } from 'shared/hooks/useTheme'
import { SettingField } from './setting-field'

export const SettingFieldInput = (props: {
  emoji: string
  title: string
  description?: string
  defaultValue?: string
  placeholder?: string
  onChange: (str: string) => void
}) => {
  const { theme } = useTheme()
  return (
    <SettingField
      emoji={props.emoji}
      title={props.title}
      description={props.description}
    >
      <Box margin={`2em 0 0 0`} grow={'9999'} maxWidth={'40ch'}>
        <Input
          width="100%"
          padding={'1em 0.5em'}
          background={theme.color.base}
          placeholder={props.placeholder ?? 'テキスト'}
          defaultValue={props.defaultValue ?? ''}
          border={{ radius: '6px' }}
          onChange={(e) => props.onChange(e.target.value)}
        />
      </Box>
    </SettingField>
  )
}
