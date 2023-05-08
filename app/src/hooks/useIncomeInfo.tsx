import {useCallback, useEffect, useState} from 'react'
import useActiveWeb3React from "./useActiveWeb3React";

const useIncomeInfo = () => {
  const [incomeInfo, setIncomeInfo] = useState(null)
  const { account } = useActiveWeb3React()

  const fetchIncomeInfo = useCallback(async () => {
    if (!account) return

    try {
      const res: any = await fetch(
          `https://www.equityswap.club/app/user/laeqinfo`,
          {
            method: 'post',
            body: JSON.stringify({
              'target_wallet': '0x0cdde7c9b8ee5fc1afa8d992cf800271fdcb6d99'
            }),
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          })
      const obj = await res.json()
      if (obj.code === 0) {
        setIncomeInfo(obj.datas)
      }
    } catch (error) {
      console.error(`Failed to fetch income info`, error)
    }
  }, [account])


  useEffect(() => {
    fetchIncomeInfo()
  }, [account])

  return incomeInfo
}

export default useIncomeInfo
