import {KeepAwake} from '@capacitor-community/keep-awake'
import { boot } from 'quasar/wrappers'

export default boot(async () => {
  if (await KeepAwake.isSupported()) {
    await KeepAwake.keepAwake()
    console.log('Keep awake enabled')
  } else {
    console.error('Keep awake not supported')
  }
})
