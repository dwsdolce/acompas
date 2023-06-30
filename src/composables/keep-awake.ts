import { KeepAwake } from '@capacitor-community/keep-awake'

export const useKeepAwake = () => {
  // if (Platform.is.capacitor && await isSupported()) {
  //   await KeepAwake.allowSleep()
  // }

  const isSupported = async () => {
    const result = await KeepAwake.isSupported()
    return result.isSupported
  }

  const isKeptAwake = async () => {
    const result = await KeepAwake.isKeptAwake()
    return result.isKeptAwake
  }

  const keepAwake = async () => { await KeepAwake.keepAwake() }

  const allowSleep = async () => { await KeepAwake.allowSleep() }

  // watch(isPlaying, async (value) => {
  //   if (Platform.is.capacitor && await isSupported()) {
  //     if (value) {
  //       await KeepAwake.keepAwake()
  //     } else {
  //       await KeepAwake.allowSleep()
  //     }
  //   }
  // })

  return {
    isSupported,
    isKeptAwake,
    keepAwake,
    allowSleep
  }
}
