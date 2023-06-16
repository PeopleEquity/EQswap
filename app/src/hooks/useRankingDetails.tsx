import {useCallback, useEffect, useState} from 'react'
import useActiveWeb3React from "./useActiveWeb3React";

interface ListData {
  links: number
  // eslint-disable-next-line camelcase
  links_rank: number
  rela: number
  // eslint-disable-next-line camelcase
  rela_rank: number
  rwla: number
  // eslint-disable-next-line camelcase
  rwla_rank: number
  twla: number
  // eslint-disable-next-line camelcase
  twla_rank: number
}

interface tradeListData {
  chg: number
  chgTrend: string
  gains: string
  gainsTrend: string
  icon: string
  // eslint-disable-next-line camelcase
  token_description: string
  // eslint-disable-next-line camelcase
  token_name: string
}

interface ListItem {
  icon: string
  list: ListData
  name: string
  net: string
  // eslint-disable-next-line camelcase
  tg_link: string
  // eslint-disable-next-line camelcase
  trade_list: tradeListData[]
  // eslint-disable-next-line camelcase
  twitter_link: string
  // eslint-disable-next-line camelcase
  user_short_wallet: string
  // eslint-disable-next-line camelcase
  user_wallet: string
}

const useRankingInfo = (address) => {
  const { chainId, account } = useActiveWeb3React()

  const [info, setInfo] = useState(null)

  const fetchListInfo = useCallback(async () => {
    try {
      const res: any = await fetch(
          `https://www.equityswap.club/app/user/userinfo`,
          {
            method: 'post',
            body: JSON.stringify({
              net: account ? `evm--${Number(chainId)}` : `evm--97`,
              targetWallet: address,
            }),
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          },
      )
      const obj = await res.json()
      if (obj?.code === 0) {
        setInfo(obj?.datas)
      }
    } catch (error) {
      console.error(`Failed to fetch list`, error)
      return {
        error: true,
      }
    }
    return {
      error: true,
    }
  }, [chainId, address])


  useEffect(() => {
    if (!address) return
    fetchListInfo()
  }, [chainId, address])

  return { ...info }
}

export default useRankingInfo
