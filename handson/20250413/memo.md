# 4月13日のハンズオンの記録

## `vitalik.eth`の有効期限を取得する

```gql
{
  domains(where: { name: "vitalink.eth" }) {
    name
    labelName
    labelhash
    registration {
      expiryDate
    }
  }
}
```

```json
{
  "data": {
    "domains": [
      {
        "labelName": "vitalink",
        "labelhash": "0x987f977030c78c936522b47388243806c8fc885a9c8397ce82e54e5775bf94bd",
        "name": "vitalink.eth",
        "registration": {
          "expiryDate": "1850771447"
        }
      }
    ]
  }
}
```

## Unichain mainnet における uniswapの取引プール数の合計値を取得する

使用するサブグラフ

https://thegraph.com/explorer/subgraphs/BCfy6Vw9No3weqVq9NhyGo4FkVCJep1ZN9RMJj5S32fX?view=Query&chain=arbitrum-one

```gql
query MyQuery {
  factories {
    poolCount
  }
}
```

```json
{
  "data": {
    "factories": [
      {
        "poolCount": "2383"
      }
    ]
  }
}
```

## 直近5件のCyrptoPunksの売買データについて①売り手②買い手③売買されたトークンID④トランザクションハッシュ値データを取得する。

使用するサブグラフ

https://thegraph.com/explorer/subgraphs/2hTKKMwLsdfJm9N7gUeajkgg8sdJwky56Zpkvg8ZcyP8?view=Query&chain=arbitrum-one

```gql
query MyQuery {
  sales(first: 5, orderBy: timestamp, orderDirection: desc) {
    nft {
      id
    }
    txHash
    from {
      id
    }
    to {
      id
    }
    timestamp
  }
}
```

```json

```
