import styled, { useTheme } from 'styled-components'
import {useRouter} from "next/router";
import { Image } from "@pancakeswap/uikit";
import CircleHeader from './components/CircleHeader'
import Page from '../Page'

const LinkWrapper = styled.div`
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 550px;
  background: #ffff;
  padding: 0 16px;
`

const Line = styled.div`
  width: calc(100% - 16px);
  height: 1px;
  background: #efefef;
  transform: scaleY(0.5);
  margin-left: 8px;
`

const List = styled.div`
  width: 100%;
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0 8px 0 8px;
  border-radius: 8px;
  &:hover {
    background: #e8e8e8;  
  }
`

const ListLeft = styled.div`
  display: flex;
  align-items: center;
`

const ListInfo = styled.div``

const ListRight = styled.div``

const Icon = styled(Image)`
  margin-right: 10px;
  width: 32px;
  height: 32px;
`

const ListTitle = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
  color: #15141f;
`

const ListDesc = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #a2a0a8;
`

const ListValue = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  text-align: right;
  color: #11142d;
`

export default function CircleHistory() {
  const router = useRouter()

  return (
      <Page>
        <LinkWrapper>
          <CircleHeader backFn={() => router.push('/circle/link')} title="历史记录" Right={null} />
          <List onClick={() => router.push('/circle/whitelist')}>
            <ListLeft>
              <Icon width={32} height={32} src="/images/tokens/eth.png" alt="link" />
              <ListInfo>
                <ListTitle>MTBC</ListTitle>
                <ListDesc>Metabolic</ListDesc>
              </ListInfo>
            </ListLeft>
            <ListRight>
              <ListValue>11900</ListValue>
            </ListRight>
          </List>
          <Line />
          <List onClick={() => router.push('/circle/whitelist')}>
            <ListLeft>
              <Icon width={32} height={32} src="/images/tokens/eth.png" alt="link" />
              <ListInfo>
                <ListTitle>VDGT</ListTitle>
                <ListDesc>VeleroDAO</ListDesc>
              </ListInfo>
            </ListLeft>
            <ListRight>
              <ListValue>11800</ListValue>
            </ListRight>
          </List>
          <Line />
          <List onClick={() => router.push('/circle/whitelist')}>
            <ListLeft>
              <Icon width={32} height={32} src="/images/tokens/eth.png" alt="link" />
              <ListInfo>
                <ListTitle>ZAP</ListTitle>
                <ListDesc>Zappy</ListDesc>
              </ListInfo>
            </ListLeft>
            <ListRight>
              <ListValue>11500</ListValue>
            </ListRight>
          </List>
          <Line />
        </LinkWrapper>
      </Page>
  )
}