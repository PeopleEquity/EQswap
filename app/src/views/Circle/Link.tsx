import styled, { useTheme } from 'styled-components'
import BigNumber from "bignumber.js";
import {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import {useTranslation} from "@pancakeswap/localization";
import {BoxProps, Button, Image, InjectedModalProps, useModal} from '@pancakeswap/uikit'
import LinkSwitch from './components/LinkSwitch'
import CircleHeader from './components/CircleHeader'
import LinkInfo from './components/LinkInfo'
import Page from '../Page'
import SelectModal from './components/SelectModal'
import {useCircleInv, useCircleProject} from "../../hooks/useCircleProject"


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

const LinkInner = styled.div`
  flex: 1;
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

const ProjectSelect = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
  color: #15141f;
  &.loading {
    color: #e6e6e6;
  }
`

const ProjectTokenName = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
  color: #15141f;
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

const SelectButton = styled(Button)`
  margin: 40px 8px;
  width: 100%;
  max-width: 350px;
`

export default function CircleList() {
  const router = useRouter()
  const { t } = useTranslation()
  const [project, setProject] = useState(null)
  const [isShowModal, setShowModal] = useState(false)
  const { projects } = useCircleProject()
  const [onSelectModal] = useModal(<SelectModal setProject={setProject} projects={projects} />)
  const inv = useCircleInv(project?.token_addr)

  return (
      <Page>
        <LinkWrapper>
          <LinkInner>
            <CircleHeader
                backFn={() => router.push('/circle')}
                title={t('circle_mint')}
                Right={<History onClick={() => router.push('/circle/history')}>{t('circle_history')}</History>}
            />
            {/* <LinkSwitch /> */}
            <CurrentProject onClick={() => {
              if (!projects) {
                return
              }
              onSelectModal()
              setShowModal(!isShowModal)
            }}>
              {
                project ?
                    <>
                      <ProjectInfo>
                        <ProjectAvatar width={32} height={32} src={project?.icon} />
                        <ProjectToken>
                          <ProjectTokenName>{project?.symbol}</ProjectTokenName>
                        </ProjectToken>
                      </ProjectInfo>
                      <ProjectPrice>
                        <ProjectPriceValue>{new BigNumber(project?.price).toFixed(2)}</ProjectPriceValue>
                        <ToArrow width={16} height={16} src='/images/circle/arrow.png'/>
                      </ProjectPrice>
                    </> :
                    <>
                      <ProjectInfo>
                        <ProjectToken>
                          <ProjectSelect className={projects ? '' : 'loading'}>{t('circle_select')}</ProjectSelect>
                        </ProjectToken>
                      </ProjectInfo>
                      <ProjectPrice>
                        <ToArrow width={16} height={16} src='/images/circle/arrow.png'/>
                      </ProjectPrice>
                    </>
              }
            </CurrentProject>
            <LinkInfo inv={inv} />
          </LinkInner>
          <SelectButton
              disabled={
                !inv ||
                !project?.token_addr
              }
              onClick={() => router.push(`/circle/mint/${project?.token_addr}`)}
          >{t('circle_next')}</SelectButton>
        </LinkWrapper>
      </Page>
  )
}
