import {useCallback, useState} from 'react'
import styled from 'styled-components'
import {Button, Flex, Modal, InjectedModalProps, ModalProps, Text} from '@pancakeswap/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import {useTranslation} from "@pancakeswap/localization";

interface AddWhiteListModalProps {
  title: string
  handleSupply: () => void
  whiteListAddress: string
  token: string
  isLoading: boolean
  disable: boolean
}

const TextCenter = styled.div`
  text-align: center;
  margin-bottom: 4px;
`

const StyledButton = styled(Button)`
  background: linear-gradient(90deg, #EB3DFF 0%, #5C53D3 100%);
  border-radius: 28px;
  margin-top: 20px;
  width: 100%;
`

const StyledTitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  color: #000000;
  width: 100%;
`

const StyledText = styled.div`
  margin-top: 20px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #111526;
  margin-bottom: 12px;
`

const StyledSubTitle = styled.div`
  margin-top: 12px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #111526;
  text-align: left;
`

const StyledAddress = styled.div`
  margin-top: 12px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #111526;
`

const AddWhiteListModal: React.FC<
    React.PropsWithChildren<InjectedModalProps & AddWhiteListModalProps & ModalProps>
    > = ({ title, onDismiss, handleSupply, whiteListAddress, token, disable, isLoading, ...props }) => {
  const { chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const [isMore, setMore] = useState(false)

  const handleDismiss = useCallback(() => {
    onDismiss?.()
  }, [onDismiss])

  if (!chainId) return null

  return (
      <Modal {...props} hideHeader hideCloseButton onDismiss={handleDismiss}>
        <Flex flexDirection="column" alignItems="baseline" justifyContent="center" maxWidth="320px">
          <StyledTitle>{title}</StyledTitle>
          {/* <StyledText>{t('whiteListText')}</StyledText> */}
          <StyledText>
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
          </StyledText>
          <StyledSubTitle>
            <span>
              {t('accountAddress')}
            </span>
          </StyledSubTitle>
          <StyledAddress>
            {whiteListAddress}
          </StyledAddress>
          <StyledSubTitle>
            <span>
              {t('tokenAddress')}
            </span>
          </StyledSubTitle>
          <StyledAddress>
            {token}
          </StyledAddress>
          <StyledButton
              onClick={async () => {
                await handleSupply()
                onDismiss()
              }}
              disabled={disable}
              isLoading={isLoading}
          >{t('supply')}</StyledButton>
          <StyledButton
              style={{ background: 'transparent', boxShadow: 'unset', color: '#5c53d3' }}
              onClick={onDismiss}
          >{t('cancel')}</StyledButton>
        </Flex>
      </Modal>
  )
}

export default AddWhiteListModal
