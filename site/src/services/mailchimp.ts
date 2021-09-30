// @ts-ignore
import mailchimp from '@mailchimp/mailchimp_marketing'

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: 'us1'
})

export enum MAILCHIMP_LIST {
  DEFAULT = '49e82752ba'
}

export default mailchimp
