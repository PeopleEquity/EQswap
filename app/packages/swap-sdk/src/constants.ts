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

export const FACTORY_ADDRESS_MAP = {
  [ChainId.GOERLI]: '0xa373C0460cD7c1A355E07a004c8f8651aDE8a3d3',
  [ChainId.BSC]: '0x84c189d8B52Be28AD4C4c9427aBd304268b2FCBA',
  [ChainId.BSC_TESTNET]: '0xe177E3249cb88565eaF8Ff30A03798AB05f5B0aD',
  [ChainId.ARB_TESTNET]: '0x6941CD0d6EF3E4c1294b85fe6EF275AA6C4691fb',
}

export const INIT_CODE_HASH_MAP = {
  [ChainId.GOERLI]: '0xbd6e9c8068984bfca91aed95f2f98658a71e81a7e6fdc3ee14a32e18282b6fd6',
  [ChainId.BSC]: '0x03835b706f9d113189195657a879689bd6bd25bcb39e55b463074e777ab96aa9',
  [ChainId.BSC_TESTNET]: '0x36c213bfc4903e805f10edf4b52cd1beea3ec333f78e9887fe73f3d05a06cf3a',
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
