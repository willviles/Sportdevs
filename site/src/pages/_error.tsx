import { FC } from 'react'
import Head from 'next/head'
import { usePageTitle } from 'app/hooks/use-page-title'
import { Footer } from 'app/components/Footer'

const statusCodes: { [code: number]: string } = {
  400: 'Bad Request',
  404: 'This page could not be found',
  405: 'Method Not Allowed',
  500: 'Internal Server Error',
  503: 'Maintenance Mode'
}

const ErrorPage: FC<{
  statusCode: number
  title?: string
}> = ({
  statusCode,
  title: _title
}) => {
  const title = _title ?? statusCodes[statusCode] ?? 'An unexpected error has occurred'
  const pageTitle = usePageTitle(title)

  return (
    <main data-page="projects">
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} key="og:title" />
      </Head>
      <header className="my-12 xl:my-16">
        <div className="container mx-auto">
          <h2 className="font-bold mt-8 mb-6 text-lg md:text-xl xl:text-2xl">
            <span className="pb-1 border-b-4 border-light-shade">
              {statusCode}
            </span>
          </h2>
          <h1 className="font-bold mt-8 mb-6 lg:mb-12 text-3xl md:text-4xl xl:text-5xl">
            {title}
          </h1>
        </div>
      </header>
      <Footer />
    </main>
  )
}

export default ErrorPage
