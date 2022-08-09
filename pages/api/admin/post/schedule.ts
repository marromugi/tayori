import { NextApiRequest, NextApiResponse } from 'next'
import { WebClient } from '@slack/web-api'
import schedule from 'node-schedule'

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(400).json({
      message: 'invalid method'
    })
  }

  const body = req.body
  const release = body.release ? new Date(body.release) : null
  const id = body.id ?? null
  const title = body.title ?? null

  if (!release || !id || !title) {
    return res.status(400).json({
      message:
        'Post body is missing. Please set release date and post ID in your request body'
    })
  }

  // if schedule is already set, cancel it
  if (schedule.scheduledJobs[title]) {
    schedule.scheduledJobs[title].cancel()
  }

  schedule.scheduleJob(title, release, async () => {
    console.log('SCHEDULED JOB IN RUNNING')
    if (process.env.SLACK_TOKEN) {
      const token = process.env.SLACK_TOKEN
      const channel = '#90_app'
      const text = `*お知らせ： 投稿【 ${title} 】が公開されました✨*`
      const client = new WebClient(token)
      const response = await client.chat.postMessage({ channel, text })

      console.log(response.ok)
    }
  })

  return res.status(200).json({
    message: 'Job was scheduled successfully'
  })
}

export default handler
