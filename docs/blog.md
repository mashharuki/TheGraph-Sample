# Web3インフラストラクチャー「The Graph」入門：ブロックチェーンデータの新しい検索方法

ブロックチェーンの世界では、データの取得と活用が大きな課題となっています。  
スマートコントラクトからデータを取得するのは複雑で、多くの開発リソースを消費します。この問題を解決するために生まれたのが「The Graph」です。

本記事では、Web3の重要なインフラストラクチャーであるThe Graphについて、初心者にもわかりやすく解説します。

## 1. The Graphとは

### 1.1 基本概念
The Graphは、ブロックチェーンデータのインデックス作成と検索を容易にするための分散型プロトコルです。

簡単に言えば、「ブロックチェーンのGoogle」のような役割を果たします。ブロックチェーン上のデータに効率的にアクセスし、クエリを実行するためのツールを提供しています。

### 1.2 なぜThe Graphが必要なのか
従来、ブロックチェーン上のデータを取得するには：

- スマートコントラクトの関数を直接呼び出す
- イベントログを解析する
- 複数のリクエストを行い、結果を集約する

これらの方法は非効率的で、開発者にとって大きな負担となっていました。The Graphは、GraphQLを使用してこれらの問題を解決し、データ取得を簡素化します。

### 1.3 The Graphの主要コンポーネント

The Graphのエコシステムは以下の主要なコンポーネントで構成されています：

- **サブグラフ（Subgraph）: 特定のデータソースのインデックス作成方法を定義するマニフェスト**
- **インデクサー（Indexer）: サブグラフを実行し、クエリに回答するノードオペレーター**
- **キュレーター（Curator）: 優良なサブグラフを選別する参加者**
- **デリゲーター（Delegator）: インデクサーにGRTトークンを委任する参加者**
- **GRTトークン: ネットワークの通貨として機能する**

### 1.4 The Graphのアーキテクチャ
The Graphのアーキテクチャは以下のような流れで機能します：

- ブロックチェーン上でイベントが発生
- インデクサーがそのイベントを監視し、サブグラフに基づいてデータをインデックス化
- dApp開発者がGraphQLを使ってクエリを実行
- インデクサーがクエリに対する回答を提供し、GRTトークンで報酬を受け取る

## 2. The Graphのメリット・デメリット

### 2.1 メリット

#### 2.1.1 開発効率の向上
The Graphを使用することで、ブロックチェーンデータの取得と処理に関する複雑なコードを書く必要がなくなります。GraphQLを使って必要なデータだけを簡単に取得できるため、開発時間を大幅に短縮できます。

```gql
{
  users(first: 5) {
    id
    address
    tokensOwned {
      id
      symbol
    }
  }
}
```

#### 2.1.2 コスト削減
従来の方法では、ブロックチェーンからデータを取得するために多くのリクエストが必要でした。The Graphを使えば、単一のクエリで必要なデータをすべて取得できるため、インフラコストを削減できます。

#### 2.1.3 分散化
The Graphは完全に分散化されたプロトコルであり、中央集権的な障害点がありません。これにより、Web3の理念に沿った堅牢なインフラストラクチャーを構築できます。

#### 2.1.4 柔軟なデータアクセス
GraphQLの柔軟性により、必要なデータのみを取得でき、不要なデータのフェッチを避けることができます。これは、特に帯域幅が制限されているモバイルアプリケーションにとって重要です。

### 2.2 デメリット

#### 2.2.1 学習曲線
サブグラフの作成とデプロイには、GraphQL、AssemblyScript、YAMLなど複数の技術に関する知識が必要です。初心者にとっては、これらの技術を習得するのに時間がかかる場合があります。

#### 2.2.2 インデクサーの信頼性
分散型ネットワークであるため、すべてのインデクサーが同じレベルのサービスを提供するわけではありません。インデクサーの選択によっては、応答時間やデータの正確性に差が生じる可能性があります。

#### 2.2.3 完全な分散化まで道のり
The Graphは分散化を目指していますが、現在は移行期間中であり、完全な分散化には至っていません。一部のサブグラフはまだホステッドサービスに依存しています。

#### 2.2.4 コスト考慮
分散型ネットワークの使用にはGRTトークンによるコストが発生します。高頻度のクエリを実行するdAppの場合、このコストを考慮する必要があります。

## 3. The Graphの使い方

### 3.1 サブグラフの作成
サブグラフの作成は以下の手順で行います：

#### Graph CLIのインストール

```bash
npm install -g @graphprotocol/graph-cli
```

#### サブグラフの初期化

```bash
graph init --product hosted-service --from-example
```

#### サブグラフスキーマの定義（schema.graphql）

```graphql
type Token @entity {
  id: ID!
  symbol: String!
  name: String!
  decimals: Int!
}

type User @entity {
  id: ID!
  address: String!
  tokensOwned: [Token!]!
}
```

#### マッピングの定義（mappings.ts）

```typescript
import { Transfer } from '../generated/ERC20/ERC20'
import { Token, User } from '../generated/schema'

export function handleTransfer(event: Transfer): void {
  let token = Token.load(event.address.toHexString())
  if (token == null) {
    token = new Token(event.address.toHexString())
    token.symbol = "SYM"
    token.name = "My Token"
    token.decimals = 18
    token.save()
  }
  
  let user = User.load(event.params.to.toHexString())
  if (user == null) {
    user = new User(event.params.to.toHexString())
    user.address = event.params.to.toHexString()
    user.tokensOwned = []
  }
  
  let tokens = user.tokensOwned
  tokens.push(token.id)
  user.tokensOwned = tokens
  user.save()
}
```

#### サブグラフマニフェストの作成（subgraph.yaml）

```yaml
specVersion: 0.0.4
schema:
  file: ./schema.graphql
dataSources:
  - kind: ethereum/contract
    name: ERC20
    network: mainnet
    source:
      address: "0x1234567890123456789012345678901234567890"
      abi: ERC20
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.6
      language: wasm/assemblyscript
      entities:
        - Token
        - User
      abis:
        - name: ERC20
          file: ./abis/ERC20.json
      eventHandlers:
        - event: Transfer(indexed address,indexed address,uint256)
          handler: handleTransfer
      file: ./src/mappings.ts
```

### 3.2 サブグラフのデプロイ

- Graph Studio（https://thegraph.com/studio/）でアカウントを作成
- 新しいサブグラフを作成
- デプロイコマンドの実行

  ```bash
  graph auth
  graph deploy --product hosted-service <GITHUB_USERNAME>/<SUBGRAPH_NAME>
  ```

### 3.3 サブグラフのクエリ
サブグラフがデプロイされたら、GraphQLエンドポイントを使用してクエリを実行できます：

```javascript
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/username/subgraphname',
  cache: new InMemoryCache()
});

client.query({
  query: gql`
    {
      users(first: 5) {
        id
        address
        tokensOwned {
          id
          symbol
        }
      }
    }
  `
}).then(result => console.log(result));
```

### 3.4 実践的なユースケース

The Graphの実際の応用例をいくつか紹介します：

- **DEXの統計ダッシュボード: Uniswapなどの分散型取引所のトレード履歴やボリュームを分析**
- **NFTマーケットプレイス: コレクションや所有者情報を効率的に表示**
- **DeFiポートフォリオトラッカー: 複数のプロトコルにまたがる資産を追跡**
- **DAOガバナンス分析: 投票パターンや提案履歴を分析**

## 4. まとめ
The Graphは、ブロックチェーンデータの検索と取得を効率化する強力なツールです。

Web3アプリケーションの開発者にとって、The Graphを活用することで開発時間の短縮とユーザーエクスペリエンスの向上が見込めます。

- **主なメリット: 開発効率の向上、コスト削減、分散化、柔軟なデータアクセス**
- **考慮点: 学習曲線、インデクサーの信頼性、分散化の進行度、クエリコスト**

The Graphは、Web3の基本インフラストラクチャーとしての地位を確立しつつあり、多くの主要なdAppがすでにこのプロトコルを活用しています。

ブロックチェーン開発者として、The Graphの基本を理解することは、今後のプロジェクト開発において大きなアドバンテージとなるでしょう。
