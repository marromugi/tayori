import styled from 'styled-components'
import { moduler } from 'shared/utils/styles'
import { StackText } from '../text/stack'
import { BorderBox } from '../box/border'
import { ColorBox } from '../box/color'

const _CellWrap = styled.div<{ width?: string }>`
  width: ${(props) => props.width ?? 'fit-content'};
`

export const Cell = (props: {
  title: string
  subTitle?: string
  width?: string
  colors?: { background: string; text: string; border: string }
  padding?: string
}) => {
  const colors = props.colors ?? {
    background: '#000000',
    text: '#FFFFFF',
    border: '#FFFFFF'
  }
  return (
    <_CellWrap width={props.width}>
      <BorderBox
        padding={'2px'}
        radius={'4px'}
        borderPosition={'all'}
        borderColor={colors.border}
        borderWidth={'2px'}
        borderStyle={'solid'}
      >
        <BorderBox
          padding={props.padding ?? `${moduler(-8)} ${moduler(8)}`}
          radius={'2px'}
          borderPosition={'all'}
          borderColor={colors.border}
          borderWidth={'2px'}
          borderStyle={'solid'}
        >
          <ColorBox background={colors.background}>
            <StackText
              top={props.title}
              bottom={props.subTitle}
              color={colors.text}
              size={-2}
            />
          </ColorBox>
        </BorderBox>
      </BorderBox>
    </_CellWrap>
  )
}
