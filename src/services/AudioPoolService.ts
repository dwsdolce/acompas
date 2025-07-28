import * as Tone from 'tone'
import type { ExtendedPlayer } from 'src/utils/types'

/**
 * Audio pool management service to optimize metronome performance
 * by avoiding repeated allocations.
 */
export class AudioPoolService {
  private pools: Map<string, ExtendedPlayer[]> = new Map()
  private poolIndices: Map<string, number> = new Map()
  private readonly poolSize: number

  constructor(poolSize = 4) {
    this.poolSize = poolSize
  }

  /**
   * Initializes an audio object pool for a given sound
   * @param soundUrl - Audio file URL
   * @param volume - Default volume
   * @param poolKey - Unique key to identify the pool
   */
  async initializePool(soundUrl: string, volume: number, poolKey: string): Promise<void> {
    const pool: ExtendedPlayer[] = []

    // Create multiple instances of the same sound
    for (let i = 0; i < this.poolSize; i++) {
      const player = new Tone.Player({
        url: soundUrl,
        volume: volume,
        fadeOut: 1
      }) as ExtendedPlayer

      // Store default volume
      player.defaultVolume = volume

      // Wait for sound to load
      await player.loaded
      pool.push(player)
    }    this.pools.set(poolKey, pool)
    this.poolIndices.set(poolKey, 0)
  }

  /**
   * Gets the next available player from the pool
   * @param poolKey - Pool key
   * @returns Audio player or null if pool doesn't exist
   */
  getNextPlayer(poolKey: string): ExtendedPlayer | null {
    const pool = this.pools.get(poolKey)
    if (!pool || pool.length === 0) {
      console.warn(`Pool ${poolKey} not found or empty`)
      return null
    }

    const currentIndex = this.poolIndices.get(poolKey) || 0
    const player = pool[currentIndex]

    // Circular rotation in the pool
    this.poolIndices.set(poolKey, (currentIndex + 1) % this.poolSize)

    return player
  }

  /**
   * Connects all players from a pool to an audio channel
   * @param poolKey - Pool key
   * @param channel - Destination audio channel
   */
  connectToChannel(poolKey: string, channel: Tone.Channel): void {
    const pool = this.pools.get(poolKey)
    if (!pool) {
      console.warn(`Pool ${poolKey} not found`)
      return
    }

    pool.forEach(player => {
      if (player && typeof player.connect === 'function') {
        player.connect(channel)
      }
    })
  }

  /**
   * Updates the volume of all players in a pool
   * @param poolKey - Pool key
   * @param volumeOffset - Volume offset to add to default volume
   */
  updatePoolVolume(poolKey: string, volumeOffset: number): void {
    const pool = this.pools.get(poolKey)
    if (!pool) return

    pool.forEach(player => {
      if (player && player.defaultVolume !== undefined) {
        player.volume.value = player.defaultVolume + volumeOffset
      }
    })
  }

  /**
   * Checks if a pool exists and is initialized
   * @param poolKey - Pool key
   * @returns true if pool exists and contains players
   */
  hasPool(poolKey: string): boolean {
    const pool = this.pools.get(poolKey)
    return pool !== undefined && pool.length > 0
  }

  /**
   * Gets the size of a pool
   * @param poolKey - Pool key
   * @returns Pool size or 0 if pool doesn't exist
   */
  getPoolSize(poolKey: string): number {
    const pool = this.pools.get(poolKey)
    return pool ? pool.length : 0
  }

  /**
   * Gets statistics about the pools
   * @returns Object containing statistics
   */
  getStats(): { totalPools: number; totalPlayers: number; poolKeys: string[] } {
    let totalPlayers = 0
    const poolKeys: string[] = []

    this.pools.forEach((pool, key) => {
      totalPlayers += pool.length
      poolKeys.push(key)
    })

    return {
      totalPools: this.pools.size,
      totalPlayers,
      poolKeys
    }
  }

  /**
   * Cleans up and disposes all audio objects
   */
  dispose(): void {
    this.pools.forEach((pool, key) => {
      pool.forEach(player => {
        if (player && typeof player.dispose === 'function') {
          try {
            player.dispose()
          } catch (error) {
            console.warn(`Error disposing player in pool ${key}:`, error)
          }
        }
      })
    })

    this.pools.clear()
    this.poolIndices.clear()
  }

  /**
   * Preloads all sounds in a pool by silently triggering them
   * @param poolKey - Pool key to preload
   */
  async preloadPool(poolKey: string): Promise<void> {
    const pool = this.pools.get(poolKey)
    if (!pool) return

    // Trigger each player with very low volume for initialization
    const promises = pool.map(async (player, index) => {
      try {
        const originalVolume = player.volume.value
        player.volume.value = -60 // Very low volume

        // Trigger sound with delay to avoid conflicts
        await new Promise(resolve => setTimeout(resolve, index * 10))
        player.start(`+${index * 0.001}`)

        // Restore original volume after short delay
        setTimeout(() => {
          player.volume.value = originalVolume
        }, 100)
      } catch (error) {
        console.warn(`Error preloading player ${index} in pool ${poolKey}:`, error)
      }
    })

    await Promise.all(promises)
  }
}
