import { useCallback, useEffect, useState } from 'react'

type Data = {
  userId: string
  id: string
  title: string
  completed: string
}

export const Title = (props: { data: string[] }) => {
  const [d, setData] = useState<Data[] | null>()
  const fetchData = useCallback(async () => {
    const res = await fetch('/api/mock/data')
    const data = await res.json()
    setData(data)
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <p>{d ? d[Number(props.data[0])].title : 'NO-DATA'}</p>
      <span>{props.data[Number(props.data[0])]}</span>
    </>
  )
}

export const Elm = () => <>Title</>

export default Title
