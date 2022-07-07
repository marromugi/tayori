import styled from 'styled-components'

type AreaBorderProps = {
  width?: string
  color?: string
  style?: string
  radius?: string
}

type AreaProps = {
  width?: string
  height?: string
  padding?: string
  color?: string
  background?: string
  border?: AreaBorderProps
  align?: 'right' | 'center' | 'left'
  v_space?: string
  h_space?: string
  font?: {
    size?: string
    weight?: string
  }
}

export const Area = styled.textarea<AreaProps>`
  ${(props) => (props.width ? `width: ${props.width};` : '')}
  ${(props) => (props.height ? `height: ${props.height};` : '')}
    ${(props) => (props.color ? `color: ${props.color};` : '')}
    ${(props) => (props.background ? `background: ${props.background};` : '')}
    ${(props) => (props.padding ? `padding: ${props.padding};` : '')}
    ${(props) => (props.align ? `text-align: ${props.align};` : '')}
    ${(props) => (props.v_space ? `line-height: ${props.v_space};` : '')}
    ${(props) => (props.h_space ? `letter-spacing: ${props.h_space};` : '')}
    ${(props) =>
    props.border
      ? props.border.width
        ? `border-width: ${props.border.width};`
        : ''
      : ''}
    ${(props) =>
    props.border
      ? props.border.color
        ? `border-color: ${props.border.color};`
        : ''
      : ''}
    ${(props) =>
    props.border
      ? props.border.width
        ? `border-style: ${props.border.style};`
        : ''
      : ''}
    ${(props) =>
    props.border
      ? props.border.radius
        ? `border-radius: ${props.border.radius};`
        : ''
      : ''}
    ${(props) =>
    props.font ? (props.font.size ? `font-size: ${props.font.size};` : '') : ''}
    ${(props) =>
    props.font
      ? props.font.weight
        ? `font-weight: ${props.font.weight};`
        : ''
      : ''}
    transition: height 0s;
`
