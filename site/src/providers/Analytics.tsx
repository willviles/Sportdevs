import { createContext, useContext, FC, PropsWithChildren, useEffect } from 'react'
import { useRouter } from 'next/router'
import { GTM } from 'app/services/google-tag-manager'

declare global {
  interface Window {
    dataLayer: any[]
    gtag: Function
  }
}

export const AnalyticsContext = createContext<{
  track: (name: string, attrs?: any) => any
}>(null)

export const useAnalytics = () => {
  const analytics = useContext(AnalyticsContext)
  if (!analytics) throw new Error('useAnalytics must be used within the AnalyticsProvider')
  return analytics
}

/*
  'AnalyticsProvider' initializes all analytics trackers, sets up pageview
  tracking for those that don't do it automatically and passes down tracking
  functions to consuming components via React Context.
*/
export const AnalyticsProvider: FC<PropsWithChildren<{}>> = ({
  children
}) => {
  const router = useRouter()

  // Init GTM
  GTM.init()

  // Expose shorthand functions for pushing events and setting data on all
  // analytics platforms
  const track = (name: string, attrs: any = {}) => {
    GTM.track(name, attrs)
  }

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Do some tracking per page view
    }

    handleRouteChange(router.pathname)

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <AnalyticsContext.Provider
      value={{
        track
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  )
}
