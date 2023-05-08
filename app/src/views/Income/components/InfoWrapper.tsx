import styled, { useTheme } from 'styled-components'
import { useCallback } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import {Button, Text} from "@pancakeswap/uikit";
import useIncomeInfo from '../../../hooks/useIncomeInfo'
import useClaimIncome from '../../../hooks/useClaimIncome'

const InfoWrapper = styled.div`
  margin: 0 auto 12px;
  padding: 16px 22px 8px;
  width: 330px;
  background: #dbe9ed;
  border-radius: 12px;
`

const StyledButton = styled(Button)`
  background: linear-gradient(90deg, #EB3DFF 0%, #5C53D3 100%);
  border-radius: 28px;
  width: 302px;
  margin: 8px auto 32px;
`

const StyledTitle = styled(Text)`
  text-align: center;
  margin: 30px auto 11px;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  color: #000000;
`

const StyledSubTitle = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #111526;
  margin-bottom: 10px;
`

const StyledInfoWrapper = styled.div`
  display: flex;
`

const InfoLeft = styled.div`
  flex: 1;
  max-width: 50%;
  display: flex;
  flex-direction: column;
`

const InfoRight = styled.div`
  flex: 1;
  max-width: 50%;
  display: flex;
  flex-direction: column;
`

const InfoItem = styled.div`
  flex: 1;
  display: flex;
  text-align: left;
  font-size: 12px;
  font-weight: 400;
  line-height: 15px;
  margin: 2px 0;
  color: #333333;
  justify-content: space-between;
  & > span {
    flex: 1;
    margin-left: 5px;
    overflow: hidden;
    white-space: pre;
    text-overflow: ellipsis;
    text-align: center;
  }
  &.tip {
    zoom: 0.9;
  }
`

export default function Info() {
  const theme = useTheme()
  const { t } = useTranslation()
  const info = useIncomeInfo()
  const { onHanlderClaimIncome } = useClaimIncome()

  const handleClaimIncome  = async () => {
    const ts = new Date().getTime()
    const data = {
      ts
    }
    try {
      await onHanlderClaimIncome(data)
    } catch (error) {
      console.log(error)
    } finally {
      console.log('success')
    }
  }

  return (
      <>
        <StyledTitle>{t('incomeMyEarnings')}</StyledTitle>
        <InfoWrapper>
          <StyledSubTitle>{t('incomeEquityIncome')}</StyledSubTitle>
          <StyledInfoWrapper>
            <InfoLeft>
              <InfoItem>{t('incomeInternalIncentive')}</InfoItem>
              <InfoItem>
                {t('incomeTotal')}
                <span>{info?.eq_income_internal_total ?? '-'}</span>
              </InfoItem>
              <InfoItem>
                {t('incomePending')}
                <span>{info?.eq_income_internal_get ?? '-'}</span>
              </InfoItem>
              <InfoItem>
                {t('incomeClaimed')}
                <span>{info?.eq_income_internal_waiting ?? '-'}</span>
              </InfoItem>
              <InfoItem className="tip">
                {t('incomeCreditedBySmartContract')}
              </InfoItem>
            </InfoLeft>
            <InfoRight>
              <InfoItem>Gswap</InfoItem>
              <InfoItem>
                {t('incomeTotal')}
                <span>{info?.eq_income_gswap_total ?? '-'}</span>
              </InfoItem>
              <InfoItem>
                {t('incomePending')}
                <span>{info?.eq_income_gswap_get ?? '-'}</span>
              </InfoItem>
              <InfoItem>
                {t('incomeClaimed')}
                <span>{info?.eq_income_gswap_waiting ?? '-'}</span>
              </InfoItem>
              <InfoItem>
                {t('incomeAvailable')}
                <span>{info?.eq_income_gswap_ready ?? '-'}</span>
              </InfoItem>
            </InfoRight>
          </StyledInfoWrapper>
        </InfoWrapper>
        <InfoWrapper>
          <StyledSubTitle>{t('incomeLaborIncome')}</StyledSubTitle>
          <StyledInfoWrapper>
            <InfoLeft>
              <InfoItem>{t('incomeInternalIncentive')}</InfoItem>
              <InfoItem>
                {t('incomeTotal')}
                <span>{info?.la_income_internal_total ?? '-'}</span>
              </InfoItem>
              <InfoItem>
                {t('incomePending')}
                <span>{info?.la_income_internal_get ?? '-'}</span>
              </InfoItem>
              <InfoItem>
                {t('incomeClaimed')}
                <span>{info?.la_income_internal_waiting ?? '-'}</span>
              </InfoItem>
              <InfoItem className="tip">
                {t('incomeCreditedBySmartContract')}
              </InfoItem>
            </InfoLeft>
            <InfoRight>
              <InfoItem>Gswap</InfoItem>
              <InfoItem>
                {t('incomeTotal')}
                <span>{info?.la_income_gswap_total ?? '-'}</span>
              </InfoItem>
              <InfoItem>
                {t('incomePending')}
                <span>{info?.la_income_gswap_ready ?? '-'}</span>
              </InfoItem>
              <InfoItem>
                {t('incomeClaimed')}
                <span>{info?.la_income_gswap_waiting ?? '-'}</span>
              </InfoItem>
              <InfoItem>
                {t('incomeAvailable')}
                <span>{info?.la_income_gswap_ready ?? '-'}</span>
              </InfoItem>
            </InfoRight>
          </StyledInfoWrapper>
        </InfoWrapper>
        <InfoWrapper>
          <StyledSubTitle>{t('incomeIncomeOverview')}</StyledSubTitle>
          <StyledInfoWrapper>
            <InfoLeft>
              <InfoItem>{t('incomeInternalIncentive')}</InfoItem>
              <InfoItem>
                {t('incomeTotal')}
                <span>{info?.eq_income_internal_total && info?.la_income_internal_total ?? '-'}</span>
              </InfoItem>
              <InfoItem>
                {t('incomePending')}
                <span>{info?.eq_income_internal_get && info?.la_income_internal_get ?? '-'}</span>
              </InfoItem>
              <InfoItem>
                {t('incomeClaimed')}
                <span>{info?.eq_income_internal_waiting && info?.la_income_internal_waiting ?? '-'}</span>
              </InfoItem>
              <InfoItem className="tip">
                {t('incomeCreditedBySmartContract')}
              </InfoItem>
            </InfoLeft>
            <InfoRight>
              <InfoItem>Gswap</InfoItem>
              <InfoItem>
                {t('incomeTotal')}
                <span>{info?.eq_income_gswap_total && info?.la_income_gswap_total ?? '-'}</span>
              </InfoItem>
              <InfoItem>
                {t('incomePending')}
                <span>{info?.eq_income_gswap_ready && info?.la_income_gswap_ready ?? '-'}</span>
              </InfoItem>
              <InfoItem>
                {t('incomeClaimed')}
                <span>{info?.eq_income_gswap_waiting&& info?.la_income_gswap_waiting ?? '-'}</span>
              </InfoItem>
              <InfoItem>
                {t('incomeAvailable')}
                <span>{info?.eq_income_gswap_ready && info?.la_income_gswap_ready ?? '-'}</span>
              </InfoItem>
            </InfoRight>
          </StyledInfoWrapper>
        </InfoWrapper>
        <StyledButton onClick={handleClaimIncome}>{t('incomeOneClickClaim')}</StyledButton>
      </>
  )
}
