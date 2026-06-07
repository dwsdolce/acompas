/**
 * Lightweight conditional logger.
 *
 * `log` and `warn` are no-ops in production builds, keeping the console clean
 * for end users — they are only emitted during development. `error` is kept in
 * every build because production errors are valuable for diagnosing real
 * user-facing failures. Wrap it with `devOnly(...)` below if you'd rather
 * silence it too.
 */
const isDev = process.env.NODE_ENV === 'development'

type LogFn = (...args: unknown[]) => void

const noop: LogFn = () => undefined

const devOnly = (fn: LogFn): LogFn => (isDev ? fn : noop)

export const logger = {
  log: devOnly(console.log.bind(console)),
  warn: devOnly(console.warn.bind(console)),
  error: console.error.bind(console)
}
