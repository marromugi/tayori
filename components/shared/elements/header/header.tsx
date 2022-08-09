import { FlexBox } from 'shared/elements/box/flex'
import { MainH, Word } from 'shared/elements/text/common'
import { moduler } from 'shared/utils/styles'

export const Header = (props: {
    name: string,
    subName?: string,
    children?: React.ReactNode
}) => {
  return (
    <FlexBox
      way={'row'}
      width={'100%'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <FlexBox way={'row'} alignItems={'baseline'} gap={'0.5em'}>
        <MainH weight={'600'} size={moduler(6)}>
          {props.name}
        </MainH>
        {props.subName && (
            <Word weight={'600'} size={moduler(-1)}>
                {props.subName}
            </Word>
        )}
      </FlexBox>
      {props.children && ( props.children )}
    </FlexBox>
  )
}
