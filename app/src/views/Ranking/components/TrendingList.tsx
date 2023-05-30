import styled, { useTheme } from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import {BigNumber} from "bignumber.js";
import Skeleton from "react-loading-skeleton";
import {useEffect, useState} from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import 'react-loading-skeleton/dist/skeleton.css'
import {useMatchBreakpointsContext} from "@pancakeswap/uikit";
import PageBtnList from "./PageBtnList";
import useRankingInfo from "../../../hooks/useRankingInfo";

const ListWrapper = styled.div`
  width: 100%;
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
  margin: 0px;
  @media screen and (max-width: 852px) {
    margin: 0 9px;
  }
`

const Index = styled.div`
  margin: 0 18px;
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

const UserName = styled.div`
  display: flex;
  align-items: center;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  color: #15141f;
  overflow: hidden;
  white-space: pre;
  line-height: 26px;
  text-overflow: ellipsis;
  min-width: 160px;
  @media screen and (max-width: 968px) {
    width: 200px;
  }
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

const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
`

const ValueWrapper = styled.div`
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

export default function TrendingList({timeType, type}) {
  const theme = useTheme()
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState(1)
  const { isDesktop } = useMatchBreakpointsContext()
  const [copy, setCopied] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const size = 10
  const { list, page } = useRankingInfo('trending', size, timeType.key, type, currentPage, setLoading)

  const SkeletonWrapper = []
  for (let i = 0; i < size; i++) {
    SkeletonWrapper.push(<ListItem key={i}>
      <InfoWrapper>
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
      </InfoWrapper>
      <ValueWrapper>
        <Skeleton width={160} />
      </ValueWrapper>
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

  useEffect(() => {
    setCurrentPage(1)
  }, [type])

  return (
      <>
        <ListWrapper>
          {
            isLoading ?
                <>
                  {SkeletonWrapper}
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
                              <InfoWrapper>
                                <Index>
                                  {item?.symbol ? (String(i + (currentPage - 1) * 10 + 1).length === 1 ? `0${  i + (currentPage - 1) * 10 + 1}` : i + (currentPage - 1) * 10 + 1) : ''}
                                </Index>
                                <Avatar src={item.icon} />
                                <UserWrapper>
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
                                            <CopyButton />
                                            <Tooltip isTooltipDisplayed={copy === item.wallet}>Copied</Tooltip>
                                          </CopyWrapper>
                                        </CopyToClipboard>
                                    ) : null}
                                  </Address>
                                </UserWrapper>
                              </InfoWrapper>
                              <ValueWrapper>
                                {item?.symbol ? (type === 'people' ? `${item.amt}` : `${toStringAmt(item.amt)} ${item.unit}`) : ''}
                              </ValueWrapper>
                            </ListItem>
                        ))
                    ) : null
                  }
                </>
          }
        </ListWrapper>
        <PageBtnList page={page} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </>
  )
}
