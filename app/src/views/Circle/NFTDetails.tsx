import styled, { useTheme } from 'styled-components'
import { useRouter } from "next/router";
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
`

const NFTImage = styled(Image)`
  margin: 0 auto;
  width: 200px;
  height: 200px;
`

const NFTName = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 28px;
  color: #15141f;
  margin: 10px 0 6px 0;
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

const NFTInfo = styled.div`
  width: 100%;
  margin-top: 22px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const NFTInfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const NFTInfoItemLeft = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #8e9bae;
`

const NFTInfoItemRight = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #000000;
`

const CheckImage = styled(Image)`
  width: 10px;
  height: 10px;
  margin-right: 4px;
`

export default function NFTDetails() {
  const router = useRouter()
  const isCliam = false

  return (
      <Page>
        <LinkWrapper>
          <CircleHeader backFn={() => router.push('/circle')} title="NFT Mint" Right={null} />
          <NFTInfoWrapper>
            <NFTInfoInner>
              <NFTImage width={200} height={200} src='/images/circle/nft_demo.png' />
              <NFTName>NFT 名称 #0</NFTName>
              {
                isCliam ?
                    <CliamTag><CheckImage width={10} height={10} src='/images/circle/check.png' />已领取</CliamTag> :
                    <UnCliamTag><CheckImage width={10} height={10} src='/images/circle/uncheck.png' />未领取</UnCliamTag>
              }
            </NFTInfoInner>
            <NFTInfo>
              <NFTInfoItem>
                <NFTInfoItemLeft>合约地址</NFTInfoItemLeft>
                <NFTInfoItemRight>0x55d3…197955</NFTInfoItemRight>
              </NFTInfoItem>
              <NFTInfoItem>
                <NFTInfoItemLeft>Token ID</NFTInfoItemLeft>
                <NFTInfoItemRight>0</NFTInfoItemRight>
              </NFTInfoItem>
              <NFTInfoItem>
                <NFTInfoItemLeft>网络</NFTInfoItemLeft>
                <NFTInfoItemRight>BNB Chain</NFTInfoItemRight>
              </NFTInfoItem>
              <NFTInfoItem>
                <NFTInfoItemLeft>From</NFTInfoItemLeft>
                <NFTInfoItemRight>0x55d3…197955</NFTInfoItemRight>
              </NFTInfoItem>
              <NFTInfoItem>
                <NFTInfoItemLeft>To</NFTInfoItemLeft>
                <NFTInfoItemRight>0x55d3…197955</NFTInfoItemRight>
              </NFTInfoItem>
            </NFTInfo>
          </NFTInfoWrapper>
        </LinkWrapper>
      </Page>
  )
}