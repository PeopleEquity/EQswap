export interface State {
  data: {
    ammType: AmmType
  }
}

export const enum AmmType {
  /** 1: 1 */
  Default = 1,
  /** 1: 2 */
  SevenFive = 2,
  /** 1: 4 */
  Five = 3,
}
