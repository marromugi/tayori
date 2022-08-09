import { update } from 'firestore/utils/update'
import { Post } from 'post/types/post'
import { errorList } from './error'
import { validatePost } from './validate'

export const savePost = async (post: Post) => {
  if (process.env.NODE_ENV === 'development') console.log(post)

  // check validate
  const error = await validatePost(post)
  if (error) {
    return error
  }

  // update post
  const result = update<Post>('post', post.id, post)

  return result ? null : errorList.update_failed
}

export default savePost
