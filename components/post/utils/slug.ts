import { update } from "firestore/utils/update"
import { Post } from "post/types/post"
import { PostSlug } from "post/types/slug"

export const updatePostSlugs = async (
    newPost: Post,
    oldPost: Post, 
    slugs: PostSlug
) => {
  
    // remove old post's slug, and add new post's slug
    const newSlugs = slugs.value.filter((s: string) => s !== oldPost.slug)
    newSlugs.push(newPost.slug as string)
  
    update('slug', 'post', {value: newSlugs})
}