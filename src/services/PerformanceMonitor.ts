/**
 * Performance monitoring service for A Compás metronome
 * Tracks audio latency, memory usage, and provides optimization recommendations
 */
export class PerformanceMonitor {
  private audioLatencies: number[] = []
  private memoryUsage: number[] = []
  private readonly MAX_SAMPLES = 100
  private startTime: number = 0
  private isMonitoring = false

  /**
   * Starts performance monitoring
   */
  start(): void {
    this.isMonitoring = true
    this.startTime = performance.now()
    this.scheduleMemoryCheck()
    console.log('Performance monitoring started')
  }

  /**
   * Stops performance monitoring
   */
  stop(): void {
    this.isMonitoring = false
    console.log('Performance monitoring stopped')
  }

  /**
   * Measures audio latency for a callback function
   * @param callback - Function to measure latency for
   * @returns Measured latency in milliseconds
   */
  measureAudioLatency(callback: () => void): number {
    const start = performance.now()
    callback()
    const latency = performance.now() - start

    this.audioLatencies.push(latency)

    // Keep only the last MAX_SAMPLES measurements
    if (this.audioLatencies.length > this.MAX_SAMPLES) {
      this.audioLatencies.shift()
    }

    return latency
  }

  /**
   * Gets average audio latency
   * @returns Average latency in milliseconds
   */
  getAverageLatency(): number {
    if (this.audioLatencies.length === 0) return 0
    const sum = this.audioLatencies.reduce((a, b) => a + b, 0)
    return sum / this.audioLatencies.length
  }

  /**
   * Gets maximum audio latency
   * @returns Maximum latency in milliseconds
   */
  getMaxLatency(): number {
    return this.audioLatencies.length > 0 ? Math.max(...this.audioLatencies) : 0
  }

  /**
   * Gets minimum audio latency
   * @returns Minimum latency in milliseconds
   */
  getMinLatency(): number {
    return this.audioLatencies.length > 0 ? Math.min(...this.audioLatencies) : 0
  }

  /**
   * Monitors memory usage
   */
  private monitorMemory(): { used: number; total: number; limit: number; timestamp: number } | null {
    if ('memory' in performance) {
      const memory = (performance as unknown as { memory: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory
      const memoryInfo = {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
        timestamp: Date.now()
      }

      this.memoryUsage.push(memoryInfo.used)

      // Keep only the last MAX_SAMPLES measurements
      if (this.memoryUsage.length > this.MAX_SAMPLES) {
        this.memoryUsage.shift()
      }

      return memoryInfo
    }
    return null
  }

  /**
   * Schedules periodic memory checks
   */
  private scheduleMemoryCheck(): void {
    if (!this.isMonitoring) return

    this.monitorMemory()

    // Check memory every 5 seconds
    setTimeout(() => this.scheduleMemoryCheck(), 5000)
  }

  /**
   * Gets current memory usage
   * @returns Memory usage in bytes
   */
  getCurrentMemoryUsage(): number {
    const memoryInfo = this.monitorMemory()
    return memoryInfo ? memoryInfo.used : 0
  }

  /**
   * Gets average memory usage
   * @returns Average memory usage in bytes
   */
  getAverageMemoryUsage(): number {
    if (this.memoryUsage.length === 0) return 0
    const sum = this.memoryUsage.reduce((a, b) => a + b, 0)
    return sum / this.memoryUsage.length
  }

  /**
   * Checks if memory usage is high
   * @param threshold - Memory threshold in MB (default: 50MB)
   * @returns true if memory usage is above threshold
   */
  isMemoryHigh(threshold = 50 * 1024 * 1024): boolean {
    const current = this.getCurrentMemoryUsage()
    return current > threshold
  }

  /**
   * Checks if audio performance should be optimized
   * @param latencyThreshold - Latency threshold in ms (default: 10ms)
   * @returns true if optimization is recommended
   */
  shouldOptimize(latencyThreshold = 10): boolean {
    return this.getAverageLatency() > latencyThreshold || this.isMemoryHigh()
  }

  /**
   * Gets performance recommendations
   * @returns Array of performance recommendations
   */
  getRecommendations(): string[] {
    const recommendations: string[] = []
    const avgLatency = this.getAverageLatency()
    const maxLatency = this.getMaxLatency()
    const memoryUsage = this.getCurrentMemoryUsage()

    if (avgLatency > 10) {
      recommendations.push(`High average audio latency (${avgLatency.toFixed(2)}ms). Consider reducing audio buffer size.`)
    }

    if (maxLatency > 50) {
      recommendations.push(`Very high peak latency (${maxLatency.toFixed(2)}ms). Audio pool optimization needed.`)
    }

    if (this.isMemoryHigh()) {
      recommendations.push(`High memory usage (${(memoryUsage / 1024 / 1024).toFixed(2)}MB). Consider clearing unused audio objects.`)
    }

    if (this.audioLatencies.length > 0) {
      const variance = this.calculateVariance()
      if (variance > 25) {
        recommendations.push(`High latency variance (${variance.toFixed(2)}ms²). Audio performance is inconsistent.`)
      }
    }

    if (recommendations.length === 0) {
      recommendations.push('Audio performance is optimal.')
    }

    return recommendations
  }

  /**
   * Calculates latency variance
   * @returns Variance in milliseconds squared
   */
  private calculateVariance(): number {
    if (this.audioLatencies.length < 2) return 0

    const avg = this.getAverageLatency()
    const squaredDiffs = this.audioLatencies.map(latency => Math.pow(latency - avg, 2))
    return squaredDiffs.reduce((a, b) => a + b, 0) / this.audioLatencies.length
  }

  /**
   * Gets comprehensive performance report
   * @returns Performance report object
   */
  getPerformanceReport(): {
    runtime: number
    audio: {
      averageLatency: number
      maxLatency: number
      minLatency: number
      variance: number
      sampleCount: number
    }
    memory: {
      current: number
      average: number
      isHigh: boolean
      sampleCount: number
    }
    recommendations: string[]
    shouldOptimize: boolean
  } {
    const runtime = this.isMonitoring ? performance.now() - this.startTime : 0

    return {
      runtime: runtime,
      audio: {
        averageLatency: this.getAverageLatency(),
        maxLatency: this.getMaxLatency(),
        minLatency: this.getMinLatency(),
        variance: this.calculateVariance(),
        sampleCount: this.audioLatencies.length
      },
      memory: {
        current: this.getCurrentMemoryUsage(),
        average: this.getAverageMemoryUsage(),
        isHigh: this.isMemoryHigh(),
        sampleCount: this.memoryUsage.length
      },
      recommendations: this.getRecommendations(),
      shouldOptimize: this.shouldOptimize()
    }
  }

  /**
   * Logs performance report to console
   */
  logReport(): void {
    const report = this.getPerformanceReport()

    console.group('🎵 A Compás Performance Report')
    console.log(`Runtime: ${(report.runtime / 1000).toFixed(2)}s`)
    console.group('Audio Performance')
    console.log(`Average Latency: ${report.audio.averageLatency.toFixed(2)}ms`)
    console.log(`Max Latency: ${report.audio.maxLatency.toFixed(2)}ms`)
    console.log(`Min Latency: ${report.audio.minLatency.toFixed(2)}ms`)
    console.log(`Variance: ${report.audio.variance.toFixed(2)}ms²`)
    console.log(`Samples: ${report.audio.sampleCount}`)
    console.groupEnd()

    console.group('Memory Usage')
    console.log(`Current: ${(report.memory.current / 1024 / 1024).toFixed(2)}MB`)
    console.log(`Average: ${(report.memory.average / 1024 / 1024).toFixed(2)}MB`)
    console.log(`Is High: ${report.memory.isHigh}`)
    console.log(`Samples: ${report.memory.sampleCount}`)
    console.groupEnd()

    console.group('Recommendations')
    report.recommendations.forEach(rec => console.log(`• ${rec}`))
    console.groupEnd()

    console.log(`Should Optimize: ${report.shouldOptimize}`)
    console.groupEnd()
  }

  /**
   * Resets all performance data
   */
  reset(): void {
    this.audioLatencies = []
    this.memoryUsage = []
    this.startTime = performance.now()
    console.log('Performance data reset')
  }
}
