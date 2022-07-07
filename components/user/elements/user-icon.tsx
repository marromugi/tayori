import { soyoLogout } from 'auth/utils/logout'
import { BorderBox } from 'shared/elements/box/border'
import { TransformBox } from 'shared/elements/box/transform'
import { Box } from 'shared/elements/box/common'
import { Image } from 'shared/elements/image/common'
import { useTheme } from 'shared/hooks/useTheme'
import { useState } from 'react'
import { ColorBox } from 'shared/elements/box/color'
import { FlexBox } from 'shared/elements/box/flex'
import { Word } from 'shared/elements/text/common'
import { moduler } from 'shared/utils/styles'
import { CursorBox } from 'shared/elements/box/cursor'

export const UserIcon = () => {
  const { theme } = useTheme()
  const [isMenuOpen, setMenuState] = useState(false)
  return (
    <Box position={'relative'} zIndex={'2'}>
      <BorderBox
        width={'48px'}
        height={'48px'}
        overflow={'hidden'}
        radius={'28px'}
        shrink={'0'}
        borderPosition={'all'}
        borderWidth={'2px'}
        borderStyle={'solid'}
        borderColor={theme.color.main}
      >
        <Image
          width={'44px'}
          height={'44px'}
          src={'/dog.png'}
          fit={'contain'}
          cursor={'pointer'}
          onClick={() => setMenuState(!isMenuOpen)}
        />
      </BorderBox>
      <ColorBox opacity={isMenuOpen ? 1 : 0}>
        <TransformBox
          position={'fixed'}
          transform={
            isMenuOpen ? 'translate(80px, -100%)' : 'translate(80px, -90%)'
          }
        >
          <ColorBox
            background={theme.color.base}
            radius={'10px'}
            padding={'2em 1em'}
          >
            <FlexBox way={'column'} gap={'1em'}>
              <CursorBox cursor={'pointer'} width={'100%'}>
                <ColorBox
                  background={theme.color.gray06}
                  padding={'0.75em 1em'}
                  radius={'6px'}
                >
                  <FlexBox
                    way={'row'}
                    gap={'1em'}
                    alignItems={'center'}
                    onClick={() => soyoLogout()}
                  >
                    <Image
                      width={'40px'}
                      height={'40px'}
                      radius={'20px'}
                      src={'/dog.png'}
                      fit={'contain'}
                    />
                    <Word size={moduler(-2)} weight={'600'}>
                      ログアウト
                    </Word>
                  </FlexBox>
                </ColorBox>
              </CursorBox>
            </FlexBox>
          </ColorBox>
        </TransformBox>
      </ColorBox>
    </Box>
  )
}
