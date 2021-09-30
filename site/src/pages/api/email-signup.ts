import { NextApiRequest, NextApiResponse } from 'next'
import { use } from 'next-api-middleware'
import { httpMethodMiddleware } from 'shared/dist/next/middlewares/http-method'
import { nextValidationMiddleware } from 'shared/dist/next/middlewares/validation'
import { IsEmail, IsOptional, IsString, Length } from 'class-validator'
import mailchimp, { MAILCHIMP_LIST } from 'app/services/mailchimp'
import axios from 'axios'
import FormData from 'form-data'

export class EmailSignupBody {
  @IsEmail()
  email: string

  @IsOptional()
  @IsString()
  @Length(1)
  firstName?: string

  @IsOptional()
  @IsString()
  @Length(1)
  lastName?: string
}

const middleware = use(
  httpMethodMiddleware('POST'),
  nextValidationMiddleware('body', EmailSignupBody)
)

const EmailSignupApiRoute = async (
  req: Omit<NextApiRequest, 'body'> & { body: EmailSignupBody },
  res: NextApiResponse
) => {
  try {
    const {
      email,
      firstName,
      lastName
    } = req.body

    const results = await Promise.allSettled([
      addToMailchimp({ email, firstName, lastName }),
      // subscribeToRevueList({ email, firstName, lastName })
    ])

    results.forEach((r, i) => {
      if (r.status === 'rejected') console.error(r.reason)
    })

    return res.status(200).json({
      data: {},
      meta: {
        status: 'Subscribed'
      }
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ err })
  }
}

async function subscribeToRevueList ({ email, firstName, lastName }) {
  const formData = new FormData()

  if (email) formData.append('email', email)
  if (firstName) formData.append('first_name', firstName)
  if (lastName) formData.append('last_name', lastName)
  formData.append('double_opt_in', 'false')

  try {
    await axios.request({
      method: 'POST',
      url: 'https://www.getrevue.co/api/v2/subscribers',
      headers: {
        ...formData.getHeaders(),
        Authorization: `Token ${process.env.REVUE_API_KEY}`
      },
      data: formData
    })
  } catch (err) {
    // Ignore all errors if email is already subscribed or pending confirmation
    if (!err.response?.data?.error?.email) {
      throw err
    }
  }

}

async function addToMailchimp ({ email, firstName, lastName }) {
  await mailchimp.lists.addListMember(MAILCHIMP_LIST.DEFAULT, {
    email_address: email,
    status: 'pending',
    merge_fields: {
      'FNAME': firstName,
      'LNAME': lastName
    }
  })
}

export default middleware(EmailSignupApiRoute as any)
