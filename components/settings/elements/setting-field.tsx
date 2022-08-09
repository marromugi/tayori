import { BorderBox } from 'shared/elements/box/border'
import { ColorBox } from 'shared/elements/box/color'
import { FlexBox } from 'shared/elements/box/flex'
import { Sentence } from 'shared/elements/text/common'
import { useTheme } from 'shared/hooks/useTheme'
import { moduler } from 'shared/utils/styles'

export const SettingField = (props: {
  emoji: string
  title: string
  description?: string
  children: React.ReactNode | string
}) => {
  const { theme } = useTheme()
  return (
    <BorderBox
      width={'100%'}
      borderPosition={'bottom'}
      borderWidth={'2px'}
      borderColor={theme.color.gray04}
      borderStyle={'solid'}
      padding={'0 0 2em 0'}
    >
      <FlexBox
        width={'100%'}
        way={'row'}
        justifyContent={'space-between'}
        gap={'2em'}
      >
        <FlexBox way={'column'} gap={'8px'} maxWidth={'40ch'}>
          <FlexBox way={'row'} alignItems={'center'} gap={'0.5em'}>
            <ColorBox
              width={'36px'}
              height={'36px'}
              radius={'18px'}
              background={theme.color.base}
            >
              <FlexBox
                way={'column'}
                width={'100%'}
                height={'100%'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Sentence size={moduler(1)}>{props.emoji}</Sentence>
              </FlexBox>
            </ColorBox>
            <Sentence size={moduler(0)} color={theme.color.main} weight={'600'}>
              {props.title}
            </Sentence>
          </FlexBox>
          {props.description && (
            <Sentence size={moduler(-3)} color={theme.color.gray03}>
              {props.description}
            </Sentence>
          )}
        </FlexBox>
        {props.children}
      </FlexBox>
    </BorderBox>
  )
}
