import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'capacitor.acompas.org',
  appName: 'A Compás',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1000,
      backgroundColor: '#000000',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      splashFullScreen: true,
      splashImmersive: true
    },
    KeepAwake: {
      enabled: true
    },
    App: {
      // Audio optimizations
      restoredResult: true
    }
  },
  ios: {
    contentInset: 'automatic',
    allowsLinkPreview: false,
    // iOS audio optimizations
    scheme: 'A Compás',
    preferredContentMode: 'mobile'
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    // Android audio optimizations
    useLegacyBridge: false,
    backgroundColor: '#000000'
  }
};

export default config;
