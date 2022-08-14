import { Post } from 'post/types/post'
import { useEffect, useState, ReactNode } from 'react'
import { Box } from 'shared/elements/box/common'
import { ColorBox } from 'shared/elements/box/color'
import { FlexBox } from 'shared/elements/box/flex'
import { Input } from 'shared/elements/field/input'
import { Switch } from 'shared/elements/field/switch'
import { Sentence, Word } from 'shared/elements/text/common'
import { useTheme } from 'shared/hooks/useTheme'
import { moduler } from 'shared/utils/styles'
import { Image } from 'shared/elements/image/common'
import { Calendar } from 'shared/elements/calendar/calendar'
import { TransformBox } from 'shared/elements/box/transform'
import { CursorBox } from 'shared/elements/box/cursor'
import { getDateText, getTimeText } from 'shared/utils/date'
import { usePostEditor } from 'post/hooks/usePostEditor'
import { Timestamp } from 'firebase/firestore'
import { Upload } from 'shared/elements/field/upload'
import { StorageObject } from 'components/storage/types/obj'
import { Select } from 'shared/elements/field/select'
import { Category } from 'components/category/types/category'

export const PostEditorSidebar = (props: {
  post: Post
  categories: Category[]
  isPreview: boolean
  onSetPreviewMode: (state: boolean) => void
}) => {
  const { theme } = useTheme()
  const [isPublish, setPublish] = useState(props.post.publish)
  const [isCalendarVisible, setCalendarVisible] = useState(false)
  const [thumbnail, setThumbnail] = useState<StorageObject | null>(
    props.post.thumbnail ?? null
  )
  const [release, setRelease] = useState<Date>(
    props.post.release ? props.post.release.toDate() : new Date()
  )
  const editor = usePostEditor()

  useEffect(() => {
    props.post.publish = isPublish
  }, [isPublish, props.post])

  useEffect(() => {
    props.post.release = Timestamp.fromDate(release)
  }, [release, props.post])

  useEffect(() => {
    if (thumbnail) props.post.thumbnail = thumbnail
  }, [thumbnail, props.post])

  return (
    <FlexBox
      way={'column'}
      gap={'1em'}
      minWidth={'360px'}
      width={'20vw'}
      height={'100%'}
    >
      <ColorBox
        background={theme.color.gray06}
        width={'100%'}
        padding={'1em'}
        radius={'16px'}
        shrink={'0'}
      >
        <FlexBox way={'column'} width={'100%'} gap={'1em'}>
          <TopField title={'プレビューモード'}>
            <Switch
              state={editor.isPreview}
              onSwitch={(state) => editor.onTogglePreview()}
            />
          </TopField>
          <FlexBox way={'row'} gap={'1em'}>
            <label htmlFor={'md-image'}>
              <input
                id={'md-image'}
                type={'file'}
                style={{ display: 'none' }}
                onChange={async (e) => {
                  const files = e.currentTarget.files
                  if (!files) return
                  if (files.length === 0) return
                  await editor.onUploadImage(files[0])
                }}
              />
              <TransformBox hover={'scale(1.1)'}>
                <ColorBox
                  width={'40px'}
                  height={'40px'}
                  radius={'20px'}
                  background={theme.color.base}
                >
                  <FlexBox
                    way={'column'}
                    width={'40px'}
                    height={'40px'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <Image
                      width={'26px'}
                      height={'26px'}
                      src={'/image.svg'}
                      fit={'contain'}
                    />
                  </FlexBox>
                </ColorBox>
              </TransformBox>
            </label>
          </FlexBox>
        </FlexBox>
      </ColorBox>
      <ColorBox
        background={theme.color.gray06}
        width={'100%'}
        padding={'1em'}
        radius={'16px'}
        shrink={'0'}
      >
        <FlexBox way={'column'} width={'100%'} gap={'1em'}>
          <TopField title={'公開設定'}>
            <Switch
              state={isPublish}
              onSwitch={(state) => setPublish(!isPublish)}
            />
          </TopField>
          <TopField title={'公開日'}>
            <ColorBox position={'absolute'} opacity={isCalendarVisible ? 1 : 0}>
              <TransformBox
                position={'absolute'}
                transform={
                  isCalendarVisible
                    ? 'translate(-110%, -50%)'
                    : 'translate(-105%, -50%)'
                }
              >
                <Calendar date={release} onChange={(d) => setRelease(d)} />
              </TransformBox>
            </ColorBox>
            <CursorBox cursor={'pointer'}>
              <ColorBox
                background={theme.color.base}
                radius={'8px'}
                padding={'0.75em 1em'}
                onClick={() => setCalendarVisible(!isCalendarVisible)}
              >
                <FlexBox way={'row'} gap={'1em'} alignItems={'center'}>
                  <Image
                    width={'30px'}
                    height={'30px'}
                    src={'/calendar.png'}
                    fit={'contain'}
                  />
                  <Word size={moduler(-1)} weight={'600'}>{`${getDateText(
                    release
                  )} ${getTimeText(release)}`}</Word>
                </FlexBox>
              </ColorBox>
            </CursorBox>
          </TopField>
        </FlexBox>
      </ColorBox>
      <ColorBox
        background={theme.color.gray06}
        width={'100%'}
        radius={'16px'}
        grow={'9999'}
        overflowY={'scroll'}
        position={'relative'}
      >
        <FlexBox
          way={'column'}
          position={'absolute'}
          padding={'1em'}
          width={'100%'}
          gap={'1em'}
        >
          <BottomField
            title={'スラッグ'}
            description={'公開した記事のURL末尾を設定します'}
          >
            <Input
              width={'100%'}
              padding={'1em 0.5em'}
              background={theme.color.gray06}
              border={{ radius: '6px' }}
              defaultValue={props.post.slug}
              onChange={(e) => (props.post.slug = e.target.value)}
            />
          </BottomField>
          <BottomField
            title={'カテゴリー'}
            description={'この投稿のカテゴリーを設定します'}
          >
            {props.categories.length <= 0 && (
              <ColorBox
                radius={'10px'}
                padding={'1em'}
                background={theme.color.gray06}
              >
                <FlexBox way={'column'}>
                  <Sentence size={moduler(-3)} color={theme.color.gray03}>
                    選択できるカテゴリーはありません。
                  </Sentence>
                  <Sentence size={moduler(-3)} color={theme.color.gray03}>
                    設定画面にてカテゴリーを作成すると選択できるようになります。
                  </Sentence>
                </FlexBox>
              </ColorBox>
            )}
            {props.categories.length > 0 && (
              <Select
                values={props.categories.map((c) => c.name)}
                defaultValue={
                  props.categories.filter((c) => c.id === props.post.category)
                    .length > 0
                    ? props.categories.filter(
                        (c) => c.id === props.post.category
                      )[0].name
                    : ''
                }
                onChange={(s) => {
                  const category = props.categories.filter(
                    (c) => c.name === s
                  )[0]
                  props.post.category = category.id
                }}
              />
            )}
          </BottomField>
          <BottomField
            title={'サムネイル'}
            description={'記事のサムネイルを設定します'}
          >
            <Upload
              folder={'thumbnail'}
              name={thumbnail ? thumbnail.name : undefined}
              url={thumbnail ? thumbnail.url : undefined}
              onUpload={(info) => setThumbnail(info)}
            />
          </BottomField>
          <BottomField
            title={'カラー'}
            description={'この投稿のテーマカラーを設定します'}
          >
            <Input
              width={'100%'}
              padding={'1em 0.5em'}
              background={theme.color.gray06}
              border={{ radius: '6px' }}
              defaultValue={
                props.post.custom ? props.post.custom.color ?? '' : ''
              }
              onChange={(e) => {
                if (!props.post.custom) props.post.custom = {}
                props.post.custom.color = e.target.value
              }}
            />
          </BottomField>
        </FlexBox>
      </ColorBox>
    </FlexBox>
  )
}

const TopField = (props: { title: string; children?: ReactNode }) => {
  const { theme } = useTheme()
  return (
    <FlexBox
      way={'row'}
      width={'100%'}
      alignItems={'center'}
      justifyContent={'space-between'}
      position={'relative'}
    >
      <Word weight={'600'} size={moduler(-2)} color={theme.color.main}>
        {props.title}
      </Word>
      {props.children}
    </FlexBox>
  )
}

const BottomField = (props: {
  title: string
  description: string
  children?: ReactNode
}) => {
  const { theme } = useTheme()
  return (
    <ColorBox
      background={theme.color.base}
      width={'100%'}
      padding={'1em'}
      radius={'12px'}
      shrink={'0'}
    >
      <FlexBox way={'column'} width={'100%'} gap={'2px'}>
        <Word weight={'600'} size={moduler(-2)} color={theme.color.main}>
          {props.title}
        </Word>
        <Sentence size={moduler(-3)} color={theme.color.gray01}>
          {props.description}
        </Sentence>
        <Box width={'100%'} margin={'12px 0 0 0'}>
          {props.children}
        </Box>
      </FlexBox>
    </ColorBox>
  )
}
