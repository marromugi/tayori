import { NextApiRequest, NextApiResponse } from 'next'
import { SoyoUserClaim } from 'components/user/types/claim'
import admin from 'firebase-admin'

const setSoyoUserClaim = async (uid: string, customClaims: SoyoUserClaim) => {
  try {
    await admin.auth().setCustomUserClaims(uid, customClaims)
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log(error)
    }
  }
}

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ result: false })
  }

  // init admin app
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
  } catch (err) {
    if (process.env.NODE_ENV === 'development') console.log(err)
    return res.status(400).json({ result: false })
  }

  // create owner user
  try {
    const owner = await admin.auth().createUser({
      email: process.env.OWNER_EMAIL,
      password: process.env.OWNER_PWD
    })
    await setSoyoUserClaim(owner.uid, {
      owner: true,
      manager: true,
      writer: true
    })
  } catch (err: any) {
    // すでに作成されている場合を除き 400
    if (err.code !== 'auth/email-already-exists') {
      if (process.env.NODE_ENV === 'development') console.log(err)
      return res.status(400).json({ result: false })
    }
  }

  return res.status(204).end()
}

export default handler
