export interface State {
  data: {
    ammType: AmmType
  }
}

export const enum AmmType {
  /** 1: 8 */
  Default = 1,
  /** 1: 16 */
  SevenFive = 2,
  /** 1: 32 */
  Five = 3,
}
