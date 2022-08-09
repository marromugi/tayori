import { ColorBox } from 'shared/elements/box/color'
import { FlexBox } from 'shared/elements/box/flex'
import { Sentence } from 'shared/elements/text/common'
import { useTheme } from 'shared/hooks/useTheme'
import { moduler } from 'shared/utils/styles'

export const SettingIntro = (props: { title: string; children: string }) => {
  const { theme } = useTheme()
  return (
    <ColorBox
      padding={'2em 1em'}
      radius={'16px'}
      background={theme.color.base}
      width={'40ch'}
    >
      <FlexBox way={'column'} gap={'1em'}>
        <Sentence
          size={moduler(0)}
          weight={'600'}
          h_space={'0.02em'}
          color={theme.color.main}
        >
          {props.title}
        </Sentence>
        <Sentence
          size={moduler(-2)}
          weight={'500'}
          h_space={'0.02em'}
          color={theme.color.gray03}
        >
          {props.children}
        </Sentence>
      </FlexBox>
    </ColorBox>
  )
}
