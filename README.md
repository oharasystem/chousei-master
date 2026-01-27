# chousei-master

## 開発環境のセットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. ローカルデータベース (D1) のセットアップ

以下のコマンドを実行して、ローカルD1データベースにスキーマを適用します。

```bash
npx wrangler d1 execute events-db --local --file=./schema.sql
```

### 3. ローカルサーバーの起動

以下のコマンドを実行して、開発サーバーを起動します。

```bash
npm run dev
```