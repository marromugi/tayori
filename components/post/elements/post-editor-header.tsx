import { Post } from 'post/types/post'
import { ColorBox } from 'shared/elements/box/color'
import { Box } from 'shared/elements/box/common'
import { FlexBox } from 'shared/elements/box/flex'
import { Input } from 'shared/elements/field/input'
import { Image } from 'shared/elements/image/common'
import { Link } from 'shared/elements/link/Link'
import { useTheme } from 'shared/hooks/useTheme'
import { moduler } from 'shared/utils/styles'
import { Button } from 'shared/elements/button/common'
import styled from 'styled-components'
import { savePost } from 'post/utils/save'
import { deletePost } from 'post/utils/delete'
import { useRouter } from 'next/router'
import { useNotification } from 'components/notification/hooks/useNotification'
import { messageList } from 'post/utils/message'
import { errorList } from 'post/utils/error'
import { schedule } from 'post/utils/schedule'

export const PostEditorHeader = (props: { post: Post }) => {
  const { theme } = useTheme()
  const notifier = useNotification()
  const router = useRouter()
  return (
    <HeaderBox background={theme.color.base}>
      <FlexBox
        way={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={'1em'}
        width={'100%'}
        padding={'1em 2em'}
      >
        <ColorBox opacity={0.5} hover={{ opacity: 1.0 }}>
          <Link href={'/post'}>
            <Image
              width={'30px'}
              height={'30px'}
              fit={'cover'}
              src={'/arrow-left.svg'}
            />
          </Link>
        </ColorBox>
        <Box grow={'9999'}>
          <Input
            width="100%"
            defaultValue={props.post.title}
            color={theme.color.main}
            font={{ weight: '600', size: moduler(0) }}
            onChange={(e) => (props.post.title = e.target.value)}
          />
        </Box>
        <FlexBox way={'row'} gap={'1em'}>
          <HeaderButtonBox
            onClick={async () => {
              const result = await deletePost(props.post)
              if (result) router.push('/post')
            }}
          >
            <Image
              width={'26px'}
              height={'26px'}
              fit={'cover'}
              src={'/delete.svg'}
            />
          </HeaderButtonBox>
          <Button
            onClick={async () => {
              const error = await savePost(props.post)
              if (error === null) {
                notifier.show(
                  props.post.publish
                    ? props.post.release.toDate() < new Date()
                      ? messageList.success_save_update
                      : messageList.success_save_reserve
                    : messageList.success_save_draft
                )
              } else {
                notifier.show(errorList.update_failed)
              }

              schedule(props.post)
            }}
          >
            保存する
          </Button>
        </FlexBox>
      </FlexBox>
    </HeaderBox>
  )
}

const HeaderButtonBox = styled.div`
  cursor: pointer;
  width: 44px;
  height: 44px;
  border-radius: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fe5d5d;
  &:hover {
    transform: scale(1.05);
  }
`
const HeaderBox = styled.div<{ background: string }>`
  width: 100%;
  background: ${(props) => props.background};
  // box-shadow: 0px 6px 6px 0px rgb(229 229 236 / 46%);
  position: relative;
`
