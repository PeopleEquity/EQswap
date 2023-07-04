import styled, { useTheme } from 'styled-components'
import { Image } from '@pancakeswap/uikit'
import { useRouter } from 'next/router'
import { useTranslation } from "@pancakeswap/localization";
import Page from '../Page'

const ListWrapper = styled.div`
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 550px;
  background: #ffff;
  padding: 20px 20px 0 16px;
`

const Line = styled.div`
  width: calc(100% - 16px);
  height: 1px;
  background: #efefef;
  transform: scaleY(0.5);
  margin: 4px 0 4px 8px;
`

const List = styled.div`
  width: 100%;
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  padding: 0 8px;
  &:hover {
    background: #e8e8e8;  
  }
`

const ListLeft = styled.div`
  display: flex;
  align-items: center;
`

const ListRight = styled.div``

const Arrow = styled(Image)`
  width: 16px;
  height: 16px;
`

const Icon = styled(Image)`
  margin-right: 8px;
  width: 20px;
  height: 20px;
`

const ListTitle = styled.div`
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  display: flex;
  align-items: center;
  color: #11142D;
`

export default function CircleList() {
  const { t } = useTranslation()
  const router = useRouter()

  return (
      <Page>
        <ListWrapper>
          <List onClick={() => router.push('/circle/link')}>
            <ListLeft>
              <Icon width={20} height={20} src="/images/circle/link.png" alt="link" />
              <ListTitle>{t('circle_batch')}</ListTitle>
            </ListLeft>
            <ListRight>
              <Arrow width={16} height={16}  src="/images/circle/arrow.png" alt="to link" />
            </ListRight>
          </List>
          <Line />
          <List onClick={() => router.push('/circle/whitelist')}>
            <ListLeft>
              <Icon width={20} height={20} src="/images/circle/whitelist.png" alt="link" />
              <ListTitle>{t('circle_whitelist')}</ListTitle>
            </ListLeft>
            <ListRight>
              <Arrow width={16} height={16}  src="/images/circle/arrow.png" alt="to link" />
            </ListRight>
          </List>
          <Line />
          {/* <List>
            <ListLeft>
              <Icon width={20} height={20} src="/images/circle/transfer.png" alt="link" />
              <ListTitle>批量转账</ListTitle>
            </ListLeft>
            <ListRight>
              <Arrow width={16} height={16}  src="/images/circle/arrow.png" alt="to link" />
            </ListRight>
          </List>
          <Line /> */}
        </ListWrapper>
      </Page>
  )
}
