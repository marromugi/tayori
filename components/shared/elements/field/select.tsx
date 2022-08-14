import { useState } from 'react'
import { useTheme } from 'shared/hooks/useTheme'
import { BorderBox } from '../box/border'
import { ColorBox } from '../box/color'
import { FlexBox } from '../box/flex'
import { Sentence } from '../text/common'
import { moduler } from 'shared/utils/styles'

export const Select = (props: {
  values: string[]
  defaultValue: string
  onChange: (item: string) => void
}) => {
  const { theme } = useTheme()
  const [value, setValue] = useState(props.defaultValue)
  return (
    <FlexBox way={'column'} width={'100%'} gap={'6px'}>
      {props.values.map((v, i) => (
        <ColorBox
          width={'100%'}
          background={value === v ? theme.color.gray05 : theme.color.base}
          radius={'10px'}
          key={i}
          padding={'16px 8px'}
          onClick={() => {
            setValue(v)
            props.onChange(v)
          }}
          hover={{
            background: value === v ? theme.color.gray05 : theme.color.gray06
          }}
        >
          <BorderBox
            width={'100%'}
            borderPosition={'bottom'}
            borderWidth={'0px'}
            borderColor={theme.color.gray05}
            borderStyle={'solid'}
          >
            <FlexBox way={'row'} gap={'1em'} alignItems={'center'}>
              <BorderBox
                borderPosition={'all'}
                borderWidth={'2px'}
                borderColor={
                  value === v ? theme.color.gray04 : theme.color.gray06
                }
                borderStyle={'solid'}
                radius={'10000vw'}
                overflow={'hidden'}
              >
                <ColorBox
                  width={'16px'}
                  height={'16px'}
                  background={
                    value === v ? theme.color.active : theme.color.gray04
                  }
                ></ColorBox>
              </BorderBox>
              <Sentence
                size={moduler(-2)}
                h_space={'0.02em'}
                weight={'600'}
                color={value === v ? theme.color.main : theme.color.gray03}
              >
                {v}
              </Sentence>
            </FlexBox>
          </BorderBox>
        </ColorBox>
      ))}
    </FlexBox>
  )
}
