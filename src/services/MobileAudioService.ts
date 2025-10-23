import * as Tone from 'tone'
import { Platform } from 'quasar'

// Types for event listeners
interface AppStateData {
  isActive: boolean
}

interface CapacitorListener {
  remove: () => void
}

// Declarations for Capacitor modules that may not be available
declare global {
  interface Window {
    capacitorApp?: {
      addListener: (event: string, callback: (data: AppStateData) => void) => CapacitorListener
      removeAllListeners: () => void
    }
  }
}

/**
 * Mobile-optimized audio management service.
 * Handles audio context initialization, performance optimizations
 * and application lifecycle management.
 */
export class MobileAudioService {
  private isInitialized = false
  private suspendTimeout: NodeJS.Timeout | null = null
  private appListeners: Array<{ remove: () => void }> = []
  private readonly SUSPEND_DELAY = 5000 // 5 seconds

  /**
   * Initializes the mobile audio service
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.log('MobileAudioService already initialized')
      return
    }

    console.log('Initializing MobileAudioService...')

    try {
      // Wait for user interaction on mobile (required)
      if (Platform.is.mobile || Platform.is.capacitor || Platform.is.cordova) {
        await this.waitForUserInteraction()
      }

      // Start Tone.js audio context
      await Tone.start()
      console.log('Tone.js context started')

      // Apply mobile-specific optimizations
      this.configureToneForMobile()

      // Setup app lifecycle management
      this.setupAppLifecycleHandlers()

      this.isInitialized = true
      console.log('MobileAudioService initialized successfully')
    } catch (error) {
      console.error('Failed to initialize MobileAudioService:', error)
      throw error
    }
  }

  /**
   * Waits for user interaction (required by mobile browsers)
   */
  private async waitForUserInteraction(): Promise<void> {
    return new Promise(resolve => {
      console.log('Waiting for user interaction...')

      const handler = (event: Event) => {
        console.log('User interaction detected:', event.type)
        document.removeEventListener('touchstart', handler, { passive: true } as EventListenerOptions)
        document.removeEventListener('touchend', handler, { passive: true } as EventListenerOptions)
        document.removeEventListener('click', handler)
        document.removeEventListener('keydown', handler)
        resolve()
      }

      // Listen to multiple event types
      document.addEventListener('touchstart', handler, { passive: true })
      document.addEventListener('touchend', handler, { passive: true })
      document.addEventListener('click', handler)
      document.addEventListener('keydown', handler)

      // Safety timeout (in case interaction is not detected)
      setTimeout(() => {
        console.log('User interaction timeout - proceeding anyway')
        document.removeEventListener('touchstart', handler, { passive: true } as EventListenerOptions)
        document.removeEventListener('touchend', handler, { passive: true } as EventListenerOptions)
        document.removeEventListener('click', handler)
        document.removeEventListener('keydown', handler)
        resolve()
      }, 10000) // 10 seconds max
    })
  }

  /**
   * Configure Tone.js for optimal mobile performance
   */
  private configureToneForMobile(): void {
    console.log('Configuring Tone.js for mobile...')

    try {
      // Latency and performance optimizations
      if (Tone.context) {
        // Favor stability over ultra-low latency
        Tone.context.latencyHint = 'playback'

        // Reduce look-ahead to decrease latency
        Tone.context.lookAhead = Platform.is.mobile ? 0.05 : 0.1

        // Optimize sample rate if possible
        if (Platform.is.mobile && Tone.context.sampleRate) {
          console.log(`Audio sample rate: ${Tone.context.sampleRate}Hz`)
        }

        console.log(`Audio context latency hint: ${Tone.context.latencyHint}`)
        console.log(`Audio context look ahead: ${Tone.context.lookAhead}s`)
      }

      // Platform-specific optimizations
      if (Platform.is.ios) {
        // iOS has specific audio peculiarities
        console.log('Applied iOS-specific audio optimizations')
      } else if (Platform.is.android) {
        // Android may need different optimizations
        console.log('Applied Android-specific audio optimizations')
      }

    } catch (error) {
      console.warn('Could not apply all mobile optimizations:', error)
    }
  }

  /**
   * Configure app lifecycle event handlers
   */
  private setupAppLifecycleHandlers(): void {
    console.log('Setting up app lifecycle handlers...')

    if (Platform.is.capacitor) {
      this.setupCapacitorListeners()
    } else {
      this.setupWebListeners()
    }
  }

  /**
   * Configure listeners for Capacitor
   */
  private async setupCapacitorListeners(): Promise<void> {
    try {
      // Dynamically import and use Capacitor plugins if available
      const { App } = await import('@capacitor/app')

      const stateListener = await App.addListener('appStateChange', ({ isActive }) => {
        console.log('App state changed:', isActive ? 'active' : 'background')
        if (isActive) {
          this.resume()
        } else {
          this.suspendWithDelay()
        }
      })

      const pauseListener = await App.addListener('pause', () => {
        console.log('App paused')
        this.suspendWithDelay()
      })

      const resumeListener = await App.addListener('resume', () => {
        console.log('App resumed')
        this.resume()
      })

      this.appListeners.push(stateListener, pauseListener, resumeListener)
    } catch (error) {
      console.warn('Capacitor App plugin not available:', error)
      this.setupWebListeners()
    }
  }

  /**
   * Configure listeners for web
   */
  private setupWebListeners(): void {
    const visibilityHandler = () => {
      console.log('Visibility changed:', document.hidden ? 'hidden' : 'visible')
      if (document.hidden) {
        this.suspendWithDelay()
      } else {
        this.resume()
      }
    }

    const blurHandler = () => {
      console.log('Window blurred')
      this.suspendWithDelay()
    }

    const focusHandler = () => {
      console.log('Window focused')
      this.resume()
    }

    document.addEventListener('visibilitychange', visibilityHandler)
    window.addEventListener('blur', blurHandler)
    window.addEventListener('focus', focusHandler)

    // Store references for cleanup
    this.appListeners.push({
      remove: () => {
        document.removeEventListener('visibilitychange', visibilityHandler)
        window.removeEventListener('blur', blurHandler)
        window.removeEventListener('focus', focusHandler)
      }
    })
  }

  /**
   * Suspend audio context with a delay
   */
  private suspendWithDelay(): void {
    // Cancel any existing timeout
    if (this.suspendTimeout) {
      clearTimeout(this.suspendTimeout)
    }

    // Wait before suspending (in case user returns quickly)
    this.suspendTimeout = setTimeout(() => {
      this.suspend()
    }, this.SUSPEND_DELAY)
  }

  /**
   * Suspend audio context to save battery
   */
  suspend(): void {
    if (this.suspendTimeout) {
      clearTimeout(this.suspendTimeout)
      this.suspendTimeout = null
    }

    try {
      if (Tone.context.state === 'running') {
        console.log('Suspending audio context')
        // Cast to AudioContext to access suspend/resume methods
        const audioContext = Tone.context as unknown as AudioContext
        if (audioContext.suspend) {
          audioContext.suspend()
        }
      }
    } catch (error) {
      console.warn('Error suspending audio context:', error)
    }
  }

  /**
   * Resume audio context
   */
  resume(): void {
    // Cancel scheduled suspension
    if (this.suspendTimeout) {
      clearTimeout(this.suspendTimeout)
      this.suspendTimeout = null
    }

    try {
      if (Tone.context.state === 'suspended') {
        console.log('Resuming audio context')
        // Cast to AudioContext to access suspend/resume methods
        const audioContext = Tone.context as unknown as AudioContext
        if (audioContext.resume) {
          audioContext.resume()
        }
      }
    } catch (error) {
      console.warn('Error resuming audio context:', error)
    }
  }

  /**
   * Get current audio context state
   */
  getAudioState(): string {
    return Tone.context?.state || 'unknown'
  }

  /**
   * Check if service is initialized
   */
  get initialized(): boolean {
    return this.isInitialized
  }

  /**
   * Get audio performance information
   */
  getPerformanceInfo(): {
    state: string
    sampleRate: number
    baseLatency: number
    outputLatency: number
    lookAhead: number
  } {
    const context = Tone.context
    const audioContext = context as unknown as AudioContext

    return {
      state: context.state,
      sampleRate: context.sampleRate,
      baseLatency: audioContext.baseLatency || 0,
      outputLatency: audioContext.outputLatency || 0,
      lookAhead: context.lookAhead
    }
  }

  /**
   * Force audio context reconnection (useful in case of problems)
   */
  async reconnect(): Promise<void> {
    console.log('Reconnecting audio context...')

    try {
      await this.suspend()
      await new Promise(resolve => setTimeout(resolve, 100))
      await this.resume()
      await Tone.start()
      console.log('Audio context reconnected successfully')
    } catch (error) {
      console.error('Failed to reconnect audio context:', error)
      throw error
    }
  }

  /**
   * Clean up all resources
   */
  dispose(): void {
    console.log('Disposing MobileAudioService...')

    // Clean up timeouts
    if (this.suspendTimeout) {
      clearTimeout(this.suspendTimeout)
      this.suspendTimeout = null
    }

    // Clean up event listeners
    this.appListeners.forEach(listener => {
      try {
        listener.remove()
      } catch (error) {
        console.warn('Error removing listener:', error)
      }
    })
    this.appListeners = []

    // Suspend audio context
    this.suspend()

    this.isInitialized = false
    console.log('MobileAudioService disposed')
  }
}
