import { useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { Text, Flex, CardBody, CardFooter, Button, AddIcon, ArrowBackIcon, IconButton } from '@pancakeswap/uikit'
import Link from 'next/link'
import { useTranslation } from '@pancakeswap/localization'
import { useWeb3React } from '@web3-react/core'
import FullPositionCard from '../../components/PositionCard'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { usePairs, PairState } from '../../hooks/usePairs'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
import Dots from '../../components/Loader/Dots'
import { AppHeader, AppBody } from '../../components/App'
import Page from '../Page'

const Body = styled(CardBody)`
  background-color: ${({ theme }) => theme.colors.dropdownDeep};
`

const StyledButton = styled(Button)`
  background: linear-gradient(90deg, #EB3DFF 0%, #5C53D3 100%);
  border-radius: 28px;
`

const TextCenter = styled.div`
  text-align: center;
  margin-bottom: 4px;
`

export default function Pool() {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const theme = useTheme()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs],
  )
  const liquidityTokens = useMemo(
    () => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken),
    [tokenPairsWithLiquidityTokens],
  )
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens,
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0'),
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances],
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances ||
    v2Pairs?.length < liquidityTokensWithBalances.length ||
    (v2Pairs?.length && v2Pairs.every(([pairState]) => pairState === PairState.LOADING))
  const allV2PairsWithLiquidity = v2Pairs
    ?.filter(([pairState, pair]) => pairState === PairState.EXISTS && Boolean(pair))
    .map(([, pair]) => pair)

  const renderBody = () => {
    if (!account) {
      return (
        <Text color="textSubtle" textAlign="center">
          {t('Connect to a wallet to view your liquidity.')}
        </Text>
      )
    }
    if (v2IsLoading) {
      return (
        <Text color="textSubtle" textAlign="center">
          <Dots>{t('Loading')}</Dots>
        </Text>
      )
    }
    if (allV2PairsWithLiquidity?.length > 0) {
      return allV2PairsWithLiquidity.map((v2Pair, index) => (
        <FullPositionCard
          key={v2Pair.liquidityToken.address}
          pair={v2Pair}
          mb={index < allV2PairsWithLiquidity.length - 1 ? '16px' : 0}
        />
      ))
    }
    return (
      <Text color="textSubtle" textAlign="center">
        {t('No liquidity found.')}
      </Text>
    )
  }
  const [isAddWhitelist, setIsAddWhitelist] = useState(false)
  const [isAddWiteListSuccess, setIsAddWiteListSuccess] = useState(false)
  const [isMore, setMore] = useState(false)
  const [whiteListInfo, setWhiteListInfo] = useState({
    whiteListAddress: '',
    contractAddress: '',
  })

  return !isAddWhitelist ? (
    <Page>
      <AppBody>
        <AppHeader title={t('Your Liquidity')} subtitle="" />
        <Text color={theme.colors.contrast} p={[0, 17]} fontSize="12px">
          <TextCenter>{t('liquidityTitle')}</TextCenter>
          {t('liquidityText1')}
          <br />
          {t('liquidityText2')}
          <br />
          {t('liquidityText3')}
          <br />
          {
            isMore ?
                <>
                  {t('liquidityText4')}
                  <br />
                  {t('liquidityText5')}
                  <br />
                  {t('liquidityText6')}
                  <br />
                  {t('liquidityText7')}
                </> : null
          }
          <div role="button" tabIndex="0" onKeyDown={() => {setMore(!isMore)}} style={{zoom: '0.96', color: '#5c53d3', cursor: 'pointer', textAlign: 'right'}} onClick={() => {setMore(!isMore)}}>{isMore ? t('hide') : t('more')}</div>
        </Text>
        <Body
          style={{
            background: '#F6F5FE',
          }}
        >
          {renderBody()}
          {account && !v2IsLoading && (
            <Flex flexDirection="column" alignItems="center" mt="24px">
              <Text color="textSubtle" mb="8px">
                {t("Don't see a pool you joined?")}
              </Text>
              <Link href="/find" passHref>
                <Button id="import-pool-link" variant="secondary" scale="sm" as="a">
                  {t('Find other LP tokens')}
                </Button>
              </Link>
            </Flex>
          )}
        </Body>
        <CardFooter style={{ textAlign: 'center' }}>
          <Link href="/add" passHref>
            <StyledButton
              id="join-pool-button"
              width="100%"
              startIcon={<AddIcon color="white" />}
            >
              {t('Add Liquidity')}
            </StyledButton>
          </Link>
          <Link href="/whitelist" passHref>
            <StyledButton id="join-pool-button" width="100%" style={{ background: 'transparent', boxShadow: 'unset', color: '#5c53d3', marginTop: '16px' }}>
              {t('addWhitelist')}
            </StyledButton>
          </Link>
        </CardFooter>
      </AppBody>
    </Page>
  ) : (
    <Page>
      <AppBody>
        <div
          style={{
            padding: '0 17px',
            marginBottom: '15px',
          }}
        >
          <div style={{ padding: '22px 0 14px 0' }}>
            <IconButton
              as="a"
              scale="sm"
              onClick={() => {
                setIsAddWhitelist(false)
              }}
            >
              <ArrowBackIcon width="22px" />
            </IconButton>
          </div>
          <div
            style={{
              fontFamily: 'Inter',
              fontSize: '12px',
              fontStyle: 'normal',
              lineHeight: '15px',
              color: '#111526',
            }}
          >
            <TextCenter>{t('liquidityTitle')}</TextCenter>
            {t('liquidityText1')}
            <br />
            {t('liquidityText2')}
            <br />
            {t('liquidityText3')}
            <br />
            {t('liquidityText4')}
            <br />
            {
              isMore ?
                  <>
                    {t('liquidityText5')}
                    <br />
                    {t('liquidityText6')}
                    <br />
                    {t('liquidityText7')}
                  </> : null
            }
            <div role="button" tabIndex="0" onKeyDown={() => {setMore(!isMore)}} style={{zoom: '0.96', color: '#5c53d3', cursor: 'pointer', textAlign: 'right'}} onClick={() => {setMore(!isMore)}}>{isMore ? t('hide') : t('more')}</div>
          </div>
        </div>
        <div
          style={{
            padding: '0 15px',
          }}
        >
          <div
            style={{
              color: '#333333',
              fontSize: '12px',
              fontWeight: '500',
              lineHeight: '15px',
              marginTop: '40px',
            }}
          >
            <div>{t('whitelistAddress')}</div>
            {!isAddWiteListSuccess ? (
              <div
                style={{
                  background: '#E8F3FF',
                  border: '1px solid #000000',
                  borderRadius: '12px',
                  padding: '10px 15px',
                  marginTop: '10px',
                  height: '65px',
                }}
              >
                <textarea
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    lineHeight: '17px',
                  }}
                  onChange={(e) => {
                    setWhiteListInfo({
                      whiteListAddress: e.target.value,
                      contractAddress: whiteListInfo.contractAddress,
                    })
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  borderRadius: '12px',
                  padding: '10px 0px',
                  marginTop: '10px',
                  wordBreak: 'break-all',
                }}
              >
                {whiteListInfo.whiteListAddress}
              </div>
            )}
          </div>
          <div
            style={{
              color: '#333333',
              fontSize: '12px',
              fontWeight: '500',
              lineHeight: '15px',
              marginTop: '24px',
              marginBottom: '30px',
            }}
          >
            <div>{t('tokenContractAddress')}</div>
            {!isAddWiteListSuccess ? (
              <div
                style={{
                  background: '#E8F3FF',
                  border: '1px solid #000000',
                  borderRadius: '12px',
                  padding: '10px 15px',
                  marginTop: '10px',
                  height: '65px',
                }}
              >
                <textarea
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    lineHeight: '17px',
                  }}
                  onChange={(e) => {
                    setWhiteListInfo({
                      whiteListAddress: whiteListInfo.whiteListAddress,
                      contractAddress: e.target.value,
                    })
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  borderRadius: '12px',
                  padding: '10px 0px',
                  marginTop: '10px',
                  wordBreak: 'break-all',
                }}
              >
                {whiteListInfo.whiteListAddress}
              </div>
            )}
            {/* {!isAddWiteListSuccess && (
              <div
                style={{
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '15px',
                  color: '#AAAAAA',
                  marginTop: '5px',
                }}
              >
                {t('tokenIssuerText')}
              </div>
            )} */}
          </div>
        </div>
        <CardFooter style={{ textAlign: 'center' }}>
          {!isAddWiteListSuccess ? (
            <Button
              id="join-pool-button"
              width="100%"
              style={{ background: '#111526' }}
              onClick={() => {
                setIsAddWiteListSuccess(true)
              }}
            >
              {t('suppy10U')}
            </Button>
          ) : (
            <>
              <Link href="/add" passHref>
                <Button
                  id="join-pool-button"
                  width="100%"
                  style={{ background: '#111526' }}
                  startIcon={<AddIcon color="white" />}
                >
                  {t('Add Liquidity')}
                </Button>
              </Link>
              <Button
                id="join-pool-button"
                width="100%"
                style={{ background: 'white', color: 'black', marginTop: '10px', boxShadow: 'none' }}
                onClick={() => {
                  setIsAddWiteListSuccess(false)
                  setWhiteListInfo({
                    whiteListAddress: '',
                    contractAddress: '',
                  })
                }}
              >
                {t('addMoreWhitelist')}
              </Button>
            </>
          )}
        </CardFooter>
      </AppBody>
    </Page>
  )
}
