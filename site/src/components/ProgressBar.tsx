import Router from 'next/router'
import NProgress from 'nprogress'
import { useEffect, useRef } from 'react'
import { LoadingStatus } from 'shared/dist/react/hooks/use-status'

const DELAY = 100

export const ProgressBar = () => {
  const loadingStatus = useRef<LoadingStatus>('idle')
  const timeout = useRef<any>()

  function start () {
    if (loadingStatus.current === 'loading') return
    loadingStatus.current = 'loading'
    timeout.current = setTimeout(() => { NProgress.start() }, DELAY)
  }

  function stop () {
    loadingStatus.current = 'idle'
    clearTimeout(timeout.current)
    NProgress.done()
  }

  useEffect(() => {
    NProgress.configure({ showSpinner: false })

    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', stop)
    Router.events.on('routeChangeError', stop)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', stop)
      Router.events.off('routeChangeError', stop)
    }
  }, [])

  return <></>
}
