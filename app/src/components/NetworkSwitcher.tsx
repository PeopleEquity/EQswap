import { Box, Text, UserMenu, UserMenuDivider, UserMenuItem } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import Image from 'next/image'
import { setupNetwork } from 'utils/wallet'

// const chains = [bsc, bscTest, arbTest]

export const goerli = {
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

export const bsc = {
  id: 56,
  name: 'BNB Smart Chain',
  network: 'bsc',
  rpcUrls: {
    default: 'https://binance.nodereal.io',
    public: 'https://binance.nodereal.io',
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://bscscan.com' },
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
  testnet: false,
}

export const bscTest = {
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

export const arbTest = {
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

const chains = [goerli, bscTest, arbTest] // [goerli, bsc, bscTest, arbTest]

export const NetworkSelect = () => {
  const { t } = useTranslation()

  return (
    <>
      <Box px="16px" py="8px">
        <Text>{t('Select a Network')}</Text>
      </Box>
      <UserMenuDivider />
      {chains.map((chain) => (
        <UserMenuItem key={chain.id} style={{ justifyContent: 'flex-start' }} onClick={() => setupNetwork(chain.id)}>
          <Image width={24} height={24} src={`/images/chains/${chain.id}.png`} unoptimized />
          <Text pl="12px">{chain.name}</Text>
        </UserMenuItem>
      ))}
    </>
  )
}

export const NetworkSwitcher = () => {
  const { chainId } = useActiveWeb3React()

  return (
      chainId ?
          <UserMenu
              mr="8px"
              avatarSrc={`/images/chains/${chainId}.png`}
              account={
                chains.find(chain => (chain.id === Number(chainId)))?.name
              }
              ellipsis={false}
          >
            {() => <NetworkSelect />}
          </UserMenu> : null
  )
}
