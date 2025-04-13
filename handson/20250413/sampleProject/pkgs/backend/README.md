# Sample Contract Project for BDDH

## How to work

- ### **setUp**

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

  3.  install

      ```bash
      yarn
      ```

- ### **commands**

  - **compile**

    ```bash
    yarn compile
    ```

  - **test**

    ```bash
    yarn test
    ```

  - **deploy contract**

    ```bash
    yarn deploy:Lock --network arbitrumSepolia
    ```

  - **get chain info**

    ```bash
    yarn getChainInfo --network arbitrumSepolia
    ```

  - **get balance**

    ```bash
    yarn getBalance --network arbitrumSepolia
    ```

  - **callReadMethod**

    ```bash
    yarn callReadMethod --network arbitrumSepolia
    ```

  - **calWriteMethod**

    ```bash
    yarn callWriteMethod --network arbitrumSepolia
    ```

### デプロイしたコントラクト

[0x177acf501eF7d2b090d94fd3bd2BE773736598E1](https://sepolia.arbiscan.io/address/0x177acf501eF7d2b090d94fd3bd2BE773736598E1)
