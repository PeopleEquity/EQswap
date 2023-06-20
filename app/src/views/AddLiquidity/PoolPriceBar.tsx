import { Currency, Percent, Price } from '@pancakeswap/sdk'
import { Text } from '@pancakeswap/uikit'
import styled from "styled-components";
import { useTranslation } from '@pancakeswap/localization'
import { ONE_BIPS } from 'config/constants/exchange'
import BigNumber from 'bignumber.js'
import { AutoColumn } from '../../components/Layout/Column'
import { AutoRow } from '../../components/Layout/Row'
import { Field } from '../../state/mint/actions'
import {useAmmType} from "../../state/amm/hooks";
import {AmmType} from "../../state/amm/types";

const StyledText = styled(Text)`
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
  text-align: center;
`

function PoolPriceBar({
  currencies,
  noLiquidity,
  poolTokenPercentage,
  price,
  myPrice,
}: {
  currencies: { [field in Field]?: Currency }
  noLiquidity?: boolean
  poolTokenPercentage?: Percent
  price?: Price
  myPrice?: string
}) {
  const { t } = useTranslation()

  const ammType = useAmmType()

  let multiply = 1
  let divide = 1

  if (ammType === AmmType.Five) {
    multiply = 1
    divide = 4
  }

  if (ammType === AmmType.SevenFive) {
    multiply = 1
    divide = 2
  }

  const isReserve = (currencies?.CURRENCY_A?.address - currencies?.CURRENCY_B?.address) > 0
  const decimals = currencies?.CURRENCY_A?.decimals - currencies?.CURRENCY_B?.decimals
  const a = price ? (isReserve ?
      new BigNumber(price?.toSignificant(18)).times(divide).times(10 ** decimals).toFixed(6) :
      new BigNumber(price?.invert().toSignificant(18)).dividedBy(divide).dividedBy(10 ** decimals).toFixed(6)) : '-'
  const b = price ? (isReserve ?
      new BigNumber(price?.invert()?.toSignificant(18)).dividedBy(divide).dividedBy(10 ** decimals).toFixed(6) :
      new BigNumber(price?.toSignificant(18)).times(divide).times(10 ** decimals).toFixed(6)) : '-'

  return (
    <AutoColumn gap="md">
      <AutoRow justify="space-around" gap="4px">
        <AutoColumn justify="center">
          <StyledText title={`${myPrice ?? a ?? '-'}`} fontSize="14px" color="#333">
            {myPrice ?? (a ?? '-')}
          </StyledText>
          <Text fontSize="12px" pt={1} color="#111526">
            {t('%assetA% per %assetB%', {
              assetA: currencies[Field.CURRENCY_B]?.symbol ?? '',
              assetB: currencies[Field.CURRENCY_A]?.symbol ?? '',
            })}
          </Text>
        </AutoColumn>
        <AutoColumn justify="center">
          <StyledText title={`${myPrice ? 1 / Number(myPrice) : b ?? '-'}`} fontSize="14px" color="#333">
            {myPrice ? 1 / Number(myPrice) : b ?? '-'}
          </StyledText>
          <Text fontSize="12px" pt={1} color="#111526">
            {t('%assetA% per %assetB%', {
              assetA: currencies[Field.CURRENCY_A]?.symbol ?? '',
              assetB: currencies[Field.CURRENCY_B]?.symbol ?? '',
            })}
          </Text>
        </AutoColumn>
        <AutoColumn justify="center">
          <StyledText title={`${noLiquidity && price
              ? '100'
              : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
            %`} fontSize="14px" color="#333">
            {noLiquidity && price
              ? '100'
              : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
            %
          </StyledText>
          <Text fontSize="12px" pt={1} color="#111526">
            {t('Share of Pool')}
          </Text>
        </AutoColumn>
      </AutoRow>
    </AutoColumn>
  )
}

export default PoolPriceBar
