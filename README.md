# 🇯🇵 Japanese Coach Chatbot

優しい女性コーチによる日本語学習のリードマグネットチャットボット

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定してください：

```env
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_FREE_SESSION_URL=https://your-domain.com/free-session
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

#### アクセス方法

**デスクトップ/同じデバイス:**
- [http://localhost:3000](http://localhost:3000) を開いてください

**iPhone/他のデバイスからアクセス:**
1. MacとiPhoneが同じWi-Fiネットワークに接続されていることを確認
2. MacのIPアドレスを確認:
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```
   例: `192.168.1.100` の場合
3. iPhoneのSafariで以下にアクセス:
   ```
   http://[MacのIPアドレス]:3000
   ```
   例: `http://192.168.1.100:3000`

**注意:** 開発サーバーは `-H 0.0.0.0` で起動するため、すべてのネットワークインターフェースでアクセス可能です。

## プロジェクト構造

```
.
├── app/
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts      # OpenAI APIルート
│   │   └── booking/
│   │       └── route.ts      # 予約APIルート
│   ├── free-session/
│   │   ├── page.tsx          # フリーセッションLP
│   │   └── booking/
│   │       └── page.tsx      # 予約フォームページ
│   ├── globals.css           # グローバルスタイル
│   ├── layout.tsx            # ルートレイアウト
│   └── page.tsx              # メインページ（チャット）
├── components/
│   ├── ChatMessage.tsx       # メッセージ表示コンポーネント
│   └── ChatInput.tsx         # 入力フォームコンポーネント
├── lib/
│   └── api.ts                # APIユーティリティ
├── public/
│   └── avatar/
│       └── IMG_8820.jpg      # コーチのアバター画像
└── REQUIREMENTS.md           # 要件定義書
```

## 機能

- ✅ 優しい女性コーチとの会話体験
- ✅ GPT-4o-miniによる自然な会話
- ✅ 初回メッセージの自動表示
- ✅ 円形アバターの表示
- ✅ リードマグネット導線（Free Session誘導）
- ✅ レスポンシブデザイン（スマホ対応）
- ✅ PWA対応（ホーム画面に追加可能）
- ✅ フリーセッションLP（`/free-session`）
- ✅ 予約フォームページ（`/free-session/booking`）

## 技術スタック

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- OpenAI API (GPT-4o-mini)

## PWA設定

### アイコン画像の準備

PWAとして動作させるには、以下のアイコン画像が必要です：

1. `/public/icon-192x192.png` (192x192ピクセル)
2. `/public/icon-512x512.png` (512x512ピクセル)

#### アイコン生成方法

`sharp`パッケージを使用して自動生成できます：

```bash
npm install sharp
node scripts/generate-icons.js
```

または、手動で`IMG_8820.jpg`から正方形のアイコン画像を作成してください。

### PWAとしてインストール

1. **iOS (Safari)**:
   - 共有ボタン → 「ホーム画面に追加」

2. **Android (Chrome)**:
   - メニュー → 「ホーム画面に追加」またはインストールプロンプトに従う

3. **デスクトップ (Chrome/Edge)**:
   - アドレスバーのインストールアイコンをクリック

## レスポンシブ対応

- スマートフォン、タブレット、デスクトップに対応
- Safe Area Insets対応（ノッチ付きデバイス対応）
- タッチ操作に最適化

## ページ構成

### メインページ (`/`)
チャットボットのメインページ。優しい女性コーチとの会話体験。

### フリーセッションLP (`/free-session`)
フリーセッションの紹介ページ。利点や特徴を説明し、予約ページへ誘導。

### 予約フォーム (`/free-session/booking`)
予約情報を入力するフォームページ。名前、メール、希望日時などを入力。

## 予約フォームのカスタマイズ

`/app/api/booking/route.ts` で予約処理を実装できます：

- データベースへの保存
- 確認メールの送信
- カレンダー連携
- 通知の送信

現在はコンソールにログを出力するだけです。実際の予約システムに接続してください。

## ライセンス

Private

