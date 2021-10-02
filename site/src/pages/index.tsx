import { FC } from 'react'
import Image from 'next/image'
import { Footer } from 'app/components/Footer'
import { ReactComponent as LogoText } from 'brand/logos/logo-text.svg?sprite'
import { EmailSignUpForm } from 'app/components/forms/EmailSignUp'
import { Button } from '../components/Button'
import { useApp } from '../providers/App'
import { ReactComponent as DiscordIcon } from 'brand/icons/discord.svg?sprite'
import stadiumImage from '../../public/images/stadium.png'
import { useAnalytics } from '../providers/Analytics'

const IndexPage: FC<{}> = ({}) => {
  const { meta } = useApp()
  const { track } = useAnalytics()

  return (<>
    <header className="relative flex items-center py-6 lg:py-12 xl:py-24 min-h-[100vh] box-border">
      <div className="relative flex-1">
        <div className="container mx-auto">
          <LogoText className="h-12 lg:h-14 mb-12 ml-1" />
        </div>
        <div className="container mx-auto flex items-start flex-col-reverse xl:flex-row">
          <div className="w-full mb-12 xl:mb-0 xl:w-2/3">
            <h1 className="type-heading text-5xl md:text-6xl 2xl:text-7xl text-transparent bg-clip-text bg-gradient-to-br from-purple-100 to-green-600">
              <span>Love sport?&nbsp;</span><br className="md:hidden" />
              <span>Build tech?&nbsp;</span><br />
              <span className="block mb-8 md:mb-3" />
              <span>Let's create a community.</span>
            </h1>
            <div className="mb-8" />
            <h2 className="text-xl 2xl:text-2xl leading-loose md:w-5/6 xl:w-4/5 mb-8">
              Hi, I'm&nbsp;
              <a
                href="https://twitter.com/willviles"
                target="_blank"
                rel="noopener"
                className="type-heading px-[0.33em] py-[0.1em] inline-flex items-center self-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-700"
              >
                @willviles
              </a>
              , founder of&nbsp;
              <a
                href="https://twitter.com/search?q=sportdevs"
                target="_blank"
                rel="noopener"
                className="type-heading px-[0.33em] py-[0.1em] inline-flex items-center self-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-700"
              >
                #sportdevs
              </a>
              , a network of likeminded developers who are ultra passionate about watching &amp; playing sport.
            </h2>
            <div className="type-article md:w-5/6 xl:w-3/4">
              <p>
                We're a niche within the programming world... so let’s unite to talk tech, share ideas &amp; support each others' projects, all whilst enjoying casual chats about our favourite sports teams, players &amp; matches.
              </p>
            </div>
            <div className="mb-12" />
            <div>
              <Button
                tag="a"
                theme="primary"
                href={meta.links.discord}
                target="_blank"
                className="inline-flex py-6 px-8 font-bold rounded-lg shadow-xl text-xl"
                onClick={() => track('DiscordLinkClick')}
              >
                <DiscordIcon className="h-[1.5em] mr-[0.66em]" />
                <span>Join the Discord</span>
              </Button>
            </div>
          </div>
          <div className="w-full xl:w-1/3">
            <div className="xl:-mr-12 flex xl:justify-end">
              {/* <img src={require('brand/illustrations/main.svg').default} className="w-2/3 md:w-1/2 xl:w-full 3xl:w-4/5 mb-12" /> */}
            </div>
          </div>
        </div>
      </div>
    </header>

    <section className="relative py-[5vw]">
      <Image
        layout="fill"
        className="object-bottom object-cover pointer-events-none"
        src={stadiumImage}
        placeholder="blur"
        quality={100}
        alt={'sportdevs stadium bg'}
      />
      <div className="container-md mx-auto relative z-1">
        <div className="rounded-2xl backdrop-filter-primary-900 shadow-2xl p-6 lg:p-8 xl:py-8 xl:px-10 xl:mr-24">
          <EmailSignUpForm />
        </div>
      </div>
    </section>

    <Footer />
  </>)
}

export default IndexPage
