import { NextApiRequest, NextApiResponse } from 'next'
import { Post } from 'post/types/post'
import admin from 'firebase-admin'

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: (process.env.FIREBASE_PRIVATE_KEY as string).replace(/\\n/g, '\n'),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL
        })
      })
    }

    const query = req.query
    const slug = query.slug as string
    const db = admin.firestore()
    const now = new Date()

    const docPost = await db.collection('post')
      .where('slug', '==', slug)
      .where('publish', '==', true)
      .where('release', '<', now)
      .get()

    if (docPost.empty) {
      return res.status(404).json({ message: 'slug is invalid' })
    }

    const post = docPost.docs[0].data() as Post

    return res.status(200).json({
      id: post.id,
      title: post.title,
      slug: post.slug,
      release: post.release.toDate(),
      markdown: post.markdown,
      thumbnail: post.thumbnail,
      custom: post.custom ?? {}
    })
  }
}

export default handler
