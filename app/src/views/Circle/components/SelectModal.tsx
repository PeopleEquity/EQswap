import styled from 'styled-components'
import {Button, Image, InjectedModalProps, Modal} from "@pancakeswap/uikit";
import { useCircleProject } from '../../../hooks/useCircleProject'
import BigNumber from "bignumber.js/bignumber";

const Wrapper = styled.div`
  padding: 12px;
  text-align: center;
`

const ProjectInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  cursor: pointer;
`

const ProjectAvatar = styled(Image)`
  margin-right: 10px;
  width: 32px;
  height: 32px;
`

const ProjectTokenName = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
  color: #15141f;
`

const CurrentProject = styled.div`
  cursor: pointer;
  width: 100%;
  height: 60px;
  background: #FFFFFF;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  padding: 0 12px 0 16px;
  align-items: center;
`

const ProjectToken = styled.div``

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

export interface ModalProps extends InjectedModalProps {
  setProject: any;
  projects: any;
}

const SelectModal: React.FC<React.PropsWithChildren<ModalProps>> = ({ onDismiss, setProject, projects }) => {

  return (
      <Modal minWidth={375} hideHeader onDismiss={() => {
        onDismiss?.()
      }} title="">
        <Wrapper>
          {
            projects ?
                projects.map((project) => (
                    <CurrentProject onClick={() => {
                      setProject(project)
                      onDismiss?.()
                    }}>
                      <ProjectInfo key={project?.token_addr}>
                        <ProjectAvatar width={32} height={32} src={project?.icon} />
                        <ProjectToken>
                          <ProjectTokenName>{project?.symbol}</ProjectTokenName>
                        </ProjectToken>
                      </ProjectInfo>
                      <ProjectPrice>
                        <ProjectPriceValue>{new BigNumber(project?.price).toFixed(2)}</ProjectPriceValue>
                      </ProjectPrice>
                    </CurrentProject>
                )) : null
          }
        </Wrapper>
      </Modal>
  )
}

export default SelectModal
