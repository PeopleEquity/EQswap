import styled from 'styled-components'
import {useMemo, useRef, useState} from 'react'
import { useTranslation } from '@pancakeswap/localization'
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { BigNumber } from "bignumber.js";
import CopyToClipboard from 'react-copy-to-clipboard'
import {useMatchBreakpointsContext, useOnClickOutside} from "@pancakeswap/uikit";
import useRankingInfo from "../../../hooks/useRankingInfo";
import PageBtnList from "./PageBtnList";
import {PredictionsChartView} from "../../../state/types";

const TopBar = styled.div`
  margin: 14px 0;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 852px) {
    margin: 0;
  }
`

const ListWrapper = styled.div`
  width: 100%;
  height: fit-content;
  overflow: hidden;
  position: relative;
`

const ListItem = styled.div`
  width: 100%;
  height: 56px;
  border-bottom: 1px solid rgba(232, 232, 232, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  @media screen and (max-width: 852px) {
    height: 80px;
  }
`

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  @media screen and (max-width: 852px) {
    width: 32px;
    height: 32px;
    margin: 0 9px;
  }
`

const Index = styled.div`
  margin: 0px 30px;
  line-height: 56px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #15141f;
  align-items: center;
  width: 20px;
  @media screen and (max-width: 852px) {
    margin: 0px;
  }
`

const UserName = styled.div`
  display: flex;
  align-items: center;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #15141f;
  overflow: hidden;
  white-space: pre;
  line-height: 26px;
  text-overflow: ellipsis;
  min-width: 160px;
  @media screen and (max-width: 852px) {
    width: 200px;
  }
`

const Desc = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #a2a0a8;
  line-height: 16px;
  justify-content: right;
  margin-right: 20px;
`

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 40%;
  overflow: hidden;
  @media screen and (max-width: 852px) {
    flex: 0 0 50%;
    overflow: hidden;
  }
`

const Rate = styled.div`
  margin-right: 36px;
  line-height: 32px;
  min-width: 82px;
  height: 32px;
  border-radius: 4px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  background: #107c10;
  color: white;
  @media screen and (max-width: 576px) {
    min-width: 60px;
    height: 24px;
    font-size: 12px;
    line-height: 24px;
    margin-right: 0;
  }
`

const ValueLeft = styled.div`
  display: flex;
  @media screen and (max-width: 852px) {
    flex-direction: column;
  }
`

const ValueWrapper = styled.div`
  display: flex;
  flex: 0 0 35%;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 852px) {
    justify-content: right;
    flex: 0 0 50%;
    overflow: hidden;
  }
`

const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 0 18px;
  @media screen and (max-width: 852px) {
    align-items: baseline;
    flex-direction: column;
    width: 160px;
    margin: 0 0 0 18px;
  }
  @media screen and (max-width: 576px) {
    margin: 0 0 0 9px;
  }
`

const UserWrapper2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 0 18px;
  @media screen and (max-width: 852px) {
    align-items: baseline;
    flex-direction: column;
    width: 160px;
    margin: 0 0 0 18px;
  }
  @media screen and (max-width: 576px) {
    margin: 0 0 0 9px;
  }
`

const Price = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  width: 120px;
  color: #000;
  margin-right: 20px;
  overflow: hidden;
  white-space: pre;
  text-overflow: ellipsis;
  line-height: 26px;
  @media screen and (max-width: 852px) {
    margin-right: 20px;
    width: 120px;
    text-align: right;
  }
`

const Vol = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  align-items: center;
  color: #a2a0a8;
  line-height: 16px;
  display: flex;
  @media screen and (max-width: 852px) {
    justify-content: right;
    margin-right: 20px;
  }
`

const Left = styled.div`
  position: relative;
  overflow: hidden;
  left: 0%;
  transition: left 0.4s;
  &.left {
    left: -100%;  
  }
`

const Right = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 100%;
  top: 0;
  background: #ffffff;
  transition: left 0.4s;
  &.left {
    left: 0%;
  }
`

const ScrollSubMenu = styled.div`
  height: 40px;
  overflow: hidden;
`

const SubMenu = styled.div`
  margin-bottom: 6px;
  overflow-x: scroll;
  scrollbar-base-color: transparent;
`

const SubMenuInner = styled.div`
  display: inline-flex;
  justify-content: center;
`

const SubMenuItem = styled.div`
  height: 40px;
  line-height: 40px;
  border-bottom: 2px solid transparent;
  margin: 0 18px;
  cursor: pointer;
  position: relative;
  color: #52525c;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  white-space: pre;
  &.active {
    border-bottom: 2px solid #4263eb;
    color: #4263eb;
  }
`

const Back = styled.div`
  width: 40px;
  height: 40px;
  background: url('/images/dcs/back.png');
  cursor: pointer;
  background-size: cover;
`


const Address = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: #15141f;
  display: flex;
  @media screen and (max-width: 576px) {
    font-size: 12px;
  }
`

const InfoWrapper2 = styled.div`
  display: flex;
  align-items: center;
`

const ValueWrapper2 = styled.div`
  margin-right: 36px;
  line-height: 56px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  text-align: right;
  color: #107c10;
  white-space: pre;
  @media screen and (max-width: 852px) {
    margin-right: 0px;
  }
`

const CopyButton = styled.div`
  cursor: pointer;
  width: 16px;
  height: 16px;
  background: url('/images/dcs/copy.png');
  background-size: 16px;
  margin-left: 8px;
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

const UserNameSkeleton = styled.div`
  overflow: hidden;
  margin: 0 23px 0 18px;
  @media screen and (max-width: 968px) {
    width: 200px;
    margin: 0 0 0 18px;
  }
  @media screen and (max-width: 576px) {
    width: 80px;
    margin: 0 0 0 9px;
  }
`

const SecondPageTopBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 14px 24px 6px;
  @media screen and (max-width: 576px) {
    padding: 14px 0px 6px;
  }
`

const TokenWrapper = styled.div`
  display: flex;
  align-items: center;
`

const TokenName = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 40px;
  display: flex;
  align-items: center;
  color: #333333;
  margin-right: 14px;
`

const TokenIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  @media screen and (max-width: 852px) {
    width: 32px;
    height: 32px;
    margin: 0 9px;
  }
`

const FilterTimeWrapper = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  & > span {
    width: 16px;
    height: 16px;
    margin-left: 6px;
    background-image: url('/images/dcs/arrow.png');
    display: block;
    background-size: 16px;
    background-repeat: no-repeat;
    transition: all 0.4s; 
    &.active {
      transform: rotate(180deg);
    }
  }
`

const FilterTime = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: right;
  letter-spacing: -0.02em;
  color: #52525c;
`

const TimeMenu = styled.div`
  width: 86px;
  padding: 6px 0px;
  position: absolute;
  right: 0px;
  top: 32px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 100;
`

const TimeMenuItem = styled.div`
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 15px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  text-align: left;
  color: #15141f;
  cursor: pointer;
  :hover {
    background: #f3f4f9;
  }
`

export default function CurrenciesList({type, setIsShowMenu}) {
  const { t, currentLanguage } = useTranslation()
  const { isDesktop } = useMatchBreakpointsContext()
  const [copy, setCopied] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [page2CurrentPage, setPage2CurrentPage] = useState(1)
  const [subType, setSubType] = useState<'recommend' | 'team' | 'income' | 'people'>('recommend')
  const [tokenAddress, setTokenAddress] = useState<string>('0')
  const [isLoading, setLoading] = useState(false)
  const [isPage2Loading, setPage2Loading] = useState(false)
  const [tokenInfo, setTokenInfo] = useState({icon: undefined, name: undefined})
  const [visible, setVisible] = useState(false)
  const timeList = useMemo(() => {
    return [
      {
        key: 'month',
        value: t('dcsmonth')
      },
      {
        key: 'quarter',
        value: t('dcs3months')
      },
      {
        key: 'halfYear',
        value: t('dcs6months')
      },
      {
        key: 'Year',
        value: t('dcsyear')
      },
      {
        key: 'history',
        value: t('dcsAll')
      }
    ]
  }, [currentLanguage.language, t])
  const [timeType, setTimeType] = useState(timeList[0])
  const size = 10
  const { list: tokenList, page } = useRankingInfo('currencies', size, timeType.key, type, currentPage, setLoading)
  const { list, page: secondPage } = useRankingInfo(subType === 'recommend' || subType === 'team' ? 'wealth' : 'trending', size, timeType.key, subType, page2CurrentPage, setPage2Loading, tokenAddress)
  const SkeletonWrapper = []
  for (let i = 0; i < size; i++) {
    SkeletonWrapper.push(<ListItem>
      <InfoWrapper>
        <Index>
          <Skeleton width={20} />
        </Index>
        <Skeleton width={48} height={48} circle style={!isDesktop ? {marginLeft: '12px'} : {}}  />
        <UserWrapper>
          <UserName>
            <Skeleton width={80} count={isDesktop ? 1 : 2} />
          </UserName>
        </UserWrapper>
      </InfoWrapper>
      <ValueWrapper>
        <ValueLeft>
          <Price>
            <Skeleton width={isDesktop ? 80 : 60} />
          </Price>
          <Vol>
            <Skeleton width={isDesktop ? 80 : 60} />
          </Vol>
        </ValueLeft>
        {/* <Skeleton style={{marginRight: isDesktop ? 36 : 0}} width={isDesktop ? 82 : 60} height={isDesktop ? 32 : 24} /> */}
      </ValueWrapper>
    </ListItem>)
  }

  const SkeletonWrapper2 = []
  for (let i = 0; i < size; i++) {
    SkeletonWrapper2.push(<ListItem key={i}>
      <InfoWrapper2>
        <Index>
          <Skeleton width={20} />
        </Index>
        <Skeleton width={48} height={48} circle style={!isDesktop ? {marginLeft: '12px'} : {}}  />
        {
          !isDesktop ?
              <>
                <UserNameSkeleton>
                  <Skeleton width={200} count={2} />
                </UserNameSkeleton>
              </> :
              <>
                <UserNameSkeleton>
                  <Skeleton width={160} count={1} />
                </UserNameSkeleton>
                <Address>
                  <Skeleton width={136} style={!isDesktop ? {display: 'none'} : {}} />
                </Address>
              </>
        }
      </InfoWrapper2>
      <ValueWrapper2>
        <Skeleton width={160} />
      </ValueWrapper2>
    </ListItem>)
  }

  const toStringAmt = function (amt) {
    const intString = new BigNumber(amt).toFixed(0, 0).split(',')[0]
    const maxLength = 5
    if (intString.length >= 10) {
      return `${new BigNumber(intString).dividedBy(new BigNumber(10).pow(9)).toFixed(maxLength - 1, 0)} B`
    }
    if (intString.length >= 7) {
      return `${new BigNumber(intString).dividedBy(new BigNumber(10).pow(6)).toFixed(maxLength - 1, 0)} M`
    }
    if (intString.length >= 4) {
      return `${new BigNumber(intString).dividedBy(new BigNumber(10).pow(3)).toFixed(maxLength - 1, 0)} K`
    }
    return `${new BigNumber(amt).toFixed(maxLength - intString.length, 0)}`
  }

  const node = useRef<HTMLDivElement>()
  useOnClickOutside(node, setVisible ? () => setVisible(false)  : undefined)
  const menu = useMemo(() => {
    return (
        <TimeMenu ref={node as any}>
          {
            timeList.map((item, i) => (
                <TimeMenuItem onClick={() => {
                  setTimeType(item)
                  setVisible(false)
                }}>{item.value}</TimeMenuItem>
            ))
          }
        </TimeMenu>
    )
  }, [timeList])

    return (
        <>
          <TopBar />
          {
            tokenAddress !== '0' ?
                <>
                  <SecondPageTopBar>
                    <Back onClick={() => {
                      setTokenAddress('0')
                      setPage2CurrentPage(1)
                      setSubType('recommend')
                      setIsShowMenu(true)
                    }} />
                    {
                      tokenInfo?.icon !== null && tokenInfo?.name !== null ?
                      <TokenWrapper>
                        <TokenIcon src={tokenInfo?.icon} />
                        <TokenName title={tokenInfo?.name}>{tokenInfo?.name}</TokenName>
                      </TokenWrapper> : null
                    }
                    <FilterTimeWrapper onClick={(e) => {
                      e.preventDefault()
                      if (!visible) {
                        setVisible(true)
                      }
                    }}>
                      <FilterTime>{timeType.value}</FilterTime>
                      <span className={visible ? 'active' : ''} />
                      {
                        visible ? menu : null
                      }
                    </FilterTimeWrapper>
                  </SecondPageTopBar>
                  <ScrollSubMenu>
                    <SubMenu>
                      <SubMenuInner>
                        <SubMenuItem className={subType === 'recommend' ? 'active' : ''} onClick={() => {
                          setSubType('recommend')
                          setPage2CurrentPage(1)
                        }}>{t('dcsTotalEarnings')}</SubMenuItem>
                        <SubMenuItem className={subType === 'team' ? 'active' : ''} onClick={() => {
                          setSubType('team')
                          setPage2CurrentPage(1)
                        }}>{t('dcsCommunityEarnings')}</SubMenuItem>
                        <SubMenuItem className={subType === 'income' ? 'active' : ''} onClick={() => {                  if (isLoading) return
                          setSubType('income')
                          setPage2CurrentPage(1)
                        }}>{t('dcsKOLEarnings')}</SubMenuItem>
                        <SubMenuItem className={subType === 'people' ? 'active' : ''} onClick={() => {                  if (isLoading) return
                          setSubType('people')
                          setPage2CurrentPage(1)
                        }}>{t('dcsCreditLinks')}</SubMenuItem>
                      </SubMenuInner>
                    </SubMenu>
                  </ScrollSubMenu>
                </> : null
          }
          <ListWrapper>
            <Left className={tokenAddress !== '0' ? 'left' : ''}>
              {
                isLoading ?
                    <>
                      {SkeletonWrapper}
                    </> :
                    <>
                      {
                        tokenList && tokenList?.length > 0 ? (
                            tokenList.map((item, i) => (
                                <ListItem style={item?.token_addr ? {cursor: 'pointer'} : {}} key={item?.index} onClick={() => {
                                  if (item?.token_addr) {
                                    setTokenAddress(item?.token_addr)
                                    setTokenInfo({icon: item?.icon, name: item?.symbol})
                                    setIsShowMenu(false)
                                  }
                                }}>
                                  <InfoWrapper>
                                    <Index>
                                      {item?.symbol ? String(i + (currentPage - 1) * 10 + 1).length === 1 ? `0${  i + (currentPage - 1) * 10 + 1}` : i + (currentPage - 1) * 10 + 1 : ''}
                                    </Index>
                                    {item?.icon ? <Avatar src={item?.icon} /> : null}
                                    <UserWrapper>
                                      <UserName title={item.symbol}>{item.symbol}</UserName>
                                      <Desc>{item.description}</Desc>
                                    </UserWrapper>
                                  </InfoWrapper>
                                  <ValueWrapper>
                                    {
                                      item?.symbol ?
                                          <>
                                            <ValueLeft>
                                              <Price>{`${toStringAmt(item.price)} ${item.unit}`}</Price>
                                              <Vol>{`Vol ${toStringAmt(item.vol)}`}</Vol>
                                            </ValueLeft>
                                            {/* <Rate>{`+${item.rate}%`}</Rate> */}
                                          </> : null
                                    }
                                  </ValueWrapper>
                                </ListItem>
                            ))
                        ) : null
                      }
                      <PageBtnList page={page} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </>
              }
            </Left>
            <Right className={tokenAddress !== '0' ? 'left' : ''}>
              {
                isPage2Loading ?
                    <>
                      {SkeletonWrapper2}
                    </> :
                    <>
                      {
                        list && list?.length > 0 ? (
                            list.map((item, i) => (
                                <ListItem style={item?.wallet ? {cursor: 'pointer'} : {}} key={item?.index} onClick={() => {
                                  if (item?.wallet) {
                                    window.open(`/dcs/${item.wallet}`)
                                  }
                                }}>
                                  <InfoWrapper2>
                                    <Index>
                                      {item?.symbol ? (String(i + (currentPage - 1) * 10 + 1).length === 1 ? `0${  i + (currentPage - 1) * 10 + 1}` : i + (currentPage - 1) * 10 + 1) : ''}
                                    </Index>
                                    <Avatar src={item?.icon} />
                                    <UserWrapper2>
                                      <UserName title={item.symbol}>{item.symbol}</UserName>
                                      <Address>
                                        {item.shortWallet}
                                        {item?.wallet ? (
                                            <CopyToClipboard text={item.wallet} onCopy={() => {
                                              setCopied(item.wallet)
                                              setTimeout(() => setCopied(null), 2000)
                                            }}>
                                              <CopyWrapper onClick={(e) => {
                                                e.stopPropagation()
                                              }}>
                                                <CopyButton/>
                                                <Tooltip isTooltipDisplayed={copy === item.wallet}>{t('copied')}</Tooltip>
                                              </CopyWrapper>
                                            </CopyToClipboard>
                                        ) : null}
                                      </Address>
                                    </UserWrapper2>
                                  </InfoWrapper2>
                                  <ValueWrapper2>
                                    {item?.symbol ? (subType === 'people' ? `${item.amt}` : `${toStringAmt(item.amt)} ${item.unit}`) : ''}
                                  </ValueWrapper2>
                                </ListItem>
                            ))
                        ) : null
                      }
                    </>
              }
              <PageBtnList page={secondPage} currentPage={page2CurrentPage} setCurrentPage={setPage2CurrentPage} />
            </Right>
          </ListWrapper>
        </>
    )
}
