let swapSound: HTMLAudioElement

const swapSoundURL = 'https://peopleequity.club/coin.MP3'

export const getSwapSound = () => {
  if (!swapSound) {
    swapSound = new Audio(swapSoundURL)
  }
  return swapSound
}
