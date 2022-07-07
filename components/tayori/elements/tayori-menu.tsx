import { UserIcon } from 'components/user/elements/user-icon'
import { ColorBox } from 'shared/elements/box/color'
import { FlexBox } from 'shared/elements/box/flex'
import { IconLink } from 'shared/elements/link/icon'
import { useTheme } from 'shared/hooks/useTheme'

export const TayoriMenu = () => {
  const { theme } = useTheme()
  return (
    <ColorBox background={theme.color.base} height={'100%'}>
      <FlexBox
        height={'100%'}
        way={'column'}
        justifyContent={'space-between'}
        alignItems={'center'}
        padding={'2em 1em'}
      >
        <FlexBox height={'100%'} way={'column'} gap={'1em'}>
          <IconLink
            width={'48px'}
            height={'48px'}
            background={theme.color.gray06}
            src={'write.svg'}
            href={'/post'}
          />
        </FlexBox>
        <UserIcon />
      </FlexBox>
    </ColorBox>
  )
}
