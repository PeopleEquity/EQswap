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

export const FACTORY_ADDRESS = '0xB29F9baEa2a08aa1c64F7562FfC3F6dD41a9cfc5'

export const FACTORY_ADDRESS_MAP = {
  [ChainId.GOERLI]: '0xa373C0460cD7c1A355E07a004c8f8651aDE8a3d3',
  [ChainId.BSC]: FACTORY_ADDRESS,
  [ChainId.BSC_TESTNET]: '0xB29F9baEa2a08aa1c64F7562FfC3F6dD41a9cfc5',
  [ChainId.ARB_TESTNET]: '0x9bc213F86E29ecBA3443a4d0F10f60a968a96860',
}

export const INIT_CODE_HASH = '0x0443882da281f0ed8222bd5a60f66b112767e116c8dd815a29a4d6ec58fad964'

export const INIT_CODE_HASH_MAP = {
  [ChainId.GOERLI]: '0xbd6e9c8068984bfca91aed95f2f98658a71e81a7e6fdc3ee14a32e18282b6fd6',
  [ChainId.BSC]: INIT_CODE_HASH,
  [ChainId.BSC_TESTNET]: '0x0443882da281f0ed8222bd5a60f66b112767e116c8dd815a29a4d6ec58fad964',
  [ChainId.ARB_TESTNET]: '0x746497f4db32867dfd3a1515e392987d536072b04efdd59d9fba053b82ccaffb',
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
export const FEES_NUMERATOR = JSBI.BigInt(9985)
export const FEES_DENOMINATOR = JSBI.BigInt(10000)

export enum SolidityType {
  uint8 = 'uint8',
  uint256 = 'uint256',
}

export const SOLIDITY_TYPE_MAXIMA = {
  [SolidityType.uint8]: JSBI.BigInt('0xff'),
  [SolidityType.uint256]: JSBI.BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'),
}
