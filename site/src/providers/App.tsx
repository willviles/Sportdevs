import React, { createContext, FC, useContext, useMemo, useState } from 'react'
import ErrorPage from '../pages/_error'

export const AppContext = createContext<{
  appStatus?: AppStatus
  appReady?: boolean
  meta?: typeof AppMeta
}>({})

/*
  AppStatus controls the entire initialization process of the app.
  Initially starting as IDLE, the AppProvider and CurrentUserProvider
  listen to changes of AppStatus reactively to set up the required
  app data and session data.
*/
export enum AppStatus {
  IDLE = 'idle',
  SETUP_APP = 'setupApp',
  READY = 'ready',
  ERRORED = 'errored'
}

const AppMeta = {
  name: 'Sportdevs',
  strapline: `Strapline`,
  shareImgURL: `${process.env.BASE_PATH}/images/social-share.jpg`,
  facebookAppId: '',
  get description () {
    return `Description`
  },
  author: 'Will Viles',
  get copyright () {
    return `© ${new Date().getFullYear().toString()} ${this.author}`
  },
  get keywords () {
    return `${this.name}, sport, fans, developers, code, coders, community`
  },
  links: {
    discord: '',
    twitter: 'https://twitter.com/willviles'
  }
} as const

export const useApp = () => {
  const appStore = useContext(AppContext)
  if (!appStore) throw new Error('useApp must be used within the AppProvider')
  return appStore
}

export const AppProvider: FC = ({
  children
}) => {
  const [appStatus, setAppStatus] = useState(AppStatus.READY) // If dynamic data loading is required at app level, change initial state to AppStatus.IDLE
  const appReady = useMemo(() => appStatus === AppStatus.READY, [appStatus])

  // const setupApp = useCallback(async () => {
  //   // If setupApp is returned false from getServerSideProps, then we ignore app setup.
  //   const shouldSetupApp = window.__NEXT_DATA__?.props?.pageProps?.setupApp !== false

  //   if (!isSSR && shouldSetupApp) {
  //     try {
  //       const { data } = await HTTP.request<{ data: any }>({
  //         method: 'GET',
  //         url: '/api/app'
  //       })

  //       setData(data)
  //     } catch (err) {
  //       setAppStatus(AppStatus.ERRORED)
  //       console.error(err)
  //       return
  //     }
  //   }

  //   setAppStatus(AppStatus.READY)
  // }, [])

  // useEffect(() => { setupApp() }, [])

  return (
    <AppContext.Provider
      value={{
        appStatus,
        appReady,
        meta: AppMeta
      }}
    >
      {(() => {
        switch (appStatus) {
          case AppStatus.ERRORED:
            return <ErrorPage statusCode={500} />
          default:
            return children
        }
      })()}
    </AppContext.Provider>
  )
}
