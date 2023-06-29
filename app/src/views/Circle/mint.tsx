import styled, { useTheme } from 'styled-components'
import {useRouter} from "next/router";
import { Image, Button } from "@pancakeswap/uikit";
import {useCallback, useEffect, useMemo, useState} from "react";
import BigNumber from "bignumber.js";
import CircleHeader from './components/CircleHeader'
import Page from '../Page'
import { useCircleProjectInfo, useCircleListInfo, useMint } from "../../hooks/useCircleProject";

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

const StyledTextAreaWrapper = styled.div`
  height: 528px;
  width: 100%;
  border-radius: 12px;
  border: 1px solid #e7e8f3;
  margin: 20px 0 44px 0;
  display: flex;
  flex-direction: column;
  position: relative;
`

const StyledTextAreaBg = styled(Image)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  z-index: 0;
`

const StyledTextArea = styled.textarea`
  height: 100%;
  width: 100%;
  border: 1px solid transparent;
  resize: none;
  padding: 8px;
  position: absolute;
  z-index: 1;
  background: transparent;
  
  &:focus-visible {
    outline: none;
  }
`

const SelectButton = styled(Button)``

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
  border-radius: 50%;
  overflow: hidden;
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

const BinImg = styled(Image)`
  width: 16px;
  height: 16px;
  cursor: pointer;
`

const CircleMint: React.FC<React.PropsWithChildren<{ projectAddress: string }>> = ({ projectAddress }) => {
  const router = useRouter()
  const { project } = useCircleProjectInfo(projectAddress)
  const [textArea, setTextArea] = useState('')
  const [read, setRead] = useState(true)
  const [step, setStep] = useState(0)
  const [list, setList] = useState([])
  const listInfo = useCircleListInfo(list)
  const [listCopy, setListCopy] = useState(null)
  const { callback: mintCallback, mintCallback: status, isLoading } = useMint(projectAddress)

  useMemo(() => {
    if (listInfo !== null) {
      return setListCopy(listInfo)
    }
    return null
  }, [listInfo])

  useEffect(() => {
    if (status === true) {
      router.push('/circle/link')
    }
  }, [status])

  return (
      <Page>
        <Wrapper>
          <CircleHeader
              backFn={() => {
                if (step === 0) {
                  router.push('/circle/link')
                } else {
                  setList([])
                  setStep(0)
                }
              }}
              title="NFT Mint"
              Right={<></>}
              /* Right={<Select onClick={() => router.push('/circle/history')}>选择群组</Select>} */
          />
          {
            step === 0 ?
                <>
                  <StyledTextAreaWrapper>
                    <StyledTextArea
                        value={textArea}
                        onChange={(event) => {
                          setTextArea(event.target.value)
                          if (event.target.value === '') {
                            setRead(true)
                          }
                        }}
                        onFocus={() => {
                          setRead(false)
                        }}
                        onBlur={() => {
                          if (textArea !== '') {
                            setRead(true)
                          }
                        }}
                    />
                    { read ? <StyledTextAreaBg width={48} height={48} src='/images/circle/copy.png' /> : null}
                  </StyledTextAreaWrapper>
                  <SelectButton
                      disabled={textArea === ''}
                      onClick={() => {
                        const newList = textArea
                            .split(' ')
                            .filter((address) => {return address.length === 42 && address.slice(0, 2) === '0x' || address.slice(0, 2) === '0X'})
                        if (newList.length > 0) {
                          setTextArea('')
                          setList((newList))
                          setStep(1)
                        } else {
                          setTextArea('')
                        }
                      }}
                  >Next</SelectButton>
                </> :
                <>
                  <TopBar>
                    {
                      project ?
                          <>
                            <ProjectInfo>
                              <ProjectAvatar width={32} height={32} src={project?.icon} />
                              <ProjectToken>
                                <ProjectTokenName>{project?.symbol}</ProjectTokenName>
                                {/* <ProjectTokenValue>1902.27 MB</ProjectTokenValue> */}
                              </ProjectToken>
                            </ProjectInfo>
                            <ProjectPrice>
                              <ProjectPriceValue>{new BigNumber(project?.price).toFixed(2)}</ProjectPriceValue>
                            </ProjectPrice>
                          </>: null
                    }
                  </TopBar>
                  <SelectInner>
                    {
                      listCopy ?
                          <>
                            {
                              listCopy?.map((item, index) => {
                                return <div key={item.name}>
                                  <List>
                                    <ListLeft>
                                      <Icon width={42} height={42} src={item?.icon} alt="link" />
                                      <ListInfo>
                                        <ListTitle>{item?.name}</ListTitle>
                                        <ListDesc>{`${item?.addr?.slice(0, 6)}...${item?.addr?.slice(item?.addr?.length - 6, item?.addr?.length)}`}</ListDesc>
                                      </ListInfo>
                                    </ListLeft>
                                    <ListRight>
                                      <ListValue>
                                        <BinImg onClick={() => {
                                          const a = listCopy.filter((b) => b !== item)
                                          setListCopy(a);
                                        }} width={16} height={16} src='/images/circle/bin.png' />
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
                  <BottomBar>
                    <Line />
                    <BottomBarInner>
                      <BottomBarInnerLeft>
                        <BottomBarTitle>Total {listCopy ? listCopy?.length : '-'}</BottomBarTitle>
                        {/* <BottomBarDesc>Gas fee: 0.03 BNB</BottomBarDesc> */}
                      </BottomBarInnerLeft>
                      <BottomBarInnerRight>
                        <SelectButton
                            disabled={isLoading}
                            onClick={() => {
                              mintCallback(listCopy)
                            }}
                        >{isLoading ? 'Loading' : 'Mint'}</SelectButton>
                      </BottomBarInnerRight>
                    </BottomBarInner>
                  </BottomBar>
                </>
          }
        </Wrapper>
      </Page>
  )
}

export default CircleMint
