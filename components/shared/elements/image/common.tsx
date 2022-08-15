import { CursorBox } from '../box/cursor'

export const Image = (props: {
  width: string
  height: string
  src: string
  fit: NonNullable<JSX.IntrinsicElements['img']['style']>['objectFit']
  radius?: string
  cursor?: string
}) => {
  return (
    <CursorBox
      width={props.width}
      height={props.height}
      radius={props.radius}
      overflow={'hidden'}
      cursor={props.cursor ?? ''}
    >
      <img
        style={{
          width: props.width,
          height: props.height,
          objectFit: props.fit
        }}
        src={props.src}
      />
    </CursorBox>
  )
}
