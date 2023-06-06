import styled from 'styled-components'
import {Image, useModal} from "@pancakeswap/uikit";
import Modal from './Modal'

const Wrapper = styled.div`
  position: fixed;
  z-index: 10000;
  right: 36px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
`

const Airdop: React.FC<React.PropsWithChildren> = () => {
  const [onAirdopModal] = useModal(<Modal/>)

  return (
    <Wrapper onClick={onAirdopModal}>
      <Image src="/images/airdop/stopcock.png" width={36} height={36} />
    </Wrapper>
  )
}

export default Airdop
