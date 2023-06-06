import {useCallback, useMemo, useState} from "react";
import { Interface } from "@ethersproject/abi";
import { useTranslation } from "@pancakeswap/localization";
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import { useMultipleContractSingleData } from "../../../state/multicall/hooks";
import AIRDOP_ABI from "../../../config/abi/airdop_metadata.json";
import { useAirdopContract } from "../../../hooks/useContract";
import {useCallWithGasPrice} from "../../../hooks/useCallWithGasPrice";
import useToast from "../../../hooks/useToast";
import useCatchTxError from "../../../hooks/useCatchTxError";
import { AIRDOP_ADDRESS } from '../../../config/constants/exchange'


export function useAirdopIsClaim() {
  const { account, chainId } = useActiveWeb3React()

  const result = useMultipleContractSingleData(
      [AIRDOP_ADDRESS[chainId]],
      new Interface(AIRDOP_ABI),
      'getTimeStamp',
      [account]
  )
  return useMemo(() => {
    if (result[0]?.loading === false && result[0] && result[0]?.result && result[0]?.result[0]) {
      return (parseInt(result[0]?.result[0]?.toString()) < 60 * 60 * 24)
    }
    return null
  }, [result])
}

export function useAirdopClaim() {
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const airdopContract = useAirdopContract(AIRDOP_ADDRESS[chainId])
  const { callWithGasPrice } = useCallWithGasPrice()
  const { toastSuccess } = useToast()
  const { fetchWithCatchTxError, loading: isLoading } = useCatchTxError()
  const [claimCallback, setClaimCallback] = useState(null)

  const claim = useCallback(async (): Promise<void> => {
    if (!airdopContract) {
      console.error('airdopContract is null')
      return
    }

    const receipt = await fetchWithCatchTxError(() => {
      return callWithGasPrice(airdopContract, 'getAridop', [account])
    })
    if (receipt?.status) {
      setClaimCallback(true)
    } else {
      setClaimCallback(false)
    }
  }, [account, airdopContract])

  return {
    callback: claim,
    claimCallback,
    isLoading
  }
}
