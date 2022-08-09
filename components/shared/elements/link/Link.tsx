import styled from 'styled-components'
import NextLink from 'next/link'

const LinkBox = styled.a<{ width?: string }>`
  display: block;
  width: ${(props) => props.width ?? 'fit-content'};
  cursor: pointer;
  margin: 0 auto;
`

export const Link = (props: {
  href: string
  width?: string
  children?: React.ReactNode
}) => (
  <NextLink href={props.href}>
    <LinkBox width={props.width}>{props.children}</LinkBox>
  </NextLink>
)
