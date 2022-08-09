import { Button } from 'shared/elements/button/common'
import { Header } from 'shared/elements/header/header'

export const SettingHeader = () => {
  return (
      <Header name={'設定'} subName={'SETTINGS'}>
        <Button
          onClick={() => {
            console.log('save settings')
          }}
        >
            保存する
        </Button>
      </Header>
  )
}
