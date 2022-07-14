import { NextApiRequest, NextApiResponse } from 'next'
import { Post } from 'post/types/post'
import admin from 'firebase-admin'

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL
        })
      })
    }

    const db = admin.firestore()
    const now = new Date()

    const docPosts = await db.collection('post')
        .where('publish', '==', true)
        .where('release', '<', now)
        .get()

    if (docPosts.empty) {
      return res.status(404).json({ message: 'post not found' })
    }

    const posts = docPosts.docs.map(docPost => {
        const post = docPost.data() as Post
        return {
            id: post.id,
            title: post.title,
            slug: post.slug,
            release: post.release.toDate(),
            markdown: post.markdown,
            thumbnail: post.thumbnail
        }
    })

    return res.status(200).json(posts)
  }
}

export default handler
