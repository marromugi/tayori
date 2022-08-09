import { gen } from 'middle'
import { Post } from 'post/types/post'

export const PostMarkdown = (props: { post: Post }) => {
  // console.log(tokens)
  const elements = gen(props.post.markdown ?? '', {
    img: 'md-img',
    p: 'md-p',
    a: 'md-a',
    blockquote: 'md-bq',
    pre: 'md-pre',
    code: 'tokyo-night-dark'
  })
  return <div dangerouslySetInnerHTML={{ __html: elements }}></div>
}
