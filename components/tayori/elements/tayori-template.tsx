import { ColorBox } from 'shared/elements/box/color'
import { Box } from 'shared/elements/box/common'
import { FlexBox } from 'shared/elements/box/flex'
import { useTheme } from 'shared/hooks/useTheme'
import { TayoriMenu } from './tayori-menu'

export const TayoriTemplate = (props: { children?: React.ReactNode }) => {
  const { theme } = useTheme()
  return (
    <ColorBox width={'100%'} height={'100%'} background={theme.color.gray06}>
      <FlexBox way={'row'} height={'100%'}>
        <TayoriMenu />
        <Box grow={'9999'} height={'100%'} padding={'2em 4em 0 4em'}>
          {props.children}
        </Box>
      </FlexBox>
    </ColorBox>
  )
}
