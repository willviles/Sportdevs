import { useState, useEffect } from 'react'
import { isSSR } from '../../next/helpers/ssr'

export interface ScrollPosition {
  x: number;
  y: number;
}

function getScrollPosition(): ScrollPosition {
  return !isSSR ? { x: window.pageXOffset, y: window.pageYOffset } : { x: 0, y: 0 }
}

export function useScrollPosition(): ScrollPosition {
  const [position, setScrollPosition] = useState<ScrollPosition>(getScrollPosition())

  useEffect(() => {
    let requestRunning: number | null = null
    function handleScroll() {
      if (!isSSR && requestRunning === null) {
        requestRunning = window.requestAnimationFrame(() => {
          setScrollPosition(getScrollPosition())
          requestRunning = null
        });
      }
    }

    if (!isSSR) {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return position
}
