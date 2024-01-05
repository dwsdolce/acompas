import { ref, watch } from 'vue'
import { Platform } from 'quasar'
import { KeepAwake } from '@capacitor-community/keep-awake'

export const useKeepAwake = () => {
  // if (Platform.is.capacitor && await isSupported()) {
  //   await KeepAwake.allowSleep()
  // }

  const screenLock = ref<WakeLockSentinel | null>(null)

  const isSupported = async () => {
    const screenWakeLockSupported = 'wakeLock' in navigator
    const keepAwakeSupported = (await KeepAwake.isSupported()).isSupported

    return screenWakeLockSupported || keepAwakeSupported
  }

  const isKeptAwake = async () => {
    const result = await KeepAwake.isKeptAwake()
    return result.isKeptAwake
  }

  const keepAwake = async () => {
    if (Platform.is.capacitor) {
      await KeepAwake.keepAwake()
    }

    else if ('wakeLock' in navigator) {
      // Request a screen wake lock if supported
      try {
        screenLock.value = await navigator.wakeLock.request('screen')
        console.log('Screen wake lock is active')
      } catch (error) {
        console.error('Unable to acquire screen wake lock:', error)
      }
    }
  }

  const allowSleep = async () => {
    if (Platform.is.capacitor) {
      await KeepAwake.allowSleep()
    }

    // Release the screen wake lock if it was requested
    else if ('wakeLock' in navigator) {
      try {
        if (screenLock.value) {
          screenLock.value.release()
          console.log('Screen wake lock released')
        }
      } catch (error) {
        console.error('Unable to release screen wake lock:', error)
      }
    }
  }

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
