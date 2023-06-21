import { Contract } from '@ethersproject/contracts'
import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/providers'
import memoize from 'lodash/memoize'
import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { BigNumber } from '@ethersproject/bignumber'
import { Token, Currency, ETHER, ChainId } from '@pancakeswap/sdk'
import { TokenAddressMap } from 'state/types'
import { NETWORK_CONFIG } from '../config'

// returns the checksummed address if the address is valid, otherwise returns false
export const isAddress = memoize((value: any): string | false => {
  try {
    return getAddress(value)
  } catch {
    return false
  }
})

export function getBscScanLink(
  data: string | number,
  type: 'transaction' | 'token' | 'address' | 'block' | 'countdown',
  chainIdOverride?: number,
): string {
  const chainId = chainIdOverride || ChainId.BSC
  switch (type) {
    case 'transaction': {
      return `${NETWORK_CONFIG[chainId]?.scanURL}/tx/${data}`
    }
    case 'token': {
      return `${NETWORK_CONFIG[chainId]?.scanURL}/token/${data}`
    }
    case 'block': {
      return `${NETWORK_CONFIG[chainId]?.scanURL}/block/${data}`
    }
    case 'countdown': {
      return `${NETWORK_CONFIG[chainId]?.scanURL}/block/countdown/${data}`
    }
    default: {
      return `${NETWORK_CONFIG[chainId]?.scanURL}/address/${data}`
    }
  }
}

export function getBscScanLinkForNft(collectionAddress: string, tokenId: string): string {
  return `${BASE_BSC_SCAN_URLS[ChainId.BSC]}/token/${collectionAddress}?a=${tokenId}`
}

// add 10%
export function calculateGasMargin(value: BigNumber, margin = 1000): BigNumber {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(margin))).div(BigNumber.from(10000))
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address: string, ABI: any, signer?: Signer | Provider): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, signer)
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function isTokenOnList(defaultTokens: TokenAddressMap, currency?: Currency): boolean {
  if (currency === ETHER) return true
  return Boolean(currency instanceof Token && defaultTokens[currency.chainId]?.[currency.address])
}


export const swapFormulaList = [
  {
    label: 'ES I',
    value: 'P=Y/X',
    alias: 'Whale',
  },
  {
    label: 'ES II',
    value: 'P=2Y/X',
    alias: 'Elephant',
  },
  {
    label: 'ES III',
    value: 'P=4Y/X',
    alias: 'Ant',
  },
]
