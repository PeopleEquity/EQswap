import styled from 'styled-components'
import {Card, Image} from '@pancakeswap/uikit'


import Page from '../Page'
import Telegram from './components/Telegram'
import InfoWrapper from './components/InfoWrapper'

const StyledAppBody = styled(Card)`
  border: none;
  border-radius: 24px;
  max-width: 390px;
  width: 100%;
  z-index: 1;
  background: #ebf3f5;
  text-align: center;
  & > div {
    background: transparent;
  }
`

const StyledImage = styled(Image)`
  position: relative;
  margin-bottom: -60px;
  z-index: -1;
`

export default function Income() {

  return (
    <Page>
      <StyledAppBody>
        <StyledImage width={390} height={268} src="/images/income/bg.png" />
        <Telegram />
        <InfoWrapper />
      </StyledAppBody>
    </Page>
  )
}
