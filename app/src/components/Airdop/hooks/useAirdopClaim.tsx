import {useCallback, useMemo} from "react";
import { Interface } from "@ethersproject/abi";
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import { useMultipleContractSingleData } from "../../../state/multicall/hooks";
import AIRDOP_ABI from "../../../config/abi/airdop_metadata.json";
import { useAirdopContract } from "../../../hooks/useContract";

export function useAirdopIsClaim() {
  const { account, chainId } = useActiveWeb3React()

  const result = useMultipleContractSingleData(
      ["0xC568A77878EB50C61b807F4E26437b6B0B6d3B02"],
      new Interface(AIRDOP_ABI),
      'getTimeStamp',
      [account]
  )
  return useMemo(() => {
    console.log('result', result)
    if (result[0]?.loading === false && result[0]?.result[0]) {
      console.log('result[0].result[0]', result[0]?.result[0], parseInt(String(new Date().getTime() / 1000)))
      return (result[0]?.result[0] - parseInt(String(new Date().getTime() / 1000))) > 60 * 60 * 24
    }
    return null
  }, [result])
}

/* export function useAirdpClaim() {
  const { account, chainId } = useActiveWeb3React()

  const tokenContract = useAirdopContract(address)
  const addTransaction = useTransactionAdder()

  const claim = useCallback(async (): Promise<void> => {
    if (!tokenContract) {
      toastError(t('Error'), t('Cannot find contract of the token %tokenAddress%', { tokenAddress: token?.address }))
      console.error('tokenContract is null')
      return
    }


    return callWithGasPrice(
        tokenContract,
        'approve',
        [spender, useExact ? amountToApprove.raw.toString() : MaxUint256],
        {
          gasLimit: calculateGasMargin(estimatedGas),
        },
    )
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: `Approve ${amountToApprove.currency.symbol}`,
            approval: { tokenAddress: token.address, spender },
            type: 'approve',
          })
        })
        .catch((error: any) => {
          logError(error)
          console.error('Failed to approve token', error)
          if (error?.code !== 4001) {
            toastError(t('Error'), error.message)
          }
          throw error
        })
  }, [approvalState, token, tokenContract, amountToApprove, spender, addTransaction, callWithGasPrice, t, toastError])

  return [approvalState, approve]
} */
