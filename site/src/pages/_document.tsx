import Document, { Html, Head, Main, NextScript, DocumentProps, DocumentContext } from 'next/document'

export default class MyDocument extends Document<DocumentProps> {
  static async getInitialProps (ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps
    }
  }

  render () {
    return (
      <Html>
        <Head>
          {/* Fonts */}
          <style dangerouslySetInnerHTML={{
            __html: `
            @font-face {
              font-family: 'Manrope';
              font-style: normal;
              font-weight: 400;
              src: url('/fonts/Manrope/regular.woff2') format('woff2'), /* Newer browsers */
              url('/fonts/Manrope/regular.woff') format('woff'), /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
              url('/fonts/Manrope/regular.ttf') format('truetype'); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
            }

            @font-face {
              font-family: 'Manrope';
              font-style: normal;
              font-weight: 700;
              src: url('/fonts/Manrope/bold.woff2') format('woff2'), /* Newer browsers */
              url('/fonts/Manrope/bold.woff') format('woff'), /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
              url('/fonts/Manrope/bold.ttf') format('truetype'); /* Chrome 4+, Firefox 3.5, Opera 10+, Safari 3—5 */
            }`
          }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
