import styled, { useTheme } from 'styled-components'
import {useRouter} from "next/router";
import { Image } from '@pancakeswap/uikit'
import LinkSwitch from './components/LinkSwitch'
import CircleHeader from './components/CircleHeader'
import LinkInfo from './components/LinkInfo'
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

const CurrentProject = styled.div`
  cursor: pointer;
  margin-top: 12px;
  width: 100%;
  height: 60px;
  background: #FFFFFF;
  border: 1px solid #e7e8f3;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  padding: 0 12px 0 16px;
  align-items: center;
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

const ProjectAvatar = styled(Image)`
  margin-right: 10px;
  width: 32px;
  height: 32px;
`

const ToArrow = styled(Image)`
  width: 16px;
  height: 16px;
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

const History = styled.div`
  cursor: pointer;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #11142d;
`

export default function CircleList() {
  const router = useRouter()

  return (
      <Page>
        <LinkWrapper>
          <CircleHeader
              backFn={() => router.push('/circle')}
              title="批量绑定"
              Right={<History onClick={() => router.push('/circle/history')}>历史记录</History>}
          />
          <LinkSwitch />
          <CurrentProject>
            <ProjectInfo>
              <ProjectAvatar width={32} height={32} src='/images/tokens/eth.png' />
              <ProjectToken>
                <ProjectTokenName>MTBC</ProjectTokenName>
                <ProjectTokenValue>余额: 1902.27 MB</ProjectTokenValue>
              </ProjectToken>
            </ProjectInfo>
            <ProjectPrice>
              <ProjectPriceValue>$477.83</ProjectPriceValue>
              <ToArrow width={16} height={16} src='/images/circle/arrow.png' />
            </ProjectPrice>
          </CurrentProject>
          <LinkInfo />
        </LinkWrapper>
      </Page>
  )
}