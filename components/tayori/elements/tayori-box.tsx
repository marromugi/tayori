import { RecoilRoot } from 'recoil'
import { Box } from 'shared/elements/box/common'
import { UserProvider } from 'components/user/hooks/useUser'
import { AnimatePresence } from 'framer-motion'

export const TayoriBox = (props: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
      <UserProvider>
        <Box width={'100vw'} height={'100vh'}>
          <AnimatePresence
            exitBeforeEnter
            onExitComplete={() => window.scrollTo(0, 0)}
          >
            {props.children}
          </AnimatePresence>
        </Box>
      </UserProvider>
    </RecoilRoot>
  )
}
