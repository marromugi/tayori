import { NextApiRequest, NextApiResponse } from 'next'
import { WebClient } from '@slack/web-api'
import schedule from 'node-schedule'
import admin from 'firebase-admin'
import { TayoriSettings } from 'components/settings/types/settings'
import { Post } from 'post/types/post'
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
const reqOnEndpoints = async (postId: string) => {
  console.log('endpoint request runnning...')
  const db = getDB()
  const settingDoc = await db.collection('settings').doc('main').get()
  const postDoc = await db.collection('post').doc(postId).get()

  // schedule doc not exist
  if (!settingDoc.exists || !postDoc.exists) {
    return false
  }

  const settings = settingDoc.data() as TayoriSettings
  const post = postDoc.data() as Post

  if (!settings || !post) {
    return false
  }

  const categoryDoc = await db
    .collection('category')
    .doc(post.category ?? '')
    .get()

  // カテゴリーが設定されていない場合は、エンドポイントがないためここで終了
  if (!categoryDoc.exists) {
    return true
  }

  // カテゴリーの Doc があるが、データが取れない場合は不正とする
  const category = categoryDoc.data() as Category
  if (!category) {
    return false
  }

  const scheduleEndpoints = settings.schedules.filter(
    (s) => s.categoryId === post.category
  )

  console.log(scheduleEndpoints)

  // エンドポイントがないためここで終了
  if (scheduleEndpoints.length === 0) {
    return true
  }

  const endpoints = scheduleEndpoints[0].endpoints

  endpoints.forEach((e) => {
    const formatted = e
      .replace('{category}', category.name ?? '')
      .replace('{categoryId}', category.id ?? '')
      .replace('{id}', post.id ?? '')
      .replace('{title}', post.title ?? '')
      .replace('{slug}', post.slug ?? '')
    if (isURL(formatted)) {
      fetch(formatted, { method: 'GET' })
    }
  })

  console.log('endpoint request done')

  return true
}

// スケジュールのログを更新する
const updateScheduleDoc = async (
  data: { postId: string; release: Date },
  state: 'complete' | 'standby'
) => {
  const db = getDB()

  // update schedule data
  const standbyScheduleDoc = await db
    .collection('schedule')
    .doc('standby')
    .get()

  // schedule doc not exist
  if (!standbyScheduleDoc.exists) {
    return false
  }

  const standbySchedules = standbyScheduleDoc.data()

  // schedule list data not exist
  if (!standbySchedules) {
    return false
  }

  if (state === 'standby') {
    // update schedule data
    await db
      .collection('schedule')
      .doc('standby')
      .update({
        schedules: standbySchedules.schedules
          .filter((s: any) => s.postId !== data.postId)
          .concat([data])
      })
  }

  if (state === 'complete') {
    const completeScheduleDoc = await db
      .collection('schedule')
      .doc('complete')
      .get()
    // schedule doc not exist
    if (!completeScheduleDoc.exists) {
      return false
    }

    const completeSchedules = completeScheduleDoc.data()

    // schedule list data not exist
    if (!completeSchedules) {
      return false
    }

    // remove released object from standby
    await db
      .collection('schedule')
      .doc('standby')
      .update({
        schedules: standbySchedules.schedules.filter(
          (s: any) => s.postId !== data.postId
        )
      })

    // store released object to complete
    await db
      .collection('schedule')
      .doc('complete')
      .update({
        schedules: completeSchedules.schedules.concat([data])
      })
  }

  return true
}

// 投稿をリリースする（各エンドポイントへリクエスト・Slackへの通知）
const releasePost = async (title: string, postId: string, release: Date) => {
  // request to endpoints
  const reqResult = await reqOnEndpoints(postId)

  // send message on Slack
  if (process.env.SLACK_TOKEN) {
    const token = process.env.SLACK_TOKEN
    const channel = '#90_app'
    const text = reqResult
      ? `*お知らせ： 投稿【 ${title} 】が公開されました✨*`
      : `*お知らせ： 投稿【 ${title} 】の公開に失敗しました😵*`
    const client = new WebClient(token)
    const response = await client.chat.postMessage({ channel, text })

    console.log(`isSlackMessageSendComplete: ${response.ok}`)
  }

  // change schedule data from standby to complete
  if (reqResult) {
    updateScheduleDoc({ postId, release }, 'complete')
  }
}

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(400).json({
      message: 'invalid method'
    })
  }

  const body = req.body
  const release = body.release ? new Date(body.release) : null
  const postId = body.id ?? null
  const title = body.title ?? null

  if (!release || !postId || !title) {
    return res.status(400).json({
      message:
        'Post body is missing. Please set release date and post ID in your request body'
    })
  }

  // if schedule is already set, cancel it
  if (schedule.scheduledJobs[postId]) {
    schedule.scheduledJobs[postId].cancel()
  }

  // set schedule data to standby-list
  updateScheduleDoc({ postId, release }, 'standby')

  // 削除や再リリースの延期など、投稿を非表示にするために、一回再生成する
  reqOnEndpoints(postId)

  const isAlreadyReleased = release <= new Date()

  if (isAlreadyReleased) {
    await releasePost(title, postId, release)
  } else {
    // set cron job
    console.log('job scheduled')
    schedule.scheduleJob(postId, release, async () => {
      console.log('job runnning')
      await releasePost(title, postId, release)
    })
  }

  return res.status(200).json({
    message: 'Job was scheduled successfully'
  })
}

export default handler
