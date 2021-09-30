import { FC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useApp } from '../providers/App'
import { usePageTitle } from '../hooks/use-page-title'

export const HeadComponent: FC = () => {
  const { meta } = useApp()
  const pageTitle = usePageTitle(meta.strapline)
  const router = useRouter()
  const currentUrl = `${process.env.BASE_PATH}${router?.asPath}`
  const faviconPath = (path: string) => `/favicons/${path}`

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={meta.description} key="description" />
      <meta name="keywords" content={meta.keywords} key="keywords" />
      <meta name="copyright" content={meta.copyright} />
      <meta name="author" content={meta.author} />

      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} key="og:title" />
      <meta property="og:description" content={meta.description} key="og:description" />
      <meta property="og:image" content={meta.shareImgURL} key="og:image" />
      <meta property="og:image:width" content="1200px" key="og:image:width" />
      <meta property="og:image:height" content="630px" key="og:image:height" />
      <meta property="og:image:alt" content={meta.name} key="og:image:alt" />
      <meta property="fb:app_id" content={meta.facebookAppId} />
      <meta property="og:url" content={currentUrl} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.shareImgURL} />

      <meta name="apple-mobile-web-app-title" content={meta.name} />
      <meta name="application-name" content={meta.name} />

      <link rel="canonical" href={currentUrl} />

      {/* generics */}
      <link rel="apple-touch-icon" sizes="180x180" href={faviconPath(`apple-touch-icon.png`)} />
      <link rel="icon" type="image/png" sizes="32x32" href={faviconPath(`favicon-32x32.png`)} />
      <link rel="icon" type="image/png" sizes="16x16" href={faviconPath(`favicon-16x16.png`)} />
      <link rel="manifest" href={faviconPath(`site.webmanifest`)} />
      <link rel="mask-icon" href={faviconPath(`safari-pinned-tab.svg`)} color="#6f5899" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  )
}
