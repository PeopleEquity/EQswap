import styled from 'styled-components'
import {InjectedModalProps, Modal} from "@pancakeswap/uikit";
import { useAirdopIsClaim } from './hooks/useAirdopClaim'

const Wrapper = styled.div`
  padding: 36px;
  text-align: center;
`

const AirdopModal: React.FC<React.PropsWithChildren<InjectedModalProps>> = ({ onDismiss }) => {
  const isClaim = useAirdopIsClaim()

  /* const { callback: claimCallback, error: claimCallbackError } = useAirdopClaim() */

  return (
      <Modal hideHeader onDismiss={() => {
        onDismiss?.()
      }} title="">
        <Wrapper>
          test
        </Wrapper>
      </Modal>
  )
}

export default AirdopModal
