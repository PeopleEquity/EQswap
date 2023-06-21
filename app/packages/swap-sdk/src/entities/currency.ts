import JSBI from 'jsbi'
import { SolidityType } from '../constants'
import { NETWORK_CONFIG } from '../../../../src/config'
import { validateSolidityTypeInstance } from '../utils'

/**
 * A currency is any fungible financial instrument on Ethereum, including Ether and all ERC20 tokens.
 *
 * The only instance of the base class `Currency` is Ether.
 */
export class Currency {
  public decimals: number
  public symbol?: string
  public name?: string

  private static instance?: Currency

  /**
   * Constructs an instance of the base class `Currency`. The only instance of the base class `Currency` is `Currency.ETHER`.
   * @param decimals decimals of the currency
   * @param symbol symbol of the currency
   * @param name of the currency
   * @TODO protected may be changed into private
   */
  protected constructor(decimals: number, symbol?: string, name?: string) {
    validateSolidityTypeInstance(JSBI.BigInt(decimals), SolidityType.uint8)
    this.decimals = decimals
    this.symbol = symbol
    this.name = name
  }

  resetCurrency(chainId: number) {
    this.symbol = NETWORK_CONFIG[chainId]?.symbol
    this.decimals = NETWORK_CONFIG[chainId]?.decimals
    this.name = NETWORK_CONFIG[chainId]?.tokenName
  }

  static getInstance() {
    if (!Currency.instance) {
      Currency.instance = new Currency(18, 'BNB', 'BNB')
    }
    return Currency.instance
  }
}

const ETHER = Currency.getInstance()
export { ETHER }
