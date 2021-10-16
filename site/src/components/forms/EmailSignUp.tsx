import { FC, useEffect, useState } from 'react'
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

  const [status, setStatus] = useSubmissionStatus('idle')

  useEffect(() => {
    if (submittedData?.email) {
      setStatus('submitted')
    }
  }, [submittedData?.email])

  return status === 'submitted' ? (
    <div>
      <div className="type-article">
        <h4 className="text-xl text-transparent bg-clip-text bg-gradient-to-br from-primary-100 to-green-600">
          You're on the mailing list!
        </h4>
        <p className="text-lg leading-loose">
          Awesome! I don't have a clue what I'll be sending you yet, but I promise it'll be only great communication.<br />
        </p>
        <p>
          You're signed up with: <b>{submittedData.email}</b>
        </p>
        <p>
          <button
            onClick={() => { setSubmittedData({}); setStatus('idle') }}
            className="font-bold underline inline-block text-primary-100 hover:text-primary-200"
          >
            Click to sign up with a different email address.
          </button>
        </p>
      </div>
    </div>
  ) : (
    <div>
      <div className="type-article mb-8">
        <h4 className="text-xl text-transparent bg-clip-text bg-gradient-to-br from-purple-100 to-green-600">
          Shoot me your email, perhaps...
        </h4>
        <p>
          If you're vibing, you might like to leave your email and I'll figure out if there's some cool, infrequent content I can share with you.
        </p>
      </div>
      <FocusLock autoFocus={false}>
        <form onSubmit={async (e) => {
          e.preventDefault()
          setStatus('submitting')
          try {
            await axios.request({
              url: `${process.env.BASE_PATH}/api/email-signup`,
              method: 'POST',
              data
            })
            track('EmailSignUp')
            setSubmittedData(data)
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
                  placeholder="david.beckham@football.com"
                  disabled={status === 'submitting'}
                  className="p-6 w-full rounded-lg text-lg ring-2 focus:ring-2 ring-primary-500 focus:ring-primary-200 text-body-bg outline-none"
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
          </div>
        </form>
      </FocusLock>
    </div>
  )
}
