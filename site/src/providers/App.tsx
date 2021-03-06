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
  name: 'SportDevs',
  strapline: `Community for techies who love sport`,
  shareImgURL: `${process.env.BASE_PATH}/images/social-card.jpg`,
  facebookAppId: '',
  get description () {
    return `#sportdevs is a network of like-minded developers who are passionate about watching & playing sport.`
  },
  author: 'Will Viles',
  get copyright () {
    return `© ${new Date().getFullYear().toString()} ${this.author}`
  },
  get keywords () {
    return `${this.name}, sport, fans, developers, football, soccer, tennis, tech, build, code, coders, community`
  },
  links: {
    discord: 'https://discord.gg/b6GYdJ5YjU',
    github: 'https://github.com/willviles/Sportdevs',
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
  const [appStatus, setAppStatus] = useState(AppStatus.READY)
  const appReady = useMemo(() => appStatus === AppStatus.READY, [appStatus])

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
