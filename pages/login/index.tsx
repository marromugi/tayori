import { useUser } from 'auth/hooks/useUser'
import { UserLogin } from 'components/user/elements/user-login'
import { useRouter } from 'next/router'
import { FlexBox } from 'shared/elements/box/flex'
import { FramerBox } from 'shared/elements/box/framer'

export const page = () => {
  const router = useRouter()
  const user = useUser()

  if (user) return <></>

  return (
    <FramerBox>
      <FlexBox
        way={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        width={'100%'}
        height={'100%'}
      >
        <UserLogin
          onSuccess={(cred) => {
            if (cred) router.push('/post')
          }}
          onError={(err) => {
            if (process.env.NODE_ENV === 'development') console.log(err)
          }}
        />
      </FlexBox>
    </FramerBox>
  )
}

export default page
