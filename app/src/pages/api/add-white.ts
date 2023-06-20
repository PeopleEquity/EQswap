import Web3 from 'web3'
import { parse } from 'qs'
import type { NextApiRequest, NextApiResponse } from 'next'

const Config = {
  '5': {
    factory_address: '0xa373C0460cD7c1A355E07a004c8f8651aDE8a3d3',
    setter_address: '0x630c2F96a19B80e76e6Ebf15a2C9166265744320',
    setter_private_key: '0x4de207f84627b4d67f2e4dd5d94ec1227136256e98dc7d624566ab1b8d784874',
    gas_price: 10,
    node_url: 'https://ethereum-goerli.publicnode.com/',
    /* node_url: 'https://data-seed-prebsc-1-s3.binance.org:8545', */
  },
  '56': {
    factory_address: '',
    setter_address: '',
    setter_private_key: '',
    gas_price: 5,
    node_url: '',
  },
  '97': {
    factory_address: '0xeff754Bd50d9FCb6e3F2B9594aCaACC089Aed652',
    setter_address: '0x630c2F96a19B80e76e6Ebf15a2C9166265744320',
    setter_private_key: '0x4de207f84627b4d67f2e4dd5d94ec1227136256e98dc7d624566ab1b8d784874',
    gas_price: 10,
    node_url: 'https://bsc-testnet.publicnode.com',
    /* node_url: 'https://data-seed-prebsc-1-s3.binance.org:8545', */
  },
  '421613': {
    factory_address: '0x6941CD0d6EF3E4c1294b85fe6EF275AA6C4691fb',
    setter_address: '0x630c2F96a19B80e76e6Ebf15a2C9166265744320',
    setter_private_key: '0x4de207f84627b4d67f2e4dd5d94ec1227136256e98dc7d624566ab1b8d784874',
    gas_price: 10,
    node_url: 'https://goerli-rollup.arbitrum.io/rpc',
  },
}

function handleTxParamsData({ token, address }: { token: string; address: string }): string {
  return `0xadb9ded2${token.replace(/^0x/, '000000000000000000000000')}${address.replace(
    /^0x/,
    '000000000000000000000000',
  )}0000000000000000000000000000000000000000000000000000000000000001`
}

async function addWhite(req: NextApiRequest) {
  const {
    token: argToken,
    chainId: argChainId,
    address: argAddress,
  } = parse(req.url.replace(/(.*)\?/g, '')) as { chainId: string; token: string; address: string }

  const token = Web3.utils.toChecksumAddress(argToken)

  const web3 = new Web3(Config[argChainId].node_url)
  const factoryAddress = Web3.utils.toChecksumAddress(Config[argChainId].factory_address)

  const OwnerAddress = Web3.utils.toChecksumAddress(Config[argChainId].setter_address)

  // TODO:
  // 1. 参数补充
  // 2. 链上校验发起方的地址确实质押过足够数量的代币到平台地址
  //    2.1 若无，则提前返回错误码和对应信息
  //    2.2 若有，则允许其添加
  // await check()
  // const txParamsData = await factoryContract.methods.addWhiteList(token, argAddress, 1)

  // 设置交易参数
  const txParams = {
    from: OwnerAddress,
    to: factoryAddress,
    value: 0, // 1 个以太坊
    gas: 1000000, // 默认 gas 上限
    data: handleTxParamsData({ token, address: argAddress }),
    // data: '0xadb9ded20000000000000000000000005cd149a8e33b31bff20bd7d49a8159d42e6bd41900000000000000000000000007c7d4afc839d5fb6ca8d02ffa65e79910c3ef130000000000000000000000000000000000000000000000000000000000000001',
  }

  return new Promise((resolve, reject) => {
    return web3.eth.accounts.signTransaction(txParams, Config[argChainId].setter_private_key).then((signedTx) => {
      // 发送已签署的交易
      web3.eth
        .sendSignedTransaction(signedTx.rawTransaction)
        .on('transactionHash', (hash) => {
          // eslint-disable-next-line no-console
          console.log(`Transaction hash: ${hash}`)
        })
        .on('receipt', (receipt) => {
          // eslint-disable-next-line no-console
          console.log(`Transaction receipt: ${receipt}`)
          resolve({
            result: true,
          })
        })
        .on('error', (error) => {
          console.error(error)
          reject(error)
        })
    })
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const rst = await addWhite(req)

    if (rst) {
      res.status(200).end(JSON.stringify(rst))
      return
    }

    res.status(200).end(JSON.stringify({}))
  } catch (error) {
    res.status(500)
  }
}
