import { CapacitorConfig } from '@capacitor/cli'
import { use } from 'marked'

const config: CapacitorConfig = {
  appId: 'capacitor.acompas.org',
  appName: 'A Compás',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: false,
      launchFadeOutDuration: 500,
      backgroundColor: '#000000',
      androidSplashResourceName: 'launch_splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      androidSpinnerStyle: 'small',
      spinnerColor: '#ffffff',
      iosSpinnerStyle: 'small',
      splashFullScreen: true,
      splashImmersive: true,
      layoutName: 'launch_screen',
      useDialog: false,
    },
    StatusBar: {
      style: 'dark',
      // backgroundColor: '#000000',
      overlaysWebView: false,
      // androidTouchExplorationEnabled: true
    },
    KeepAwake: {
      enabled: true,
    },
  },
  ios: {
    contentInset: 'automatic',
    allowsLinkPreview: false,
    // iOS audio optimizations
    scheme: 'A Compás',
    preferredContentMode: 'mobile',
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    // Android audio optimizations
    useLegacyBridge: false,
    backgroundColor: '#000000',
  },
}

export default config
