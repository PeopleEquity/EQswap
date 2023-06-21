import { ChainId } from '@pancakeswap/sdk'
import BigNumber from 'bignumber.js/bignumber'
import { BIG_TEN } from 'utils/bigNumber'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

export const BSC_BLOCK_TIME = 3

export const NETWORK_CONFIG = {
  [ChainId.GOERLI]: {
    name: 'Goerli',
    scanURL: 'https://goerli.etherscan.io',
    rpcUrls: ['https://goerli.infura.io/v3/'],
    tokenName: 'ETH',
    symbol: 'ETH',
    scan: 'ETHScan',
    decimals: 18,
  },
  [ChainId.BSC]: {
    name: 'BNB Smart Chain Mainnet',
    scanURL: 'https://bscscan.com',
    rpcUrls: [
      'https://bsc-dataseed1.ninicoin.io',
      'https://bsc-dataseed1.defibit.io',
      'https://bsc-dataseed.binance.org',
    ],
    tokenName: 'BNB',
    symbol: 'BNB',
    scan: 'BSCScan',
    decimals: 18,
  },
  [ChainId.BSC_TESTNET]: {
    name: 'BNB Smart Chain Testnet',
    scanURL: 'https://testnet.bscscan.com',
    rpcUrls: [
      'https://bsc-testnet.publicnode.com',
      'https://data-seed-prebsc-1-s1.binance.org:8545',
      'https://data-seed-prebsc-2-s1.binance.org:8545'
    ],
    tokenName: 'BNB',
    symbol: 'BNB',
    scan: 'BSCTestScan',
    decimals: 18,
  },
  [ChainId.ARB_TESTNET]: {
    name: 'ARB Smart Chain Testnet',
    scanURL: 'https://goerli.arbiscan.io',
    rpcUrls: [
      'https://goerli-rollup.arbitrum.io/rpc'
    ],
    tokenName: 'ETH',
    symbol: 'ETH',
    scan: 'ARBScan',
    decimals: 18,
  },
}

// CAKE_PER_BLOCK details
// 40 CAKE is minted per block
// 20 CAKE per block is sent to Burn pool (A farm just for burning cake)
// 10 CAKE per block goes to CAKE syrup pool
// 9 CAKE per block goes to Yield farms and lottery
// CAKE_PER_BLOCK in config/index.ts = 40 as we only change the amount sent to the burn pool which is effectively a farm.
// CAKE/Block in src/views/Home/components/CakeDataRow.tsx = 15 (40 - Amount sent to burn pool)
export const CAKE_PER_BLOCK = 40
export const BLOCKS_PER_YEAR = (60 / BSC_BLOCK_TIME) * 60 * 24 * 365 // 10512000
export const CAKE_PER_YEAR = CAKE_PER_BLOCK * BLOCKS_PER_YEAR
export const BASE_URL = 'https://equityswap.club'
export const BASE_ADD_LIQUIDITY_URL = `${BASE_URL}/add`
export const BASE_BSC_SCAN_URL = NETWORK_CONFIG[ChainId.BSC].scanURL
export const DEFAULT_TOKEN_DECIMAL = BIG_TEN.pow(18)
export const DEFAULT_GAS_LIMIT = 250000
export const AUCTION_BIDDERS_TO_FETCH = 500
export const RECLAIM_AUCTIONS_TO_FETCH = 500
export const AUCTION_WHITELISTED_BIDDERS_TO_FETCH = 500
export const IPFS_GATEWAY = 'https://ipfs.io/ipfs'
