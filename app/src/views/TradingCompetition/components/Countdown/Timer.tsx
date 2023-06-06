import styled from 'styled-components'
import { Flex, Heading, Text, Link, useTooltip } from '@pancakeswap/uikit'
import { useTranslation, ContextApi } from '@pancakeswap/localization'
import { getBscScanLink } from 'utils'
import {useWeb3React} from "@web3-react/core";
import { getScan } from '../../../../utils/wallet'

export interface TimerProps {
  prefix?: string
  suffix?: string
  minutes?: number
  hours?: number
  days?: number
  showTooltip?: boolean
  blockNumber?: number
  HeadingTextComponent?: React.ElementType
  BodyTextComponent?: React.ElementType
}

const StyledTimerFlex = styled(Flex)<{ showTooltip?: boolean }>`
  ${({ theme, showTooltip }) => (showTooltip ? ` border-bottom: 1px dashed ${theme.colors.textSubtle};` : ``)}
  div:last-of-type {
    margin-right: 0;
  }
`

const Timer = ({ minutes, hours, days, showTooltip, HeadingTextComponent, BodyTextComponent }) => {
  const { t } = useTranslation()

  return (
    <StyledTimerFlex alignItems="flex-end" showTooltip={showTooltip}>
      {Boolean(days) && (
        <>
          <HeadingTextComponent mr="2px">{days}</HeadingTextComponent>
          <BodyTextComponent mr="16px">{t('d')}</BodyTextComponent>
        </>
      )}
      {Boolean(hours) && (
        <>
          <HeadingTextComponent mr="2px">{hours}</HeadingTextComponent>
          <BodyTextComponent mr="16px">{t('h')}</BodyTextComponent>
        </>
      )}
      {Boolean(minutes) && (
        <>
          <HeadingTextComponent mr="2px">{minutes}</HeadingTextComponent>
          <BodyTextComponent>{t('m')}</BodyTextComponent>
        </>
      )}
    </StyledTimerFlex>
  )
}

const DefaultHeadingTextComponent = ({ children, ...props }) => (
  <Heading scale="lg" {...props}>
    {children}
  </Heading>
)
const DefaultBodyTextComponent = ({ children, ...props }) => (
  <Text fontSize="16px" fontWeight="600" {...props}>
    {children}
  </Text>
)

const TooltipContent = ({ blockNumber, t, chainId }: { blockNumber: number; chainId: number; t: ContextApi['t'] }): JSX.Element => (
  <>
    <Text color="body" mb="10px" fontWeight="600">
      {t('Block %num%', { num: blockNumber })}
    </Text>
    <Link external href={getBscScanLink(blockNumber, 'block', chainId)}>
      {t('View on %scan%', {scan: getScan(chainId)})}
    </Link>
  </>
)

const Wrapper: React.FC<React.PropsWithChildren<TimerProps>> = ({
  prefix,
  suffix,
  minutes,
  hours,
  days,
  blockNumber,
  showTooltip = false,
  HeadingTextComponent = DefaultHeadingTextComponent,
  BodyTextComponent = DefaultBodyTextComponent,
}) => {
  const { t } = useTranslation()
  const { chainId } = useWeb3React()
  const { targetRef, tooltip, tooltipVisible } = useTooltip(<TooltipContent blockNumber={blockNumber} chainId={chainId} t={t} />, {
    placement: 'bottom',
  })
  const shouldDisplayTooltip = showTooltip && tooltipVisible
  return (
    <Flex alignItems="flex-end" position="relative">
      {prefix && <BodyTextComponent mr="16px">{prefix}</BodyTextComponent>}
      <div ref={targetRef}>
        <Timer
          minutes={minutes}
          hours={hours}
          days={days}
          HeadingTextComponent={HeadingTextComponent}
          BodyTextComponent={BodyTextComponent}
          showTooltip={showTooltip}
        />
        {shouldDisplayTooltip && tooltip}
      </div>
      {suffix && <BodyTextComponent ml="16px">{suffix}</BodyTextComponent>}
    </Flex>
  )
}

export default Wrapper
