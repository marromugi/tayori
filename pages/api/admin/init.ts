import { NextApiRequest, NextApiResponse } from 'next'
import admin from 'firebase-admin'

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      if (admin.apps.length === 0) {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: (process.env.FIREBASE_PRIVATE_KEY as string).replace(
              /\\n/g,
              '\n'
            ),
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL
          })
        })
      }

      const db = admin.firestore()

      // init schedule
      await db.collection('schedule').doc('standby').create({ schedules: [] })
      await db.collection('schedule').doc('complete').create({ schedules: [] })

      // initt settings
      await db.collection('settings').doc('tayori').create({ schedules: [] })

      // init post slug list
      await db.collection('slug').doc('post').create({ value: [] })

      return res.status(200).json({ result: true, message: '' })
    } catch (err: any) {
      return res.status(400).json({ result: false, message: err.message })
    }
  } else {
    return res.status(405).end()
  }
}

export default handler
