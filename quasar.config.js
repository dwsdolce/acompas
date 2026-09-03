/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

// const VueDevTools = require('vite-plugin-vue-devtools');


import { defineConfig } from '@quasar/app-vite'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { readFileSync } from 'node:fs'

// quasar.config is loaded as ESM by @quasar/app-vite v2, so __dirname and
// require() are not available.
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(readFileSync(path.resolve(__dirname, 'package.json'), 'utf8'))


export default defineConfig(function (ctx) {
  return {
    // eslint: {
    //   // fix: true,
    //   // include = [],
    //   // exclude = [],
    //   // rawOptions = {},
    //   warnings: true,
    //   errors: true
    // },

    // https://v2.quasar.dev/quasar-cli-vite/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-vite/boot-files
    boot: [
      'i18n',
      'statusbar'
    ],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
    css: [
      'app.sass'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      'mdi-v7',
      // 'fontawesome-v6',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      // 'material-icons' // optional, you are not bound to it
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
    build: {
      // @quasar/app-vite v3 ships only two default aliases, '@' and '#q-app'.
      // The framework aliases v1/v2 provided (src, components, stores, ...)
      // were dropped; this project imports via 'src/...' in 140 places, so
      // that one is restored here rather than rewriting every import.
      alias: {
        src: path.resolve(__dirname, './src'),
        layouts: path.resolve(__dirname, './src/layouts'),
        pages: path.resolve(__dirname, './src/pages')
      },

      // In v3 build.env configures env-FILE loading (clientPrefix, folder,
      // file, filter) — it is no longer a map of variables to inject, as it
      // was in v1/v2. Build-time constants go through define instead.
      // Without this, process.env.APP_VERSION is undefined at runtime and the
      // header falls back to showing "v4".
      define: {
        'process.env.APP_VERSION': JSON.stringify(pkg.version),

        // vue-i18n ships two message compilers. The default one turns every
        // translation string into a function with `Function("return ...")`,
        // which the Content-Security-Policy in index.html forbids: without
        // this flag the policy blocks the first message compiled and the app
        // renders nothing at all.
        //
        // The JIT compiler produces the same AST and walks it instead of
        // generating code, so it needs no eval. Results are cached per message
        // either way. vue-i18n defaults the flag to false when the bundler
        // leaves it undefined, so it has to be set explicitly here.
        __INTLIFY_JIT_COMPILATION__: true
      },
      target: {
        browser: [ 'es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1' ],
        node: 'node20'
      },

      // Hash mode everywhere, so one build runs from anywhere.
      //
      // Capacitor and Electron always needed it: they serve from a local root
      // (capacitor://localhost, file://) where a non-root history route breaks
      // relative asset resolution and gives a white screen.
      //
      // The web build now shares it because the site is deployed into a
      // subfolder rather than at a domain root. History mode would mean baking
      // that folder into the build and adding a server rewrite so that
      // /flamenco/solea returns index.html; hash mode asks nothing of the
      // server and lets the same files be copied to any path. The cost is the
      // "#" in the URL and search engines treating every route as one page,
      // which is a trade worth making for a metronome.
      vueRouterMode: 'hash', // available values: 'hash', 'history'
      // vueRouterBase,
      vueDevtools: true,
      // vueOptionsAPI: false,

      // rebuildCache: true, // rebuilds Vite/linter/etc cache on startup

      publicPath: '/',
      // analyze: true,
      // env: {},
      // rawDefine: {}
      // ignorePublicFolder: true,
      // minify: false,
      // polyfillModulePreload: true,
      // distDir

      // Emit relative asset URLs for the production web build, so the same
      // dist/spa runs from any directory: the live site, a test folder beside
      // it, or a domain root. Copy the files and it works — no rebuild, no
      // server configuration.
      //
      // This has to go through Vite rather than publicPath above, because
      // Quasar formats publicPath to an absolute path for spa/pwa/ssr and
      // would turn './' into '/./'. It is not a hack around the framework
      // though: Quasar already forces publicPath to '' for capacitor, cordova,
      // electron and bex, which produces exactly these relative URLs. This
      // gives the web build the same treatment.
      //
      // Dev keeps '/' because the dev server serves from the root, and
      // relative URLs there break Vite's module graph.
      //
      // Note that relative URLs resolve against the *document* URL, so the app
      // must be served with a trailing slash - .../palmas_web/ rather than
      // .../palmas_web. Servers normally redirect to add it.
      extendViteConf (viteConf) {
        if (ctx.mode.spa && ctx.prod) {
          viteConf.base = './'
        }
      },
      // viteVuePluginOptions: {},

      // No i18n Vite plugin. The messages in src/i18n are .ts modules, not the
      // JSON/YAML resource files these plugins exist to precompile, and
      // @intlify/unplugin-vue-i18n defaults to runtimeOnly — which aliases
      // vue-i18n to its runtime-only build and leaves raw object messages with
      // no compiler, silently emptying every translated control in the UI.
      vitePlugins: [],

      // Ajouter l'analyse du bundle
      analyze: process.env.ANALYZE === 'true',
      // Optimiser les chunks
      // No manual chunking. A rollupOptions.output.manualChunks block used to
      // sit here splitting vue/quasar into a "vendor" chunk and tone into an
      // "audio" one, but Vite 8 builds with rolldown and never produced either
      // chunk — verified by inspecting the build output. Rolldown's equivalent
      // is build.rolldownOptions.output.advancedChunks; splitting is worth
      // revisiting deliberately rather than leaving config that does nothing.
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#devServer
    devServer: {
      // https: true
      open: true // opens browser window automatically
    },

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#framework
    framework: {
      config: {
        capacitor: {
          iosStatusBarPadding: true, // add the dynamic top padding on iOS mobile devices
          backButtonExit: true, // Quasar handles app exit on mobile phone back button
          androidTouchExplorationEnabled: true, // enable TalkBack on Android
          splashIconScale: 0.9, // scale the splash icon (1 = 100%) for more control over how it looks on different screen sizes
          statusBarPadding: true // add the dynamic top padding for iOS and Android mobile devices
        }
      },

      iconSet: 'mdi-v7', // Quasar icon set
      // lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: [
        'Notify', 'Loading', 'Dialog'
      ]
    },

    // animations: 'all', // --- includes all animations
    // https://v2.quasar.dev/options/animations
    animations: [],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#sourcefiles
    sourceFiles: {
      // rootComponent: 'src/App.vue',
      // router: 'src/router/index',
      // store: 'src/store/index',
    //   registerServiceWorker: 'src-pwa/register-service-worker',
    //   serviceWorker: 'src-pwa/custom-service-worker',
    //   pwaManifestFile: 'src-pwa/manifest.json',
      electronMain: 'src-electron/electron-main',
      electronPreload: 'src-electron/electron-preload'
    },

    bin: {
      // Tell Quasar where the Android studio executable is located.
      // Hint : you can create a /usr/local/android-studio symlink which
      // points to your local install by running this :
      // sudo ln -s /path/to/my/local/android-studio /usr/local/android-studio
      linuxAndroidStudio: '/usr/local/android-studio/bin/studio.sh'
    },

    // https://v2.quasar.dev/quasar-cli-vite/developing-ssr/configuring-ssr
    ssr: {
      // ssrPwaHtmlFilename: 'offline.html', // do NOT use index.html as name!
                                          // will mess up SSR

      // extendSSRWebserverConf (esbuildConf) {},
      // extendPackageJson (json) {},

      pwa: false,

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: 3000, // The default port that the production server should use
                      // (gets superseded if process.env.PORT is specified at runtime)

      middlewares: [
        'render' // keep this as last one
      ]
    },

    // https://v2.quasar.dev/quasar-cli-vite/developing-pwa/configuring-pwa
    pwa: {
      workboxMode: 'generateSW', // or 'injectManifest'
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false,
      // extendGenerateSWOptions (cfg) {}
      // extendInjectManifestOptions (cfg) {},
      // extendManifestJson (json) {}
      // extendPWACustomSWConf (esbuildConf) {}
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/configuring-electron
    electron: {
      // extendElectronMainConf (esbuildConf)
      // extendElectronPreloadConf (esbuildConf)

      bundler: 'builder', // 'packager' or 'builder'

      // electron-packager options
      // https://electron.github.io/electron-packager/main/
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      // electron-builder options
      // https://www.electron.build/configuration/configuration
      builder: {
        appId: 'com.dolcesfogato.palmas',
        productName: 'Palmas',
        // Both lines are required by the AGPL: the original authors keep their
        // copyright, and a modified version has to say that it is one.
        copyright: 'Copyright © 2014-2023 Olivier Ricordeau, Jérémie Sieffert; © 2026 David Smith. Based on A Compás.',
        mac: {
          category: 'public.app-category.music',
          // Signing is opt-in and off by default. Left to itself
          // electron-builder finds the Developer ID in the keychain and signs
          // with the hardened runtime; macOS then kills the app on launch
          // because it is not notarized, with no dialog and no output. An
          // explicit null keeps local builds unsigned and launchable.
          //
          // packaging/build_mac exports CSC_NAME from the settings file
          // outside the repository, which turns both of these on. Notarizing
          // needs credentials as well, and electron-builder throws if it is
          // asked to notarize without them, so that is checked here too - it
          // reads whichever of the three sets is present.
          identity: process.env.CSC_NAME ?? null,
          notarize: Boolean(
            process.env.CSC_NAME && (
              process.env.APPLE_KEYCHAIN_PROFILE ||
              process.env.APPLE_API_KEY ||
              process.env.APPLE_ID
            )
          ),
        },
        win: {
          // No icon setting needed: Quasar points electron-builder at
          // src-electron/electron-assets/icons/icon, which resolves to
          // icon.ico here and is generated by `yarn icons`.
          //
          // Two artefacts, named by electron-builder's own templates and
          // distinguishable only by the word "Setup":
          //   nsis     -> "Acompas Setup <version>.exe", the installer
          //   portable -> "Acompas <version>.exe", self-extracting, no install
          target: ['nsis', 'portable']
        },
        nsis: {
          // electron-builder defaults oneClick to true, which installs the
          // moment the exe is opened - no wizard, no say in where it goes, and
          // then it launches the app. Perfectly functional and quite startling.
          // A conventional wizard is worth the extra two clicks.
          oneClick: false,
          allowToChangeInstallationDirectory: true
          // Upgrades need nothing here: installSection.nsh calls
          // uninstallOldVersion unconditionally, outside the ONE_CLICK branch,
          // so an existing install is removed first either way. perMachine
          // stays false, so this installs per-user with no elevation prompt
          // unless the directory chosen above needs one.
        },
        // linux: {
        //   target: ['AppImage', 'deb']
        // }
      },

      // Specify additional parameters when yarn/npm installing
      // the UnPackaged folder, right before bundling with either
      // electron packager or electron builder;
      // Example: [ '--ignore-optional', '--some-other-param' ]
      unPackagedInstallParams: [],

      // optional; add/remove/change properties
      // of production generated package.json
      extendPackageJson (pkg) {
        // directly change props of pkg;
        // no need to return anything
      },

      inspectPort: 5858,

      extendElectronMainConf (cfg) {
        // do something with Esbuild config
        // for the Electron Main thread
      },

      extendElectronPreloadConf (cfg) {
        // do something with Esbuild config
        // for the Electron Preload thread
      }
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
    bex: {
      contentScripts: [
        'my-content-script'
      ],

      // extendBexScriptsConf (esbuildConf) {}
      // extendBexManifestJson (json) {}
    }
  }
})
