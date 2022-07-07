import { upload } from 'components/storage/utils/upload'
import { useTheme } from 'shared/hooks/useTheme'
import { getRandomStr } from 'shared/utils/string'
import { moduler } from 'shared/utils/styles'
import { BorderBox } from '../box/border'
import { ColorBox } from '../box/color'
import { CursorBox } from '../box/cursor'
import { FlexBox } from '../box/flex'
import { Image } from '../image/common'
import { Word } from '../text/common'

export const Upload = (props: {
  folder: string
  onUpload: (obj: { name: string; url: string }) => void
  onError?: () => void
  name?: string
  url?: string
}) => {
  const id = getRandomStr(16)
  const { theme } = useTheme()
  return (
    <CursorBox cursor={'pointer'} onClick={() => {}}>
      <label htmlFor={id}>
        <input
          id={id}
          type={'file'}
          style={{ display: 'none' }}
          onChange={async (e) => {
            const files = e.currentTarget.files
            if (!files) return
            if (files.length === 0) return
            const info = await upload(props.folder, files[0])
            if (info) props.onUpload(info)
            if (!info && props.onError) props.onError()
          }}
        />
        <ColorBox
          background={theme.color.gray06}
          hover={{ background: theme.color.gray05 }}
          radius={'10px'}
          padding={'1em 0.5em'}
        >
          <FlexBox way={'row'} alignItems={'center'} gap={'1em'}>
            <BorderBox
              width={'50px'}
              height={'50px'}
              radius={'25px'}
              overflow={'hidden'}
              borderPosition={'all'}
              borderWidth={'2px'}
              borderStyle={'solid'}
              borderColor={theme.color.gray06}
            >
              <Image
                width={'46px'}
                height={'46px'}
                src={props.url ?? '/dog.png'}
                fit={'cover'}
              />
            </BorderBox>
            <FlexBox way={'column'}>
              <Word size={moduler(-2)} weight={'600'}>
                {props.name ?? 'ファイルなし'}
              </Word>
            </FlexBox>
          </FlexBox>
        </ColorBox>
      </label>
    </CursorBox>
  )
}
