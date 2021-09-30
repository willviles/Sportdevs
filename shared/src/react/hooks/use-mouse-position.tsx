import { useState, useEffect } from 'react'
import { isSSR } from '../../next/helpers/ssr'

interface MousePosition {
  x?: number
  y?: number
}

export const useMousePosition = (defaultValue: MousePosition = { x: 0, y: 0 }) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>(defaultValue)

  const updateMousePosition = ev => {
    setMousePosition({ x: ev.clientX, y: ev.clientY })
  }

  useEffect(() => {
    if (isSSR) return
    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  return mousePosition
}
