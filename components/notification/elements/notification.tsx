import { ColorBox } from 'shared/elements/box/color'
import { Box } from 'shared/elements/box/common'
import { FlexBox } from 'shared/elements/box/flex'
import { NeumorphismBox } from 'shared/elements/box/neumorphism'
import { PositionBox } from 'shared/elements/box/position'
import { TransformBox } from 'shared/elements/box/transform'
import { Image } from 'shared/elements/image/common'
import { Loader } from 'shared/elements/loader/loader'
import { Sentence } from 'shared/elements/text/common'
import { useTheme } from 'shared/hooks/useTheme'
import { moduler } from 'shared/utils/styles'
import { useNotification } from '../hooks/useNotification'

export const Notifier = () => {
  const { theme } = useTheme()
  const { notification, isShow, hide } = useNotification()
  const isLoading = notification.isLoading

  return (
    <Box position={'relative'} zIndex={'99'} isInactive={!isShow}>
      <PositionBox position={'fixed'} right={'2em'} bottom={'2em'}>
        <TransformBox
          transform={isShow ? 'translateY(0px)' : 'translateY(20px)'}
          transition={0.4}
        >
          <ColorBox opacity={isShow ? 1 : 0} transition={0.4}>
            <NeumorphismBox
              radius={'16px'}
              width={'40ch'}
              minHeight={'6em'}
              padding={'1em'}
              background={theme.color.base}
              boxShadow={'-5px 5px 19px #d1d1d1, 5px -5px 19px #ffffff;'}
            >
              <FlexBox
                position={'absolute'}
                width={'calc(100% - 2em)'}
                height={'calc(100% - 2em)'}
                way={'column'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <ColorBox opacity={isLoading ? 1 : 0} transition={0.5}>
                  <Loader color={theme.color.main} />
                </ColorBox>
              </FlexBox>
              <ColorBox opacity={isLoading ? 0 : 1} transition={0.5}>
                <FlexBox
                  way={'row'}
                  width={'100%'}
                  height={'100%'}
                  minHeight={'6em'}
                  alignItems={'center'}
                  position={'relative'}
                >
                  <ColorBox
                    width={'40px'}
                    height={'40px'}
                    radius={'20px'}
                    background={theme.color.gray05}
                    shrink={'0'}
                    margin={'0 1em 0 0'}
                    opacity={isLoading ? 0 : 1}
                    transition={0.5}
                  >
                    <FlexBox
                      way={'column'}
                      width={'100%'}
                      height={'100%'}
                      justifyContent={'center'}
                      alignItems={'center'}
                    >
                      <Sentence size={moduler(2)}>
                        {notification.emoji ?? '🤨'}
                      </Sentence>
                    </FlexBox>
                  </ColorBox>
                  <FlexBox way={'column'} grow={'9999'} gap={'6px'}>
                    <Sentence
                      size={moduler(-1)}
                      weight={'600'}
                      h_space={'0.02em'}
                      color={theme.color.main}
                    >
                      {notification.message ?? ''}
                    </Sentence>
                    <Sentence
                      size={moduler(-3)}
                      weight={'500'}
                      h_space={'0.02em'}
                      color={theme.color.gray03}
                    >
                      {notification.detail ?? ''}
                    </Sentence>
                  </FlexBox>
                  <ColorBox
                    width={'20px'}
                    shrink={'0'}
                    height={'100%'}
                    minHeight={'6em'}
                    opacity={0.5}
                    hover={{ opacity: 1 }}
                    onClick={() => hide()}
                  >
                    <Image
                      width={'20px'}
                      height={'20px'}
                      fit={'cover'}
                      src={'/close.svg'}
                    />
                  </ColorBox>
                </FlexBox>
              </ColorBox>
            </NeumorphismBox>
          </ColorBox>
        </TransformBox>
      </PositionBox>
    </Box>
  )
}
