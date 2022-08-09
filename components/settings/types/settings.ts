export type PostScheduleEndpoint = {
  categoryId: string
  endpoints: string[]
}

export type TayoriSettings = {
  schedules: PostScheduleEndpoint[]
}
