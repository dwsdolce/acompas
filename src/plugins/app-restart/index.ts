import { registerPlugin } from '@capacitor/core'
import type { AppRestartPlugin } from './definitions'

const AppRestart = registerPlugin<AppRestartPlugin>('AppRestart')

export * from './definitions'
export { AppRestart }
