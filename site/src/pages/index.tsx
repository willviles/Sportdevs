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
import { NavBar } from '../components/NavBar'

const IndexPage: FC<{}> = ({}) => {
  const { meta } = useApp()
  const { track } = useAnalytics()

  return (<>
  <header className="relative box-border">
      <div className="absolute inset-0 mask-gradient opacity-50">
        <Image
          layout="fill"
          className="object-center object-cover pointer-events-none"
          src={stadiumImage}
          placeholder="blur"
          quality={100}
          alt={'madrid fan'}
        />
      </div>

      <div key="navbar-padding" className="h-[80px]" />

      <NavBar stickyProps={{ className: 'absolute top-0 left-0 w-full z-50' }} />

      <div className="relative flex-1 pt-24 lg:pt-[15vh]">
        <div className="container-lg mx-auto">
          <div className="w-full mb-12">
            <h1 className="type-heading text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-primary-100 to-green-600 pb-8 md:w-3/4">
              Love sport? Build tech? Let's create a community.
            </h1>
            <h2 className="text-xl leading-loose md:w-5/6 xl:w-4/5 mb-8">
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
            <div className="type-article md:w-5/6 xl:w-3/4 mb-12">
              <p>
                We're a niche within the programming world... so let’s unite to talk tech, share ideas &amp; support each others' projects, all whilst enjoying casual chats about our favourite sports teams, players &amp; matches.
              </p>
            </div>
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
        </div>
      </div>
    </header>

    <section className="relative">
      <div className="container-lg mx-auto relative z-1">
        <div className="rounded-2xl border border-primary-500 shadow-2xl p-6 lg:p-8 xl:py-8 xl:px-10">
          <EmailSignUpForm />
        </div>
      </div>
    </section>

    <Footer />
  </>)
}

export default IndexPage
