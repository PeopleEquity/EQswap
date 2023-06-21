import Web3 from 'web3'
import Link from 'next/link'
import { useCallback, useMemo, useState } from 'react'
import {Text, CardBody, Button, IconButton, ArrowBackIcon, useModal} from '@pancakeswap/uikit'
import { AutoColumn } from 'components/Layout/Column'
import { useWeb3React } from '@web3-react/core'
import styled from "styled-components";
import {useTranslation} from "@pancakeswap/localization";
import { splitTransferInputData } from 'utils/transaction'
import ERC20_ABI from 'config/abi/erc20.json'
import AddressInputArea from 'components/AddressInputArea'
import useToast from 'hooks/useToast'
import useTheme from 'hooks/useTheme'

import Page from '../Page'
import { AppBody } from '../../components/App'
import AddWhiteListModal from "./AddWhiteListModal";
import { USDT } from '../../config/constants/tokens'

const OwnerAddress = '0x630c2F96a19B80e76e6Ebf15a2C9166265744320'

const Subtitle: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Text fontSize="12px" color="dark">
      {children}
    </Text>
  )
}

const TextCenter = styled.div`
  text-align: center;
  margin-bottom: 4px;
`

const StyledA = styled.a`
  font-size: 14px;
  font-weight: bold;
  color: #5c53d3;
  margin-bottom: 6px;
  text-align: center;
`

const StyledButton = styled(Button)`
  background: linear-gradient(90deg, #EB3DFF 0%, #5C53D3 100%);
  border-radius: 28px;
  margin-top: 32px;
`

function isContractAddress(address: string): boolean {
  const pattern = /^0x[0-9a-fA-F]{40}$/
  return pattern.test(address)
}

export default function AddWhiteList() {
  const { t } = useTranslation()

  const { account, chainId } = useWeb3React()
  const { theme } = useTheme()
  const { toastSuccess, toastInfo, toastError } = useToast()

  const [btnText, setBtnText] = useState('Supply 10 USDT')
  const [loading, setLoading] = useState<boolean>(false)
  const [whiteListAddress, setWhiteListAddress] = useState<string>('')
  const [token, setToken] = useState<string>('')
  const [isMore, setMore] = useState(false)

  const disableSupply = useMemo(() => {
    if (isContractAddress(whiteListAddress) && isContractAddress(token)) {
      return false
    }
    return true
  }, [whiteListAddress, token])

  const _fetchTransactionInfo = useCallback(
    (web3, transactionHash) => {
      return new Promise<void>((resolve, reject) => {
        toastInfo(t('startQueryingTransactionRecords'))
        const timerId = setTimeout(() => {
          web3.eth.getTransactionReceipt(transactionHash, (transactionReceiptError, receipt) => {
            if (transactionReceiptError) {
              reject(new Error(transactionReceiptError))
              clearTimeout(timerId)
              return
            }
            if (receipt.status === true) {
              web3.eth
                .getTransaction(transactionHash)
                .then(async (res) => {
                  const rst = splitTransferInputData(res.input)
                  if (
                    rst.amount === String(10 * 10 ** USDT[chainId]?.decimals) &&
                    rst.toAddress.toLowerCase() === OwnerAddress.toLowerCase()
                  ) {
                    try {
                      setBtnText('Adding to whitelist')
                      await fetch(`/api/add-white?chainId=${chainId}&token=${token}&address=${whiteListAddress}`, {
                        mode: 'no-cors',
                      })
                      resolve()
                    } catch (error) {
                      reject(new Error('Addwhitelist Error'))
                    }
                  } else {
                    reject(new Error('Addwhitelist Error'))
                  }
                })
                .catch((error) => {
                  reject(new Error(error?.message ?? 'Somthing Wrong'))
                })
            }
          })
        }, 30 * 1000)
      })
    },
    [chainId, toastInfo, token, whiteListAddress],
  )

  const supplyCallback = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if (!account || !chainId) {
        reject(new Error('Please connect wallet'))
        return
      }

      fetch(`/api/creator-address?chainId=${chainId}&token=${token}&address=${whiteListAddress}`)
        .then((res): Promise<{ creatorAddress: string; alreadyExist: number }> => {
          if (res.ok) {
            return res.json()
          }
          return null
        })
        .then(({ creatorAddress, alreadyExist }) => {
          if (creatorAddress?.toLowerCase() !== account.toLowerCase()) {
            reject(new Error('You are not Creator'))
            return
          }

          // 0 pass 1 in whitelist -1 network error
          if (alreadyExist === 1) {
            reject(new Error('Already added in whitelist'))
            return
          }

          if (alreadyExist === -1) {
            reject(new Error('Network error, please try again'))
            return
          }

          const web3 = new Web3(Web3.givenProvider)
          const contract = new web3.eth.Contract(ERC20_ABI as any, USDT[chainId].address)

          contract.methods
              .transfer(OwnerAddress, String(10 * 10 ** USDT[chainId]?.decimals))
              .send({ from: account }, (sendError, transactionHash) => {
                if (sendError) {
                  reject(new Error(sendError.message ?? 'Transaction Error'))
                  return
                }
                _fetchTransactionInfo(web3, transactionHash)
                    .then(() => {
                      resolve()
                    })
                    .catch((error) => {
                      reject(new Error(error?.message ?? 'Connect Error, Please try later'))
                    })
              })
        })
        .catch((error) => {
          reject(new Error(error.message ?? 'Somthing Wrong'))
        })
    })
  }, [_fetchTransactionInfo, account, chainId, token, whiteListAddress])

  const handleSupply = async () => {
    if (disableSupply) return

    setLoading(true)
    setBtnText('Supplying')
    supplyCallback()
      .then(() => {
        setBtnText('Supply 10 USDT')
        setLoading(false)
        toastSuccess('Success')
      })
      .catch((error) => {
        setBtnText('Supply 10 USDT')
        setLoading(false)
        toastError(error.message)
      })
  }

  const [onPresentAddWhiteListModal] = useModal(
      <AddWhiteListModal
          title={t('addWhitelist')}
          handleSupply={handleSupply}
          whiteListAddress={whiteListAddress}
          token={token}
          disable={disableSupply}
          isLoading={loading}
      />,
      true,
      true,
      'addWhiteListModal',
  )

  return (
    <Page>
      <AppBody>
        <CardBody>
          <AutoColumn gap="20px">
            <Link href="/liquidity" passHref>
              <div style={{ padding: '0 0 14px 0' }}>
                <IconButton as="a" scale="sm">
                  <ArrowBackIcon width="22px" />
                </IconButton>
              </div>
            </Link>
            {/* <Text color="dark" fontSize="12px">
              {t('whiteListText')}
            </Text> */}
            <Text color="dark" fontSize="12px">
              <TextCenter>{t('liquidityTitle')}</TextCenter>
              {t('liquidityText1')}
              <br />
              {t('liquidityText2')}
              <br />
              {t('liquidityText3')}
              <br />
              {
                isMore ?
                    <>
                      {t('liquidityText4')}
                      <br />
                      {t('liquidityText5')}
                      <br />
                      {t('liquidityText6')}
                      <br />
                      {t('liquidityText7')}
                    </> : null
              }
              <div role="button" tabIndex={0} onKeyDown={() => {setMore(!isMore)}} style={{zoom: '0.96', color: '#5c53d3', cursor: 'pointer', textAlign: 'right'}} onClick={() => {setMore(!isMore)}}>{isMore ? t('hide') : t('more')}</div>
            </Text>
            <AutoColumn gap="10px">
              <Subtitle>{t('accountAddress')}</Subtitle>
              <AddressInputArea
                disabled={loading}
                onChange={(event) => {
                  setWhiteListAddress(event.target.value)
                }}
              />
            </AutoColumn>
            <AutoColumn gap="10px">
              <Subtitle>{t('tokenAddress')}</Subtitle>
              <AddressInputArea
                disabled={loading}
                onChange={(event) => {
                  setToken(event.target.value)
                }}
              />
            </AutoColumn>
            {/* <Text fontSize="12px" color="textDisabled">
              {t('tokenIssuerText')}
            </Text> */}
            <StyledButton
              width="100%"
              disabled={disableSupply}
              isLoading={loading}
              onClick={onPresentAddWhiteListModal}
            >
              {btnText}
            </StyledButton>
            {/* {
              Number(chainId) === 97 ?
              <StyledA href='https://t.me/PeopleEquity' target="_blank">{t('claimTestUSDCHere')}</StyledA> : null
            } */}
          </AutoColumn>
        </CardBody>
      </AppBody>
    </Page>
  )
}
