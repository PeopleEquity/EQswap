import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { CAKE } from 'config/constants/tokens'
import { FAST_INTERVAL } from 'config/constants'
import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber'
import { Zero } from '@ethersproject/constants'
import useSWR from 'swr'
import { BIG_ZERO } from 'utils/bigNumber'
import {BSC_PROD_NODE, bscRpcProvider} from 'utils/providers'
import { NETWORK_CONFIG } from 'utils/wallet'

import {StaticJsonRpcProvider} from "@ethersproject/providers";
import { useTokenContract } from './useContract'
import { useSWRContract } from './useSWRContract'

const useTokenBalance = (tokenAddress: string) => {
  const { account } = useWeb3React()

  const contract = useTokenContract(tokenAddress, false)
  const { data, status, ...rest } = useSWRContract(
    account
      ? {
          contract,
          methodName: 'balanceOf',
          params: [account],
        }
      : null,
    {
      refreshInterval: FAST_INTERVAL,
    },
  )

  return {
    ...rest,
    fetchStatus: status,
    balance: data ? new BigNumber(data.toString()) : BIG_ZERO,
  }
}

export const useGetBnbBalance = () => {
  const { account } = useWeb3React()
  const { status, data, mutate } = useSWR([account, 'bnbBalance'], async () => {
    return bscRpcProvider.getBalance(account)
  })

  return { balance: data || Zero, fetchStatus: status, refresh: mutate }
}

export const useGetEthBalance = () => {
  const { account, chainId } = useWeb3React()
  const { status, data, mutate } = useSWR([account, 'ethBalance'], async () => {
    const rpcUrl = NETWORK_CONFIG[String(chainId)]?.rpcUrls[0]
    const provider = new StaticJsonRpcProvider(rpcUrl)
    return provider.getBalance(account)
  })

  return { balance: data || Zero, fetchStatus: status, refresh: mutate }
}

export const useGetCakeBalance = () => {
  const { chainId } = useWeb3React()
  const { balance, fetchStatus } = useTokenBalance(CAKE[chainId]?.address)

  // TODO: Remove ethers conversion once useTokenBalance is converted to ethers.BigNumber
  return { balance: EthersBigNumber.from(balance.toString()), fetchStatus }
}

export default useTokenBalance
