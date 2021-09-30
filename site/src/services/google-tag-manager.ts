import { isSSR } from 'shared/dist/next/helpers/ssr'

declare global {
  interface Window {
    dataLayer: any[]
  }
}

export class GTM {
  static IFRAME_ID = 'app-gtm-iframe'
  static isEnabled = !isSSR && process.env.GTM_ENABLED && process.env.NEXT_PUBLIC_GTM_ID

  static init () {
    if (!this.isEnabled) {
      if (!isSSR) {
        console.info({
          GTM_ENABLED: process.env.GTM_ENABLED,
          NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID
        })
      }
      return
    }

    console.info(`Initializing GTM with tag ${process.env.NEXT_PUBLIC_GTM_ID}`)

    const noscript = document.createElement('noscript')
    const iframe = document.createElement('iframe')
    iframe.setAttribute('src', `https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`)
    iframe.setAttribute('height', '0px')
    iframe.setAttribute('width', '0px')
    iframe.setAttribute('style', 'display:none;visibility:hidden')
    iframe.setAttribute('id', GTM.IFRAME_ID)
    noscript.appendChild(iframe)
    document.getElementsByTagName('body')[0].appendChild(noscript)

    /* eslint-disable */
    ;(function(w,d,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName('script')[0],
      j=d.createElement('script'),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'dataLayer', process.env.NEXT_PUBLIC_GTM_ID);
    /* eslint-enable */

    return this
  }

  static track (name: string, attrs: any = {}) {
    if (!this.isEnabled) return
    GTM.init()
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: name,
      ...attrs
    })
  }

  static set (data: any) {
    if (!this.isEnabled) return
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(data)
  }
}
