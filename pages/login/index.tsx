import { useUser } from 'auth/hooks/useUser'
import { UserLogin } from 'components/user/elements/user-login'
import { useRouter } from 'next/router'
import { FlexBox } from 'shared/elements/box/flex'
import { FramerBox } from 'shared/elements/box/framer'
import { useNotification } from 'notification/hooks/useNotification'
import { errorList } from 'auth/utils/error'

export const page = () => {
  const router = useRouter()
  const user = useUser()
  const notifier = useNotification()

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
            if (process.env.NODE_ENV === 'development') {
              console.log(err)
              console.log(err.status)
              console.log(err.code)
            }
            switch (err.code) {
              case 'auth/invalid-email':
                notifier.show(errorList.invalid_email_or_password)
                break
              default:
            }
          }}
        />
      </FlexBox>
    </FramerBox>
  )
}

export default page
