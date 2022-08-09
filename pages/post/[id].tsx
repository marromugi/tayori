import { Category } from 'components/category/types/category'
import { useFireStore } from 'firestore/hooks/useFirestore'
import { useRouter } from 'next/router'
import { PostEditor } from 'post/elements/post-editor'
import { PostEditorHeader } from 'post/elements/post-editor-header'
import { PostEditorSidebar } from 'post/elements/post-editor-sidebar'
import { Post } from 'post/types/post'
import { useState } from 'react'
import { Box } from 'shared/elements/box/common'
import { FlexBox } from 'shared/elements/box/flex'
import { FramerBox } from 'shared/elements/box/framer'

export const Page = () => {
  const router = useRouter()
  const { id } = router.query
  const [isPreview, setPreviewMode] = useState(false)
  const { data: post } = useFireStore<Post>('post', id as string)
  const { data: categories } = useFireStore<Category>('category')

  if (!post || !categories) return <></>
  if (post.length === 0) return <></>

  return (
    <FramerBox>
      <FlexBox width={'100%'} height={'100vh'} way={'column'}>
        <PostEditorHeader post={post[0]} />
        <FlexBox
          padding={'0 3em 0 3em'}
          width={'100%'}
          way={'row'}
          grow={'9999'}
        >
          <Box width={'100%'} height={'100%'} padding={'1em 3em 1em 0'}>
            <PostEditor post={post[0]} isPreview={isPreview} />
          </Box>
          <Box height={'100%'} padding={'1em 0'}>
            <PostEditorSidebar
              post={post[0]}
              categories={categories}
              isPreview={isPreview}
              onSetPreviewMode={(s) => setPreviewMode(s)}
            />
          </Box>
        </FlexBox>
      </FlexBox>
    </FramerBox>
  )
}

export default Page
