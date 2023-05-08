import { Checkbox } from '@pancakeswap/uikit'
import styled from 'styled-components'

const ZapCheckBoxWrapper = styled.label`
  display: grid;
  place-content: center;
  background: transparent;
  width: 40px;
  position: relative;
  z-index: 1;
`

export const ZapCheckbox = (props) => {
  return (
    <ZapCheckBoxWrapper>
      <Checkbox scale="sm" {...props} />
    </ZapCheckBoxWrapper>
  )
}
