import { TayoriTemplate } from 'components/tayori/elements/tayori-template'
import type { NextPage } from 'next'
import { PostHomeHeader } from 'post/elements/post-home-header'
import { PostListItem } from 'post/elements/post-list-item'
import { Box } from 'shared/elements/box/common'
import { FlexBox } from 'shared/elements/box/flex'
import { useFireStore } from 'firestore/hooks/useFirestore'
import { Post } from 'post/types/post'
import { FramerBox } from 'shared/elements/box/framer'

const Home: NextPage = () => {
  const { data } = useFireStore<Post>('post')

  if (!data) return <></>
  if (data.length === 0) return <></>

  return (
    <FramerBox>
      <TayoriTemplate>
        <FlexBox way={'column'} width={'100%'} height={'100%'}>
          <PostHomeHeader />
          <Box
            width={'100%'}
            position={'relative'}
            overflowY={'scroll'}
            grow={'9999'}
          >
            <FlexBox
              position={'absolute'}
              width={'100%'}
              way={'row'}
              gap={'1em'}
              wrap={'wrap'}
              padding={'2em 0'}
            >
              {data.map((d) => (
                <PostListItem key={d.id} post={d} />
              ))}
            </FlexBox>
          </Box>
        </FlexBox>
      </TayoriTemplate>
    </FramerBox>
  )
}

export default Home
