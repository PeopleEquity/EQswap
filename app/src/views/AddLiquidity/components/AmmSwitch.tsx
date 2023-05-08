import React from 'react'
import Link from 'next/link'

import { NotificationDot, ArrowBackIcon, IconButton, Button, ButtonMenu, ButtonMenuItem } from '@pancakeswap/uikit'
import { useAppDispatch } from 'state'
import { changeAmmType } from 'state/amm/reducer'
import { AmmType } from 'state/amm/types'
import { useAmmType } from 'state/amm/hooks'
import { GlobalSettings } from 'components/Menu/GlobalSettings'
import { useExpertModeManager } from 'state/user/hooks'
import Transactions from 'components/App/Transactions'
import { SettingsMode } from 'components/Menu/GlobalSettings/types'

interface Props {
  backTo: any
  noLiquidity: boolean
}

const AmmSwitch: React.FC<React.PropsWithChildren<Props>> = ({ backTo, noLiquidity }) => {
  const ammType = useAmmType()

  const dispatch = useAppDispatch()

  const [expertMode] = useExpertModeManager()

  const setAmmType = (index: AmmType) => {
    dispatch(changeAmmType(index))
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'nowrap',
        padding: '17px 15px',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {backTo &&
        (typeof backTo === 'string' ? (
          <Link passHref href={backTo}>
            <IconButton as="a" scale="sm">
              <ArrowBackIcon width="22px" />
            </IconButton>
          </Link>
        ) : (
          <IconButton scale="sm" variant="text" onClick={backTo}>
            <ArrowBackIcon width="22px" />
          </IconButton>
        ))}
      <div style={{ background: '#F6F5FE', display: 'flex', borderRadius: '30px' }}>
        <Button
          style={{
            background: ammType === 1 ? '#4263EB' : 'transparent',
            color: ammType === 1 ? 'white' : '#333',
            borderRadius: '30px',
            whiteSpace: 'nowrap',
            width: '54px',
            height: '32px',
            outline: 'none',
            boxShadow: 'none',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '15px',
          }}
          disabled={!noLiquidity}
          onClick={() => {
            setAmmType(AmmType.Default)
          }}
        >ES I</Button>
        <Button
          style={{
            background: ammType === 2 ? '#4263EB' : 'transparent',
            color: ammType === 2 ? 'white' : '#333',
            borderRadius: '30px',
            whiteSpace: 'nowrap',
            width: '54px',
            height: '32px',
            outline: 'none',
            boxShadow: 'none',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '15px',
          }}
          disabled={!noLiquidity}
          onClick={() => {
            setAmmType(AmmType.SevenFive)
          }}
        >ES II</Button>
        <Button
          style={{
            background: ammType === 3 ? '#4263EB' : 'transparent',
            color: ammType === 3 ? 'white' : '#333',
            borderRadius: '30px',
            whiteSpace: 'nowrap',
            width: '54px',
            height: '32px',
            outline: 'none',
            boxShadow: 'none',
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '15px',
          }}
          disabled={!noLiquidity}
          onClick={() => {
            setAmmType(AmmType.Five)
          }}
        >ES III</Button>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <NotificationDot show={expertMode}>
          <GlobalSettings mode={SettingsMode.SWAP_LIQUIDITY} />
        </NotificationDot>
        <Transactions />
      </div>
    </div>
  )
}

export default AmmSwitch
