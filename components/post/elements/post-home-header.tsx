import { useRouter } from 'next/router'
import { createPost } from 'post/utils/create'
import { Button } from 'shared/elements/button/common'
import { Header } from 'shared/elements/header/header'

export const PostHomeHeader = () => {
  const router = useRouter()
  return (
      <Header name={'投稿'} subName={'POST'}>
        <Button
          onClick={() => {
            createPost().then((p) => {
              if (process.env.NODE_ENV === 'development') console.log(p)
              if (p) router.push(`/post/${p.id}`)
            })
          }}
        >
          Add New
        </Button>
      </Header>
  )
}
