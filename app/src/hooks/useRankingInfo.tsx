import {useCallback, useEffect, useState} from 'react'
import useActiveWeb3React from "./useActiveWeb3React";

interface Data {
  datas: Datas
}

interface Datas {
  list: ListItem
  pages: number
}

interface ListItem {
  amt: number
  icon: string
  net: string
  // eslint-disable-next-line camelcase
  short_wallet: string
  symbol: string
  trend: string
  unit: string
  wallet: string
  tokenAddress: undefined | string
}

const useRankingInfo = (pathName, size, timeType, type, currentPage, setLoading, tokenAddress = undefined) => {
  const { chainId, account } = useActiveWeb3React()

  const [list, setList] = useState(null)
  const [page, setPage] = useState(null)

  const fetchListInfo = useCallback(async () => {
    let pageNumber = currentPage
    if (!currentPage) {
      pageNumber = 1
    }
    setLoading(true)
    setList(null)
    try {
      const res: any = await fetch(
          `https://www.equityswap.club/app/index/${pathName}`,
          {
            method: 'post',
            body: JSON.stringify({
              net: account ? `evm--${Number(chainId)}` : `evm--97`,
              page: pageNumber,
              size,
              sortName: '',
              sortOrder: '',
              timeType,
              typew: type,
              token_addr: tokenAddress,
            }),
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          },
      )
      const obj = await res.json()
      if (obj?.code === 0) {
        const newList = obj?.datas?.list.map((item, i) => ({...item, index: i}))
        if (newList.length < size) {
          for (let i = newList.length; i < size; i++) {
            newList.push({index: i + 1})
          }
        }
        setList(newList)
        setPage(obj?.datas?.pages)
        setLoading(false)
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
  }, [currentPage, size, timeType, type, pathName, setLoading, chainId, tokenAddress])


  useEffect(() => {
    if (tokenAddress === '0') return
    fetchListInfo()
  }, [currentPage, type, setLoading, timeType, chainId, tokenAddress])

  return {
    list,
    page
  }
}

export default useRankingInfo
