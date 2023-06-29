import { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import {Image} from "@pancakeswap/uikit";

const LinkInfoWrapper = styled.div`
  margin-top: 12px;
`

const WraningInfo = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #ff3232;
`

const LinkUserInfoWrapper = styled.div``

const UserCard = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`

const UserAvatar = styled(Image)`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`

const UserName = styled.div`
  margin-left: 10px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 26px;
  display: flex;
  align-items: center;
  color: #15141f;
`

const UserAddress = styled.div`
  margin-top: 5px;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #15141F;
`

const CheckTitle = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: #a2a0a8;
  margin-bottom: 8px;
`

export default function LinkInfo({inv}) {

  return (
      <LinkInfoWrapper>
        {
          inv ?
              <>
                {
                  inv?.addr !== '0x0000000000000000000000000000000000000000' ?
                  <LinkUserInfoWrapper>
                    <CheckTitle>
                      核对你对应的分享人
                    </CheckTitle>
                    <UserCard>
                      <UserAvatar width={24} height={24} src={inv?.icon} />
                      <UserName>{inv?.name}</UserName>
                    </UserCard>
                    <UserAddress>{inv?.addr}</UserAddress>
                  </LinkUserInfoWrapper> :
                  <WraningInfo>未检测到你对应的项目节点，必须要有项目节点之后才能批量转账，否则会造成数据混乱和资产损失</WraningInfo>
                }
              </> : null
        }
      </LinkInfoWrapper>
  )
}
