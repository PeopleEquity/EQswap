import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import { Card } from '@pancakeswap/uikit'
import { useRouter } from "next/router"
import CopyToClipboard from 'react-copy-to-clipboard'
import {useEffect, useState} from "react";
import useRankingDetails from "../../hooks/useRankingDetails";
import Page from '../Page'

const StyledAppBody = styled(Card)`
  border: none;
  border-radius: 6px;
  overflow: unset;
  max-width: 687px;
  width: 100%;
  z-index: 1;
  background: #f9f9fa;
  text-align: center;
  & > div {
    background: transparent;
  }
  @media screen and (max-width: 852px) {
    background: #fff;
  }
`

const TopBar = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  max-width: 616px;
`

const TopBarLeft = styled.div`
  display: flex;
`

const TopBarRight = styled.div`
  display: flex;
  align-items: center;
`

const Avatar = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  margin-right: 18px;
  @media screen and (max-width: 576px) {
    width: 48px;
    height: 48px;
  }
`

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const NickName = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 39px;
  display: flex;
  align-items: center;
  color: #15141f;
  @media screen and (max-width: 576px) {
    font-size: 16px;
    line-height: 26px;
  }
`

const Address = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #a2a0a8;
  display: flex;
  @media screen and (max-width: 576px) {
    font-size: 12px;
    line-height: 16px;
  }
`

const ListWrapper = styled.div`
  margin: 30px auto;
  width: 100%;
  max-width: 616px;
  background: linear-gradient(289.56deg, #000000 -5.06%, #2C2C2C 90.54%);
  border-radius: 18px;
  padding: 16px 24px 16px 16px;
  @media screen and (max-width: 576px) {
    margin: 20px auto 8px;
    padding: 12px 10px 12px 10px;
  }
`

const TradeWrapper = styled.div`
  max-width: 616px;
  margin: 0 auto 8px;
  padding: 16px 0 16px 16px;
  @media screen and (max-width: 576px) {
    padding: 12px 0px 12px 12px;
  }
`

const TradeTitle = styled.div`
  display: flex;
  align-items: center;
  height: 34px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
  color: #15141f;
  @media screen and (max-width: 576px) {
    font-size: 16px;
    line-height: 28px;
    height: 28px;
  }
`

const TradeIcon = styled.img`
  margin-right: 24px;
  width: 24px;
  height: 24px;
  @media screen and (max-width: 576px) {
    margin-right: 16px;
    width: 16px;
    height: 16px;
  }
`

const ListTitle= styled.div`
  display: flex;
  align-items: center;
  height: 34px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 34px;
  color: #FFFFFF;
  @media screen and (max-width: 576px) {
    font-size: 16px;
    line-height: 28px;
    height: 28px;
  }
`

const ListIcon = styled.img`
  margin-right: 24px;
  width: 24px;
  height: 24px;
  @media screen and (max-width: 576px) {
    width: 16px;
    height: 16px;
  }
`

const TwitterIcon = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 24px;
  cursor: pointer;
  @media screen and (max-width: 576px) {
    width: 24px;
    height: 24px;
  }
`

const TelegramIcon = styled.img`
  width: 36px;
  height: 36px;
  cursor: pointer;
  @media screen and (max-width: 576px) {
    width: 24px;
    height: 24px;
  }
`

const ListItem = styled.div`
  display: flex;
  align-items: center;
`

const No = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  color: #FFFFFF;
  margin: 0 18px 0 48px;
  min-width: 60px;
  text-align: left;
  @media screen and (max-width: 576px) {
    font-size: 12px;
    margin: 0 12px 0 40px;
    min-width: 48px;
  }
`

const ListInfo = styled.div`
  border-bottom: 0.75px solid rgba(255, 255, 255, 0.21);
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: space-between;
  height: 48px;
  @media screen and (max-width: 576px) {
    height: 30px;
  }
`

const ListItemTitle = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  color: #ffffff;
  text-align: left;
  & > span {
    font-size: 14px;
    margin-top: 6px;
    display: block;
  }
  @media screen and (max-width: 576px) {
    font-size: 12px;
  }
`

const ListItemValue = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: #1ab759;
  @media screen and (max-width: 576px) {
    font-size: 12px;
  }
`

const TradeItem = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 576px) {
    height: 30px;
  }
`

const TradeItemLeft = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  flex: 1;
`

const TradeItemRight = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`

const TradeItemIcon = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  @media screen and (max-width: 576px) {
    width: 18px;
    height: 18px;
  }
`

const TradeItemTokenName = styled.div`
  margin-left: 8px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: #15141f;
  @media screen and (max-width: 576px) {
    margin-left: 6px;
    font-size: 12px;
  }
`

const TradeItemDesc = styled.div`
  margin-left: 8px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 21px;
  color: #a2a0a8;
  @media screen and (max-width: 576px) {
    margin-left: 6px;
    font-size: 12px;
  }
`

const TradeItemGains = styled.div`
  margin-left: 24px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: #107c10;
  @media screen and (max-width: 576px) {
    margin-left: 8px;
    font-size: 12px;
  }

    `
const TradeItemChg = styled.div`
  width: 100px;
  height: 32px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 32px;
  color: #ffffff;
  text-align: center;
  background: #107c10;
  border-radius: 3px;
  @media screen and (max-width: 576px) {
    width: 72px;
    height: 24px;
    font-size: 12px;
    line-height: 24px;
    zoom: 0.84;
  }
`

const TradeItemSpan = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  color: #a2a0a8;
  @media screen and (max-width: 576px) {
    font-size: 12px;
    zoom: 0.84;
  }
`

const CopyWrapper = styled.div`
  position: relative;
`

const Tooltip = styled.div<{
  isTooltipDisplayed: boolean
}>`
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'inline' : 'none')};
  position: absolute;
  padding: 4px;
  top: -2px;
  right: -50px;
  text-align: center;
  font-size: 12px;
  background-color: ${({ theme }) => theme.colors.contrast};
  color: ${({ theme }) => theme.colors.invertedContrast};
  border-radius: 16px;
  opacity: 0.7;
  width: max-content;
`

const CopyButton = styled.div`
  cursor: pointer;
  width: 16px;
  height: 16px;
  background: url('/images/dcs/copy.png');
  background-size: 16px;
  margin-left: 8px;
`

const DetailsPage: React.FC<React.PropsWithChildren<{ address: string }>> = ({ address }) => {
  const { t } = useTranslation()
  const [copy, setCopied] = useState(false)
  const router = useRouter()

  const info = useRankingDetails(address)

  useEffect(() => {
    if (address !== 'undefined') {
      if (address.length !== 42 || address.slice(0, 2) !== '0x') {
        router.push('/404')
      }
    }
  }, [address])

  return (
    <Page style={{padding: '12px'}}>
      <StyledAppBody>
        <TopBar>
          <TopBarLeft>
            <Avatar src={info?.icon} />
            <InfoWrapper>
              <NickName>{info?.name}</NickName>
              <Address>
                {info?.user_short_wallet}
                {info?.user_short_wallet ? (
                    <CopyToClipboard text={info?.user_wallet} onCopy={() => {
                      setCopied(info?.user_wallet)
                      setTimeout(() => setCopied(null), 2000)
                    }}>
                      <CopyWrapper onClick={(e) => {
                        e.stopPropagation()
                      }}>
                        <CopyButton/>
                        <Tooltip isTooltipDisplayed={copy === info?.user_wallet}>{t('copied')}</Tooltip>
                      </CopyWrapper>
                    </CopyToClipboard>
                ) : null}
              </Address>
            </InfoWrapper>
          </TopBarLeft>
          <TopBarRight>
            {
              info?.links?.twitter_link ? <TwitterIcon src="/images/dcs/twitter.png" onClick={() => {window.open(info?.links?.twitter_link)}} /> : null
            }
            {
              info?.links?.tg_link ? <TelegramIcon src="/images/dcs/telegram.png" onClick={() => {window.open(info?.links?.tg_link)}} /> : null
            }
          </TopBarRight>
        </TopBar>
        <ListWrapper>
          <ListTitle>
            <ListIcon src="/images/dcs/listIcon.png" />
            {t('dcsList')}
          </ListTitle>
          <ListItem>
            <No>{info?.list?.twla_rank ? `No.${info?.list?.twla_rank}` : ''}</No>
            <ListInfo>
              <ListItemTitle>{t('teamWealthList')}</ListItemTitle>
              <ListItemValue>{info?.list?.twla ? `+$${info?.list?.twla}` : '-'}</ListItemValue>
            </ListInfo>
          </ListItem>
          <ListItem>
            <No>{info?.list?.rwla_rank ? `No.${info?.list?.rwla_rank}` : ''}</No>
            <ListInfo>
              <ListItemTitle>{t('recommendWealthList')}</ListItemTitle>
              <ListItemValue>{info?.list?.rwla ? `+$${info?.list?.rwla}` : '-'}</ListItemValue>
            </ListInfo>
          </ListItem>
          <ListItem>
            <No>{info?.list?.rela_rank ? `No.${info?.list?.rela_rank}` : ''}</No>
            <ListInfo>
              <ListItemTitle>
                {t('recommendEarningsList')}
                <br />
                <span>{t('recommendEarningsListSubTitle')}</span>
              </ListItemTitle>
              <ListItemValue>{info?.list?.rela ? `+$${info?.list?.rela}` : '-'}</ListItemValue>
            </ListInfo>
          </ListItem>
          <ListItem>
            <No>{info?.list?.links_rank ? `No.${info?.list?.links_rank}` : ''}</No>
            <ListInfo>
              <ListItemTitle>{t('recommendNumberList')}</ListItemTitle>
              <ListItemValue>{info?.list?.links ? `${info?.list?.links}` : '-'}</ListItemValue>
            </ListInfo>
          </ListItem>
        </ListWrapper>
        <TradeWrapper>
          <TradeTitle>
            <TradeIcon src="/images/dcs/tradeIcon.png" />
            {t('dcsTrade')}
          </TradeTitle>
          <TradeItem>
            <TradeItemLeft>
              <TradeItemSpan>{t('dcsName')}</TradeItemSpan>
            </TradeItemLeft>
            <TradeItemRight>
              <TradeItemSpan style={{marginLeft: '24px'}}>{t('dcsGains')}</TradeItemSpan>
              <TradeItemSpan>{t('dcs%Chg')}</TradeItemSpan>
            </TradeItemRight>
          </TradeItem>
          {
            info?.trade_list?.length > 0 ? info?.trade_list.map((item) => (
                <TradeItem>
                  <TradeItemLeft>
                    <TradeItemIcon src={item.icon} />
                    <TradeItemTokenName>{item.token_name}</TradeItemTokenName>
                    <TradeItemDesc>{item.token_description}</TradeItemDesc>
                  </TradeItemLeft>
                  <TradeItemRight>
                    <TradeItemGains>{`+$${item.gains}`}</TradeItemGains>
                    <TradeItemChg>{`+${item.chg}%`}</TradeItemChg>
                  </TradeItemRight>
                </TradeItem>
            )) : null
          }
        </TradeWrapper>
      </StyledAppBody>
    </Page>
  )
}

export default DetailsPage