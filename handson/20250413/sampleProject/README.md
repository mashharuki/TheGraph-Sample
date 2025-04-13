# ハンズオン用オリジナル SubGraph プロジェクト

## セットアップ

1.  You need to create API Key.

    - Alchemy API Key
    - Arbitrum Scan API Key

2.  You need to create `.env` file & fillout these values

    ```bash
    cp .env.example .env
    ```

    ```txt
    PRIVATE_KEY=""
    ALCHEMY_API_KEY=""
    ARBITRUMSCAN_API_KEY=
    ```

## インストール

```bash
yarn install
```

## コントラクトのデプロイ

```bash
yarn backend deploy:Lock --network arbitrumSepolia
```

### デプロイしたコントラクト

[0x177acf501eF7d2b090d94fd3bd2BE773736598E1](https://sepolia.arbiscan.io/address/0x177acf501eF7d2b090d94fd3bd2BE773736598E1)

## サブグラフのビルド＆デプロイ

```bash
yarn subgraph codegen
yarn subgraph build
```

```bash
yarn subgraph deploy
```

### デプロイしたサブグラフ

[https://api.studio.thegraph.com/query/44992/lock/0.0.1](https://api.studio.thegraph.com/query/44992/lock/0.0.1)
