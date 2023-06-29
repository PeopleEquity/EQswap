import styled, { useTheme } from 'styled-components'
import { Image } from '@pancakeswap/uikit'

const Header = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HeaderLeft = styled.div`
  flex: 1;
`

const HeaderCenter = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #11142d;
  justify-content: center;
  flex: 1;
`

const HeaderRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: right;
`

const BackImg = styled(Image)`
  width: 40px;
  height: 40px;
  cursor: pointer;
`

export default function CircleHeader({ backFn, title, Right }) {

  return (
      <Header>
        <HeaderLeft>
          { backFn ? <BackImg onClick={backFn} width={40} height={40} src='/images/circle/back.png' /> : null}
        </HeaderLeft>
        <HeaderCenter>{title}</HeaderCenter>
        <HeaderRight>{Right}</HeaderRight>
      </Header>
  )
}