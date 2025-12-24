# 🇯🇵 Japanese Coach Chatbot - 要件定義書

## 1. プロダクト概要

### 1.1 目的
- **主目的**: アメリカ人（英語話者）に日本語学習の第一歩を踏ませる
- **感情目標**: 「この人となら学べそう」と感じさせる
- **最終目標**: Free Session予約ページへ自然に誘導する（リード獲得）

### 1.2 ポジション
- ❌ 教育アプリではない
- ❌ 本格教材ではない
- ✅ **超優しい女性コーチ × 会話体験 × リードマグネット**

---

## 2. 想定ユーザー（ペルソナ）

### 2.1 基本情報
- **国籍**: アメリカ
- **日本語レベル**: 完全初心者〜少し興味あり
- **動機**:
  - 日本文化が好き
  - アニメ / 旅行 / 日本人と話したい

### 2.2 特徴
- 勉強は苦手
- でも「優しく教えてくれる人」は好き
- 長い説明は読まない

---

## 3. キャラクター設定

### 3.1 基本設定
- **性別**: 女性
- **性格**:
  - とにかく優しい
  - 否定ゼロ
  - 褒める
  - ゆっくり・安心感
- **立ち位置**: コーチ（伴走者）⭕️

### 3.2 話し方（英語）
- シンプル
- ゆっくり
- 絶対にプレッシャーをかけない

### 3.3 NG事項
- ❌ Grammar terms（文法用語）
- ❌ 難しい説明
- ❌ 厳しい指摘

---

## 4. UI/UX仕様

### 4.1 アイコン仕様
- **画像ファイル**: `IMG_8820.jpg`
- **画像パス**: `/public/avatar/IMG_8820.jpg`（または適切なパス）
- **表示方法**: 
  - トーク背景の上に丸く表示
  - 円形（circle）のアバターとして表示
- **実装例**:
```html
<!-- 円形アバターとして表示 -->
<img 
  src="/avatar/IMG_8820.jpg" 
  alt="Japanese Coach" 
  className="rounded-full"
  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
/>
```

または

```css
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
```

---

## 5. 会話フロー

### 5.1 初回メッセージ（Bot → User）
**固定文（最初に必ず表示）**

```
Hi 😊  
Let's study Japanese together!

Don't worry at all.
I'll help you step by step, very gently.

How does that sound?
```

### 5.2 ユーザーの返答
- **形式**: 自由入力
- **例**:
  - "Sounds good!"
  - "I want to learn Japanese"
  - "I'm nervous but okay"
  - "Yes"
- **対応**: どんな返答でも肯定する

### 5.3 Botの基本応答ロジック

#### 共通ルール
- 100%肯定
- ミスを指摘しない
- 「You're doing great」を多用

#### 応答テンプレ①（通常）
```
That's totally okay 😊  
You're doing great already.

Let's start very small.
Do you know any Japanese words?
```

---

## 6. 学習ミニ体験（Lead Magnet用）

### 6.1 教える内容（超軽量）
- **Hello** → こんにちは (Konnichiwa)
- **Thank you** → ありがとう (Arigatou)

### 6.2 表示例
```
In Japanese:

Hello → こんにちは (Konnichiwa)

You don't need to remember it perfectly.
Just enjoy the sound 😊
```

---

## 7. リードマグネット導線

### 7.1 誘導タイミング
以下のどれかに該当したら表示：
- 「楽しい」
- 「もっと学びたい」
- 「日本語好き」
- 2〜3ターン会話後

### 7.2 Free Session 誘導メッセージ（固定）
```
You're doing amazing 🌸  

If you want to learn Japanese a little more,
I offer a **free 1-on-1 session**.

It's very relaxed.
No pressure at all.

You can book here:
👉 [Book a Free Session]
```

### 7.3 リンク仕様
- **遷移先**: 別ページ
- **例**: `https://your-domain.com/free-session`
- **実装**: 環境変数化推奨
  - `NEXT_PUBLIC_FREE_SESSION_URL=`

---

## 8. 技術要件

### 8.1 技術スタック（推奨）
- Next.js / React
- Chat UI（シンプル）
- OpenAI API
  - **モデル**: GPT-4o-mini
  - System prompt固定

### 8.2 System Prompt（最重要）
```
You are a very kind female Japanese language coach.
You NEVER criticize.
You ALWAYS encourage the user.
You keep English simple.
You make the user feel safe and confident.

Your goal is NOT to teach a lot,
but to make the user want to learn more Japanese
and guide them to a free session booking link.
```

### 8.3 実装時の注意点
- **LLMモデル**: OpenAI GPT-4o-mini を使用
- System Promptは固定で使用
- 環境変数で以下を管理:
  - OpenAI API Key: `OPENAI_API_KEY`
  - Free Session URL: `NEXT_PUBLIC_FREE_SESSION_URL`
- チャットUIはシンプルに保つ
- **アバター画像**: `IMG_8820.jpg` をトーク背景の上に丸く表示
  - 円形（`border-radius: 50%`）で表示
  - Botメッセージの横または上に配置

---

## 9. 成功指標（KPI）

| 指標 | 目標 |
|------|------|
| 初回返信率 | 80%以上 |
| 2ターン継続率 | 60%以上 |
| Free Session クリック率 | 20〜30% |
| 離脱理由 | 「難しそう」を感じさせない |

---

## 10. このBotがやらないこと（重要）

- ❌ 文法説明
- ❌ 正誤判定
- ❌ 教科書的説明
- ❌ 長文

---

## 11. 実装フェーズと進捗管理

### 📊 全体進捗状況
- **フェーズ0**: ✅ 完了
- **フェーズ1**: ✅ 完了
- **フェーズ2**: ✅ 完了
- **フェーズ3**: ✅ 完了
- **フェーズ4**: ✅ 完了
- **フェーズ5**: 🟡 進行中

**凡例**: ⬜ 未着手 | 🟡 進行中 | ✅ 完了

---

### フェーズ0: プロジェクトセットアップ
**ステータス**: ✅ 完了  
**目標**: 開発環境の構築と基本設定

#### タスクリスト
- [x] Next.jsプロジェクトの作成
- [x] 必要なパッケージのインストール
  - [x] OpenAI SDK
  - [x] UIライブラリ（必要に応じて）
- [x] 環境変数の設定
  - [x] `.env.local.example`ファイルの作成
  - [x] `OPENAI_API_KEY`の設定（ユーザーが設定）
  - [x] `NEXT_PUBLIC_FREE_SESSION_URL`の設定（ユーザーが設定）
- [x] プロジェクト構造の作成
  - [x] `/public/avatar/`フォルダの作成
  - [x] `IMG_8820.jpg`の配置
- [ ] Gitリポジトリの初期化（必要に応じて）

---

### フェーズ1: 基本的なチャットUI実装
**ステータス**: ✅ 完了  
**目標**: シンプルで優しいデザインのチャットUIを作成

#### タスクリスト
- [x] チャット画面の基本レイアウト作成
- [x] メッセージ表示コンポーネント
  - [x] Botメッセージの表示
  - [x] ユーザーメッセージの表示
- [x] 入力フォームの実装
  - [x] テキスト入力フィールド
  - [x] 送信ボタン
- [x] アバター画像の表示
  - [x] `IMG_8820.jpg`の読み込み
  - [x] トーク背景の上に丸く表示（円形アバター）
  - [x] Botメッセージにアバター表示
- [x] スタイリング
  - [x] 優しいトーンのデザイン
  - [x] レスポンシブ対応
  - [ ] アニメーション（必要に応じて）

---

### フェーズ2: OpenAI API連携
**ステータス**: ✅ 完了  
**目標**: GPT-4o-miniとの通信を確立

#### タスクリスト
- [x] APIルートの作成（`/api/chat`など）
- [x] OpenAI APIクライアントの実装
  - [x] GPT-4o-miniモデルの指定
  - [x] System Promptの設定
- [x] フロントエンドからのAPI呼び出し
  - [x] ユーザー入力の送信
  - [x] レスポンスの受信
- [x] エラーハンドリング
  - [x] APIエラーの処理
  - [x] ユーザーへのエラーメッセージ表示
- [x] ローディング状態の表示

---

### フェーズ3: 会話フロー実装
**ステータス**: ✅ 完了  
**目標**: 初回メッセージと基本的な会話フローを実装

#### タスクリスト
- [x] 初回メッセージの実装
  - [x] ページ読み込み時に自動表示
  - [x] 固定メッセージの設定
- [x] 会話履歴の管理
  - [x] メッセージ配列の状態管理
  - [ ] 会話の永続化（必要に応じて）
- [x] Bot応答ロジック
  - [x] System Promptの最適化
  - [x] 応答テンプレートの実装
- [x] 学習ミニ体験の実装
  - [x] 「Hello」「Thank you」の教示（AIが自然に教える）
  - [x] 優しい説明文の表示
- [ ] 会話フローのテスト
  - [ ] 様々なユーザー入力への対応確認

---

### フェーズ4: リードマグネット導線実装
**ステータス**: ✅ 完了  
**目標**: Free Session誘導機能を実装

#### タスクリスト
- [x] 誘導タイミングの判定ロジック
  - [x] キーワード検出（「楽しい」「もっと学びたい」など）
  - [x] 会話ターン数のカウント
- [x] Free Session誘導メッセージの実装
  - [x] 固定メッセージの設定
  - [x] リンクボタンの作成（Markdownリンク対応）
- [x] リンク機能の実装
  - [x] 環境変数からのURL取得
  - [x] 外部リンクへの遷移
- [x] 誘導タイミングの最適化
  - [x] 自然なタイミングでの表示
  - [x] 重複表示の防止

---

### フェーズ5: 最終調整・テスト
**ステータス**: 🟡 進行中  
**目標**: 品質向上と動作確認

#### タスクリスト
- [ ] 全体動作のテスト
  - [ ] 会話フローの確認
  - [ ] エッジケースのテスト
- [ ] UI/UXの最終調整
  - [ ] デザインの微調整
  - [ ] レスポンシブデザインの確認
- [ ] パフォーマンス最適化
  - [ ] 読み込み速度の確認
  - [ ] API呼び出しの最適化
- [x] セキュリティチェック
  - [x] APIキーの保護確認（サーバーサイドで処理）
  - [x] 入力値の検証
- [x] ドキュメント整備
  - [x] READMEの作成
  - [ ] デプロイ手順の記載

---

## 12. 補足事項

### 12.1 トーンガイドライン
- 常に優しく、励ましの言葉を使う
- プレッシャーをかけない
- 小さな成功を褒める
- 否定や批判は一切しない

### 12.2 会話の流れ例
1. 初回メッセージ表示
2. ユーザー返信（どんな内容でも肯定）
3. 軽い日本語体験（Hello, Thank youなど）
4. 励ましと褒め
5. 2〜3ターン後、Free Session誘導

---

## 13. 進捗更新ガイドライン

### 進捗状況の更新方法
各フェーズの**ステータス**を以下のように更新してください：

- **⬜ 未着手**: まだ開始していない
- **🟡 進行中**: 作業中
- **✅ 完了**: 完了

### タスクのチェック方法
各タスクのチェックボックス `[ ]` を完了時に `[x]` に変更してください。

### 進捗更新のタイミング
- フェーズを開始したら「進行中」に変更
- フェーズ内のタスクを完了したらチェックボックスを更新
- フェーズ内の全タスクが完了したら「完了」に変更
- 全体進捗状況も併せて更新

