import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config.js'
import { omit } from 'lodash'
import { useWindowSize } from 'shared/dist/react/hooks/use-window-size'
import { useMemo } from 'react'

const resolvedConfig = resolveConfig(
  // Ensure only style declarations are resolved
  omit(tailwindConfig, ['plugins', 'purge'])
)

export const useTailwind = () => {
  const { width: windowWidth } = useWindowSize()

  const currentBreakpoint = useMemo(() => {
    let currentBreakpoint: string
    let biggestBreakpointValue = 0
    for (const breakpoint of Object.keys(resolvedConfig.theme.screens)) {
      const breakpointValue = parseInt(resolvedConfig.theme.screens[breakpoint].replace('px', ''), 10)
      if (
        breakpointValue > biggestBreakpointValue &&
        windowWidth >= breakpointValue
      ) {
        biggestBreakpointValue = breakpointValue;
        currentBreakpoint = breakpoint;
      }
    }
    return currentBreakpoint
  }, [windowWidth])

  return {
    config: resolvedConfig,
    currentBreakpoint
  }
}
