import { useState, useEffect } from 'react'
import { isSSR } from '../../next/helpers/ssr'
import ResizeObserver from 'resize-observer-polyfill'

export interface ElementSize {
  width: number
  height: number
}

export function useElementSize(
  element: () => HTMLElement
): ElementSize {
  const [elementSize, setElementSize] = useState<ElementSize>({
    width: undefined,
    height: undefined
  })

  useEffect(() => {
    if (!isSSR) {
      const observer = new ResizeObserver(entries => {
        setElementSize({
          width: entries[0].target.clientWidth,
          height: entries[0].target.clientHeight
        })
      })
      observer.observe(element())
      return () => observer.disconnect()
    }
  }, [])

  return elementSize
}
