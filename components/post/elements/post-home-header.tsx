import { useRouter } from 'next/router'
import { createPost } from 'post/utils/create'
import { FlexBox } from 'shared/elements/box/flex'
import { Button } from 'shared/elements/button/common'
import { MainH, Word } from 'shared/elements/text/common'
import { moduler } from 'shared/utils/styles'

export const PostHomeHeader = () => {
  const router = useRouter()
  return (
    <FlexBox
      way={'row'}
      width={'100%'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <FlexBox way={'row'} alignItems={'baseline'} gap={'0.5em'}>
        <MainH weight={'600'} size={moduler(6)}>
          投稿
        </MainH>
        <Word weight={'600'} size={moduler(-1)}>
          POST
        </Word>
      </FlexBox>
      <Button
        onClick={() => {
          createPost().then((p) => {
            console.log(p)
            if (p) router.push(`/post/${p.id}`)
          })
        }}
      >
        Add New
      </Button>
    </FlexBox>
  )
}
