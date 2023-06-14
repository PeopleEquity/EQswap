import { useEffect } from 'react'
import { ETHER } from "@pancakeswap/sdk";
import { useRouter } from "next/router";
import useActiveWeb3React from "./useActiveWeb3React";

const useThemeCookie = () => {
  const { chainId } = useActiveWeb3React()
  const router = useRouter()

  useEffect(() => {
    if (chainId) {
      ETHER.resetCurrency(chainId)
    }
  }, [chainId])

  useEffect(() => {
    const path = router.asPath
    if (path.indexOf('/BNB') > -1 && ETHER.symbol !== 'BNB') {
      router.replace(path.replace('/BNB', `/${ETHER.symbol}`), undefined, { shallow: true })
    }
    if (path.indexOf('/ETH') > -1 && ETHER.symbol !== 'ETH') {
      router.replace(path.replace('/ETH', `/${ETHER.symbol}`), undefined, { shallow: true })
    }
  }, [chainId])
}

export default useThemeCookie
