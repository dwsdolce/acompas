import { ref, watch } from 'vue'
import { Platform } from 'quasar'
import { KeepAwake } from '@capacitor-community/keep-awake'
import { logger } from 'src/utils/logger'

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

  const keepAwake = async () => {
    if (Platform.is.capacitor) {
      await KeepAwake.keepAwake()
    }

    else if (Platform.is.electron) {
      window.electronAPI.sendMessage('keep-awake')
    //   ipcRenderer.send('keep-awake')
    }

    else if ('wakeLock' in navigator) {
      try {
        screenLock.value = await navigator.wakeLock.request('screen')
      } catch (error) {
        logger.error('Unable to acquire screen wake lock:', error)
      }
    }
  }

  const allowSleep = async () => {
    if (Platform.is.capacitor) {
      await KeepAwake.allowSleep()
    }

    else if (Platform.is.electron) {
      window.electronAPI.sendMessage('allow-sleep')
    //   ipcRenderer.send('allow-sleep')
    }

    else if ('wakeLock' in navigator) {
      try {
        if (screenLock.value) {
          screenLock.value.release()
        }
      } catch (error) {
        logger.error('Unable to release screen wake lock:', error)
      }
    }
  }

  return {
    isSupported,
    keepAwake,
    allowSleep
  }
}
