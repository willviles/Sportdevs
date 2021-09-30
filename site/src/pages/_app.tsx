import { FC } from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { AppProps as NextAppProps } from 'next/app'
import { HeadComponent } from 'app/components/Head'
import { AppProvider } from 'app/providers/App'
import { AnalyticsProvider } from 'app/providers/Analytics'
import { isSSR } from 'shared/dist/next/helpers/ssr'
import smoothscroll from 'smoothscroll-polyfill'

if (!isSSR) smoothscroll.polyfill()

// Import third party CSS
import 'swiper/swiper-bundle.css'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import 'tippy.js/animations/shift-away.css'

// Import app style sheet
import '../style.css'

export type NextPageWithLayout<T> = NextPage<T> & {
  getLayout?: ({ Component, pageProps }: NextPageLayoutProps<T>) => JSX.Element
}

export interface NextPageLayoutProps<T> {
  Component: NextPage<T>
  pageProps: T
}

const AppLayout: FC<NextPageLayoutProps<any>> = ({ Component, pageProps }) => {
  const useLayout = (Component as NextPageWithLayout<any>).getLayout || (({ Component, pageProps }) => <Component {...pageProps} />)
  return useLayout({ Component, pageProps })
}

const ProgressBar = dynamic(async () => (await import('../components/ProgressBar')).ProgressBar, { ssr: false })

function App ({ Component, pageProps }: NextAppProps) {
  return (
    <AnalyticsProvider>
      <AppProvider>
        <HeadComponent />
        <ProgressBar />
        <AppLayout Component={Component} pageProps={pageProps} />
      </AppProvider>
    </AnalyticsProvider>
  )
}

export default App
