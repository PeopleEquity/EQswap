import Web3 from 'web3'
import { parse } from 'qs'
import type { NextApiRequest, NextApiResponse } from 'next'

const config = {
  '5': {
    pre_url: 'https://goerli.etherscan.io/address/',
    factory_address: '0xa373C0460cD7c1A355E07a004c8f8651aDE8a3d3',
    setter_address: '0x994D95Ea4C37C4b586Fa9668211Daa4Aa03be060',
    setter_private_key: '0x2a5f70d22e1ee3c94e8bdc4846c41d7f92b588cc1bafa8f96d68d0a3533d926c',
    WETH: '0x308c1be1A89A144711cFE78dD67dBf8b7F179b17',
    gas_price: 10,
    node_url: 'https://ethereum-goerli.publicnode.com/',
    reg: /Creator Address \((.*?)\)'/
  },
  '56': {
    pre_url: 'https://bscscan.com/address/',
    factory_address: '',
    setter_address: '',
    setter_private_key: '',
    WETH: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    gas_price: 5,
    node_url: '',
    reg: /Creator Address'>(.*?)</
  },
  '97': {
    pre_url: 'https://testnet.bscscan.com/address/',
    factory_address: '0xeff754Bd50d9FCb6e3F2B9594aCaACC089Aed652',
    setter_address: '0x994D95Ea4C37C4b586Fa9668211Daa4Aa03be060',
    setter_private_key: '0x2a5f70d22e1ee3c94e8bdc4846c41d7f92b588cc1bafa8f96d68d0a3533d926c',
    WETH: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    gas_price: 10,
    node_url: 'https://bsc-testnet.publicnode.com',
    /* node_url: 'https://data-seed-prebsc-1-s3.binance.org:8545', */
    reg: /Creator Address'>(.*?)</
  },
  '421613': {
    pre_url: 'https://goerli.arbiscan.io/address/',
    factory_address: '0x6941CD0d6EF3E4c1294b85fe6EF275AA6C4691fb',
    setter_address: '0x630c2F96a19B80e76e6Ebf15a2C9166265744320',
    setter_private_key: '0x4de207f84627b4d67f2e4dd5d94ec1227136256e98dc7d624566ab1b8d784874',
    WETH: '0x2372aD6C4dD859bcce41d6D2451168eCF23Be3aB',
    gas_price: 10,
    node_url: 'https://goerli-rollup.arbitrum.io/rpc',
    reg: /Creator Address'>(.*?)</
  },
}

const FactoryABI = [
  {
    constant: true,
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'address', name: 'creater', type: 'address' },
    ],
    name: 'isWhite',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'token', type: 'address' },
      { internalType: 'address', name: 'creater', type: 'address' },
      { internalType: 'uint256', name: 'flag', type: 'uint256' },
    ],
    name: 'addWhiteList',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

async function creatorAddress(req: NextApiRequest): Promise<{ creatorAddress: string; alreadyExist: number }> {
  let crawlingCreatorAddress = ''
  let alreadyExist = -1

  const {
    token: argToken,
    chainId: argChainId,
    address: argAddress,
  } = parse(req.url.replace(/(.*)\?/g, '')) as { chainId: string; token: string; address: string; }

  const token = Web3.utils.toChecksumAddress(argToken)

  /* if (token === Web3.utils.toChecksumAddress(config[argChainId].WETH)) {
    alreadyExist = 0
  } */
  const web3 = new Web3(config[argChainId].node_url)
  const factoryAddress = Web3.utils.toChecksumAddress(config[argChainId].factory_address)
  const factoryContract = new web3.eth.Contract(FactoryABI as any, factoryAddress)

  try {
    alreadyExist = await factoryContract.methods
      .isWhite(token, argAddress)
      .call()
      .then((res) => {
        return Number(res)
      })
  } catch (error) {
    console.error('error', error)
  }

  if (token === Web3.utils.toChecksumAddress(config[argChainId].WETH)) {
    return { creatorAddress: crawlingCreatorAddress, alreadyExist }
  }

  const url = config[argChainId].pre_url + argToken

  const crawlingHtml = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }).then((response) => {
    return response.text()
  })
  const regexpPattern = config[argChainId].reg
  crawlingCreatorAddress = crawlingHtml.match(regexpPattern)?.[1]
  return { creatorAddress: crawlingCreatorAddress, alreadyExist }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let rst
  try {
     rst = await creatorAddress(req)
  } catch (error){
    console.log('error', error)
  }

  if (rst) {
    res.status(200).end(JSON.stringify(rst))
  } else {
    res.status(500).end()
  }
}
