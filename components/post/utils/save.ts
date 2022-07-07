import { update } from 'firestore/utils/update'
import { Post } from 'post/types/post'

export const savePost = async (post: Post) => {
  if (process.env.NODE_ENV === 'development') console.log(post)
  return update<Post>('post', post.id, post)
}

export default savePost
