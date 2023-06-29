import styled, { useTheme } from 'styled-components'
import {useRouter} from "next/router";
import { Image, Button } from "@pancakeswap/uikit";
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

const SelectInner = styled.div`
  flex: 1;
`

const SelectButton = styled(Button)`
  margin: 40px 8px;
`

const SelectOption = styled.div`
  height: 60px;
  padding: 0 8px 0 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Line = styled.div`
  width: 100%;
  height: 0.5px;
  background: #e8e8e8;
  transform: scaleY(0.5);
  margin-bottom: 12px;
`

const OptionLeft = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #11142d;
  display: flex;
  align-items: center;
`

const OptionRight = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #11142d;
`

const CheckBox = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 2px;
  border: 1px solid #a2a0a8;
  margin-right: 12px;
`

const SelectBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px 0 0px;
  margin: 9px 0;
`

const SelectBarLeft = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #a2a0a8;
  display: flex;
  align-items: center;
`

const SelectBarRight = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  color: #a2a0a8;
`


export default function CircleHistory() {
  const router = useRouter()

  return (
      <Page>
        <LinkWrapper>
          <CircleHeader backFn={() => router.push('/circle/link')} title="选择群组" Right={null} />
          <SelectBar>
            <SelectBarLeft>
              <CheckBox />
              全选
            </SelectBarLeft>
            <SelectBarRight>
              已选 12000
            </SelectBarRight>
          </SelectBar>
          <SelectInner>
            <SelectOption>
              <OptionLeft>
                <CheckBox />
                所有成员
              </OptionLeft>
              <OptionRight>
                7
              </OptionRight>
            </SelectOption>
            <Line />
            <SelectOption>
              <OptionLeft>
                <CheckBox />
                项目成员
              </OptionLeft>
              <OptionRight>
                7
              </OptionRight>
            </SelectOption>
            <Line />
            <SelectOption>
              <OptionLeft>
                <CheckBox />
                今日新增
              </OptionLeft>
              <OptionRight>
                7
              </OptionRight>
            </SelectOption>
            <Line />
            <SelectOption>
              <OptionLeft>
                <CheckBox />
                最近一周
              </OptionLeft>
              <OptionRight>
                7
              </OptionRight>
            </SelectOption>
            <Line />
            <SelectOption>
              <OptionLeft>
                <CheckBox />
                最近一月
              </OptionLeft>
              <OptionRight>
                7
              </OptionRight>
            </SelectOption>
            <Line />
            <SelectOption>
              <OptionLeft>
                <CheckBox />
                铁粉
              </OptionLeft>
              <OptionRight>
                7
              </OptionRight>
            </SelectOption>
            <Line />
          </SelectInner>
          <SelectButton>下一步</SelectButton>
        </LinkWrapper>
      </Page>
  )
}
