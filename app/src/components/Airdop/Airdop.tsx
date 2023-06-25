import styled from 'styled-components'
import { useState, useMemo } from 'react'
import { Image, useModal } from "@pancakeswap/uikit";
import {useTranslation} from "@pancakeswap/localization";
import Modal from './Modal'
import useActiveWeb3React from "../../hooks/useActiveWeb3React";
import { AIRDOP_ADDRESS } from '../../config/constants/exchange'

const Wrapper = styled.div`
  font-size: 14px;
  margin-top: 24px;
  text-decoration: underline;
  cursor: pointer;
`

const Airdop: React.FC<React.PropsWithChildren> = () => {
  const { chainId } = useActiveWeb3React()
  const [onAirdopModal] = useModal(<Modal/>)
  const { t } = useTranslation()
  const [isSupportChain, setSupportChain] = useState(false)

  useMemo(() => {
    if (Object.keys(AIRDOP_ADDRESS).indexOf(chainId?.toString()) > -1) {
      setSupportChain(true)
    } else {
      setSupportChain(false)
    }
  }, [AIRDOP_ADDRESS, chainId])

  return (
      <>
        {
          isSupportChain ?
              <Wrapper onClick={onAirdopModal}>
                {t('airdop_click_claim_test_coins')}
              </Wrapper> : null
        }
      </>
  )
}

export default Airdop
