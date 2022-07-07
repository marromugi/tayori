import { useTheme } from 'shared/hooks/useTheme'
import { Word } from '../text/common'
import { moduler } from 'shared/utils/styles'
import styled from 'styled-components'

export const Button = (props: {
  width?: string
  padding?: string
  color?: {
    text: string
    background: string
  }
  onClick?: () => void
  children: string
}) => {
  const { theme } = useTheme()
  const color = props.color ?? {
    text: theme.color.base,
    background: theme.color.main
  }
  return (
    <ButtonContainer
      type={'submit'}
      width={props.width}
      onClick={() => {
        if (props.onClick) {
          props.onClick()
        }
      }}
      padding={props.padding ?? '1.0em 2.4em'}
      background={color.background}
    >
      <Word color={color.text} weight={'600'} size={moduler(0)}>
        {props.children}
      </Word>
    </ButtonContainer>
  )
}

const ButtonContainer = styled.button<{
  width?: string
  padding: string
  background: string
}>`
  ${(props) => (props.width ? `width: ${props.width};` : '')}
  ${(props) => (props.padding ? `padding: ${props.padding};` : '')}
    ${(props) => (props.background ? `background: ${props.background};` : '')}
    cursor: pointer;
  border-radius: 200vh;
  border: none;

  &:focus {
    outline: none;
  }
`
