import styled from 'styled-components'
import {Image, useModal} from "@pancakeswap/uikit";
import {useTranslation} from "@pancakeswap/localization";
import Modal from './Modal'

const Wrapper = styled.div`
  font-size: 14px;
  margin-top: 24px;
  text-decoration: underline;
  cursor: pointer;
`

const Airdop: React.FC<React.PropsWithChildren> = () => {
  const [onAirdopModal] = useModal(<Modal/>)
  const { t } = useTranslation()

  return (
    <Wrapper onClick={onAirdopModal}>
      {t('airdop_click_claim_test_coins')}
    </Wrapper>
  )
}

export default Airdop
