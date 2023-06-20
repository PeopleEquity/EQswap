import JSBI from 'jsbi'

// exports for external consumption
export type BigintIsh = JSBI | number | string

export enum ChainId {
  // ETHEREUM = 1,
  // RINKEBY = 4,
  GOERLI = 5,
  BSC = 56,
  BSC_TESTNET = 97,
  ARB_TESTNET = 421613
}

export enum TradeType {
  EXACT_INPUT,
  EXACT_OUTPUT,
}

export enum Rounding {
  ROUND_DOWN,
  ROUND_HALF_UP,
  ROUND_UP,
}

export const FACTORY_ADDRESS = '0x0B2F6E13BF33bd724B3dDEb548576D86D9514C0A'

export const FACTORY_ADDRESS_MAP = {
  [ChainId.GOERLI]: '0xa373C0460cD7c1A355E07a004c8f8651aDE8a3d3',
  [ChainId.BSC]: FACTORY_ADDRESS,
  [ChainId.BSC_TESTNET]: '0xeff754Bd50d9FCb6e3F2B9594aCaACC089Aed652',
  [ChainId.ARB_TESTNET]: '0x6941CD0d6EF3E4c1294b85fe6EF275AA6C4691fb',
}

export const INIT_CODE_HASH = '0xd1c2b3bda73011e012c0bbf63c5a9a1e3e8c8cf5866634577465c11c63606962'

export const INIT_CODE_HASH_MAP = {
  [ChainId.GOERLI]: '0xbd6e9c8068984bfca91aed95f2f98658a71e81a7e6fdc3ee14a32e18282b6fd6',
  [ChainId.BSC]: INIT_CODE_HASH,
  [ChainId.BSC_TESTNET]: '0x347ab37ef590e037d74eab00abd8b0158b679c088e3b99e07905e7e71fa68920',
  [ChainId.ARB_TESTNET]: '0xddb43bdccbba1a5f8ed99fdaccbafbcb4292989533b27066454dccc7f50ff467',
}

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const TWO = JSBI.BigInt(2)
export const THREE = JSBI.BigInt(3)
export const FIVE = JSBI.BigInt(5)
export const TEN = JSBI.BigInt(10)
export const _100 = JSBI.BigInt(100)
export const FEES_NUMERATOR = JSBI.BigInt(9970)
export const FEES_DENOMINATOR = JSBI.BigInt(10000)

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256',
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'),
}
