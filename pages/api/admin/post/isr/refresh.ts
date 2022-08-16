import { NextApiRequest, NextApiResponse } from 'next'
import { WebClient } from '@slack/web-api'
import admin from 'firebase-admin'
import { TayoriSettings } from 'components/settings/types/settings'
import { Category } from 'category/types/category'
import { isURL } from 'shared/utils/string'

const getDB = () => {
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
  return db
}

// 各エンドポイントへGETリクエストを送る
const reqOnEndpoints = async (
  postId: string,
  categoryId: string,
  title: string,
  slug: string
) => {
  console.log('endpoint request runnning...')
  const db = getDB()
  const settingDoc = await db.collection('settings').doc('main').get()
  const categoryDoc = await db
    .collection('category')
    .doc(categoryId ?? '')
    .get()

  // schedule doc not exist
  if (!settingDoc.exists || !categoryDoc.exists) {
    return false
  }

  const settings = settingDoc.data() as TayoriSettings
  const category = categoryDoc.data() as Category

  if (!settings || !category) {
    return false
  }

  const scheduleEndpoints = settings.schedules.filter(
    (s) => s.categoryId === categoryId
  )

  console.log(scheduleEndpoints)

  // エンドポイントがないためここで終了
  if (scheduleEndpoints.length === 0) {
    return true
  }

  const endpoints = scheduleEndpoints[0].endpoints
  const fetchers = Promise.all(
    endpoints.map(async (e) => {
      const formatted = e
        .replace('{category}', category.name ?? '')
        .replace('{categoryId}', categoryId)
        .replace('{id}', postId)
        .replace('{title}', title)
        .replace('{slug}', slug)
      if (isURL(formatted)) {
        const res = await fetch(formatted, { method: 'GET' })
        return await res.json()
      }
    })
  )

  const results = await fetchers
  console.log(results)

  return true
}

// 投稿をリリースする（各エンドポイントへリクエスト・Slackへの通知）
const refreshPost = async (
  title: string,
  postId: string,
  categoryId: string,
  slug: string
) => {
  // request to endpoints
  const reqResult = await reqOnEndpoints(postId, categoryId, title, slug)

  // send message on Slack
  if (process.env.SLACK_TOKEN) {
    const token = process.env.SLACK_TOKEN
    const channel = '#90_app'
    const text = reqResult
      ? `*お知らせ： 投稿【 ${title} 】が削除されました✨*`
      : `*お知らせ： 投稿【 ${title} 】の削除に失敗しました😵*`
    const client = new WebClient(token)
    const response = await client.chat.postMessage({ channel, text })

    console.log(`isSlackMessageSendComplete: ${response.ok}`)
  }
}

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(400).json({
      message: 'invalid method'
    })
  }

  const body = req.body
  const postId = body.id ?? null
  const slug = body.slug
  const title = body.title ?? null
  const categoryId = body.category ?? null

  if (!postId || !categoryId || !title || !slug) {
    return res.status(400).json({
      message:
        'Post body is missing. Please set release date and post ID in your request body'
    })
  }

  await refreshPost(title, postId, categoryId, slug)

  return res.status(200).json({
    message: 'Job was scheduled successfully'
  })
}

export default handler
