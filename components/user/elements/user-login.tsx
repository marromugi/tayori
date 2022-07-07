import { ColorBox } from 'shared/elements/box/color'
import { FlexBox } from 'shared/elements/box/flex'
import { Input } from 'shared/elements/field/input'
import { Button } from 'shared/elements/button/common'
import { MainH, Sentence } from 'shared/elements/text/common'
import { useTheme } from 'shared/hooks/useTheme'
import { soyoLogin } from 'auth/utils/login'
import { useRef } from 'react'
import { UserCredential } from 'firebase/auth'

export const UserLogin = (props: {
  onSuccess: (cred: UserCredential) => void
  onError: (err: any) => void
}) => {
  const loginRef = useRef<{ email: string; password: string }>({
    email: '',
    password: ''
  })
  const { theme } = useTheme()
  return (
    <ColorBox
      radius={'20px'}
      background={theme.color.gray06}
      padding={'2em 4em'}
    >
      <FlexBox way={'column'} gap={'2em'} alignItems={'center'}>
        <MainH>Soyo Login</MainH>
        <Sentence>おかえりなさい</Sentence>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            soyoLogin(
              loginRef.current.email,
              loginRef.current.password,
              (cred) => props.onSuccess(cred),
              (err) => props.onError(err)
            )
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
              padding={'1em'}
              background={theme.color.base}
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
              padding={'1em'}
              background={theme.color.base}
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
            <Button width={'100%'} padding={'1.2em 0'}>
              ログイン
            </Button>
          </FlexBox>
        </form>
      </FlexBox>
    </ColorBox>
  )
}
