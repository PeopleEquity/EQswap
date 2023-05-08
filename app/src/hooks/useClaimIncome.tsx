import { useCallback } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import useActiveWeb3React from "./useActiveWeb3React";

const getSigner = (library: Web3Provider, account: string) => {
  return library.getSigner(account).connectUnchecked()
}

async function signProjectInfo(library: Web3Provider, account: string, info: object) {
  const signer = getSigner(library, account)
  const msg = JSON.stringify(info)
  const mySignature = await signer.signMessage(msg)
  return mySignature
}

const useClaimIncome = () => {
  const { library, chainId, account } = useActiveWeb3React()

  const onHanlderClaimIncome = useCallback(async (datas) => {
    if (!account || !library || !chainId) return

    const sendData = {
      chainId,
      ts: datas?.ts,
    }

    try {
      const sign = await signProjectInfo(library, account, sendData)

      const res: any = await fetch(
          `https://www.equityswap.club/app/user/laeqinfo`,
          {
            method: 'post',
            body: JSON.stringify({
              sign,
              data: sendData
            }),
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          })
      const obj = await res.json()
      console.log('obj', obj)
    } catch (error) {
      console.error(`Failed to fetch income info`, error)
    }
  }, [account, library, chainId])

  return { onHanlderClaimIncome }
}

export default useClaimIncome
