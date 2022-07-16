import { TayoriError } from "shared/types/error";

export const errorList = {
    same_slug_exist: <TayoriError>{
        code: 'same_slug_exist',
        message: '設定したスラッグは既に使用されています。他のスラッグを設定してください。',
        type: 'failed'
    },
    title_is_empty: <TayoriError>{
        code: 'title_is_empty',
        message: '投稿のタイトルを1文字以上設定してください。',
        type: 'failed'
    },
    slug_is_empty: <TayoriError>{
        code: 'slug_is_empty',
        message: 'スラッグを1文字以上設定してください。',
        type: 'failed'
    },
    update_failed: <TayoriError>{
        code: 'update_failed',
        message: '投稿の保存中に予期せぬエラーが発生しました。時間を置いて再度お試しください。',
        type: 'failed'
    }
}

export default errorList