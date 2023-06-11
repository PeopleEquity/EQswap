import styled, { useTheme } from 'styled-components'
import { useRouter } from "next/router";
import { useState } from 'react'
import { Image } from '@pancakeswap/uikit'
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

const NFTInfoWrapper = styled.div`
  padding: 0 8px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

const NFTImage = styled(Image)`
  margin: 0 auto;
  width: 100px;
  height: 100px;
`

const NFTName = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #15141f;
  margin: 6px 0 2px 0;
`

const NFTInfoInner = styled.div`
  width: 200px;
  margin: 0 auto;
`

const CliamTag = styled.div`
  width: 64px;
  height: 21px;
  line-height: 21px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #15141f;
  zoom: 0.83;
  background: #ededed;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const UnCliamTag = styled.div`
  width: 64px;
  height: 21px;
  line-height: 21px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #15141f;
  zoom: 0.83;
  background: #def6ea;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CheckImage = styled(Image)`
  width: 10px;
  height: 10px;
  margin-right: 4px;
`

const ProjectImg = styled(Image)`
  width: 64px;
  height: 64px;
  margin-right: 16px;
`

const ProjectInfoWrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`

const ProjectInfo = styled.div``

const ProjectName = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 26px;
  color: #15141f;
  margin-bottom: 8px;
`

const ProjectAddress = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #A2A0A8;
`

const HistoryWrapper = styled.div``

const Tab = styled.div`
  margin: 32px 0 12px 0;
`

const TabItem = styled.div`
  
`

export default function projectDetails() {
  const router = useRouter()
  const isCliam = false
  const [tab, setTab] = useState(0)

  return (
      <Page>
        <LinkWrapper>
          <CircleHeader backFn={() => router.push('/circle')} title="NFT Mint" Right={null} />
          <ProjectInfoWrapper>
            <ProjectImg width={64} height={64} src='/images/tokens/eth.png' />
            <ProjectInfo>
              <ProjectName>MTBC NFT</ProjectName>
              <ProjectAddress>0x3d52…y83762T</ProjectAddress>
            </ProjectInfo>
          </ProjectInfoWrapper>
          <Tab>
            <TabItem>项目</TabItem>
            <TabItem>历史记录</TabItem>
          </Tab>
          {
            tab === 0 ?
                <NFTInfoWrapper>
                  <NFTInfoInner>
                    <NFTImage width={100} height={100} src='/images/circle/nft_demo.png' />
                    <NFTName>NFT 名称 #0</NFTName>
                    {
                      isCliam ?
                          <CliamTag><CheckImage width={10} height={10} src='/images/circle/check.png' />已领取</CliamTag> :
                          <UnCliamTag><CheckImage width={10} height={10} src='/images/circle/uncheck.png' />未领取</UnCliamTag>
                    }
                  </NFTInfoInner>
                  <NFTInfoInner>
                    <NFTImage width={100} height={100} src='/images/circle/nft_demo.png' />
                    <NFTName>NFT 名称 #0</NFTName>
                    {
                      isCliam ?
                          <CliamTag><CheckImage width={10} height={10} src='/images/circle/check.png' />已领取</CliamTag> :
                          <UnCliamTag><CheckImage width={10} height={10} src='/images/circle/uncheck.png' />未领取</UnCliamTag>
                    }
                  </NFTInfoInner>
                  <NFTInfoInner>
                    <NFTImage width={100} height={100} src='/images/circle/nft_demo.png' />
                    <NFTName>NFT 名称 #0</NFTName>
                    {
                      isCliam ?
                          <CliamTag><CheckImage width={10} height={10} src='/images/circle/check.png' />已领取</CliamTag> :
                          <UnCliamTag><CheckImage width={10} height={10} src='/images/circle/uncheck.png' />未领取</UnCliamTag>
                    }
                  </NFTInfoInner>
                </NFTInfoWrapper> : null
          }
          {
            tab === 1 ?
                <HistoryWrapper>
                </HistoryWrapper> : null
          }
        </LinkWrapper>
      </Page>
  )
}