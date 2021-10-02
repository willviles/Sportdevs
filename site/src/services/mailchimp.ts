// @ts-ignore
import mailchimp from '@mailchimp/mailchimp_marketing'

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: 'us5'
})

export enum MAILCHIMP_LIST {
  DEFAULT = 'b558eb02a9'
}

export default mailchimp
