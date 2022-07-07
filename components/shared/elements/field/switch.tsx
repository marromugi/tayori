import styled from 'styled-components'
import { ColorBox } from '../box/color'

const SWITCH_WIDTH = 60
const SWITCH_HEIGHT = 30
const SWITCH_RADIUS = 15
const SWITCH_CIRCLE_SIZE = 24
const SWITCH_PADDING = 4

export const Switch = (props: {
  color?: {
    active: string
    passive: string
  }
  state: boolean
  onSwitch: (state: boolean) => void
}) => {
  const color: { active: string; passive: string } = props.color ?? {
    active: '#00b06b',
    passive: '#cfced4'
  }
  return (
    <SwitchContainer>
      <ColorBox
        onClick={() => props.onSwitch(!props.state)}
        width={`${SWITCH_WIDTH}px`}
        height={`${SWITCH_HEIGHT}px`}
        radius={`${SWITCH_RADIUS}px`}
        background={props.state ? color.active : color.passive}
      >
        <SwitchCircleBox isActive={props.state}>
          <ColorBox
            width={'24px'}
            height={'24px'}
            radius={'12px'}
            background={'#FFFFFF'}
          ></ColorBox>
        </SwitchCircleBox>
      </ColorBox>
    </SwitchContainer>
  )
}

const SwitchContainer = styled.div`
  cursor: pointer;
`

const SwitchCircleBox = styled.div<{ isActive: boolean }>`
  width: ${SWITCH_CIRCLE_SIZE}px;
  height: ${SWITCH_CIRCLE_SIZE}px;
  transform: translate(
    ${(props) =>
      props.isActive
        ? `${SWITCH_PADDING}px`
        : `${SWITCH_WIDTH - SWITCH_CIRCLE_SIZE - SWITCH_PADDING}px`},
    3px
  );
`
