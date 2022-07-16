import { take } from "firestore/utils/take";
import { Post } from "post/types/post";
import { TayoriError } from "shared/types/error";
import { PostSlug } from "post/types/slug";
import errorList from "./error";
import { updatePostSlugs } from "./slug";

export const validatePost = async (p: Post, onSuccess?: (slugs: PostSlug) => void): Promise<TayoriError | null> => {
    // empty title
    if (p.title === '' || p.title === null || p.title === undefined) {
        return errorList.title_is_empty
    }

    // empty slug
    if (p.slug === '' || p.slug === null || p.slug === undefined) {
        return errorList.slug_is_empty
    }

    // same slug
    const slugs = (await take<PostSlug>('slug', 'post')) as PostSlug
    const oldPost = await take<Post>('post', p.id) as Post

    if (slugs.value.indexOf(p.slug ?? '') >= 0 && oldPost.slug !== p.slug) {
        return errorList.same_slug_exist
    }

    // after validate, update slugs for validation
    await updatePostSlugs(p, oldPost, slugs)
    
    return null
}