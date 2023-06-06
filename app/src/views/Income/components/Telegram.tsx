import styled, { useTheme } from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import {Button, Flex, Text, Link, Image} from '@pancakeswap/uikit'


const TelegramWrapper = styled.div`
  width: 330px;
  margin: 0 auto;
  padding: 16px 14px 21px;
  background: #dbe9ed;
  border-radius: 24px;
`

const Item = styled.div`
  flex: 1;
  text-align: center;
`

const StyledButton = styled(Button)`
  background: linear-gradient(90deg, #EB3DFF 0%, #5C53D3 100%);
  border-radius: 28px;
  width: 100%;
  margin: 22px auto 17px;
`

const StyledLink = styled(Link)`
  color: #4263eb;
  text-align: center;
  margin: 0 auto;
  font-weight: 400;
`

const StyledText = styled(Text)`
  color: #333333;
  font-size: 12px;
  font-weight: 400;
  text-align: left;
`

const ItemName = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #333333;
`

const ItemImg = styled(Image)`
  width: 32px;
  height: 32px;
  margin: 17px auto 11px;
`

export default function Telegram() {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
      <TelegramWrapper>
        <StyledText>{t('incomeText')}</StyledText>
        <Flex>
          <Item>
            <ItemImg src="/images/income/icon1.png" />
            <ItemName>{t('incomeSelectEnterprise')}</ItemName>
          </Item>
          <Item>
            <ItemImg src="/images/income/icon2.png" />
            <ItemName>{t('incomeTwoWayTransfer')}</ItemName>
          </Item>
          <Item>
            <ItemImg src="/images/income/icon3.png" />
            <ItemName>{t('incomeTrade')}</ItemName>
          </Item>
          <Item>
            <ItemImg src="/images/income/icon4.png" />
            <ItemName>{t('incomeGetIncome')}</ItemName>
          </Item>
        </Flex>
        <StyledButton>{t('incomeJoinTelegramGroup')}</StyledButton>
        <StyledLink external href="https://www.peopleequity.club/doc">{t('incomeViewMore')}</StyledLink>
      </TelegramWrapper>
  )
}
