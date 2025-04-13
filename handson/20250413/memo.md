# 4 月 13 日のハンズオンの記録

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

## Unichain mainnet における uniswap の取引プール数の合計値を取得する

使用するサブグラフ

[https://thegraph.com/explorer/subgraphs/BCfy6Vw9No3weqVq9NhyGo4FkVCJep1ZN9RMJj5S32fX?view=Query&chain=arbitrum-one](https://thegraph.com/explorer/subgraphs/BCfy6Vw9No3weqVq9NhyGo4FkVCJep1ZN9RMJj5S32fX?view=Query&chain=arbitrum-one)

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

## 直近 5 件の CyrptoPunks の売買データについて ① 売り手 ② 買い手 ③ 売買されたトークン ID④ トランザクションハッシュ値データを取得する。

使用するサブグラフ

[https://thegraph.com/explorer/subgraphs/2hTKKMwLsdfJm9N7gUeajkgg8sdJwky56Zpkvg8ZcyP8?view=Query&chain=arbitrum-one](https://thegraph.com/explorer/subgraphs/2hTKKMwLsdfJm9N7gUeajkgg8sdJwky56Zpkvg8ZcyP8?view=Query&chain=arbitrum-one)

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
{
  "data": {
    "sales": [
      {
        "from": {
          "id": "0x084263a11a1c2998ad4d1e5a79ee57d28ff714c2"
        },
        "nft": {
          "id": "3001"
        },
        "timestamp": "1744523519",
        "to": {
          "id": "0xd00a20c1e0e24ef135580db99c1d3e96f7e00ea8"
        },
        "txHash": "0x15005f4c92d3a85f5d08822781c4935536606e5ff3afe5e0e9b8a0c9eaa75e21"
      },
      {
        "from": {
          "id": "0x91c8fb0248685e63c6bc26cb29623a856f87c9bc"
        },
        "nft": {
          "id": "6689"
        },
        "timestamp": "1744488899",
        "to": {
          "id": "0x968d74b643e5c398b35c1be3d025bf24c4f4a33a"
        },
        "txHash": "0x4cc528d57fe6d2b70d63d0c1232569d9854d126c2cf97775e816add3b9e1f2e5"
      },
      {
        "from": {
          "id": "0x170dba2ef1cc3b081a882194817b2c4ab112e5e4"
        },
        "nft": {
          "id": "7747"
        },
        "timestamp": "1744484147",
        "to": {
          "id": "0x5ec5c2468674a5d10db93db588fbff5d8da2fdc1"
        },
        "txHash": "0x22051a212b225b42568dd2e70398ddb846af349e76f0f57c0ae9d33d0cb061c4"
      },
      {
        "from": {
          "id": "0xbd3688539b6a722e78fbe7568790f9e5dbbb4d84"
        },
        "nft": {
          "id": "3001"
        },
        "timestamp": "1744479755",
        "to": {
          "id": "0x084263a11a1c2998ad4d1e5a79ee57d28ff714c2"
        },
        "txHash": "0x113a9419c8ca307ce31ba26b285e35d43f8580b0b46d6fb287959c1cb5c812eb"
      },
      {
        "from": {
          "id": "0x7e7454277c9bc9df97c7fa288f215cfd5ad2d253"
        },
        "nft": {
          "id": "8249"
        },
        "timestamp": "1744427855",
        "to": {
          "id": "0x1919db36ca2fa2e15f9000fd9cdc2edcf863e685"
        },
        "txHash": "0xfe78ed270dcee2f8f1a519cd478cc57183064709671ec2d0f73a017e4caabf8e"
      }
    ]
  }
}
```
