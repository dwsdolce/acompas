<template>
  <div class="performance-panel">
    <q-card class="q-ma-md">
      <q-card-section>
        <div class="text-h6">🎵 Performance Monitor</div>
        <div class="text-subtitle2">Real-time audio optimization metrics</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-gutter-md">
          <!-- Audio Performance -->
          <div class="col">
            <q-card flat bordered>
              <q-card-section>
                <div class="text-subtitle1">Audio Performance</div>
                <div class="q-mt-sm">
                  <div class="row justify-between">
                    <span>Average Latency:</span>
                    <span :class="latencyColor">{{ audioStats.averageLatency.toFixed(2) }}ms</span>
                  </div>
                  <div class="row justify-between">
                    <span>Max Latency:</span>
                    <span>{{ audioStats.maxLatency.toFixed(2) }}ms</span>
                  </div>
                  <div class="row justify-between">
                    <span>Samples:</span>
                    <span>{{ audioStats.sampleCount }}</span>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <!-- Memory Usage -->
          <div class="col">
            <q-card flat bordered>
              <q-card-section>
                <div class="text-subtitle1">Memory Usage</div>
                <div class="q-mt-sm">
                  <div class="row justify-between">
                    <span>Current:</span>
                    <span :class="memoryColor">{{ (memoryStats.current / 1024 / 1024).toFixed(2) }}MB</span>
                  </div>
                  <div class="row justify-between">
                    <span>Average:</span>
                    <span>{{ (memoryStats.average / 1024 / 1024).toFixed(2) }}MB</span>
                  </div>
                  <div class="row justify-between">
                    <span>Status:</span>
                    <span :class="memoryStats.isHigh ? 'text-negative' : 'text-positive'">
                      {{ memoryStats.isHigh ? 'High' : 'Normal' }}
                    </span>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>

          <!-- Pool Statistics -->
          <div class="col">
            <q-card flat bordered>
              <q-card-section>
                <div class="text-subtitle1">Audio Pools</div>
                <div class="q-mt-sm">
                  <div class="row justify-between">
                    <span>Total Pools:</span>
                    <span>{{ poolStats.totalPools }}</span>
                  </div>
                  <div class="row justify-between">
                    <span>Total Players:</span>
                    <span>{{ poolStats.totalPlayers }}</span>
                  </div>
                  <div class="row justify-between">
                    <span>Audio State:</span>
                    <span :class="audioStateColor">{{ audioState }}</span>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>

      <!-- Recommendations -->
      <q-card-section v-if="recommendations.length > 0">
        <div class="text-subtitle1">Recommendations</div>
        <q-list dense>
          <q-item v-for="(rec, index) in recommendations" :key="index">
            <q-item-section avatar>
              <q-icon
                :name="rec.includes('optimal') ? 'mdi-check-circle' : 'mdi-alert-circle'"
                :color="rec.includes('optimal') ? 'positive' : 'warning'"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-caption">{{ rec }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <!-- Actions -->
      <q-card-actions align="right">
        <q-btn
          flat
          label="Reset Data"
          icon="mdi-refresh"
          @click="resetData"
          color="primary"
        />
        <q-btn
          flat
          label="Log Report"
          icon="mdi-file-document"
          @click="logReport"
          color="secondary"
        />
        <q-btn
          flat
          :label="isMonitoring ? 'Stop' : 'Start'"
          :icon="isMonitoring ? 'mdi-stop' : 'mdi-play'"
          @click="toggleMonitoring"
          :color="isMonitoring ? 'negative' : 'positive'"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useMetronome } from 'src/composables/metronome'

interface PerformanceData {
  audioState?: string
  audioPerformance?: {
    latency?: number
    contextState?: string
    sampleRate?: number
  }
  poolStats?: {
    totalPools: number
    totalPlayers: number
    poolKeys: string[]
  }
  isInitialized?: boolean
  performanceReport?: {
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
  }
}

const metronome = useMetronome()
const performanceData = ref<PerformanceData>({})
const isMonitoring = ref(false)
const updateInterval = ref<NodeJS.Timeout | null>(null)

// Computed properties for styling and data formatting
const audioStats = computed(() => performanceData.value.performanceReport?.audio || {
  averageLatency: 0,
  maxLatency: 0,
  minLatency: 0,
  variance: 0,
  sampleCount: 0
})

const memoryStats = computed(() => performanceData.value.performanceReport?.memory || {
  current: 0,
  average: 0,
  isHigh: false,
  sampleCount: 0
})

const poolStats = computed(() => performanceData.value.poolStats || {
  totalPools: 0,
  totalPlayers: 0,
  poolKeys: []
})

const audioState = computed(() => performanceData.value.audioState || 'unknown')

const recommendations = computed(() =>
  performanceData.value.performanceReport?.recommendations || []
)

const latencyColor = computed(() => {
  const latency = audioStats.value.averageLatency
  if (latency < 5) return 'text-positive'
  if (latency < 10) return 'text-warning'
  return 'text-negative'
})

const memoryColor = computed(() => {
  const memory = memoryStats.value.current / 1024 / 1024
  if (memory < 30) return 'text-positive'
  if (memory < 50) return 'text-warning'
  return 'text-negative'
})

const audioStateColor = computed(() => {
  switch (audioState.value) {
    case 'running': return 'text-positive'
    case 'suspended': return 'text-warning'
    case 'closed': return 'text-negative'
    default: return 'text-grey'
  }
})

// Methods
const updatePerformanceData = () => {
  performanceData.value = metronome.getPerformanceInfo()
}

const toggleMonitoring = () => {
  if (isMonitoring.value) {
    stopMonitoring()
  } else {
    startMonitoring()
  }
}

const startMonitoring = () => {
  isMonitoring.value = true
  metronome.performanceMonitor.start()

  // Update data every second
  updateInterval.value = setInterval(updatePerformanceData, 1000)
  updatePerformanceData()
}

const stopMonitoring = () => {
  isMonitoring.value = false
  metronome.performanceMonitor.stop()

  if (updateInterval.value) {
    clearInterval(updateInterval.value)
    updateInterval.value = null
  }
}

const resetData = () => {
  metronome.resetPerformanceData()
  updatePerformanceData()
}

const logReport = () => {
  metronome.logPerformanceReport()
}

// Lifecycle
onMounted(() => {
  updatePerformanceData()
})

onUnmounted(() => {
  stopMonitoring()
})
</script>

<style scoped>
.performance-panel {
  max-width: 1200px;
  margin: 0 auto;
}

.text-caption {
  font-size: 0.75rem;
  line-height: 1.2;
}
</style>
