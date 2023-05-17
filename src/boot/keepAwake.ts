import { KeepAwake } from '@capacitor-community/keep-awake'
import { Platform } from 'quasar'
import { boot } from 'quasar/wrappers'

const isSupported = async () => {
  const result = await KeepAwake.isSupported()
  return result.isSupported
}

const isKeptAwake = async () => {
  const result = await KeepAwake.isKeptAwake()
  return result.isKeptAwake
}

export default boot(async () => {
  if (Platform.is.capacitor && await isSupported()) {
    await KeepAwake.keepAwake()
  }
})
