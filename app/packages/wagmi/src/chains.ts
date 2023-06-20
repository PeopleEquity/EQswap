import {
  arbitrumRinkeby,
  optimismKovan,
  polygonMumbai,
  rinkeby,
  mainnet,
  arbitrum,
  optimism,
  polygon,
} from 'wagmi/chains'
import { Chain } from 'wagmi'

export const avalandche: Chain = {
  id: 43114,
  name: 'Avalanche C-Chain',
  network: 'avalanche',
  rpcUrls: {
    default: 'https://rpc.ankr.com/avalanche',
  },
  nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'snowtrace',
      url: 'https://snowtrace.io/',
    },
  },
}

export const avalandcheFuji: Chain = {
  id: 43113,
  name: 'Avalanche Fuji',
  network: 'avalanche-fuji',
  rpcUrls: {
    default: 'https://rpc.ankr.com/avalanche_fuji',
  },
  nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'snowtrace',
      url: 'https://testnet.snowtrace.io/',
    },
  },
  testnet: true,
}

export const fantomOpera: Chain = {
  id: 250,
  name: 'Fantom Opera',
  network: 'fantom',
  nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
  rpcUrls: {
    default: 'https://rpc.ftm.tools',
  },
  blockExplorers: {
    default: {
      name: 'FTMScan',
      url: 'https://ftmscan.com',
    },
  },
}

export const fantomTestnet: Chain = {
  id: 4002,
  name: 'Fantom Testnet',
  network: 'fantom-testnet',
  nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
  rpcUrls: {
    default: 'https://rpc.testnet.fantom.network',
  },
  blockExplorers: {
    default: {
      name: 'FTMScan',
      url: 'https://testnet.ftmscan.com',
    },
  },
  testnet: true,
}

const bscExplorer = { name: 'BscScan', url: 'https://bscscan.com' }

export const bsc: Chain = {
  id: 56,
  name: 'BNB Smart Chain',
  network: 'bsc',
  rpcUrls: {
    default: 'https://binance.nodereal.io',
    public: 'https://binance.nodereal.io',
  },
  blockExplorers: {
    default: bscExplorer,
    etherscan: bscExplorer,
  },
  multicall: {
    address: '0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B',
    blockCreated: 7162653,
  },
  nativeCurrency: {
    name: 'BNB',
    symbol: 'bnb',
    decimals: 18,
  },
}

export const bscTest: Chain = {
  id: 97,
  name: 'BSC Testnet',
  network: 'bsc-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'BNB',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: 'https://data-seed-prebsc-1-s2.binance.org:8545/',
    public: 'https://data-seed-prebsc-1-s2.binance.org:8545/',
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://testnet.bscscan.com' },
  },
  multicall: {
    address: '0x8F3273Fb89B075b1645095ABaC6ed17B2d4Bc576',
    blockCreated: 9759845,
  },
  testnet: true,
}

export const arbTest: Chain = {
  id: 421613,
  name: 'ARB Testnet',
  network: 'arb-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: 'https://goerli-rollup.arbitrum.io/rpc',
    public: 'https://goerli-rollup.arbitrum.io/rpc',
  },
  blockExplorers: {
    default: { name: 'ArbScan', url: 'https://goerli.arbiscan.io/' },
  },
  multicall: {
    address: '0x654dfDf027386296591b21b8d7E61977cD5571Ee',
    blockCreated: 20503403,
  },
  testnet: true,
}

export const goerli: Chain = {
  id: 5,
  name: 'Goerli',
  network: 'Goerli',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: 'https://goerli.infura.io/v3/',
    public: 'https://goerli.infura.io/v3/',
  },
  blockExplorers: {
    default: { name: 'ArbScan', url: 'https://goerli.etherscan.io' },
  },
  multicall: {
    address: '0xd8855b79656E023F1D14E3697aBF1222d61ddD5d',
    blockCreated: 9105236,
  },
  testnet: true,
}

export const CHAINS_TESTNET = [
  bscTest,
  rinkeby,
  arbitrumRinkeby,
  optimismKovan,
  polygonMumbai,
  avalandcheFuji,
  fantomTestnet,
]

export const CHAINS_STARGATE_TESTNET = [
  rinkeby,
  arbitrumRinkeby,
  optimismKovan,
  polygonMumbai,
  avalandcheFuji,
  fantomTestnet,
]

export const CHAINS_STARGATE = [mainnet, arbitrum, optimism, polygon, avalandche, fantomOpera]

export const CHAINS = [bsc, mainnet, arbitrum, optimism, polygon, fantomOpera, avalandche]
