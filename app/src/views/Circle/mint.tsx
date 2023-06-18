import styled, { useTheme } from 'styled-components'
import {useRouter} from "next/router";
import { Image, Button } from "@pancakeswap/uikit";
import CircleHeader from './components/CircleHeader'
import Page from '../Page'

const Wrapper = styled.div`
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 550px;
  background: #ffff;
  padding: 0 16px;
  position: relative;
`

const SelectInner = styled.div`
  flex: 1;
  margin-bottom: 87px;
  margin-top: 18px;
`

const SelectButton = styled(Button)`
  width: 105px;
`

const Select = styled.div``

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #e8e8e8;
  transform: scaleY(0.5);
  margin-bottom: 12px;
`

const TopBar = styled.div`
  height: 60px;
  width: 100%;
  border-radius: 12px;
  background: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`

const BottomBar = styled.div`
  position: absolute;
  bottom: 0;
  padding-top: 16px;
  width: calc(100% - 32px);
`


const ProjectAvatar = styled(Image)`
  margin-right: 10px;
  width: 32px;
  height: 32px;
`

const ProjectToken = styled.div``

const ProjectTokenName = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
  color: #15141f;
`

const ProjectTokenValue = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #a2a0a8;
`

const ProjectInfo = styled.div`
  display: flex;
  align-items: center;
`

const ProjectPrice = styled.div`
  display: flex;
  align-items: center;
`

const ProjectPriceValue = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 26px;
  color: #15141f;
  margin-right: 2px;
`

const List = styled.div`
  width: 100%;
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0 8px 0 8px;
`

const ListLeft = styled.div`
  display: flex;
  align-items: center;
`

const ListInfo = styled.div``

const ListRight = styled.div``

const Icon = styled(Image)`
  margin-right: 10px;
  width: 42px;
  height: 42px;
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

const BottomBarInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const BottomBarInnerLeft = styled.div``

const BottomBarInnerRight = styled.div``

const BottomBarTitle = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #15141f;
`

const BottomBarDesc = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 16px;
  color: #a2a0a8;
  &.error {
    color: #ff0000;

  }
`

export default function CircleHistory() {
  const router = useRouter()

  return (
      <Page>
        <Wrapper>
          <CircleHeader
              backFn={() => router.push('/circle/link')}
              title="NFT Mint"
              Right={<Select onClick={() => router.push('/circle/history')}>选择群组</Select>}
          />
          <TopBar>
            <ProjectInfo>
              <ProjectAvatar width={32} height={32} src='/images/tokens/eth.png' />
              <ProjectToken>
                <ProjectTokenName>MTBC</ProjectTokenName>
                <ProjectTokenValue>余额: 1902.27 MB</ProjectTokenValue>
              </ProjectToken>
            </ProjectInfo>
            <ProjectPrice>
              <ProjectPriceValue>$477.83</ProjectPriceValue>
            </ProjectPrice>
          </TopBar>
          <SelectInner>
            <List>
              <ListLeft>
                <Icon width={42} height={42} src="/images/tokens/eth.png" alt="link" />
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
            <List>
              <ListLeft>
                <Icon width={42} height={42} src="/images/tokens/eth.png" alt="link" />
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
            <List>
              <ListLeft>
                <Icon width={42} height={42} src="/images/tokens/eth.png" alt="link" />
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
          </SelectInner>
          <BottomBar>
            <Line />
            <BottomBarInner>
              <BottomBarInnerLeft>
                <BottomBarTitle>共计100人</BottomBarTitle>
                <BottomBarDesc>Gas fee: 0.03 BNB</BottomBarDesc>
              </BottomBarInnerLeft>
              <BottomBarInnerRight>
                <SelectButton>确定</SelectButton>
              </BottomBarInnerRight>
            </BottomBarInner>
          </BottomBar>
        </Wrapper>
      </Page>
  )
}