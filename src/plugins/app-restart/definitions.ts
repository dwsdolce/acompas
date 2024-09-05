export interface AppRestartPlugin {
  restart(): Promise<void>
}
