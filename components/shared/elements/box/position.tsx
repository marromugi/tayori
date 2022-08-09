import styled from 'styled-components'
import { Box } from 'shared/elements/box/common'

export const PositionBox = styled(Box)<{
  top?: string
  bottom?: string
  left?: string
  right?: string
}>`
  ${(props) => (props.top ? `top: ${props.top};` : '')}
  ${(props) => (props.left ? `left: ${props.left};` : '')}
    ${(props) => (props.right ? `right: ${props.right};` : '')}
    ${(props) => (props.bottom ? `bottom: ${props.bottom};` : '')}
`
