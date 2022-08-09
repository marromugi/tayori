import styled from 'styled-components'
import { Box } from './common'

export const TransformBox = styled(Box)<{
  transform?: string
  transition?: number
  hover?: string
}>`
  ${(props) => (props.transform ? `transform: ${props.transform};` : '')}
  ${(props) => (props.transition ? `transition: ${props.transition}s;` : '')}
  ${(props) =>
    props.hover
      ? `&:hover {
        transform: ${props.hover};
        cursor: pointer;
    }`
      : ''}
`
