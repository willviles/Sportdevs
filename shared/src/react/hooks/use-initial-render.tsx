import { useEffect, useRef } from 'react'

export const useInitialRender = () => {
  const initialRender = useRef(true)
  useEffect(() => { if (initialRender.current) initialRender.current = false }, [])
  return initialRender.current
}
