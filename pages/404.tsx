import { BorderBox } from 'shared/elements/box/border'
import { ColorBox } from 'shared/elements/box/color'
import { FlexBox } from 'shared/elements/box/flex'
import { LargeH, Word } from 'shared/elements/text/common'
import { useTheme } from 'shared/hooks/useTheme'
import { moduler } from 'shared/utils/styles'

export const page = () => {
  const { theme } = useTheme()
  return (
    <FlexBox
      way={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      width={'100%'}
      height={'100%'}
      gap={'1em'}
    >
      <ColorBox
        width={'100px'}
        height={'100px'}
        radius={'10000px'}
        background={theme.color.gray05}
      >
        <FlexBox
          width={'100%'}
          height={'100%'}
          way={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Word size={moduler(6)} weight={'600'} h_space={'0.04em'}>
            😖
          </Word>
        </FlexBox>
      </ColorBox>
      <LargeH size={moduler(5)} weight={'600'} h_space={'0.04em'}>
        Page not found!
      </LargeH>
      <Word size={moduler(-1)} weight={'600'} h_space={'0.04em'}>
        お探しのページは見つかりませんでした
      </Word>
      <BorderBox
        borderPosition={'top'}
        borderColor={theme.color.gray05}
        borderWidth={'2px'}
        borderStyle={'solid'}
        width={'30ch'}
        maxWidth={'100%'}
        margin={'1em 0'}
      >
        <FlexBox
          way={'column'}
          width={'100%'}
          justifyContent={'center'}
          alignItems={'center'}
          padding={'1em 0 0 0'}
        >
          <Word
            size={moduler(-1)}
            weight={'600'}
            h_space={'0.04em'}
            color={theme.color.gray03}
          >
            Message from Tayori
          </Word>
        </FlexBox>
      </BorderBox>
    </FlexBox>
  )
}

export default page
