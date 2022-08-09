import { useRouter } from 'next/router'
import { Box } from 'shared/elements/box/common'
import { FramerInnerBox } from 'shared/elements/box/framer'

export const SettingBox = (props: {
  id: string
  isDefault?: boolean
  children: React.ReactNode
}) => {
  const router = useRouter()
  const isVisible =
    (props.isDefault && router.asPath.split('#').length === 1) ||
    router.asPath === `/settings#${props.id}`
  return (
    <Box
      position={'absolute'}
      width={'100%'}
      height={'100%'}
      padding={'2em 0 0 0'}
      zIndex={isVisible ? '2' : '1'}
      overflowY={isVisible ? 'scroll' : 'hidden'}
    >
      <FramerInnerBox href={`/settings#${props.id}`} isInit={props.isDefault}>
        {props.children}
      </FramerInnerBox>
    </Box>
  )
}
