import styled from 'styled-components'
import {Button, InjectedModalProps, Modal} from "@pancakeswap/uikit";
import {useTranslation} from "@pancakeswap/localization";
import {useEffect} from "react";
import { useAirdopIsClaim, useAirdopClaim } from './hooks/useAirdopClaim'

const Wrapper = styled.div`
  padding: 12px;
  text-align: center;
`

const Title = styled.p`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: #000000;
  margin: 0 auto;
`

const Desc = styled.p`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #000000;
  margin: 24px auto 40px;
`

const StyledButton = styled(Button)`
  width: 100%;
  max-width: 300px;
`

const AirdopModal: React.FC<React.PropsWithChildren<InjectedModalProps>> = ({ onDismiss }) => {
  const isClaim = useAirdopIsClaim()
  const { t } = useTranslation()

  const { callback: claimCallback, claimCallback: status, isLoading } = useAirdopClaim()

  useEffect(() => {
    if (status === true) {
      onDismiss?.()
    }
  }, [status])

  return (
      <Modal minWidth={375} hideHeader onDismiss={() => {
        onDismiss?.()
      }} title="">
        <Wrapper>
          <Title>{t('airdop_claim_test_coins')}</Title>
          <Desc>{isClaim !== true ? t('airdop_can_claim') : t('airdop_n_can_claim')}</Desc>
          <StyledButton disabled={isLoading || isClaim === true || isClaim === null} onClick={() => {
            claimCallback()
          }}>{isLoading ? t('Loading') : t('Claim')}</StyledButton>
        </Wrapper>
      </Modal>
  )
}

export default AirdopModal
