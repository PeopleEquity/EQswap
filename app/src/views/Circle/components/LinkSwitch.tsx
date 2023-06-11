import { useState } from 'react'
import styled, { useTheme } from 'styled-components'

const SwitchWrapper = styled.div`
  width: 100%;
  padding: 2px;
  border-radius: 8px;
  background: #e8e8e8;
  display: flex;
`

const SwitchItem = styled.div`
  cursor: pointer;
  border-radius: 6px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 26px;
  display: flex;
  align-items: center;
  color: #15141f;
  text-align: center;
  width: 50%;
  justify-content: center;
  &.active {
    background: #ffffff;
    color: #1355ff;
  }
`

export default function CircleList() {

  const [tag, setTag] = useState(true)

  return (
      <SwitchWrapper>
        <SwitchItem className={tag ? 'active' : ''} onClick={() => {setTag(true)}}>
          信用关联
        </SwitchItem>
        <SwitchItem className={!tag ? 'active' : ''} onClick={() => {setTag(false)}}>
          NFT Mint
        </SwitchItem>
      </SwitchWrapper>
  )
}