# Tayori
Tayori はマークダウンベースの記事を管理するCMSです。

## Command
`npm run dev` >> 起動（開発環境）<br>
`npm run build` >> ビルド


## How to start
Tayoriはバックエンドを[Firebase](https://firebase.google.com/?hl=ja)に丸投げしています。そのため、環境変数へ必要な`Firebase`の認証情報を与えてデプロイをすれば問題なく動きます。<br>
ここでは、その必要な変数を取得する手順を記しています。

### 1.Firebase プロジェクトの作成
[「Firebase を JavaScript プロジェクトに追加する」](https://firebase.google.com/docs/web/setup?hl=ja)というページの`ステップ 1: Firebase プロジェクトを作成してアプリを登録する`を参考にプロジェクト・Webアプリを作成します。<br>
Webアプリを作成すると、以下のようなコードが表示されます。コード内の`firebaseConfig`の値は環境変数として使用するため、メモしてください。
```js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// これをメモする
const firebaseConfig = {
  apiKey: "*******************",
  authDomain: "***********.firebaseapp.com",
  projectId: "*************",
  storageBucket: "********.appspot.com",
  messagingSenderId: "**********",
  appId: "*:************",
  measurementId: "*********"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
```


### 2. Authentication の開始
`Tayori`にて`パスワード認証`を採用しています。
[「JavaScript でパスワード ベースのアカウントを使用して Firebase 認証を行う」](https://firebase.google.com/docs/auth/web/password-auth?hl=ja)の **始める前に** の手順を実施してパスワード認証を有効化します。<br>

### 3.Firestore の開始
[「Firestoreの開始方法」](https://firebase.google.com/docs/firestore/quickstart?authuser=0)を参考にデータベースを作成します。作成時は、`本番環境モード`・`テストモード`どちらでも問題ないです。<br>
作成ができたら、`Firestore`の**ルール**を修正します。修正内容は以下の通りです。
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read,write: if request.auth.token.writer;
      allow read,write: if request.auth.token.manager;
      allow read,write: if request.auth.token.owner;
    }
  }
}
```

### 4.Storage のルール修正
`Storage`は元々作成されているため、新規作成は不要です。 `Storage`セクションの `Rules`タブにアクセスし、**ルール**を修正します。修正内容は以下の通りです。
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow write: if request.auth != null;
      allow read: if true;
    }
  }
}
```

### 5. Firebase Admin SDK の初期化
[「SDKの初期化」](https://firebase.google.com/docs/admin/setup?hl=ja#initialize-sdk)を参考に秘密鍵を生成します。jsonファイルがダウンロードできれば完了です。

### 6. 環境変数の設定
以上の手順で`Firebase`上で必要な準備は完了しました。最後に`Tayori`に環境変数を設定します。
|環境変数名|コピー元|コピー項目名|
|-----|-----|-----|
|NEXT_PUBLIC_FIREBASE_API_KEY|firebaseConfig|apiKey|
|NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN|firebaseConfig|authDomain|
|NEXT_PUBLIC_FIREBASE_PROJECT_ID|firebaseConfig|projectId|
|NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET|firebaseConfig|storageBucket|
|NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID|firebaseConfig|messagingSenderId|
|NEXT_PUBLIC_FIREBASE_APP_ID|firebaseConfig|appId|
|NEXT_PUBLIC_FIREBASE_MESUREMENT_ID|firebaseConfig|measurementId|
|FIREBASE_PROJECT_ID|AdminSDK JSONファイル|project_id|
|FIREBASE_PRIVATE_KEY|AdminSDK JSONファイル|private_key|
|FIREBASE_CLIENT_EMAIL|AdminSDK JSONファイル|client_email|
|OWNER_EMAIL|なし|任意のメールアドレス|
|OWNER_PWD|なし|任意のパスワード|
|SLACK_TOKEN|Slackアプリケーションのトークン|Slackアプリケーションのトークン|

`OWNER_EMAIL`と`OWNER_PWD`は、初回ログインするアカウントのメールアドレスとパスワードになります。<br>
またデプロイ先に`Vercel`を採用する場合、`FIREBASE_PRIVATE_KEY`の入力内容が異なります。開発時は、秘密鍵を`"`で括りますが、Vercelに秘密鍵を登録する際は`"`を除いて登録してください。
|開発時|Vercelデプロイ時|
|----|----|
|"-----BEGIN PRIVATE KEY-----\n...----END PRIVATE KEY-----\n"|-----BEGIN PRIVATE KEY-----\n...----END PRIVATE KEY-----\n|

### 7. 起動
環境変数の設定が終わったので、起動します。<br>
開発環境の場合は、`npm run dev`で起動。<br>

## 投稿の取得方法
`Tayori`で作成した投稿は、`Tayori`で修正する他、APIを叩くことで任意の場所で取得することができます。<br>
|エンドポイント|例|詳細|
|-------|-------|------|
|`TAYORI-DOMAIN`/api/post|`https://your-tayori.com/api/post`|公開している全投稿を取得します|
|`TAYORI-DOMAIN`/api/post/[slug]|`https://your-tayori.com/api/post/my-first-blog`|指定した`スラッグ`を持つ投稿を１件取得します。
