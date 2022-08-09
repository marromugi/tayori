import { Post } from 'post/types/post'
import { PostScheduleRequest } from 'post/types/schedule'

export const schedule = async (post: Post) => {
  const reqData: PostScheduleRequest = {
    id: post.id,
    title: post.title ?? '',
    release: post.release.toDate().toString()
  }
  await fetch('/api/admin/post/schedule', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(reqData)
  })
}
