import { ColorBox } from 'shared/elements/box/color'
import { FlexBox } from 'shared/elements/box/flex'
import { Input } from 'shared/elements/field/input'
import { Button } from 'shared/elements/button/common'
import { MainH } from 'shared/elements/text/common'
import { useTheme } from 'shared/hooks/useTheme'
import { soyoLogin } from 'auth/utils/login'
import { useRef } from 'react'
import { UserCredential } from 'firebase/auth'
import { moduler } from 'shared/utils/styles'
import { useNotification } from 'notification/hooks/useNotification'
import { errorList } from 'auth/utils/error'
import { isEmail } from 'shared/utils/string'

export const UserLogin = (props: {
  onSuccess: (cred: UserCredential) => void
  onError: (err: any) => void
}) => {
  const loginRef = useRef<{ email: string; password: string }>({
    email: '',
    password: ''
  })
  const { theme } = useTheme()
  const notifier = useNotification()
  return (
    <ColorBox radius={'20px'} background={theme.color.base} padding={'2em 4em'}>
      <FlexBox way={'column'} gap={'2em'} alignItems={'center'}>
        <MainH size={moduler(2)}>Login</MainH>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (
              loginRef.current.email === '' &&
              loginRef.current.password === ''
            ) {
              notifier.show(errorList.empty_email_and_password)
            } else if (loginRef.current.email === '') {
              notifier.show(errorList.empty_email)
            } else if (isEmail(loginRef.current.email)) {
              notifier.show(errorList.not_email)
            } else if (loginRef.current.password === '') {
              notifier.show(errorList.empty_password)
            } else {
              soyoLogin(
                loginRef.current.email,
                loginRef.current.password,
                (cred) => props.onSuccess(cred),
                (err) => props.onError(err)
              )
            }
          }}
        >
          <FlexBox
            way={'column'}
            gap={'1.5em'}
            width={'30vw'}
            minWidth={'200px'}
          >
            <Input
              width={'100%'}
              padding={'1.5em 1em'}
              background={theme.color.gray06}
              align={'left'}
              placeholder={'メールアドレス'}
              border={{
                width: '2px',
                color: theme.color.gray05,
                radius: '10px'
              }}
              onChange={(e) =>
                (loginRef.current = {
                  email: e.currentTarget.value,
                  password: loginRef.current.password
                })
              }
            />
            <Input
              type={'password'}
              width={'100%'}
              padding={'1.5em 1em'}
              background={theme.color.gray06}
              align={'left'}
              placeholder={'パスワード'}
              border={{
                width: '2px',
                color: theme.color.gray05,
                radius: '10px'
              }}
              onChange={(e) =>
                (loginRef.current = {
                  email: loginRef.current.email,
                  password: e.currentTarget.value
                })
              }
            />
            <ColorBox opacity={1} hover={{ opacity: 0.7 }} width={'100%'}>
              <Button width={'100%'} padding={'1.5em 0'}>
                ログイン
              </Button>
            </ColorBox>
          </FlexBox>
        </form>
      </FlexBox>
    </ColorBox>
  )
}
