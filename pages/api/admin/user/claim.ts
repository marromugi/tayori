import { NextApiRequest, NextApiResponse } from 'next'
import { SoyoUserClaim } from 'components/user/types/claim'
import admin from 'firebase-admin'

type ReqBody = {
  uid: string
  owner: boolean
  manager: boolean
  writer: boolean
}

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ result: false })
  }

  const setSoyoUserClaim = async (uid: string, customClaims: SoyoUserClaim) => {
    try {
      await admin.auth().setCustomUserClaims(uid, customClaims)
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.log(error)
      }
    }
  }

  try {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL
        })
      })
    }

    const reqBody: ReqBody = req.body
    await setSoyoUserClaim(reqBody.uid, {
      owner: reqBody.owner,
      manager: reqBody.manager,
      writer: reqBody.writer
    })

    if (process.env.NODE_ENV === 'development') console.log(reqBody)
    return res.status(204).end()
  } catch (err) {
    if (process.env.NODE_ENV === 'development') console.log(err)
    return res.status(400).json({ result: false })
  }
}

export default handler
