import { useTheme } from 'shared/hooks/useTheme'
import { ColorBox } from '../box/color'
import { Image } from 'shared/elements/image/common'
import { Link } from './Link'
import { useRouter } from 'next/router'

export const IconLink = (props: {
  width: string
  height: string
  background: string
  src: string
  href: string
}) => {
  const { theme } = useTheme()
  const router = useRouter()
  const isVisible = router.pathname === `${props.href}`
  return (
    <Link href={props.href}>
      <ColorBox
        width={props.width}
        height={props.height}
        position={'relative'}
        padding={'10px'}
        background={props.background ?? theme.color.gray06}
        opacity={isVisible ? 1 : 0.5}
        radius={'8px'}
      >
        <Image width={'100%'} height={'100%'} fit={'cover'} src={props.src} />
      </ColorBox>
    </Link>
  )
}
