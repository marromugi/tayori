import { TayoriTemplate } from 'components/tayori/elements/tayori-template'
import type { NextPage } from 'next'
import { SettingHeader } from 'components/settings/elements/setting-header'
import { FlexBox } from 'shared/elements/box/flex'
import { useFireStore } from 'firestore/hooks/useFirestore'
import { FramerBox } from 'shared/elements/box/framer'
import { SettingTab } from 'components/settings/elements/setting-tab'
import { Box } from 'shared/elements/box/common'
import { SettingBox } from 'components/settings/elements/setting-box'
import { SettingFieldInput } from 'components/settings/elements/setting-field-input'
import { SettingFieldCategory } from 'components/settings/elements/setting-field-category'
import { SettingFieldPostSchedule } from 'components/settings/elements/setting-field-post-schedule'
import { Category } from 'components/category/types/category'
import { TayoriSettings } from 'components/settings/types/settings'

const Home: NextPage = () => {
  const { data: settings, mutate: settingMutate } =
    useFireStore<TayoriSettings>('settings')
  const { data: categories, mutate: categoryMutate } =
    useFireStore<Category>('category')

  if (settings === null) {
    return <></>
  }

  return (
    <FramerBox>
      <TayoriTemplate>
        <FlexBox way={'column'} width={'100%'} height={'100%'}>
          <SettingHeader />
          <SettingTab />
          <Box
            width={'100%'}
            height={'100%'}
            grow={'9999'}
            position={'relative'}
            overflowY={'scroll'}
          >
            {false && (
              <SettingBox id={'general'} isDefault={false}>
                <FlexBox way={'column'} gap={'3em'}>
                  <SettingFieldInput
                    emoji={'📩'}
                    title={'通知用メールアドレス'}
                    description={
                      '記事を公開・更新・削除した際に送信するメールアドレスを登録します。\nメールアドレスを登録しない場合、オーナーのメールアドレスへ公開通知をします。'
                    }
                    defaultValue={''}
                    placeholder={'xxx@example.com'}
                    onChange={(s) => {}}
                  />
                </FlexBox>
              </SettingBox>
            )}
            <SettingBox id={'post'} isDefault={true}>
              <FlexBox way={'column'} gap={'2em'}>
                <SettingFieldCategory
                  emoji={'🗂'}
                  title={'カテゴリー'}
                  description={
                    '投稿に設定するカテゴリーを作成します。\n既存のカテゴリーを編集すると、そのカテゴリーに属している投稿のカテゴリー全てが編集されます。'
                  }
                  categories={categories ?? []}
                  mutate={categoryMutate}
                />
                <SettingFieldPostSchedule
                  emoji={'📅'}
                  title={'エンドポイント（スケジュール）'}
                  description={
                    '投稿の公開、もしくは更新・削除時にリクエストを送るエンドポイントを設定します。\n'
                  }
                  categories={categories ?? []}
                  settings={settings ? settings[0] : null}
                  mutate={settingMutate}
                />
              </FlexBox>
            </SettingBox>
          </Box>
        </FlexBox>
      </TayoriTemplate>
    </FramerBox>
  )
}

export default Home
