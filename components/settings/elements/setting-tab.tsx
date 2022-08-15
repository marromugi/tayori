import { BorderBox } from 'shared/elements/box/border'
import { Box } from 'shared/elements/box/common'
import { useTheme } from 'shared/hooks/useTheme'
import { ColorBox } from 'shared/elements/box/color'
import { Word } from 'shared/elements/text/common'
import { Link } from 'shared/elements/link/Link'
import { TransformBox } from 'shared/elements/box/transform'
import { FlexBox } from 'shared/elements/box/flex'
import { moduler } from 'shared/utils/styles'
import { useRouter } from 'next/router'

export const SettingTab = () => {
  const { theme } = useTheme()
  return (
    <Box width={'100%'} position={'relative'} overflowX={'scroll'} shrink={'0'}>
      <BorderBox
        borderPosition={'bottom'}
        borderWidth={'2px'}
        borderColor={theme.color.gray04}
        borderStyle={'solid'}
      >
        <TransformBox transform={'translateY(3px)'}>
          <FlexBox way={'row'}>
            {false && (
              <SettingTabItem id={'general'} isDefault={true}>
                General
              </SettingTabItem>
            )}
            <SettingTabItem id={'post'} isDefault={true}>
              Post
            </SettingTabItem>
          </FlexBox>
        </TransformBox>
      </BorderBox>
    </Box>
  )
}

const SettingTabItem = (props: {
  id: string
  isDefault?: boolean
  children: string
}) => {
  const { theme } = useTheme()
  const router = useRouter()
  const isVisible =
    (props.isDefault && router.asPath.split('#').length === 1) ||
    router.asPath === `/settings#${props.id}`
  console.log(router.asPath)
  return (
    <ColorBox opacity={isVisible ? 1 : 0.5} width={'10ch'}>
      <BorderBox
        borderPosition={'bottom'}
        borderWidth={'4px'}
        borderColor={isVisible ? theme.color.main : 'transparent'}
        borderStyle={'solid'}
        padding={'0 0 9px 0'}
      >
        <Link href={`/settings#${props.id}`}>
          <Word size={moduler(0)} h_space={'0.02em'} weight={'400'}>
            {props.children}
          </Word>
        </Link>
      </BorderBox>
    </ColorBox>
  )
}
