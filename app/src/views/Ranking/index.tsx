import styled from 'styled-components'
import {useEffect, useMemo, useRef, useState} from 'react'
import { useTranslation } from '@pancakeswap/localization'
import {Card, useMatchBreakpointsContext, useOnClickOutside} from '@pancakeswap/uikit'
import Page from '../Page'
import WealthList from './components/WealthList'
import TrendingList from './components/TrendingList'
import CurrenciesList from './components/CurrenciesList'

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

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`

const MenuItem = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 26px;
  cursor: pointer;
  color: #333;
  flex: 1;
  display: flex;
  justify-content: center;
  white-space: pre;
  &.left {
    justify-content: left;
  }
  &.right {
    justify-content: right;
  }
  &.active {
    color: #4263eb;
  }
  @media screen and (max-width: 852px) {
    font-size: 14px;
    padding: 0 10px;
  }
`


const TopBar = styled.div`
  margin: 14px 0;
  display: flex;
  justify-content: space-between;
`

const SubTab = styled.div`
  width: 360px;
  height: 36px;
  border-radius: 6px;
  background: #f4f5f8;
  padding: 2px;
  display: flex;
  justify-content: space-between;
  & > span {
    max-width: 50%;
    height: 100%;
    font-family: 'PingFang SC';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 32px;
    color: #15141F;
    text-align: center;
    display: block;
    border-radius: 6px;
    flex: 1;
    cursor: pointer;
    &.active {
      color: #4263eb;
      font-weight: 600;
      background: #fff;
    }
  }
  @media screen and (max-width: 852px) {
    width: 100%;
  }
`

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #f4f5f8;
  margin: 12px 0;
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

export default function Dcs() {
  const { t, currentLanguage } = useTranslation()
  const [listType, setListType] = useState<'Wealth' | 'Trending' | 'Currencies'>('Wealth')
  const [visible, setVisible] = useState(false)
  const [isShowMenu, setIsShowMenu] = useState(true)
  const { isDesktop } = useMatchBreakpointsContext()

  const node = useRef<HTMLDivElement>()
  useOnClickOutside(node, setVisible ? () => setVisible(false)  : undefined)

  const [type, setType] = useState<'income' | 'people' | 'recommend' | 'team' | ''>('recommend')

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

  useEffect(() => {
    setTimeType(timeList.find((item) => (item.key === timeType.key)))
  }, [currentLanguage.language])

  const List = useMemo(() => {
    switch (listType) {
      case "Wealth": {
        return <WealthList
            timeType={timeType}
            type={type}
        />
      }
      case "Trending": {
        return <TrendingList
            timeType={timeType}
            type={type}
        />
      }
      case "Currencies": {
        return <CurrenciesList
            type={type}
            setIsShowMenu={setIsShowMenu}
        />
      }
      default: {
        return <WealthList
            timeType={timeType}
            type={type}
        />
      }
    }
  }, [listType, type, timeType])

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

  const subTab = useMemo(() => {
    if (listType === 'Wealth') {
      return (
          <>
            <span
                role="button"
                tabIndex={0}
                className={type === 'recommend' ? 'active' : ''}
                onClick={() => {
                  setType('recommend')
                }}
                onKeyDown={() => {
                  setType('recommend')
                }}
            >{t('dcsTotalEarnings')}</span>
            <span
                role="button"
                tabIndex={0}
                className={type === 'team' ? 'active' : ''}
                onClick={() => {
                  setType('team')
                }}
                onKeyDown={() => {
                  setType('team')
                }}
            >{t('dcsCommunityEarnings')}</span>
          </>
      )
    }
      return (
          <>
            <span
                role="button"
                tabIndex={0}
                className={type === 'income' ? 'active' : ''}
                onClick={() => {
                  setType('income')
                }}
                onKeyDown={() => {
                  setType('income')
                }}
            >{t('dcsKOLEarnings')}</span>
            <span
                role="button"
                tabIndex={0}
                className={type === 'people' ? 'active' : ''}
                onClick={() => {
                  setType('people')
                }}
                onKeyDown={() => {
                  setType('people')
                }}
            >{t('dcsCreditLinks')}</span>
          </>
      )

  }, [listType, type, setType, currentLanguage])

  return (
    <Page>
      <StyledAppBody>
        {
          isDesktop ?
              <>
                <Menu>
                  <MenuItem className={listType === 'Wealth' ? 'active left' : 'left'} onClick={() => {
                    setListType('Wealth')
                    setType('recommend')
                    setTimeType(timeList[0])
                  }}>{t('dcsEarnings')}</MenuItem>
                  <MenuItem className={listType === 'Trending' ? 'active' : ''} onClick={() => {
                    setListType('Trending')
                    setType('income')
                    setTimeType(timeList[0])
                  }}>{t('dcsTrendingKOL')}</MenuItem>
                  <MenuItem className={listType === 'Currencies' ? 'active right' : 'right'} onClick={() => {
                    setListType('Currencies')
                    setType('')
                    setTimeType(timeList[0])
                  }}>{t('dcsToken')}</MenuItem>
                </Menu>
                {
                  listType !== 'Currencies' ?
                      <TopBar>
                        <SubTab>
                          {subTab}
                        </SubTab>
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
                      </TopBar> : null
                }
              </> :
              <>
                {
                  isShowMenu ? <TopBar>
                        <Menu>
                          <MenuItem className={listType === 'Wealth' ? 'active left' : 'left'} onClick={() => {
                            setListType('Wealth')
                            setType('recommend')
                          }}>{t('dcsEarnings')}</MenuItem>
                          <MenuItem className={listType === 'Trending' ? 'active' : ''} onClick={() => {
                            setListType('Trending')
                            setType('income')
                          }}>{t('dcsTrendingKOL')}</MenuItem>
                          <MenuItem className={listType === 'Currencies' ? 'active right' : 'right'} onClick={() => {
                            setListType('Currencies')
                            setType('')
                          }}>{t('dcsToken')}</MenuItem>
                        </Menu>
                        {
                          listType !== 'Currencies' ?
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
                              </FilterTimeWrapper> : <div />
                        }
                      </TopBar> : null
                }
                {
                  isShowMenu ? <Line /> : null
                }
                {
                  listType !== 'Currencies' ?
                      <SubTab>
                        {subTab}
                      </SubTab> : null
                }
              </>
        }
        {List}
      </StyledAppBody>
    </Page>
  )
}
