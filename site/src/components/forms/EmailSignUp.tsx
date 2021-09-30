import { FC, useState } from 'react'
import FocusLock, { AutoFocusInside } from 'react-focus-lock'
import { useEmailSignUpState } from 'app/hooks/use-storage'
import { useSubmissionStatus } from 'shared/dist/react/hooks/use-status'
import { EmailSignupBody } from '../../pages/api/email-signup'
import axios from 'axios'
import { useAnalytics } from '../../providers/Analytics'
import { Button } from '../Button'

export const EmailSignUpForm: FC = () => {
  const [data, setData] = useState<EmailSignupBody>({
    email: ''
  })

  const [submittedData, setSubmittedData] = useEmailSignUpState()
  const { track } = useAnalytics()

  const [status, setStatus] = useSubmissionStatus(submittedData?.email ? 'submitted' : 'idle')

  return status === 'submitted' ? (
    <div className="type-article">
      <h4 className="text-transparent bg-clip-text bg-gradient-to-br from-purple-100 to-green-600">
        You're subscribed to the mailing List
      </h4>
      <p className="text-lg leading-loose">
        Awesome! I don't have a clue what I'll be sending you yet, but I promise I will 'play ball' by not spamming <b>{submittedData.email}</b>.<br />
      </p>
      <p>
        <button
          onClick={() => { setSubmittedData({}); setStatus('idle') }}
          className="font-bold underline inline-block"
        >
          Click to sign up with a different email address.
        </button>
      </p>
    </div>
  ) : (
    <div>
      <div className="type-article mb-8">
        <h4 className="text-transparent bg-clip-text bg-gradient-to-br from-purple-100 to-green-600">
          Shoot me your email, or don't, or whatever...
        </h4>
        <p>
          If you're vibing, perhaps you'd like to leave your email and I'll figure out if there's some cool, infrequent content I can share with you?
        </p>
      </div>
      <FocusLock>
        <form onSubmit={async (e) => {
          e.preventDefault()
          setStatus('submitting')
          try {
            await axios.request({
              url: `${process.env.BASE_PATH}/api/email-signup`,
              method: 'POST',
              data
            })
            track('CTA:Click', { placement: 'index-bottom' })
            setSubmittedData(data)
            setStatus('submitted')
          } catch (err) {
            console.error(err)
            setStatus('errored')
          }
        }}>
          <div className="grid gap-6 lg:grid-cols-8 lg:-mx-2">
            <div className="lg:col-span-6">
              <AutoFocusInside>
                <input
                  name="email"
                  required
                  autoFocus
                  placeholder="david.beckham@football.com"
                  disabled={status === 'submitting'}
                  className="p-6 w-full rounded-lg text-lg focus:ring-1 ring-primary-500 text-body-bg outline-none"
                  onChange={(e) => { setData((data) => ({ ...data, email: e.target.value })) }}
                />
              </AutoFocusInside>
            </div>
            <div className="lg:col-span-2">
              <Button
                tag="button"
                type="submit"
                theme="primary"
                className="py-6 px-8 font-bold rounded-lg w-full text-lg flex justify-center items-center"
                disabled={status === 'submitting'}
              >
                <span className="whitespace-nowrap">
                  {(() => {
                    switch (status) {
                      case 'idle': return `Go`
                      case 'submitting': return `...`
                      case 'errored': return 'Try Again'
                    }
                  })()}
                </span>
              </Button>
            </div>
            <div className="lg:col-span-8 mx-2">
              <p className="text-xs">
                By submitting, you agree with Mailchimp's <a target="_blank" href="https://mailchimp.com/legal/terms/" className="font-bold underline">Terms</a> and <a target="_blank" href="https://mailchimp.com/legal/privacy/" className="font-bold underline">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </form>
      </FocusLock>
    </div>
  )
}
