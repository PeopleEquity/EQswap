import styled from 'styled-components'
import {useRouter} from "next/router";
import { Image, Button } from "@pancakeswap/uikit";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "@pancakeswap/localization";
import BigNumber from "bignumber.js";
import CircleHeader from './components/CircleHeader'
import Page from '../Page'
import { useCircleNftInfo, useClaim } from "../../hooks/useCircleProject";


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
  max-height: 400px;
  overflow-y: scroll;
  margin-bottom: 87px;
  margin-top: 18px;
`

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #e8e8e8;
  transform: scaleY(0.5);
  margin-bottom: 12px;
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
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
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
  font-size: 14px;
  line-height: 22px;
  text-align: right;
  color: #11142d;
`

const ListClaimBtn = styled(Button)`
  min-width: 32px;
  height: 20px;
  font-size: 12px;
  padding: 0 12px;
`

const CircleWhiteList: React.FC<React.PropsWithChildren> = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const { waiting, already } = useCircleNftInfo()
  const { callback: claimCallback, claimCallback: status, isLoading } = useClaim()
  const [claimId, setClaimId] = useState(null)

  useEffect(() => {
    if (status === true && claimId) {
      setClaimId(null)
    }
  }, [status])

  return (
      <Page>
        <Wrapper>
          <CircleHeader
              backFn={() => {
                router.push('/circle')
              }}
              title={t('circle_claim')}
              Right={<></>}
          />
          <SelectInner>
            {
              waiting ?
                  <>
                    {
                      waiting?.map((item, index) => {
                        return <div key={item.name}>
                          <List>
                            <ListLeft>
                              <Icon width={32} height={32} src="/images/circle/arrow.png" alt="link" />
                              <ListInfo>
                                <ListTitle>{t('circle_project')} {`${item?.project}`}</ListTitle>
                                <ListDesc>{t('circle_from')} {`${item?.handFrom}`}</ListDesc>
                              </ListInfo>
                            </ListLeft>
                            <ListRight>
                              <ListValue>
                                <ListClaimBtn disable={!item?.NFTID || isLoading} onClick={() => {
                                  claimCallback(item?.NFTID)
                                  setClaimId(item?.NFTID)
                                }}>
                                  { isLoading ? t('circle_loading') : t('circle_action_claim')}
                                </ListClaimBtn>
                              </ListValue>
                            </ListRight>
                          </List>
                          <Line />
                        </div>
                      })
                    }
                  </> : null
            }
            {
              already ?
                  <>
                    {
                      already?.map((item, index) => {
                        return <div key={item.name}>
                          <List>
                            <ListLeft>
                              <Icon width={32} height={32} src="/images/circle/toClaim.png" alt="link" />
                              <ListInfo>
                                <ListTitle>{t('circle_project')} {`${item?.project}`}</ListTitle>
                                <ListDesc>{t('circle_from')} {`${item?.handFrom}`}</ListDesc>
                              </ListInfo>
                            </ListLeft>
                            <ListRight>
                              <ListValue>
                                {t('circle_claimed')}
                              </ListValue>
                            </ListRight>
                          </List>
                          <Line />
                        </div>
                      })
                    }
                  </> : null
            }
          </SelectInner>
        </Wrapper>
      </Page>
  )
}

export default CircleWhiteList
