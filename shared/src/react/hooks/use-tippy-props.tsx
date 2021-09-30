import { TippyProps } from '@tippyjs/react'
import { Placement } from '@popperjs/core'
import { merge } from 'lodash'
import { useMemo } from 'react'

const defaultTippyProps: Partial<TippyProps> = {
  animation: 'shift-away',
  theme: 'light',
  allowHTML: true,
  arrow: true,
  duration: 100,
  interactive: true,
  trigger: 'mouseenter focus',
  placement: 'top' as Placement,
  appendTo: typeof window !== 'undefined' && document.body
}

export const useTippyProps = (...tippyProps: Partial<TippyProps>[]): TippyProps => {
  const props = useMemo(() => {
    return merge({}, defaultTippyProps, ...tippyProps)
  }, [tippyProps])
  return props
}
