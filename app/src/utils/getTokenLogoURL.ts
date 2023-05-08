const getTokenLogoURL = (address: string) => {
  return `/images/tokens/${address}.png`
  /* return `https://assets-cdn.trustwallet.com/blockchains/smartchain/assets/${address}/logo.png` */
}

export default getTokenLogoURL
